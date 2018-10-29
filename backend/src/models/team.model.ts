import mongoose from 'mongoose';

export interface ITeamModel extends mongoose.Document {
  name: string;
  color: string;
  username: string;
  password: string;
}

export const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name must be given'
  },
  color: {
    type: String,
    default: 'Blue'
  },
  username: {
    type: String,
    required: 'Username must be given'
  },
  password: {
    type: String,
    required: 'Password must be given'
  }
});

export const Team: mongoose.Model<ITeamModel> = mongoose.model<ITeamModel>('Team', TeamSchema);
