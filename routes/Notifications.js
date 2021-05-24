const route = require('express').Router()
const notifController = require('../controllers/Notification')

route.get('/:id', notifController.getNotifById)
route.get('/list/:id', notifController.getNotifListByUserId)
route.get('/', notifController.getAllNotif)
route.delete('/remove', notifController.deleteNotifById)


module.exports=route