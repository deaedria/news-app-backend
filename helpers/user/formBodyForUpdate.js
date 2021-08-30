const formBody = (req, result) => {
    const {
        email = result.rows[0]?.email,
        phone_number = result.rows[0]?.phone_number,
        about = result.rows[0]?.about,
        name = result.rows[0]?.name,
        username = result.rows[0]?.username,
        job = result.rows[0]?.job,
        is_author = result.rows[0]?.is_author,
        role = result.rows[0]?.role,
        password = result.rows[0]?.password
    } = req.body

    return {
        email: email,
        phone_number: phone_number,
        about: about,
        name: name,
        username: username,
        job: job,
        is_author: is_author,
        role: role,
        password: password
    }
}

module.exports = formBody;