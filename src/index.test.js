const request = require('supertest')
import api from '../src/index'

describe('GET /alive', function() {
    it('responds with json', function(done) {
        request(
            api({
                prefix: '/',        
                port: 123,
                host: '0.0.0.0',
                alive: '/alive',
            },(router) => {
                return router
            })              
        ).get('/alive')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })