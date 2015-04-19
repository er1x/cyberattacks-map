'use strict';

var $        = require('jquery');
var d3       = require('d3');
var topojson = require('topojson');
var Backbone = require('backbone');

Backbone.$   = require('jquery');

var view = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, 'attack', this.drawPoint);
  },

  el: Backbone.$('.view-map'),

  render: function() {

    // Dynamically calculate map dimensions
    $('.view-map').height(window.innerHeight);
    var height = window.innerHeight;
    var width  = $('.view-map').width();

    this.svg = d3.select('.view-map').append('svg')
                .attr('height', height - 20)
                .attr('width',  width - 20);

    this.projection = d3.geo.mercator()
                        .scale(width / 6.5)
                        .translate([width / 2, height / 1.8]);

    var path       = d3.geo.path().projection(this.projection);
    var g          = this.svg.append('g');

    // Filter effect for map circles
    var glowFilter = this.svg.append('defs')
                        .append('filter')
                        .attr('id', 'glow');

    glowFilter.append('feGaussianBlur')
              .attr('stdDeviation', 4.5)
              .attr('result', 'coloredBlur');

    var merge = glowFilter.append('feMerge');

    merge.append('feMergeNode')
         .attr('in', 'coloredBlur');
    merge.append('feMergeNode')
         .attr('in', 'SourceGraphic');


    // Retrieve topology from file and create map
    d3.json('data/world-110m2.json', function(error, topology) {
      g.selectAll('path')
        .data(topojson.feature(topology, topology.objects.countries).features)
        .enter()
        .append('path')
        .attr('d', path);
    });
    return this;
  },

  /**
   * Given a point in format [a,b], draw a circle on map
   */
  drawPoint: function(coords) {
    coords = coords.reverse();
    coords = this.projection(coords);
    this.svg.append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', 50)
            .attr('class', 'map-point')
            .attr('filter', 'url(#glow)')
            .attr('fill-opacity', 0.2)
            .transition()
            .duration(700)
            .ease('linear')
            .attr('fill-opacity', 1)
            .attr('r', 3)
            .transition()
            .duration(4000)
            .remove();
  }
});


module.exports = view;
