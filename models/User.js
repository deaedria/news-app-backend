const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/formResponse');
const queryUser = require('../helpers/queryUser');
const bcrypt = require("bcrypt");
const fs = require('fs');

const userModel = {
    getAllUser: (req) => {
        return new Promise((resolve, reject) => {
            const query = queryUser.getAll(req.query)
            pg.query(query,
                (err, result) => {
                    if (result.rows.length < 0) {
                        reject(fromResponse("User not found", 400))
                    }
                    if (!err) {
                        resolve(fromResponse("Get all Users success", 200, result?.rows));
                    } else {
                        reject(fromResponse("Get all Users failed", 500));
                    }
                }
            );
        });
    },

    addNewUser: (request) => {
        return new Promise((resolve, reject) => {
            const { email, password, phone_number, about, name, username, job, total_post, total_visitor, total_comment, is_author, role } = request.body;
            const photos = request.file?.filename;
            pg.query(`SELECT * FROM users WHERE email='${email}'`,
                (error, result) => {
                    if (!error) {
                        if (result.rows.length < 1) {
                            bcrypt.genSalt(10, function (saltError, salt) {
                                if (!saltError) {
                                    bcrypt.hash(password, salt, function (hashingError, hash) {
                                        if (!hashingError) {
                                            pg.query(`INSERT INTO users(email,password,phone_number,photo_profile,about,name,username,job,total_post,total_visitor,total_comment,is_author,role,created_at)
                                    VALUES('${email}', '${hash}','${phone_number}','/upload/photo_profile/${photos}','${about}','${name}', '${username}','${job}', ${total_post}, ${total_visitor}, ${total_comment}, ${is_author},'${role}','now()') RETURNING *`, (err) => {
                                                if (!err) {
                                                    resolve(fromResponse("Add user success", 200, result.rows[0]));
                                                } else {
                                                    reject(fromResponse("Add user Failed", 500));
                                                }
                                            }
                                            );
                                        } else {
                                            reject(fromResponse("Add user Failed", 500));
                                        }
                                    });
                                } else {
                                    reject(fromResponse("Add user Failed", 500));
                                }
                            });
                        } else {
                            reject(fromResponse("User exist", 400));
                        }
                    } else {
                        reject(fromResponse("Add user failed", 500));
                    }
                }
            );
        });
    },

    getUserById: (request) => {
        return new Promise((resolve, reject) => {
            const getUserbyid = queryUser.getUserById(request);
            pg.query(getUserbyid, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("User not found", 400));
                    } else {
                        resolve(fromResponse("Get user success", 200, result.rows[0]));
                    }
                } else {
                    reject(fromResponse("Get user failed", 500));
                }
            });
        });
    },

    deleteUserById: (request) => {
        return new Promise((resolve, reject) => {
            const deleteUserbyid = queryUser.deleteUserById(request)
            const getUserbyid = queryUser.getUserById(request);
            pg.query(getUserbyid, (error, res) => {
                if (!error) {
                    if (res.rows.length < 1) {
                        reject(fromResponse("User not found", 400));
                    } else {
                        pg.query(deleteUserbyid, (err, result) => {
                            if (!err) {
                                resolve(fromResponse('Delete user success', 200, result.rows[0]));
                            } else {
                                reject(fromResponse('Delete user failed', 500));
                            }
                        });
                    }
                } else {
                    reject(fromResponse('Delete user failed', 500));
                }
            });
        })
    },

    updateUser: (req, res) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (error, result) => {
                if (result.rows == '' || result.rows.length < 1) {
                    reject(fromResponse("user id not found", 400));
                }
                if (!error) {
                    const file = req.file?.filename ? `/upload/photo_profile/${req.file.filename}` : result.rows[0].photo_profile
                    const {
                        email = result.rows[0]?.email,
                        password = result.rows[0]?.password,
                        phone_number = result.rows[0]?.phone_number,
                        about = result.rows[0]?.about,
                        name = result.rows[0]?.name,
                        username = result.rows[0]?.username,
                        job = result.rows[0]?.job,
                        total_post = result.rows[0]?.total_post,
                        total_visitor = result.rows[0]?.total_visitor,
                        total_comment = result.rows[0]?.total_comment,
                        is_author = result.rows[0]?.is_author,
                        role = result.rows[0]?.role
                    } = req.body
                    const { id } = req.params;
                    bcrypt.genSalt(10, function (saltError, salt) {
                        bcrypt.hash(password, salt, function (hashingError, hash) {
                            if (!hashingError) {
                                let newBody = { ...req.body, password: req.body.password ? hash : result.rows[0]?.password, photo_profile: file}
                                if (newBody.photo_profile != result.rows[0].photo_profile) {
                                    fs.unlink(`./public${result.rows[0].photo_profile}`, (err1) => {
                                        if (!err1) {
                                            console.log('successfully deleted local image')
                                        } else {
                                            console.log(`failed to deleted local image ${err1}`)
                                        }
                                    });
                                    pg.query("UPDATE users SET email=$1, password=$2, phone_number=$3, photo_profile=$4, about=$5, name=$6, job=$7, total_post=$8, total_visitor=$9, total_comment=$10, is_author=$11, role=$12, updated_at=$13, username=$14 WHERE id=$15 RETURNING *", [email, newBody.password, phone_number, newBody.photo_profile, about, name, job, total_post, total_visitor, total_comment, is_author, role, 'NOW()', username, id], (err, response) => {
                                        if (!err) {
                                            resolve(fromResponse(`update user id ${id} success`, 200, response.rows[0]));
                                        } else {
                                            reject(fromResponse("update data failed", 500));
                                        }
                                    })
                                } else {
                                    pg.query("UPDATE users SET email=$1, password=$2, phone_number=$3, photo_profile=$4, about=$5, name=$6, job=$7, total_post=$8, total_visitor=$9, total_comment=$10, is_author=$11, role=$12, updated_at=$13, username=$14 WHERE id=$15 RETURNING *", [email, newBody.password, phone_number, newBody.photo_profile, about, name, job, total_post, total_visitor, total_comment, is_author, role, 'NOW()', username, id], (err, response) => {
                                        if (!err) {
                                            resolve(fromResponse(`update user id ${id} success`, 200, response.rows[0]));
                                        } else {
                                            reject(fromResponse("update data failed", 500));
                                        }
                                    })
                                }
                            } else {
                                reject(fromResponse("hashing failed", 500));
                            }
                        });
                    });
                } else {
                    reject(fromResponse("update data failed", 500));
                }
            })
        })
    },
};
module.exports = userModel;
