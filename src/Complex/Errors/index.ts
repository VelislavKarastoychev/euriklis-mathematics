"use strict";
import * as texts from "./texts";
const runError = (text: string) => {
  const error = new Error();
  error.name = "@euriklis/mathematics Complex library error message";
  error.message = text;
  throw error;
};

export const ZeroDivision = (method: string) => (): never =>
  runError(texts.ZeroDivisionTxt(method));
