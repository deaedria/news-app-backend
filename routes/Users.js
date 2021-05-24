const route = require('express').Router()
const userController = require('../controllers/User')
const formUpload = require('../helpers/formUpload')
// const verifyToken = require('../helpers/verifyToken')

route.post('/', formUpload.uploadPhotoProfile, userController.addNewUser)
route.patch('/:id', formUpload.uploadPhotoProfile, userController.updateUser) 
route.get('/:id', userController.getUserById)
route.get('/', userController.getAllUser)
route.delete('/:id', userController.deleteUserById)


module.exports=route