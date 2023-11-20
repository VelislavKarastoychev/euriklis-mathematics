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
