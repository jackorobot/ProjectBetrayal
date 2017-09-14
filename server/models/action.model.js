var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actionSchema = new Schema({
  origin: {
    type: Schema.ObjectId,
    ref: 'Cell',
    required: 'Origin is needed',
    unique: true
  },
  target: {
    type: Schema.ObjectId,
    ref: 'Cell',
    required: 'Target is needed'
  },
  actionType: {
    type: String,
    required: 'Action is needed',
    enum: ['attack', 'defend']
  },
  team: {
    type: Schema.ObjectId,
    ref: 'Team',
    required: 'Team is needed'
  }
});

var Action = mongoose.model('Action', actionSchema);

module.exports = Action;