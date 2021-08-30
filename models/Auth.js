const bcrypt = require("bcrypt");
const pg = require("../helpers/connect_db");
const jwt = require("jsonwebtoken");
const { login, register } = require("../helpers/auth/queryAuth");
const { formError, formSuccess } = require("../helpers/formResponse");
const isDataEmpty = require("../helpers/checkDataEmpty");
const hash = require("../helpers/hashPassword");

const authModel = {
    login: (req) => {
        return new Promise((resolve, reject) => {
            const { email, password } = req;
            if (!email || !password) reject(formError("Request not be empty"), 400)
            pg.query(login(email), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Wrong email/password", 400))
                bcrypt.compare(password, result.rows[0]?.password, (errComp, resComp) => {
                    if (errComp) reject(formError("Login failed", 500))
                    if (!resComp) reject(formError("Wrong email/password", 400))
                    const payload = {
                        id: result.rows[0]?.id,
                        role: result.rows[0]?.role,
                    }
                    jwt.sign(payload, process.env.SECRET_KEY, (errToken, resToken) => {
                        if (errToken) reject(formError("Login error", 500))
                        resolve(formSuccess("Login success", 200, { id: result.rows[0].id, role: result.rows[0].role, token: resToken }))
                    })
                });
            });
        });
    },

    register: (req) => {
        return new Promise((resolve, reject) => {
            const { email, password, phone_number } = req;
            pg.query(login(email), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                // // if (!isEmpty) reject(formError("User exist", 400))
                hash(password).then((hashValue) => {
                    const newUser = {
                        email: email,
                        password: hashValue,
                        phone_number: phone_number
                    }
                    pg.query(register(newUser), (err) => {
                        if (err) reject(formError("Register failed", 500))
                        resolve(formSuccess("Register success", 201));
                    })
                });
            });
        });
    },

};

module.exports = authModel;
