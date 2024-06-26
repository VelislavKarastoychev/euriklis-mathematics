"use strict";
import * as texts from "./texts";
import { errorGenerator } from "../../utils";

/**
 * Generates the suitable error message for the
 * Matrix library.
 */
const runError = errorGenerator("@euriklis/mathematics matrix error message");

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
export const IncorrectBlockParameterInAppendBlockRight = (): never =>
  runError(texts.IncorrectBlockParameterInAppendBlockRightTxt);
export const IncorrectBlockParameterInAppendBlockBottom = (): never =>
  runError(texts.IncorrectBlockParameterInAppendBlockBottomTxt);
export const IncorrectRowsOrColumnsParameterInReplicate = (): never =>
  runError(texts.IncorrectRowsOrColumnsParameterInReplicateTxt);
export const InternalErrorInFrobeniusNorm = (): never =>
  runError(texts.InternalErrorInFrobeniusNormTxt);
export const InternalErrorInInfinityNorm = (): never =>
  runError(texts.InternalErrorInInfinityNormTxt);
export const InternalErrorInMaxNorm = (): never =>
  runError(texts.InternalErrorInMaxNormTxt);
export const IncorrectRowsOrColumnsParameterInRandom = (): never =>
  runError(texts.IncorrectRowsOrColumnsParameterInRandomTxt);
export const IncorrectRowsOrColumnsParametersInZeros = (): never =>
  runError(texts.IncorrectRowsOrColumnsParametersInZerosTxt);
export const IncorrectRowsOrColumnsParametersInIdentityLike = (): never =>
  runError(texts.IncorrectRowsOrColumnsParametersInIdentityLikeTxt);
export const IncorrectRowsAndColumnsParametersInReshape = (): never =>
  runError(texts.IncorrectRowsAndColumnsParametersInReshapeTxt);
export const InternalErrorInNorm1 = (): never =>
  runError(texts.InternalErrorInNorm1Txt);
export const InternalErrorInSuperiorNorm = (): never =>
  runError(texts.InternalErrorInSuperiorTxt);
export const InternalErrorInInferiorNorm = (): never =>
  runError(texts.InternalErrorInInferiorNormTxt);
export const InternalErrorInSum = (): never =>
  runError(texts.InternalErrorInSumTxt);
export const InternalErrorInProduct = (): never =>
  runError(texts.InternalErrorInProductTxt);
export const InternalErrorInSquares = (): never =>
  runError(texts.InternalErrorInSquaresTxt);
export const InternalErrorInCubes = (): never =>
  runError(texts.InternalErrorInCubesTxt);
export const IncorrectMatrixParameterInPointwise =
  (method: string) => (): never =>
    runError(texts.IncorrectMatrixParameterInPointwiseTxt(method));
export const MatrixDegenerate = (): never =>
  runError(texts.MatrixDegenerateTxt);
export const IncorrectMatricesInput = (method: string) => (): never =>
  runError(texts.IncorrectMatricesInput(method));
export const InappropriateMatrixParameterInToDiagonalMatrix = (): never =>
  runError(texts.InappropriateMatrixParameterInToDiagonalMatrixTxt);
export const NonPositiveSemidefinedMatrixInCholeskyLL = (): never =>
  runError(texts.NonPositiveSemidefinedMatrixInCholeskyLLTxt);
export const NonSymmetricMatrixInLL = (): never =>
  runError(texts.NonSymmetricMatrixInLLTxt);
export const NonSquareMatrixInLDL = (): never =>
  runError(texts.NonSquareMatrixInLDLTxt);
export const DiagonalElementClosedToZeroInLDL = (): never =>
  runError(texts.DiagonalElementClosedToZeroInLDLTxt);
export const IncorrectParametersInTimes = (): never =>
  runError(texts.IncorrectParametersInTimesTxt);
export const NonSquareMatrixInInverse = (): never =>
  runError(texts.NonSquareMatrixInInverseTxt);
export const IncorrectMethodParameterInInverse = (): never =>
  runError(texts.IncorrectMethodParameterInInverseTxt);
export const IncorrectRowVectorInAddToDiagonal = (): never =>
  runError(texts.IncorrectRowVectorInAddToDiagonalTxt);
export const IncorrectColumnVectorInAddToDiagonal = (): never =>
  runError(texts.IncorrectColumnVectorInAddToDiagonalTxt);
export const IncorrectNumberParameterInAddNumberToDiagonal = (): never =>
  runError(texts.IncorrectNumberParameterInAddNumberToDiagonalTxt);
export const IncorrectVectorParameter = (method: string) => (): never =>
  runError(texts.IncorrectVectorParameterTxt(method));
export const IncorrectMatrixParameterInPowerIterationMethod = (): never =>
  runError(texts.IncorrectMatrixParameterInPowerMethodIterationTxt);
export const IncorrectVectorParameterInPowerIterationMethod = (): never =>
  runError(texts.IncorrectVectorParameterInPowerIterationMethodTxt);
