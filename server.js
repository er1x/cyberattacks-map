'use strict';

const browserify = require('browserify-middleware');
const bodyParser = require('body-parser');
const express    = require('express');
const stylus     = require('stylus');
const nib        = require('nib');

const app    = express();
const server = require('http').Server(app);
const io     = require('socket.io')(server);


// Middleware
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.use(stylus.middleware({
  src: 'public/styles',
  compile: compile
}));
app.use('/js', browserify('public/js', {transform: ['hbsfy']}));
app.use('/', express.static('public'));
app.use(bodyParser.json());


// Post Attack route

app.post('/api/attack', function(req, res){
  // TODO: authenticate attack posters!
  // TODO: validate data
  io.emit('attack', req.body);
  res.json(req.body);
});


server.listen(3000, '0.0.0.0', function () {
  console.log(`App listening on 0.0.0.0:3000`);
});
