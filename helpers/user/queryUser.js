const queryUser = {
    getAll: (limit, page) => {
        return `SELECT * 
                FROM 
                users
                LIMIT ${limit} 
                OFFSET ${(page - 1) * limit}`
    },

    getById: (id) => {
        return `SELECT * 
                FROM users 
                WHERE id = ${id}`
    },

    deleteById: (id) => {
        return `DELETE 
                FROM users 
                WHERE id = ${id} 
                RETURNING *`
    },

    getByEmail: (email) => {
        return `SELECT * 
                FROM users 
                WHERE email='${email}'`
    },

    createUser: (email, hash, phone_number, photos, about, name, username, job, is_author, role) => {
        return `INSERT INTO users (email, password,
                                   phone_number,
                                   photo_profile,
                                   about, name,
                                   username, job,
                                   is_author, role,
                                   created_at)
                VALUES('${email}','${hash}','${phone_number}','/upload/photo_profile/${photos}','${about}','${name}','${username}','${job}', ${is_author},'${role}','now()')
                RETURNING *`
    },

    updateUser: ({email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id}) => {
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
    }
}

module.exports = queryUser