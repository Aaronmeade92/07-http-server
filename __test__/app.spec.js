'use strict';

const superagent = require('superagent');
const app = require('../src/app.js');


describe('Server Module', () => {

    beforeAll(() => {
        app.start(3000);
    });

    afterAll(() => {
        app.stop();
    });

    it('if the path does not exist send 404', () => {

        return superagent.get('http://localhost:3000/bad')
            .catch(response => {
                expect(response.status).toEqual(404);
            });
    });

    it('Should return html with a project description and anchor to /cowsay', () => {


        return superagent.get('http://localhost:3000/cowsay')
            .catch(response => {
                expect(response.status).toEqual(200);
            });
    });

    it('handles a get request with a query string', () => {

        return superagent.get('http://localhost:3000/cowsays')
            .then(response => {
                expect(response.statusCode).toEqual(200);
                expect(response.text).toEqual(expect.stringContaining('say anything'));
            })
            .catch(console.err);

    });
});