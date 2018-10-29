import * as mongoose from 'mongoose';


export const BetrayalGameSchema = new mongoose.Schema({
  map: [{
    type: mongoose.Types.ObjectId,
    ref: 'Cell'
  }],
  teams: [{
    type: mongoose.Types.ObjectId,
    ref: 'Team'
  }],
  actions: [{
    type: mongoose.Types.ObjectId,
    ref: 'Action'
  }]
});

export const BetrayalGame = mongoose.model('BetrayalGame', BetrayalGameSchema);
