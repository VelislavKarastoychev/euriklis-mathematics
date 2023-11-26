"use strict";
import {
  Integer,
  MatrixType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Retrieves the diagonal or subdiagonal of a matrix as a new Matrix instance.
 *
 * @param {MatrixType} matrix - The matrix from which to extract the diagonal or subdiagonal.
 * @param {Integer} row - The row index for subdiagonal (default is 0).
 * @param {TypedArrayConstructor} typedArray - The TypedArray constructor for the matrix type.
 * @returns {[TypedArray]} - The diagonal or subdiagonal as a new Matrix instance.
 */
export const GetDiagonal = (
  matrix: MatrixType,
  row: Integer,
  typedArray: TypedArrayConstructor = Float64Array,
): [TypedArray] => {
  const n = matrix.length - row;
  const diag: TypedArray = new typedArray(n - row);
  let i: Integer;
  for (i = n; i--;) {
    diag[i] = matrix[i + row][i];
  }
  return [diag];
};
