const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index')
const expect = chai.expect

chai.use(chaiHttp)

describe('User', () => {
    describe('GET ', () => {
        it('should GET all users', (done) => {
            chai.request(app)
                .get('/news/api/users')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get all Users success')
                    expect(res.body.data).to.be.an('array')
                    expect(res.body.data[0]).to.have.property('id').that.is.a('number')
                    done()
                })
        })
        it('should GET a user by ID', (done) => {
            const id = 3
            chai.request(app)
                .get(`/news/api/users/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get user success')
                    expect(res.body.data).to.be.an('object')
                    expect(res.body.data).to.have.property('id').that.is.a('number')
                    done()
                })
        })
        it('should NOT GET a user by ID that is not in the database', (done) => {
            const id = 10
            chai.request(app)
                .get(`/news/api/users/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404)
                    expect(res.body.message).to.deep.equal('User not found')
                    done()
                })
        })
    })

    describe('POST ', () => {
        it('should POST a valid user, return 200 when success and 400 when user exist', (done) => {
            let request = {
                email: 'mina@gmail.com',
                password: 'mina',
                phone_number: '085552222123',
                about: 'An ordinary person',
                name: 'Mina Riana',
                username: 'mmina',
                job: 'reporter',
                total_post: 0,
                total_visitor: 0,
                total_comment: 0,
                is_author: false,
                role: 'member',
            }
            chai.request(app)
                .post(`/news/api/users`)
                .send(request)
                .end((err, res) => {
                    if (!res.body.data && res.status != 201) {
                        expect(res.statusCode).to.be.equal(400)
                        expect(res.body.message).to.deep.equal('User exist')
                        done()
                    } else {
                        expect(res.statusCode).to.be.equal(201)
                        expect(res.body.message).to.deep.equal('Add user success')
                        done()
                    }
                })
        })
    })

    describe("PATCH ", () => {
        it("should PATCH a user", (done) => {
            const userId = 30;
            let request = {
                email: 'sasa9@gmail.com',
                password: '12345',
                job: 'editor'
            }
            chai.request(app)
                .patch(`/news/api/users/${userId}`)
                .send(request)
                .end((err, response) => {
                    expect(response.statusCode).to.be.equal(200)
                    expect(response.body.message).to.deep.equal(`update user success`)
                    expect(response.body.data).to.have.property('id').that.is.a('number')
                    expect(response.body.data).to.have.property('email').that.is.a('string')
                    expect(response.body.data).to.have.property('password').that.is.a('string').that.does.not.include('12345')
                    expect(response.body.data).to.have.property('job').that.is.a('string')
                    done();
                });
        });
    });

    describe('DELETE ', () => {
        it("should DELETE an existing user", (done) => {
            const user_id = 31
            chai.request(app)
                .delete(`/news/api/users/${user_id}`)
                .end((err, response) => {
                    if (!response.body.data && response.status != 200) {
                        expect(response.statusCode).to.be.equal(404)
                        expect(response.body.message).to.deep.equal('User not found')
                        done()
                    } else {
                        expect(response.statusCode).to.be.equal(200)
                        expect(response.body.message).to.deep.equal('Delete user success')
                        done()
                    }
                });
        });

        it("should NOT DELETE a user that is not in the database", (done) => {
            const userId = 100;
            chai.request(app)
                .delete(`/news/api/users/${userId}`)
                .end((err, response) => {
                    expect(response.statusCode).to.be.equal(404)
                    expect(response.body.message).to.deep.equal('User not found')
                    done();
                });
        });

    });
})