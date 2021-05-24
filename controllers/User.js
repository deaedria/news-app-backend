const userModel = require("../models/User")

const userController = {
    getAllUser: async(req, res) => {
        try {
            const result = await userModel.getAllUser(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    addNewUser: async(req, res) => {
        try {
            const result = await userModel.addNewUser(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getUserById: async(req, res) => {
        try {
            const result = await userModel.getUserById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    deleteUserById: async(req, res) => {
        try {
            const result = await userModel.deleteUserById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    updateUser: async(req, res) => {
        try {
            const result = await userModel.updateUser(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}

module.exports = userController