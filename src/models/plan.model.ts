import mongoose, { Schema, Document } from "mongoose";
import {TPlanModel} from '@/types/types'

const FeatureSchema: Schema = new Schema({
  code: String,
  rules: {
    limit: Number
  }
});

const PlanSchema: Schema = new Schema({
  name: String,
  code: String,
  features: [FeatureSchema],
  default: Boolean
});

PlanSchema.set('toObject', { virtuals: true });
PlanSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Plan || mongoose.model < TPlanModel & Document > ("Plan", PlanSchema);