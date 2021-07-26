const route = require('express').Router()
const { uploadPhotoProfile } = require('../helpers/formUpload')
const { createUser, patchUserById, getUserById, getUsers, deleteUserById } = require('../controllers/User')

route.post('/', uploadPhotoProfile, createUser)
route.patch('/:id', uploadPhotoProfile, patchUserById) 
route.get('/:id', getUserById)
route.get('/', getUsers)
route.delete('/:id', deleteUserById)

module.exports = route