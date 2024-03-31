"use strict";
export const IncorrectBlockParameterInSetBlockTxt =
  "Incorrect 'block' parameter in setBlock. The 'block' has to be a Matrix or array of arrays with dimensions coresponding to the 'from' and 'to' parameters.";
export const IncorrectEndingRowIndexParameterInExchangeRowsTxt =
  "Incorrect ending row parameter in exchangeRows method. The ending row index has to lie in the closed range [0, rows].";
export const IncorrectFromAndToParametersInGetBlockTxt =
  "Incorrectly defined from and to parameters in getBlock - 'from' values have to be less than or equal to the 'to' values.";
export const IncorrectFromAndToParametersInSetBlockTxt =
  "Incorrectly defined 'from' and 'to' parameters in setBlock - 'from' has to be with values less than or equals to the 'to' and to has to have values less than the dimensions of the matrix.";
export const IncorrectMatrixInputTxt =
  "Incorrect matrix input in the M setter of the Matrix instance. Note that a matrix is an array of numeric arrays with equal length.";
export const IncorrectRowIndexParametersInExchangeRowsTxt =
  "Incorrect row indices in exchangeRows method. Note that the row indices have to be positive integer numbers less than the total matrix rows.";
export const IncorrectFromColumnIndexParameterInExchangeRowsTxt =
  "Incorrect from index parameter in the exchangeRows method. Note that the from index has to be positive integer less than the 'toColumns' parameter.";
export const IncorrectToColumnIndexParameterInExchangeRowsTxt =
  "Incorrect toColumn index parameter in the exchangeRows method. Note that this parameter has to be positive integer less than the total columns of the matrix.";
export const IncorrectColumnIndexParametersInExchangeColumnsTxt =
  "Incorrect column index parameters in exchangeColumns method. Note that these indices have to be positive integers in less than the total columns of the matrix.";
export const IncorrectFromRowIndexParameterInExchangeColumnsTxt =
  "Incorrect fromRow parameter in the exchangeColumns method. Note that this parameter has to be a positive integer less than the toRow index parameter.";
export const IncorrectToRowIndexParameterInExchangeColumnsTxt =
  "Incorrect toRow index parameter in exchangeColumns method. Note that this parameter has to be a positive integer less than the rows of the matrix.";
export const IncorrectRowIndexParameterInGetDiagonalTxt =
  "Incorrect row index parameter in getDiagonal method. Note that this parameter has to be a positive integer less than the total rows of the matrix.";
export const IncorrectBlockParameterInAppendBlockRightTxt =
  "Incorrect block parameter in appendBlockRight method. The block has to be a Matrix, NumericMatrix or MatrixType with the same rows as the initial Matrix instance.";
export const IncorrectBlockParameterInAppendBlockBottomTxt =
  "Incorrect block parameter in appendBlockBottom method. Note that this parameter has to be with the same columns as the initial matrix instance.";
export const IncorrectRowsOrColumnsParameterInReplicateTxt =
  "Incorrect rows or columns parameters in replicate static method. The both rows and columns has to be positive integers greater than zero.";
export const InternalErrorInFrobeniusNormTxt =
  "Internal error in the Frobenius norm method. The elements of the matrix are not numbers or the sum of the squares is negative.";
export const InternalErrorInInfinityNormTxt =
  "Internal error in infiniteNorm method. The matrix elements are not numbers or the norm is negative.";
export const InternalErrorInMaxNormTxt =
  "Internal error in the maxNorm method. The elements of the matrix are incorrectly defined or the norm is negative number.";
export const IncorrectRowsOrColumnsParameterInRandomTxt =
  "Incorrect rows or columns parameter in the random method. Note that both rows and columns have to be positive integers.";
export const IncorrectRowsOrColumnsParametersInZerosTxt =
  "Incorrect rows or columns parameter in the zeros method. Note that rows and columns have to be positive integers.";
export const IncorrectRowsOrColumnsParametersInIdentityLikeTxt =
  "Incorrect rows or columns parameters in identityLike method. Note that both rows and columns have to be positive integers.";
