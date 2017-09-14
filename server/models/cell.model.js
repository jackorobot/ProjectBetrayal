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
  }
});

var Cell = mongoose.model('Cell', cellSchema);

module.exports = Cell;