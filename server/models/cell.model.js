var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cellSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name must be given'
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'Team',
    required: 'Team must be given'
  },
  neighbours: [{
    type: Schema.ObjectId,
    ref: 'Cell'
  }],
  corners: [{
    x: Number,
    y: Number
  }],
  center: {
    x: Number,
    y: Number
  },
  //Action fields
  target: {
    type: Schema.ObjectId,
    ref: 'Cell'
  },
  actionType: {
    type: String,
    required: 'Action is needed',
    enum: ['attack', 'defend'],
    default: 'defend'
  },
  team: {
    type: Schema.ObjectId,
    ref: 'Team',
    required: 'Team is needed'
  }
});

var Cell = mongoose.model('Cell', cellSchema);

module.exports = Cell;