export const IncorrectRowsAndColumnsParametersInReshapeTxt =
  "Incorrectly defined rows and columns in the reshape method. Note that rows and columns have to be positive integers, which product is equals to the product of the rows and the columns of the current Matrix instance.";
export const InternalErrorInNorm1Txt =
  "Internal error in norm1 method. Note that te norm1 has to be a positive number.";
export const InternalErrorInSuperiorTxt =
  "Internal error in superior method. Note probably some of the elements of the matrix is not a number.";
export const InternalErrorInInferiorNormTxt =
  "Internal error in inferior norm getter method. Probably some of the elements of the matrix is not a number.";
export const InternalErrorInSumTxt =
  "Internal error in sumOfAllElements getter method. Probably some of the elements of the matrix is not a number.";
export const InternalErrorInProductTxt =
  "Internal error in the productOfAllElements getter method. Probably some of the elements of the matrix is NaN.";
export const InternalErrorInSquaresTxt =
  "Internal error in sumOfSquaresOfAllElements getter method. Probably some of the elements of the current matrix instance is NaN or the result of the calculation is negative.";
export const InternalErrorInCubesTxt =
  "Internal error in the sumOfCubesOfAllElements getter method. Probably some of the elements of the matrix is NaN.";
export const IncorrectMatrixParameterInPointwiseTxt = (method: string) =>
  `Incorrect Matrix parameter in the ${method} method. Note that this parameter has to be either a number, a Matrix or Matrix - like object.`;
export const MatrixDegenerateTxt = "Matrix degenerate. Small tolerance value.";
export const IncorrectMatricesInput = (method: string): string =>
  `Incorrect matrices input in the method ${method}. Some of the matrices is not a table or the elements are not numbers.`;
export const InappropriateMatrixParameterInToDiagonalMatrixTxt =
  "Inappropriate matrix parameter in toDiagonalMatrix method. The matrix is probably a column vector. To use this method please insert a row vector or a matrix with columns greater than unit.";
export const NonPositiveSemidefinedMatrixInCholeskyLLTxt =
  "Non positive semidefined matrix parameter in Cholesky LL method. Some of the diagonal elements is zero.";
export const NonSymmetricMatrixInLLTxt =
  "Non symmetric matrix parameter in the LL Cholesky factorization method.";
export const NonSquareMatrixInLDLTxt =
  "Non square matrix in LDL method. To use the LDL you have to use a matrix with the same rows and columns.";
export const DiagonalElementClosedToZeroInLDLTxt =
  "The element L[i][i] or D[i] is closed to zero. Matrix degenerate.";
export const IncorrectParametersInTimesTxt =
  "Incorrectly defined parameters in the times method. Note that this method requires a matrix as first argument and a number or matrix with rows which are equals to the first matrix columns.";
export const NonSquareMatrixInInverseTxt =
  "Non square matrix in the inverse method. Only square matrices may be invesed.";
export const IncorrectMethodParameterInInverseTxt =
  "Incorrect method in the inverse method. The method has to be equal to 'Gauss', 'LU', 'iterative - Soleymani' or 'iterative'";
export const IncorrectRowVectorInAddToDiagonalTxt =
  "Incorrect row vector parameter in addRowVectorToDiagonal method. A row vector is in fact a MatrixType or NumericMatrix with rows (length) 1 and columns (matrix[0].length) equals to the min of the matrix rows or columns.";
export const IncorrectColumnVectorInAddToDiagonalTxt =
  "Incorrect column vector parameter in the addColumnVectorToDiagonal method. Note that the 'v' parameter has to be a column vector (MatrixType or NumericMatrix with inner length 1) with size equal to the min(r, c), where the r and c are the rows and the columns of the matrix.";
export const IncorrectNumberParameterInAddNumberToDiagonalTxt =
  "Incorrectly inserted number parameter in the addNumberToDiagonal.The type of the second parameter of the method has to be a number.";
export const IncorrectVectorParameterTxt = (methodName: string): string =>
  `Incorrect vector parameter in ${methodName} method.`;
