const route = require('express').Router()
const { login, register } = require("../controllers/Auth");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
