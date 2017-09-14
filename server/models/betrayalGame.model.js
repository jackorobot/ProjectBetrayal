var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var betrayalGameSchema = new Schema({
  map: [{
    type: Schema.ObjectId,
    ref: 'Cell'
  }],
  teams: [{
    type: Schema.ObjectId,
    ref: 'Team'
  }],
  actions: [{
    type: Schema.ObjectId,
    ref: 'Action'
  }]
});

var BetrayalGame = mongoose.model('BetrayalGame', betrayalGameSchema);

module.exports = BetrayalGame;