const queryAuth = {
  register: (request) => {
    const { email, password, phone_number } = request;
    const query = `INSERT into users(email, password, phone_number, role, created_at) VALUES('${email}', '${password}', '${phone_number}', 'member', 'now()')`;

    return query;
  },

  login: (request) => {
    const { email } = request;
    const getUser = `SELECT id, email, password, role from users where email = '${email}'`;

    return getUser;
  },
};

module.exports = queryAuth;
