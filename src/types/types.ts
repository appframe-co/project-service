import { Application } from "express";

export type RoutesInput = {
  app: Application,
}

export type TErrorResponse = {
  error: string|null;
  description?: string;
  property?: string;
}

export type TProjectModel = {
  id: string;
  userId: string;
  projectNumber: number;
  name: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}
export type TCounterModel = {
  _id: string;
  seq: number;
}

export type TProjectInput = {
  userId: string;
  name: string;
}

export type TProject = {
  id: string;
  name: string;
  projectNumber: number;
  plan: string;
}

type TFeatureModel = {
  code: string;
  rules: {[key: string]: any};
}
export type TPlanModel = {
  id: string,
  name: string;
  code: string;
  features: TFeatureModel[];
  default: boolean;
}

type TFeature = TFeatureModel
export type TPlan = {
  id: string,
  name: string;
  code: string;
  features: TFeature[];
  default: boolean;
}