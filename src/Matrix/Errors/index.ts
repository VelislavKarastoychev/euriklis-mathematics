"use strict";
import * as texts from "./texts.ts";

/**
 * Generates the suitable error message for the
 * Matrix library.
 */
const runError = (text: string): never => {
  const error: Error = new Error();
  error.name = "@euriklis/mathematics matrix error message";
  error.message = text;
  throw error;
};

export const IncorrectMatrixInput = (): never =>
  runError(texts.IncorrectMatrixInputTxt);

export const IncorrectFromAndToParametersInGetBlock = (): never =>
  runError(texts.IncorrectFromAndToParametersInGetBlockTxt);
export const IncorrectFromAndToParametersInSetBlock = (): never =>
  runError(texts.IncorrectFromAndToParametersInSetBlockTxt);
export const IncorrectBlockParameterInSetBlock = (): never =>
  runError(texts.IncorrectBlockParameterInSetBlockTxt);
export const IncorrectRowIndexParametersInExchangeRows = (): never =>
  runError(texts.IncorrectRowIndexParametersInExchangeRowsTxt);
export const IncorrectFromColumnIndexParameterInExchangeRows = (): never =>
  runError(texts.IncorrectFromColumnIndexParameterInExchangeRowsTxt);
export const IncorrectToColumnIndexParameterInExcangeRows = (): never =>
  runError(texts.IncorrectToColumnIndexParameterInExchangeRowsTxt);
export const IncorrectColumnIndexParametersInExchangeColumns = (): never =>
  runError(texts.IncorrectColumnIndexParametersInExchangeColumnsTxt);
export const IncorrectFromRowIndexParameterInExchangeColumns = (): never =>
  runError(texts.IncorrectFromRowIndexParameterInExchangeColumnsTxt);
export const IncorrectToRowIndexParameterInExchangeColumns = (): never =>
  runError(texts.IncorrectToRowIndexParameterInExchangeColumnsTxt);
export const IncorrectRowIndexParameterInGetDiagonal = (): never => 
  runError(texts.IncorrectRowIndexParameterInGetDiagonalTxt);

