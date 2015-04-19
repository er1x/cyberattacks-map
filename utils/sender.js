'use strict';

const Chance  = require('chance');
const moment  = require('moment');
const request = require('superagent');

const chance = new Chance();

setInterval(function(){

  let coords = chance.coordinates({fixed: 2}).split(',');

  let payload = {
    "originCoords": [
        coords[0].trim(),
        coords[1].trim()
    ],
    "originCountryName": chance.country({ full: true }),
    "destinationPort": chance.integer({min: 1, max: 65535}),
    "timestamp": moment(chance.date()).format("YYYY-M-D hh:mm"),
    "originCity": chance.city(),
    "originASN": `AS${chance.integer({min:1, max: 9999})}`,
    "originOrganization": chance.word(),
    "originIP": chance.ip()
  };

  request.post('http://localhost:3000/api/attack')
         .send(payload)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .end(function(err){
            if (err) {
              throw err;
            }
            else {
              console.log(`Sent OK`);
            }
          });

}, 200);