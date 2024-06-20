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
  front: {
    title: string;
    logo: string;
  }
}
export type TCounterModel = {
  _id: string;
  seq: number;
}

export type TProjectInput = {
  id?: string;
  userId: string;
  name: string;
  currencies: {code:string, primary:boolean}[];
  languages: {code:string, primary:boolean}[];
  front: {
    title: string;
    logo?: string;
  }
}

export type TFile = {
  id: string;
  subjectField: string;
  filename: string;
  uuidName: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  mediaContentType: string;
  src: string;
  alt: string;
  caption: string;
  state: string;
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
  front: {
    title: string;
    logo?: TFile;
  };
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

type TMinNum = number | [number, string];
type TMinDate = Date | [Date, string];

export type TOptions = {
  required?: boolean | [boolean, string];
  unique?: boolean | [boolean, string];
  max?: TMinNum|TMinDate;
  min?: TMinNum|TMinDate;
  regex?: string | [string, string];
  choices?: string[]|number[];
  defaultValue?: any;
  value?: [string, any];
  max_precision?: number;
}