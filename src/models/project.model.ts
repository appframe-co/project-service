import mongoose, { Schema, Document } from "mongoose";
import {TProjectModel} from '@/types/types'

const ObjectId = Schema.ObjectId;

const ProjectSchema: Schema = new Schema({
  userId: {
    type: ObjectId,
    require: true
  },
  number: Number,
  projectNumber: Number,
  token: {
    type: String,
    required: true
  },
  name: String,
  plan: String,
  createdAt: {
    type: Date,
    default: new Date
  },
  updatedAt: {
    type: Date,
    default: new Date
  }
});

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Project || mongoose.model < TProjectModel & Document > ("Project", ProjectSchema);