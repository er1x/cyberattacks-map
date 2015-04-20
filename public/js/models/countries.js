'use strict';

var Backbone = require('backbone');
var _        = require('underscore');
Backbone.$   = require('jquery');

var model = Backbone.Model.extend({

  /**
   * Structure example:
   * countries = [
   *   {countryName: "foo", attacks: 25},
   *   {countryName: "bar", attacks: 15},
   *   ...
   * ]
   */
  defaults: {
    countries: []
  },

  update: function(attack) {
    var tmp = _.clone(this.get('countries'));
    var countryFound = false;

    tmp.forEach(function(c){
      if (c.countryName === attack.originCountryName) {
        countryFound = true;
        c.attacks += 1;
      }
    });

    if (!countryFound) {
      tmp.push({
        countryName: attack.originCountryName,
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

    this.set('countries', tmp.slice(0, 9)); // max 9 countries
  }
});

module.exports = model;