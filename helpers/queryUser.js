const queryUser = {
    getAll: (req) => {
        const query = `SELECT * FROM users`;
        return query
    },

    getUserById: (request) => {
        const id = request
        const getUserbyid = `SELECT * FROM users WHERE id=${parseInt(id)}`
        return getUserbyid
    },

    deleteUserById: (request) => {
        const id = request
        const deleteUserById = `DELETE FROM users WHERE id=${parseInt(id)} RETURNING *`
        return deleteUserById
    }
}

module.exports = queryUser