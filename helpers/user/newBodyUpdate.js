const reqBody = require('./formBodyForUpdate')
const { filePhoto } = require('./formFileForUpdate')

const getNewBody = () => {
    let newBody = { ...reqBody, photo_profile: filePhoto }
    const {
        email,
        phone_number,
        about,
        name,
        username,
        job,
        is_author,
        role,
        password,
        photo_profile
    } = newBody

    return { email, phone_number, about, name, username, job, is_author, role, password, photo_profile }
}

module.exports = getNewBody;