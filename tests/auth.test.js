const chai = require('chai');
const authModel = require('../models/Auth');
const userModel = require('../models/User');
const expect = chai.expect

describe('Register', () => {
    it('should return 201 when success and 400 when error', async () => {
        let req = {
            email: 'lia@gmail.com',
            phone_number: '083334444999'
        }
        try {
            const result = await authModel.register(req)
            expect(result.statusCode).to.be.equal(201)
            expect(result.message).to.deep.equals('Register success')
        } catch (err) {
            expect(err.statusCode).to.be.equal(400)
            expect(err.message).to.deep.equals('User exist')
        }
    })
})

describe('Login', () => {
    it('should return valid response, get token when success, and 400 when error', async () => {
        const request = {
            email: 'joe@gmail.com',
            password: '12345'
        }
        try {
            const result = await authModel.login(request)
            expect(result.statusCode).to.be.equal(200)
            expect(result.data).to.have.property('id')
            expect(result.data).to.have.property('role')
            expect(result.data).to.have.property('token')
            expect(result.message).to.deep.equals('Login success')
            var id = result.data.id
            
            describe('Get user', async() => {
                it('should get the user from whom is logged in', async() => {
                    try{
                        const result = await userModel.getUserById(id)
                        expect(result.statusCode).to.be.equal(200)
                        expect(result.message).to.deep.equals('Get user success')
                    }catch(err){
                        expect(err.statusCode).to.be.equal(500)
                        expect(err.message).to.deep.equals('Get user failed')
                    }

                })
            })
        } catch (err) {
            expect(err.statusCode).to.be.equal(400)
            expect(err.message).to.be.equal('Wrong email/password')
        }
    })
})