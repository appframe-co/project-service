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
  planFinishedAt: Date;
  trialFinishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  currencies: {code:string, primary:boolean}[];
  languages: {code:string, primary:boolean}[];
}
export type TCounterModel = {
  _id: string;
  seq: number;
}

export type TProjectInput = {
  userId: string;
  name: string;
  currencies: {code:string, primary:boolean}[];
  languages: {code:string, primary:boolean}[];
}

export type TProject = {
  id: string;
  userId: string;
  name: string;
  projectNumber: number;
  plan: string;
  planFinishedAt: Date;
  trialFinishedAt: Date;
  currencies: {code:string, primary:boolean, name:string}[];
  languages: {code:string, primary:boolean, name:string}[];
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

export type TLanguage = {
  name: string;
  code: string;
  enabled:boolean;
  sort: number;
}

export type TCurrency = {
  name: string;
  code: string;
  enabled:boolean;
  sort: number;
  moneyFormat: string;
  moneyInEmailsFormat: string;
  moneyWithCurrencyFormat: string;
  moneyWithCurrencyInEmailsFormat: string;
  decimalMark: string;
  subunitToUnit: number;
  symbol: string;
  thousandsSeparator: string;
}