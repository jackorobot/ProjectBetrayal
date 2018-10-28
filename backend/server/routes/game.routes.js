const express = require('express');
const router = express.Router();
const async = require('async');

const Voronoi = require('../libraries/voronoi');

var mongoose = require('mongoose');
var Cell = require('../models/cell.model');
var Team = require('../models/team.model');

var gameState = 0; // 0 == stop, 1 == go
var timeStamp = 0;
var winner = '';
var interval = 300000;
var gameTimer;

function rndf(min, max) {
  return Math.random() * (max - min) + min;
}

function getXY(org) {
  return { x: Math.round(org.x), y: Math.round(org.y) };
}

function gameHandler() {
  if (gameState) {
    executeRound();
    setTimeStamp();
    gameTimer = setTimeout(gameHandler, interval);
  } else {
    timeStamp = 0;
  }
}

function startGame(res) {
  // Start the game by resetting the gamestate
  gameState = 1
  winner = '';
  async.parallel([generateGame], function (err) {
    if (err)
      return res.send(err);
  });
  newRound();
  setTimeStamp();
  gameTimer = setTimeout(gameHandler, interval);
  res.json({ message: 'Game started', gamestate: gameState, timestamp: timeStamp });
}

function stopGame() {
  // Stop the game by resetting the gamestate
  gameState = 0;
}

function setTimer(seconds) {
  interval = seconds;
  if (gameState) {
    clearTimeout(gameTimer);
    setTimeStamp();
    gameTimer = setTimeout(gameHandler, interval);
  }
}

function setTimeStamp() {
  timeStamp = new Date().getTime() + interval + 2000;
}

function generateGame(cb) {
  Cell.deleteMany({}, function (err) {
    if (err) return cb(err);

    Team.find({}, (err, teams) => {
      if (err) return cb(err);

      var count = Math.min(10 + teams.length * 4, 45);
      count = (0 | (count / teams.length)) * teams.length;
      count = Math.max(count, teams.length * 2);

      var sites = [];
      for (i = 0; i <= count; i++) {
        sites.push({ x: rndf(25, 1000 - 25), y: rndf(25, 1000 - 25) });
      }
      var box = { xl: 0, xr: 1000, yt: 0, yb: 1000 };

      var voronoi = new Voronoi();

      //Generate random points using 5 passes of lloyd relaxation
      for (var i = 0; i < 5; i++) {
        var diagram = voronoi.compute(sites, box);
        diagram.cells.forEach(function (cell) {
          if (cell.halfedges) {
            var x = 0;
            var y = 0;
            cell.halfedges.forEach(function (halfEdge) {
              var corner = halfEdge.getStartpoint();
              x += corner.x;
              y += corner.y;
            });
            cell.site.x = x / cell.halfedges.length;
            cell.site.y = y / cell.halfedges.length;
          }
        });
      }
      var countries = [];
      diagram = voronoi.compute(sites, box);

      diagram.cells.forEach(function (cell) {
        var country = {
          corners: [],
          neighbours: [],
          center: getXY(cell.site)
        };
        cell.site.country = country;
        countries.push(country);
      });

      //Assign numbers to countries
      var num = 0;
      countries.forEach(function (country) {
        country.name = num;
        num++;
      });

      //Assigning owners
      var num = 0;
      countries.forEach(function (country) {
        country.owner = teams[num % teams.length]._id;
        country.team = country.owner;
        num++;
      });

      //Save them in the database
      Cell.create(countries, function (err, countries) {
        if (err) {
          return cb(err);
        }

        //Replace objects with mongoose models
        countries.forEach(function (country) {
          diagram.cells.forEach(function (cell) {
            if (cell.site.country.name.toString() == country.name) {
              cell.site.country = country;
            }
          });
        });

        //Get the neighbours
        diagram.cells.forEach(function (cell) {
          var country = cell.site.country;
          cell.halfedges.forEach(function (halfEdge) {
            country.corners.push(getXY(halfEdge.getStartpoint()));
            var edge = halfEdge.edge;
            if (edge.lSite == cell.site) {
              var neighbour = edge.rSite;
            } else {
              neighbour = edge.lSite;
            }
            if (neighbour && neighbour.country) {
              country.neighbours.push(neighbour.country._id);
              //neighbour.country.neighbours.push(country._id);
            }
          });
        });

        var calls = [];

        countries.forEach(function (country) {
          country.target = country._id;
          calls.push(function (callback) {
            country.save(function (err) {
              if (err) {
                return callback(err)
              }
              callback(null);
            });
          });
        });

        async.parallel(calls, function (err) {
          if (err)
            return cb(err);
        });

        cb(null);
      });
    });
  });
}

