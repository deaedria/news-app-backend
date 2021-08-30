const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index')
const expect = chai.expect

chai.use(chaiHttp)

describe('Article', () => {
    describe('GET ', () => {
        it('should GET all article', (done) => {
            chai.request(app)
                .get('/news/api/article')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get all Articles success')
                    expect(res.body.data).to.be.an('array')
                    expect(res.body.data[0]).to.have.property('id').that.is.a('number')
                    done()
                })
        })
        it('should GET article list that match the keywords', (done) => {
            const name = 'the'
            chai.request(app)
                .get(`/news/api/article/search?title=${name}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Succses search articles by title')
                    expect(res.body.data).to.be.an('array')
                    done()
                })
        })
        it('should GET a last article', (done) => {
            chai.request(app)
                .get(`/news/api/article/last`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body.message).to.deep.equal('Get article sort by last added success')
                    expect(res.body.data).to.be.an('array').with.lengthOf(1)
                    expect(res.body.data[0]).to.have.property('id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('category_id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('author_id').that.is.a('number')
                    expect(res.body.data[0]).to.have.property('article_cover').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('article_title').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('article_content').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('status').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('publish_date').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('created_at').that.is.a('string')
                    expect(res.body.data[0]).to.have.property('updated_at').that.is.a('string')
                    done()
                })
        })
    })
})