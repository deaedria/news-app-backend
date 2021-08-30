const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/formResponse');
const { formError, formSuccess } = require('../helpers/formResponse');
const { getAll, getById, deleteById, getCategoryNameById,
    getArticles, getRecommendedArticle, getCategoryListByName, createCategory
} = require('../helpers/category/queryCategory');
const isDataEmpty = require('../helpers/checkDataEmpty');
const unlinkPhoto = require('../helpers/unlinkPhoto');

const categoryModel = {
    getCategories: (req) => {
        const { query: { limit = 10, page = 1 } } = req
        return new Promise((resolve, reject) => {
            pg.query(getAll(limit, page), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Category not found", 404))
                if (err) reject(formSuccess("Get all Categories failed", 500))
                resolve(formSuccess("Get all Categories success", 200, result?.rows))
            });
        });
    },

    createCategory: (req) => {
        return new Promise((resolve, reject) => {
            const { body: category_name } = req
            const photos = req.file?.filename
            pg.query(getCategoryListByName(category_name), (error, result) => {
                if (error) reject(formError("Add category failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (!isEmpty) reject(fromResponse("Category exist", 400))
                pg.query(createCategory(category_name, photos), (err) => {
                    if (err) reject(formError("Add category Failed", 500))
                    resolve(formSuccess("Add category success", 200, result.rows[0]))
                });
            });
        });
    },

    getCategoryById: (req) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (err, result) => {
                if (err) reject(formError("Get category failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Category not found", 404))
                resolve(formSuccess("Get category success", 200, result.rows[0]))
            });
        });
    },

    getArticlesByCategoryId: (req) => {
        const { query: { limit = 6, page = 1 }, params: { id } } = req
        return new Promise((resolve, reject) => {
            pg.query(getCategoryNameById(id), (error, res) => {
                if (error) reject(formError("Get article list Failed", 500))
                pg.query(getArticles(limit, page, id), (err, result) => {
                    if (err) reject(formError("Get article list failed", 500))
                    const { isEmpty } = isDataEmpty(result)
                    if (isEmpty) reject(formError("Article list not found", 404))
                    const category = { name: res.rows[0].category_name }
                    const data = { article: [...result.rows], category }
                    resolve(formSuccess("Get article list by category success", 200, data));
                });
            });
        });
    },

    getRecommendedArticlesByCategoryId: (req) => {
        const { query: { limit = 1 }, params: { id } } = req
        return new Promise((resolve, reject) => {
            pg.query(getRecommendedArticle(limit, id), (err, result) => {
                if (err) reject(formError("Get article recommended failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Recommended article not found", 404))
                resolve(formSuccess("Get article recommended by category success", 200, result.rows))
            });
        });
    },

    deleteCategoryById: (req) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (error, res) => {
                if (error) reject(formError('Delete category failed', 500))
                const { isEmpty } = isDataEmpty(res)
                if (isEmpty) reject(formError("Category not found", 400))
                pg.query(deleteById(id), (err, result) => {
                    if (err) reject(formError('Delete category failed', 500))
                    resolve(formSuccess('Delete category success', 200, result.rows[0]))
                });
            });
        })
    },

    patchCategoryById: (req, res) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(`SELECT * FROM categories WHERE id = '${id}'`, (error, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("category id not found", 400))
                if (error) reject(formError("update data failed", 500))
                const file = req.file.filename ? `/upload/category_cover/${req.file.filename}` : result.rows[0].category_cover
                const {
                    category_name = result.rows[0].category_name,
                } = req.body
                let newBody = { ...req.body, category_cover: file }
                if (newBody.category_cover != result.rows[0].category_cover) {
                    unlinkPhoto(result.rows[0].category_cover)
                    pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
                        if (err) reject(formError("update data failed", 500))
                        resolve(formSuccess(`update category id ${id} success`, 200, response.rows[0]))
                    })
                }
                pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
                    if (err) reject(formError("update data failed", 500))
                    resolve(formSuccess(`update category id ${id} success`, 200, response.rows[0]))
                })
            })
        })
    },
};
module.exports = categoryModel;
