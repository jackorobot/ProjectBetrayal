const express = require('express');
const router = express.Router();

const Voronoi = require('../libraries/voronoi');

var mongoose = require('mongoose');

var Cell = require('../models/cell.model');
var Team = require('../models/team.model');

function rndf(min, max) {
  return Math.random() * (max - min) + min;
}

function getXY(org) {
  return {x:Math.round(org.x), y:Math.round(org.y)};
}

router.route('/')
/**
 * Generate new voronoi map
 */
.get((req, res) => {
  Team.find({}, (err, teams) => {
    if (err) return res.send(err);

    var count = Math.min(10 + teams.length * 4, 45);
    count = (0|(count/teams.length)) * teams.length;
    count = Math.max(count, teams.length*2);

    var sites = [];
    for (i = 0; i <= count; i++) {
      sites.push({x: rndf(25, 1000-25), y: rndf(25,1000-25)});
    }
    var box = {xl:0, xr:1000, yt:0, yb:1000};

    var voronoi = new Voronoi();

    //Generate random points using 3 passes of lloyd relaxation
    for (i =0; i < 3; i++) {
      var diagram = voronoi.compute(sites, box);
      diagram.cells.forEach(function(cell){
        if (cell.halfedges){
          x = y = 0;
          cell.halfedges.forEach(function(halfEdge) {
            corner = halfEdge.getStartpoint();
            x += corner.x;
            y += corner.y;
          });
          cell.site.x = x/cell.halfedges.length;
          cell.site.y = y/cell.halfedges.length;
        }
      });
    }
    var countries = [];
    diagram = voronoi.compute(sites, box);

    diagram.cells.forEach(function(cell) {
      country = {
        corners: [],
        neighbours: [],
        center: getXY(cell.site)
      };
      cell.site.country = country;
      countries.push(country);
    });

    //Assign numbers to countries
    var num = 0;
    countries.forEach(function(country) {
      country.name = num;
      country.num = num;
      num++;
    });

    //Get the neighbours
    for (var cell in diagram.cells) {
      country = cell.site.country;
      for (var halfEdge in cell.halfedges){
        country.corners.push(getXY(halfEdge.getStartpoint()));
        edge = halfEdge.edge;
        if (edge.lSite == cell.site) {
          neighbour = edge.rSite;
        }else{
          neighbour = edge.lSite;
        }
        if (neighbour && neighbour.country){
          country.neighbours.push(neighbour.country.num);
          neighbour.country.neighbours.push(country.num);
        }
      }
    }

    res.json(diagram.cells);
  });
});

module.exports = router;