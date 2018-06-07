'use strict'

const http = require('http');
const parser = require('../parser');
const fs = require('fs');
const cowsay = require('cowsay');

function makeHtmlResponse(res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.statusMessage = 'good';
}

const requestHandler = (req, res) => {

    parser(req)
        .then(req => {

            if (req.method === 'GET' && req.url.pathname === '/') {
                
                makeHtmlResponse(res);

                fs.readFile('index.html', (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(data);
                    }

                    let text = data.toString();
                    res.write(text);
                    res.end();
                });

                return;
            } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {

                makeHtmlResponse(res);

                fs.readFile('cowsay.html', (err, data) => {

                    let text = data.toString();
                    res.write(text);
                    res.end();
                });
                return;
            }else if (req.method === 'GET' && req.url.pathname === '/cowsays') {

                // cowasy with query text
                //make cowsay.html file

                makeHtmlResponse(res);

                fs.readFile('cowsay.html', (err, data) => {
                    if (err) {
                        throw err
                    }
                    let html = data.toString();
                    let cowsayText = cowsay.say({ text: 'say anything'});
                    res.write(html.replace('{{cowsay}}',cowsayText));
                    res.end();
                    
                });
                return;

            } else if (req.method === 'GET' && req.url.pathname === '/api/cowsay') {
                
                res.setHeader('Content-Type', 'text/json');
                res.statusCode = 200;
                res.statusMessage = 'good';

                fs.readFile('cowsay.html', (err, data) => {
                    if (err) {
                        throw err
                    }
                    let html = data.toString();
                    let cowsayText = cowsay.say({text: req.url.query.text});
                    res.write(html.replace('{{cowsay}}',cowsayText));
                    res.end();
                    
                });

            } else if(req.method === 'POST' && req.url.pathname === '/api/cowsay') {
                res.setHeader('Content-Type', 'text/json');
                res.statusCode = 200;
                res.statusMessage = 'good';
                let query = '';

                if(!req.body.text) {
                    query = {Error: 'Invalid query made'};
                    res.setHeader('Content-Type', 'text/json');
                    res.statusCode = 400;
                } else {
                    query = {content : req.body.text};
                    res.setHeader('Content-Type', 'text/json');
                    res.statusCode = 200;
                }


            }else {
                res.setHeader('Content-Type', 'text/html');
                res.statusCode = 404;
                res.statusMessage = 'Not Found';
                res.write('Resource Not Found');
                res.end();
            }
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500);
            res.write(err);
            res.end();
        })
};

const app = http.createServer(requestHandler);

module.exports = {
    start: (port, callback) => app.listen(port, callback),
    stop: (callback) => app.close(callback),
};