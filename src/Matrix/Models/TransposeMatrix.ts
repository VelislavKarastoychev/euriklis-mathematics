"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Transposes a matrix.
 *
 * @param {MatrixType} matrix - The 
 * matrix to be transposed.
 * @param {number} rows - The 
 * number of rows in the original matrix.
 * @param {number} columns - The 
 * number of columns in the original matrix.
 * @param {TypedArrayConstructor} typedArray - The 
 * constructor for the TypedArray type used in the matrix.
 * @returns {MatrixType} - Returns 
 * a new matrix representing the transposed matrix.
 */
export const TransposeMatrix = (
  matrix: MatrixType | NumericMatrix,
  rows: number,
  columns: number,
  typedArray: TypedArrayConstructor,
): MatrixType => {
  let i: Integer,
    j: Integer,
    transposed = Array(columns),
    A0: TypedArray | number [],
    A1: TypedArray | number [],
    Bj: TypedArray | number [];
  for (j = 0; j < columns; j++) transposed[j] = new typedArray(rows);
  for (i = rows - 1; i >= 1; i -= 2) {
    A1 = matrix[i];
    A0 = matrix[i - 1];
    for (j = columns - 1; j >= 1; --j) {
      Bj = transposed[j];
      Bj[i] = A1[j];
      Bj[i - 1] = A0[j];
      --j;
      Bj = transposed[j];
      Bj[i] = A1[j];
      Bj[i - 1] = A0[j];
    }
    if (j === 0) {
      Bj = transposed[0];
      Bj[i] = A1[0];
      Bj[i - 1] = A0[0];
    }
  }
  if (i === 0) {
    A0 = matrix[0];
    for (j = columns - 1; j >= 1; j -= 2) {
      transposed[j][0] = A0[j];
      transposed[j - 1][0] = A0[j - 1];
    }
    if (j === 0) transposed[0][0] = A0[0];
  }
  
  return transposed;
};
