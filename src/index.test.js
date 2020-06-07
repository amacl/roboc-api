const request = require('supertest');
import api from '../src/index';

describe('GET /alive', function() {
    it('responds with json by string alive', function(done) {
        request(
            api({
                prefix: '/',        
                port: 123,
                host: '0.0.0.0',
                alive: '/alive',
            },(router, app) => {
                return router;
            })              
        ).get('/alive')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)        
        .expect(200,{
            "OK": true,
            "status": 200,
            "message": "alive"
        },done);
    });

    it('responds with json by array alive', function(done) {
        request(
            api({
                prefix: '/',        
                port: 124,
                host: '0.0.0.0',
                alive: ['/alive', (req, res, next) => {
                    res.status(200).json({
                        OK:true,
                        status:200,
                        message:"alive-array",
                    }); 
                }],
            },(router, app) => {
                return router;
            })              
        ).get('/alive')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,{
            "OK": true,
            "status": 200,
            "message": "alive-array"
        },done);  
    })        
});