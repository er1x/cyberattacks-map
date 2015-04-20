'use strict';

var Backbone = require('backbone');
var _        = require('underscore');
Backbone.$   = require('jquery');

var model = Backbone.Model.extend({

  defaults: {
    logLines: []
  },

  update: function(attack) {
    var tmp = _.clone(this.get('logLines'));
    var line = {};
    line.country      = attack.originCountryName;
    line.city         = attack.originCity;
    line.port         = attack.destinationPort;
    line.timestamp    = attack.timestamp;
    line.asn          = attack.originASN;
    line.organization = attack.originOrganization;
    line.ip           = attack.originIP;
    tmp.unshift(line);

    this.set('logLines', tmp.slice(0,9));
  }
});

module.exports = model;