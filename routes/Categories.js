const route = require('express').Router()
const { createCategory, patchCategoryById, getCategoryById, getArticlesByCategoryId, 
    getRecommendedArticlesByCategoryId, getCategories, deleteCategoryById
} = require('../controllers/Category')
const { uploadCategoryCover } = require('../helpers/formUpload')

route.post('/', uploadCategoryCover, createCategory)
route.patch('/:id', uploadCategoryCover, patchCategoryById) 
route.get('/:id', getCategoryById)
route.get('/list/:id', getArticlesByCategoryId)
route.get('/recommend/:id', getRecommendedArticlesByCategoryId)
route.get('/', getCategories)
route.delete('/:id', deleteCategoryById)


module.exports=route