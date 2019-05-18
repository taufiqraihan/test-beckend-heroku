const chai = require('chai');
var expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app')

chai.use(chaiHttp)

var token = ''
describe('Users', () => {
  it('Should be Login and Get Token', (done) => {
    chai.request(app)
    .post('/users/login')
    .send({Username : 'Taufiq', password:'rahasia'})
    .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Success Login')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('token')
        token = res.body.data.token
        done()
    })
  })
  it('Should give error when username or password wrong', (done) => {
    chai.request(app)
    .post('/users/login')
    .send({Username : 'Taufiq', password:'rahasialah'})
    .end((err, res) => {
        expect(res).to.have.status(403)
        expect(res).to.be.json
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('invalid login')
        done()
    })
  })
})

describe('Crud Siswa', () => {
  it('Should get Data Siswa', (done) => {
    chai.request(app)
    .get('/siswas')
    .set('token', token)
    .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Read Data Siswa')
        expect(res.body).to.have.property('data')
        expect(typeof res.body.data).to.equal('object')
        done()
    })
  })
})


var siswaId = 1;

describe('Create Siswa', () => {
    it('Should be Create Data Siswa', (done) => {
        chai.request(app)
        .post('/siswas')
        .set('token', token)
        .send({nama: 'skut', alamat: 'dklj', kelas: 23})
        .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Create Siswa')
                expect(res.body).to.have.property('data')
                siswaId = res.body.data.id
                console.log('siswaId : ' + siswaId);
                done()
            })
          })
        })

describe('Update Siswa', () => {
    it('Should Update Data Siswa', (done) => {
        chai.request(app)
            .put(`/siswas/${siswaId}`)
            .set('token', token)
            .send({nama: 'Samsudin', alamat: 'Medan', kelas: 50})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('update Siswa')
                expect(res.body).to.have.property('data')
                done()
            })
          })
        })
// console.log('siswaId : ' +  siswaId);

describe('Delete Siswa', () => {
    it('Should Delete Data Siswa', () => {
        chai.request(app)
            .del(`/siswas/${siswaId}`)
            .set('token', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Delete Siswa with Id'+siswaId)
            })
          })
        })
