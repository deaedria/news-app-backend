const pg = require('../helpers/connect_db');
const isDataEmpty = require('../helpers/checkDataEmpty');
const hash = require('../helpers/hashPassword');
const unlinkPhoto = require('../helpers/unlinkPhoto');
const { formError, formSuccess } = require('../helpers/formResponse');
const getNewBody = require('../helpers/user/newBodyForPatchUser')
const { getAll, getById, deleteById, getByEmail, createUser, updateUser } = require('../helpers/user/queryUser');

const userModel = {
    getUsers: (req) => {
        return new Promise((resolve, reject) => {
            const { query: { limit = 4, page = 1 } } = req
            pg.query(getAll(limit, page), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Data Not Found", 404))
                if (err) reject(formError("Get all Users failed", 500))
                resolve(formSuccess("Get all Users success", 200, result?.rows))
            });
        });
    },

    createUser: (req) => {
        return new Promise((resolve, reject) => {
            const { body: { email, password, phone_number, about, name, username, job, is_author, role } } = req;
            const photos = req.file?.filename
            pg.query(getByEmail(email), (error, result) => {
                if (error) reject(formError("Add user failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (!isEmpty) reject(formError("User exist", 400))
                hash(password).then((hashValue) => {
                    pg.query(createUser(email, hashValue, phone_number, photos, about, name, username, job, is_author, role), (err) => {
                        if (err) reject(formError("Add user Failed", 500))
                        resolve(formSuccess("Add user success", 201))
                    })
                })
            });
        });
    },

    getUserById: (req) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (err, result) => {
                if (err) reject(formError("Get user failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("User not found", 404))
                resolve(formSuccess("Get user success", 200, result.rows[0]));
            });
        });
    },

    deleteUserById: (req) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (error, res) => {
                if (error) reject(formError('Delete user failed', 500))
                const { isEmpty } = isDataEmpty(res)
                if (isEmpty) reject(formError("User not found", 404))
                pg.query(deleteById(id), (err, result) => {
                    if (err) reject(formError('Delete user failed', 500))
                    resolve(formSuccess('Delete user success', 200, result.rows[0]));
                });
            });
        })
    },

    patchUserById: (req) => {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (error, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("user id not found", 404))
                if (error) reject(formResponse("update data failed", 500));
                const { email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id } = getNewBody(req, result)
                if (photo_profile != result.rows[0]?.photo_profile) {
                    unlinkPhoto(result.rows[0].photo_profile)
                    pg.query(updateUser({ email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id }), (err, response) => {
                        if (err) reject(formError("update data failed", 500));
                        resolve(formSuccess(`update user success`, 200, response.rows[0]));
                    })
                }
                pg.query(updateUser({ email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id }), (err, response) => {
                    if (err) reject(formError("update data failed", 500));
                    resolve(formSuccess(`update user success`, 200, response.rows[0]));
                })
            })
        })
    },
};
module.exports = userModel;