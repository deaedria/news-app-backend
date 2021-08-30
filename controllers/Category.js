const { getCategories, 
    createCategory, 
    getCategoryById, 
    getArticlesByCategoryId, 
    getRecommendedArticlesByCategoryId,
    deleteCategoryById
} = require("../models/Category")

const categoryController = {
    getCategories: async(req, res) => {
        try {
            const result = await getCategories(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    createCategory: async(req, res) => {
        try {
            const result = await createCategory(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getCategoryById: async(req, res) => {
        try {
            const result = await getCategoryById(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getArticlesByCategoryId: async(req, res) => {
        try {
            const result = await getArticlesByCategoryId(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getRecommendedArticlesByCategoryId: async(req, res) => {
        try {
            const result = await getRecommendedArticlesByCategoryId(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    deleteCategoryById: async(req, res) => {
        try {
            const result = await deleteCategoryById(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    patchCategoryById: async(req, res) => {
        try {
            const result = await categoryModel.patchCategoryById(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}

module.exports = categoryController