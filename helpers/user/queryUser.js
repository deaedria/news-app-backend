const queryUser = {
    getAll: (limit, page) => {
        return `SELECT id, email, password, 
                       phone_number, photo_profile, 
                       about, name, job, is_author, 
                       role, username 
                FROM 
                users
                LIMIT ${limit} 
                OFFSET ${(page - 1) * limit}`
    },

    getById: (id) => {
        return `SELECT id, email, password, 
                       phone_number, photo_profile, 
                       about, name, job, is_author, 
                       role, username  
                FROM users 
                WHERE id = ${id} LIMIT 1`
    },

    deleteById: (id) => {
        return `DELETE 
                FROM users 
                WHERE id = ${id} 
                RETURNING *`
    },

    getByEmail: (email) => {
        return `SELECT id 
                FROM users 
                WHERE email='${email}' LIMIT 1`
    },

    createUser: (_email, hashValue, _phoneNumber, _photoProfile, _about, _name, _username, _job, _isAuthor, _type) => {
        return `INSERT INTO users (email, password,
                                   phone_number,
                                   photo_profile,
                                   about, name,
                                   username, job,
                                   is_author, role,
                                   created_at)
                VALUES('${_email}','${hashValue}','${_phoneNumber}','${_photoProfile}','${_about}','${_name}','${_username}','${_job}', ${_isAuthor},'${_type}','now()')
                RETURNING *`
    },

    updateUser: ({ email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id }) => {
        return `UPDATE users SET email = '${email}', 
                                 password = '${password}', 
                                 phone_number = '${phone_number}', 
                                 photo_profile = '${photo_profile}', 
                                 about = '${about}', 
                                 name = '${name}', 
                                 job = '${job}', 
                                 is_author = ${is_author}, 
                                 role = '${role}', 
                                 updated_at = 'NOW()', 
                                 username = '${username}' 
                WHERE id = ${id}
                RETURNING *`
    },

    updateUserWithNewPassword: ({ email, phone_number, about, name, username, job, is_author, role, hashValue, photo_profile, id }) => {
        return `UPDATE users SET email = '${email}', 
                                 password = '${hashValue}', 
                                 phone_number = '${phone_number}', 
                                 photo_profile = '${photo_profile}', 
                                 about = '${about}', 
                                 name = '${name}', 
                                 job = '${job}', 
                                 is_author = ${is_author}, 
                                 role = '${role}', 
                                 updated_at = 'NOW()', 
                                 username = '${username}' 
                WHERE id = ${id}
                RETURNING *`
    }
}

module.exports = queryUser