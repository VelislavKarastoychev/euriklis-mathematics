"use strict";
import { IncorrectParameterInPushManyTxt } from "./texts";
const runError: (text: string) => never = (text) => {
  throw new Error(text);
};

export const IncorrectParameterInPushMany: () => never = () =>
  runError(IncorrectParameterInPushManyTxt);
