"use strict";
import * as texts from "./texts";
const executeWarning = (message: string) => {
  console.warn(texts.WarningMessage);
  console.warn(message);
};
export const IncorrectFunctionInOnMethod = () =>
  executeWarning(texts.IncorrectFunctionInOnMethod);
export const IncorrectStateInOnMethod = () =>
  executeWarning(texts.IncorrectStateInOnMethod);
export const IncorrectValueInIsNegative = () =>
  executeWarning(texts.IncorrectValueInIsNegative);
export const IncorrectValueInIsPositive = () =>
  executeWarning(texts.IncorrectValueInIsPositive);
export const IncorrectTypeInExecuteWith = () =>
  executeWarning(texts.IncorrectTypeInExecuteWith);
