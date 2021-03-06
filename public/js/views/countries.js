'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

var view = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  el: $('.view-countries'),

  template: require('../../templates/countries.hbs'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});


module.exports = view;
