'use strict';

// Convenience module to load all models

var models = [
  new (require('./countries'))(),
  new (require('./ports'))(),
  new (require('./log-lines'))(),
  new (require('./map'))()
];

function update(data) {
  models.forEach(function(model) {
    model.update(data);
  });
}

module.exports.updateAll = update;

module.exports.countries = models[0];
module.exports.ports     = models[1];
module.exports.logLines  = models[2];
module.exports.map       = models[3];