function newRound() {
  Cell.find({}, (err, cells) => {
    cells.forEach(function (cell) {
      cell.target = cell._id;
      cell.actionType = 'defend';
      cell.team = cell.owner;

      cell.save(function (err, cell) {
        if (err) return err;
      });
    });
  });
}



function executeRound(res) {
  var armies = {};

  function incArmy(target, forPlayer, delta) {
    var ca = typeof armies[target] !== "undefined" ? armies[target] : (armies[target] = {});
    ca[forPlayer] = (ca[forPlayer] || 0) + delta;
  }

  Cell.find({}, (err, cells) => {
    cells.forEach((cell) => {
      // Lose armies when attacking
      incArmy(cell._id, cell.owner, -10);

      // Add those armies to other cell
      // TEST TODO: Make this 10 to 11 when cell.target owner is the same as cell.team
      let points = 11;

      cells.forEach((searchcell) => {
        if (searchcell._id.toString() === cell.target.toString()) {
          if (searchcell.owner.toString() === cell.team.toString()) {
            points = 10;
          }
        }
      });

      incArmy(cell.target, cell.team, points);
    });

    var calls = [];

    for (var target in armies) {
      var ownerId = "";
      cells.forEach((cell) => {
        if (cell._id == target) {
          ownerId = cell.owner.toString();
        }
      });
      incArmy(target, ownerId, 20);
      var wsize = 0;
      var wplayer = "";
      var sizes = armies[target];
      for (var player in sizes) {
        if (sizes[player] > wsize) {
          wplayer = player;
          wsize = sizes[player];
        } else if (sizes[player] == wsize) {
          wplayer = "";
        }
      }

      if (wplayer != "") {
        cells.forEach((cell) => {
          if (cell._id == target) {
            cell.owner = wplayer;
            calls.push(function (callback) {
              cell.save(function (err, cell) {
                if (err) return callback(err);

                callback(null, cell);
              });
            });
          }
        });
      }
    }

    async.parallel(calls, function (err, result) {
      if (err) {
        if (res) {
          return res.send(err);
        }
      }
    })


    var err = newRound();
    if (res) {
      if (err) res.send(err);
      else res.json({ message: 'Done' });
    }
  });
}

router.route('/executeround')
  // Run the current round
  .get((req, res) => {
    executeRound(res);
  });

router.route('/setroundtime')
  // Set the roundTime interval, return the timestamp
  .put((req, res) => {
    setTimer(req.body.interval);
    res.json({ timestamp: timeStamp });
  });

router.route('/getstate')
  // Return the gamestate, and timestamp
  .get((req, res) => {
    res.json({ gamestate: gameState, timestamp: timeStamp, interval: interval, winner: winner });
  });

router.route('/stop')
  // Stop the game from running
  .get((req, res) => {
    stopGame();
    res.json({ message: 'Game stopped', gamestate: gameState })
  });

router.route('/start')
  // Start the game
  .put((req, res) => {
    setTimer(req.body.interval);
    startGame(res);
  });

router.route('/winner/:id')
  // Declare the winner
  .get((req, res) => {
    winner = req.params.id;
  });

module.exports = router;
