'use strict';

var Backbone = require('backbone');
Backbone.$   = require('jquery');

var model = Backbone.Model.extend({

  /**
   * Structure example:
   * ports = [
   *   {port: 3333, attacks: 25},
   *   {port: 4444, attacks: 15},
   *   ...
   * ]
   */
  defaults: {
    ports: []
  },

  // TODO: refactor with countries view
  update: function(attack) {
    var tmp = this.get('ports');
    var portFound = false;

    tmp.forEach(function(el){
      if (el.port === attack.destinationPort) {
        portFound   = true;
        el.attacks += 1;
      }
    });

    if (!portFound) {
      tmp.push({
        port: attack.destinationPort,
        attacks: 1
      });
    }

    tmp.sort(function (a, b) {
      if (a.attacks > b.attacks) {
        return -1;
      } else if (b.attacks > a.attacks) {
        return 1;
      }
      return 0;
    });

    this.set('ports', tmp.slice(0, 9)); // max 9 ports
    this.trigger('change');
  }
});

module.exports = model;