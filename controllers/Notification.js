const notifModel = require("../models/Notification")

const notifController = {
    getAllNotif: async(req, res) => {
        try {
            const result = await notifModel.getAllNotif(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getNotifById: async(req, res) => {
        try {
            const result = await notifModel.getNotifById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getNotifListByUserId: async(req, res) => {
        try {
            const result = await notifModel.getNotifListByUserId(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    deleteNotifById: async(req, res) => {
        try {
            const result = await notifModel.deleteNotifById(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },
}

module.exports = notifController