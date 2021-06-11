const route = require('express').Router()
const commentController = require('../controllers/Comment')

route.post('/', commentController.addNewComment) 
// route.patch('/:id', commentController.updateComment) 
route.get('/:id', commentController.getCommentById)
route.get('/userlist/:id', commentController.getCommentListByUserId)
route.get('/list/:article_id', commentController.getCommentListByArticleId)
route.get('/', commentController.getAllComment)
route.delete('/:id', commentController.deleteCommentById)


module.exports=route