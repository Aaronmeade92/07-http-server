'use strict'
const superagent = require('superagent');
const app = require('./src/app.js')


describe('Server Module', () => {

    beforeAll( () => {
        app.start(3000);
    });

    afterAll(() => {
        app.stop();
    });

    it('if the path does not exist send 404', () => {

        return superagent.get('http://localhost:3000/bad')
        .catch(response => {
            expect(response.status).toEqual(404)
        });
    });
    
    xit('Should return html with a project description and anchor to /cowsay', () => {

        let expected = 'GET'
        let 
    })
})