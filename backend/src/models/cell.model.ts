import mongoose from 'mongoose';
import { ITeamModel } from './team.model';

export interface ICellModel extends mongoose.Document {
  name: string;
  owner: ITeamModel;
  neighbours: ICellModel[];
  corners: ICoordinate[];
  center: ICoordinate;
  target: ICellModel;
  actionType: string;
  team: ITeamModel;
  armies: number;
}

export interface ICoordinate {
  x: number;
  y: number;
}

export const CellSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name must be given'
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: 'Team must be given'
  },
  neighbours: [{
    type: mongoose.Types.ObjectId,
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
    type: mongoose.Types.ObjectId,
    ref: 'Cell'
  },
  actionType: {
    type: String,
    required: 'Action is needed',
    enum: ['attack', 'defend'],
    default: 'defend'
  },
  team: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: 'Team is needed'
  },
  armies: Number
});

export const Cell: mongoose.Model<ICellModel> = mongoose.model<ICellModel>('Cell', CellSchema);
