import mongoose, { Schema, Document } from "mongoose";
import {TCounterModel} from '@/types/types'

const CounterSchema: Schema = new Schema({
  _id: String,
  seq: {
    type: Number,
    default: 0
  }
});

export default mongoose.models.Counter || mongoose.model < TCounterModel & Document > ("Counter", CounterSchema);