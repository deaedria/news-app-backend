const queryAuth = {
  register: ({ email, password, phone_number }) => {
    return `INSERT INTO users(email, password, 
                              phone_number, role, 
                              created_at) 
            VALUES('${email}', '${password}', '${phone_number}', 'member', 'now()')`
  },

  login: (email) => {
    return `SELECT id, 
                   email, 
                   password, 
                   role 
            FROM users 
            WHERE email = '${email}' LIMIT 1`
  },

};

module.exports = queryAuth;
