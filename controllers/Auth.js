const authModel = require("../models/Auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Request not be empty",
        statusCode: 400,
      });
      return;
    }
    try {
      const result = await authModel.login(req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  register: async (req, res) => {
    try {
      const result = await authModel.register(req);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

};

module.exports = authController;
