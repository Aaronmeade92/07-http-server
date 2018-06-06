'use strict'

const http = require('http');
const parser = require('../parser');
const fs = require('fs');

const requestHandler = (req, res) => {

  parser(req)
    .then(req => {
        
        if(req.method === 'GET' && req.url.pathname === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.statusMessage = 'good';

          fs.readFile('index.html', (err, data) => {
              if(err){
                  throw err;
              } else {
                  console.log(data);
              }

              let text = data.toString();
              res.write(text);
              res.end();
          });
    
            return;
        } else if(req.method === 'POST' && req.url.pathname === '/data') {
            
            res.setHeader('Content-Type', 'text/json');
            res.statusCode = 200;
            res.statusMessage = 'good';
            res.write(JSON.stringify(req.body));
            res.end();
            return;
        } else {
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