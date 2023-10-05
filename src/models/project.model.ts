import mongoose, { Schema, Document } from "mongoose";
import {TProjectModel} from '@/types/types'

const ObjectId = Schema.ObjectId;

const CurrencySchema = new Schema({
  code: String, 
  primary: {
    type: Boolean,
    default: false
  }
}, { _id : false,});
CurrencySchema.set('toObject', { virtuals: true });
CurrencySchema.set('toJSON', { virtuals: true });

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
  planFinishedAt: {
    type: Date,
    default: null
  },
  trialFinishedAt: Date,
  createdAt: {
    type: Date,
    default: new Date
  },
  updatedAt: {
    type: Date,
    default: new Date
  },
  currencies: [CurrencySchema]
});

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Project || mongoose.model < TProjectModel & Document > ("Project", ProjectSchema);