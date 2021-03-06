const { login, register } = require("../models/Auth");

const authController = {
    login: async (req, res) => {
        try {
            const result = await login(req.body);
            res.status(result.statusCode).send(result);
        } catch (err) {
            res.status(err.statusCode).send(err);
        }
    },

    register: async (req, res) => {
        try {
            const result = await register(req.body);
            res.status(result.statusCode).send(result);
        } catch (err) {
            res.status(err.statusCode).send(err);
        }
    },

};

module.exports = authController;
