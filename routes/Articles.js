const route = require('express').Router()
const articleController = require('../controllers/Article')
const formUpload = require('../helpers/formUpload')
// const verifyToken = require('../helpers/verifyToken')

route.post('/', formUpload.uploadArticleCover, articleController.addNewArticle)
route.patch('/:id', formUpload.uploadArticleCover, articleController.updateArticle) 
route.get('/search', articleController.searchArticleByTitle)
route.get('/latest', articleController.getLatestArticle)
route.get('/asc', articleController.getArticleSortByNameAsc)
route.get('/desc', articleController.getArticleSortByNameDesc)
route.get('/last', articleController.getArticleSortByLastAdd)
route.get('/modified', articleController.getArticleSortBylastModif)
route.get('/:id', articleController.getArticleById)
route.get('/', articleController.getAllArticle)
route.delete('/:id', articleController.deleteArticleById)


module.exports=route