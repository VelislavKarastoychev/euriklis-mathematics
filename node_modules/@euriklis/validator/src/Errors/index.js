"use strict";
import * as texts from "./texts.js";
const executeError = (message) => {
  const error = new Error();
  error.name = texts.ErrorMessage;
  error.message = message;
  throw error;
};
export const IllegalParametersInIsArrayOfIntegersInClosedRange = () =>
  executeError(texts.IllegalParametersInIsArrayOfIntegersInClosedRangeTxt);
export const IllegalParametersInIsArrayOfIntegersInRange = () =>
  executeError(texts.IllegalParametersInIsArrayOfIntegersInRangeTxt);
export const IllegalParametersInIsArrayOfNumbersInClosedRange = () =>
  executeError(texts.IllegalParametersInIsArrayOfNumbersInClosedRangeTxt);
export const IllegalParametersInIsArrayOfNumbersInRange = () =>
  executeError(texts.IllegalParametersInIsArrayOfNumbersInRangeTxt);
export const IllegalTypeInForAny = () =>
  executeError(texts.IllegalTypeInForAnyTxt);
export const IllegalUsageOfArgumentInIsArrayAndForEvery = () =>
  executeError(texts.IllegalUsageOfArgumentInIsArrayAndForEveryTxt);
export const InappropriateValueInIsSame = () =>
  executeError(texts.InappropriateValueInIsSameTxt);
export const IncorrectArgumentInHasLengthBiggerThan = () =>
  executeError(texts.IncorrectArgumentInHasLengthBiggerThanTxt);
export const IncorrectArgumentInHasLength = () =>
  executeError(texts.IncorrectArgumentInHasLengthTxt);
export const IncorrectArgumentInBindMethod = () =>
  executeError(texts.IncorrectArgumentInBindMethodTxt);
export const IncorrectArgumentInHasLengthEqualsOrBiggerThan = () =>
  executeError(texts.IncorrectArgumentInHasLengthEqualsOrBiggerThanTxt);
export const IncorrectArgumentInHasLengthEqualsOrLesserThan = () =>
  executeError(texts.IncorrectArgumentInHasLengthEqualsOrLesserThanTxt);
export const IncorrectArgumentInHasLengthLesserThan = () =>
  executeError(texts.IncorrectArgumentInHasLengthLesserThanTxt);
export const IncorrectArgumentInInterface = () =>
  executeError(texts.IncorrectArgumentInInterfaceTxt);
export const IncorrectArgumentInIsArrayAndForAny = () =>
  executeError(texts.IncorrectArgumentInIsArrayAndForAnyTxt);
export const IncorrectArgumentInIsBiggerThan = () =>
  executeError(texts.IncorrectArgumentInIsBiggerThanTxt);
export const IncorrectArgumentInIsEmpty = () =>
  executeError(texts.IncorrectArgumentInIsEmptyTxt);
export const IncorrectArgumentInIsEqualOrBiggerThan = () =>
  executeError(texts.IncorrectArgumentInIsEqualOrBiggerThanTxt);
export const IncorrectArgumentInIsEqual = () =>
  executeError(texts.IncorrectArgumentInIsEqual);
export const IncorrectArgumentInIsEqualOrLesserThan = () =>
  executeError(texts.IncorrectArgumentInIsEqualOrLesserThanTxt);
export const IncorrectArgumentInIsLesserThan = () =>
  executeError(texts.IncorrectArgumentInIsLesserThanTxt);
export const IncorrectArgumentInIsNotEqual = () =>
  executeError(texts.IncorrectArgumentInIsNotEqual);
export const IncorrectArgumentInStringContainsExpression = () =>
  executeError(texts.IncorrectArgumentInStringContainsExpressionTxt);
export const IncorrectArgumentsInHasLengthInClosedRange = () =>
  executeError(texts.IncorrectArgumentsInHasLengthInClosedRangeTxt);
export const IncorrectArgumentsInHasLengthInRange = () =>
  executeError(texts.IncorrectArgumentsInHasLengthInRangeTxt);
export const IncorrectArgumentsInIsInClosedRange = () =>
  executeError(texts.IncorrectArgumentsInIsInClosedRangeTxt);
export const IncorrectArgumentsInIsInRange = () =>
  executeError(texts.IncorrectArgumentsInIsInRangeTxt);
export const IncorrectArgumentInIsInstanceof = () =>
  executeError(texts.IncorrectArgumentInIsInstanceofTxt);
export const IncorrectDescriptionProperty = () =>
  executeError(texts.IncorrectDescriptionPropertyTxt);
export const IncorrectFunctionArgumentInForAll = () =>
  executeError(texts.IncorrectFunctionArgumentInForAllTxt);
export const IncorrectFunctionArgumentInForAny = () =>
  executeError(texts.IncorrectFunctionArgumentInForAnyTxt);
export const IncorrectIterationsParameterInBenchmark = () =>
  executeError(texts.IncorrectIterationsParameterInBenchmarkTxt);
export const IncorrectParameterInDescribe = () =>
  executeError(texts.IncorrectParameterInDescribeTxt);
