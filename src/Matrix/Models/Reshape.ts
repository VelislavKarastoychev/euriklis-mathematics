"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArrayConstructor,
} from "../../Types";
/**
 * Reshapes the provided matrix with the specified number of rows and columns.
 *
 * @param {MatrixType | NumericMatrix} matrix - The input matrix.
 * @param {Integer} mrows - The original number of rows in the matrix.
 * @param {Integer} mcolumns - The original number of columns in the matrix.
 * @param {Integer} rows - The number of rows for the reshaped matrix.
 * @param {Integer} columns - The number of columns for the reshaped matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor for the typed array.
 * @returns {MatrixType | NumericMatrix} The reshaped matrix data.
 */
export const Reshape = (
  matrix: MatrixType | NumericMatrix,
  mrows: Integer,
  mcolumns: Integer,
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  const reshaped: MatrixType | NumericMatrix = [];
  let i: Integer, j: Integer, r: Integer = mrows - 1, c: Integer = mcolumns - 1;
  for (i = rows; i--;) {
    reshaped[i] = new typedArray(columns);
    for (j = columns; j-- > 1;) {
      if (c === -1) {
        r--;
        c = mcolumns - 1;
      }
      reshaped[i][j--] = matrix[r][c--];
      if (c === -1) {
        r--;
        c = mcolumns - 1;
      }
      reshaped[i][j] = matrix[r][c--];
    }

    if (j === 0) {
      if (c === -1) {
        r--;
        c = mcolumns - 1;
      }
      reshaped[i][0] = matrix[r][c--];
    }
  }

  return reshaped;
};
