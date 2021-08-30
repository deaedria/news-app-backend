const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index')
const expect = chai.expect

chai.use(chaiHttp)

describe('Category', () => {
    describe('GET ', () => {
        it('should GET all category', (done) => {
            chai.request(app)
                .get('/news/api/category')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get all Categories success')
                    expect(res.body.data).to.be.an('array')
                    expect(res.body.data[0]).to.have.property('id').that.is.a('number')
                    done()
                })
        })
        it('should GET an article recommendation by category ID', (done) => {
            const id = 1
            chai.request(app)
                .get(`/news/api/category/recommend/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get article recommended by category success')
                    expect(res.body.data).to.be.an('array')
                    expect(res.body.data).to.have.lengthOf(1);
                    expect(res.body.data[0]).to.have.property('id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('category_id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('category_name').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('author_id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('name').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('article_cover').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('article_title').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('article_content').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('publish_date').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('created_at').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('updated_at').that.is.a('string')
                    done()
                })
        })
        it('should NOT GET an article recommendation that is not in the database', (done) => {
            const id = 20
            chai.request(app)
                .get(`/news/api/category/recommend/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404)
                    expect(res.body.message).to.deep.equal('Recommended article not found')
                    done()
                })
        })
        it('should GET a category by ID', (done) => {
            const id = 1
            chai.request(app)
                .get(`/news/api/category/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get category success')
                    expect(res.body.data).to.be.a('object')
                    expect(res.body.data).to.have.property('id').that.is.a('number')
                    expect(res.body.data).to.have.property('category_name').that.is.a('string')
                    expect(res.body.data).to.have.property('category_cover').that.is.a('string')
                    expect(res.body.data).to.have.property('created_at').that.is.a('string')
                    expect(res.body.data).to.have.property('updated_at').that.is.a('string')
                    done()
                })
        })
        it('should NOT GET a user by ID that is not in the database', (done) => {
            const id = 10
            chai.request(app)
                .get(`/news/api/category/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404)
                    expect(res.body.message).to.deep.equal('Category not found')
                    done()
                })
        })
        it('should GET article list by category ID', (done) => {
            const id = 4
            chai.request(app)
                .get(`/news/api/category/list/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get article list by category success')
                    expect(res.body.data).to.be.a('object')
                    expect(res.body.data).to.have.property('category').that.is.a('object')
                    expect(res.body.data.category).to.have.property('name').that.is.a('string')
                    expect(res.body.data).to.have.property('article').that.is.an('array').with.lengthOf(6)
                    expect(res.body.data.article[0]).to.have.property('id').that.is.a('number')
                    expect(res.body.data.article[0]).to.have.property('category_id').that.is.a('number')
                    expect(res.body.data.article[0]).to.have.property('category_name').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('author_id').that.is.a('number')
                    expect(res.body.data.article[0]).to.have.property('name').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('article_cover').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('article_title').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('article_content').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('publish_date').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('created_at').that.is.a('string')
                    expect(res.body.data.article[0]).to.have.property('updated_at').that.is.a('string')
                    done()
                })
        })
        it('should NOT GET article list by category ID that is not in the database', (done) => {
            const id = 10
            chai.request(app)
                .get(`/news/api/category/list/${id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404)
                    expect(res.body.message).to.deep.equal('Article list not found')
                    done()
                })
        })
    })
})