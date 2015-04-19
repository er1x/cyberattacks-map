'use strict';

var Backbone = require('backbone');
Backbone.$   = require('jquery');

var model = Backbone.Model.extend({
  update: function(attack) {
    this.trigger('attack', attack.originCoords);
  }
});

module.exports = model;
