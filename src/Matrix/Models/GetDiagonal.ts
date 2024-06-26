"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";

/**
 * Retrieves the diagonal or subdiagonal of a matrix as a new Matrix instance.
 *
 * @param {MatrixType} matrix - The matrix from which to extract the diagonal or subdiagonal.
 * @param {Integer} row - The row index for subdiagonal (default is 0).
 * @param {TypedArrayConstructor} typedArray - The TypedArray constructor for the matrix type.
 * @returns {MatrixType | NumericMatrix} - The diagonal or subdiagonal as a new Matrix instance.
 */
export const GetDiagonal = (
  matrix: MatrixType | NumericMatrix,
  row: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor = Float64Array,
): MatrixType | NumericMatrix => {
  const n = matrix.length - row;
  const diag: TypedArray | number[] = new typedArray(n);
  let i: Integer;
  for (i = n; i--;) {
    diag[i] = matrix[i + row][i];
  }
  return [diag] as MatrixType | NumericMatrix;
};

export const GetDiagonalAsColumn = (
  matrix: MatrixType | NumericMatrix,
  row: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor = Float64Array,
): MatrixType | NumericMatrix => {
  const n = matrix.length - row;
  const diag: MatrixType | NumericMatrix = [];
  let i: Integer, di: number[] | TypedArray;
  for (i = n; i--;) {
    di = new typedArray(1);
    di[0] = matrix[i + row][i];
    diag[i] = di;
  }
  return diag;
};
