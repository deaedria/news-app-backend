class Role {
    constructor({ type, is_author }) {
        this._type = type
        this._isAuthor = is_author
    }
}

class UserBuilder {
    constructor() {
        this.user = {}
    }

    setEmail(email) {
        this.user._email = email
        return this
    }

    setName(name) {
        this.user._name = name
        return this
    }

    setPhone(phone_number) {
        this.user._phoneNumber = phone_number
        return this
    }

    setAbout(about) {
        this.user._about = about
        return this
    }

    setUsername(username) {
        this.user._username = username
        return this
    }

    setJob(job) {
        this.user._job = job
        return this
    }

    setPhoto(photos) {
        if (photos) this.user._photoProfile = `'/upload/photo_profile/${photos}'`
        if (photos == undefined) this.user._photoProfile = undefined
        return this
    }

    setRole(role) {
        if (role == 'member') this.role = new Role({ type: role, is_author: false })
        if (role == 'author') this.role = new Role({ type: role, is_author: true })
        if (role == 'admin') this.role = new Role({ type: role, is_author: true })
        return this
    }

    build() {
        return this.user
    }
}

module.exports = UserBuilder