const route = require('express').Router()
const categoryController = require('../controllers/Category')
const formUpload = require('../helpers/formUpload')
// const verifyToken = require('../helpers/verifyToken')

route.post('/', formUpload.uploadCategoryCover, categoryController.addNewCategory)
route.patch('/:id', formUpload.uploadCategoryCover, categoryController.updateCategory) 
route.get('/:id', categoryController.getCategoryById)
route.get('/list/:id', categoryController.getArtByCategoryId)
route.get('/recommend/:id', categoryController.getArtRecommendByCategoryId)
route.get('/', categoryController.getAllCategory)
route.delete('/:id', categoryController.deleteCategoryById)


module.exports=route