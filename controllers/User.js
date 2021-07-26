const { getUsers, createUser, getUserById, deleteUserById, patchUserById } = require("../models/User")

const userController = {
    getUsers: async(req, res) => {
        try {
            const result = await getUsers(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    },

    createUser: async(req, res) => {
        try {
            const result = await createUser(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    },

    getUserById: async(req, res) => {
        try {
            const result = await getUserById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    },

    deleteUserById: async(req, res) => {
        try {
            const result = await deleteUserById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    },

    patchUserById: async(req, res) => {
        try {
            const result = await patchUserById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }
}

module.exports = userController