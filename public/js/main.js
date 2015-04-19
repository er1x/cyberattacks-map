'use strict';

var $  = require('jquery');
var io = require('socket.io-client');

var models        = require('./models');

var countriesView = new (require('./views/countries'))({model: models.countries});
var portsView     = new (require('./views/ports'))({model: models.ports});
var logLinesView  = new (require('./views/log-lines'))({model: models.logLines});
var mapView       = new (require('./views/map'))({model: models.map});

var app = {
  init: function() {
    // Render views
    countriesView.render();
    portsView.render();
    mapView.render();
    logLinesView.render();

    // And setup socket communication
    var socket = io('http://localhost:3000');
    socket.on('attack', models.updateAll);
    socket.on('connect_error', function () {
      console.error('connect error. app won\'t work :(');
    });
  }
};

$(function(){
  app.init();
});
