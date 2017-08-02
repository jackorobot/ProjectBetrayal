var Map = require('./map');
var Teams = require('./teams');
var Actions = require('./actions');

var betrayalGame = function(){
  this.map = new Map();
  this.teams = new Teams();
  this.actions = new Actions();
};

betrayalGame.prototype.mainLoop = function(){
  while(true);
};

module.exports = betrayalGame;
