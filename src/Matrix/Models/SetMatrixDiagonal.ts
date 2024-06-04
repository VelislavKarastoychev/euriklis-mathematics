"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../../Types";
import { ComputeDimensions } from "./ComputeDimensions";

/**
 * Sets the diagonal elements of a matrix to a specified number recursively.
 * @param {MatrixType | NumericMatrix | TypedArray | number[]} matrix - The input matrix.
 * @param {MatrixType | NumericMatrix | TypedArray | number[] | number} n - The number to set as the diagonal element.
 * @param {Integer[]} dim - The dimensions of the matrix.
 * @param {Integer} [depth=0] - The current depth of recursion.
 * @param {Integer} [index=0] - The current index of the diagonal element.
 * @returns {MatrixType | NumericMatrix | TypedArray | number[]} The matrix
 * with diagonal elements set to the specified number.
 */
const SetMatrixDiagonalRecursively = (
  matrix: MatrixType | NumericMatrix | TypedArray | number[],
  n: MatrixType | NumericMatrix | TypedArray | number[] | number,
  dim: Integer[],
  depth: Integer = 0,
  index: Integer = 0,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  let i: Integer;
  const l = Math.min(...dim);
  if (depth === dim.length - 1) {
    if (typeof n === "number") matrix[index] = n;
    else matrix[index] = n[0];
  } else {
    let vector: number | number[] | TypedArray;
    for (i = l; i--;) {
      if (typeof n !== "number") {
        if (n.length !== 1) {
          vector = (n as MatrixType | NumericMatrix)[i] as
            | TypedArray
            | number[]
            | number;
        } else {vector = (n as MatrixType | NumericMatrix)[0][i] as
            | TypedArray
            | number[]
            | number;}
      } else vector = n as number;
      (matrix as MatrixType | NumericMatrix)[i] = SetMatrixDiagonalRecursively(
        matrix[i] as MatrixType | NumericMatrix,
        vector,
        dim,
        depth + 1,
        i,
      ) as TypedArray | number[];
    }
  }
  return matrix;
};

/**
 * Sets the diagonal elements of a matrix to a specic number or vector.
 * by using recurrent formulas.
 * @param {MatrixType | NumericMatrix} matrix - The input matrix.
 * @param {number | MatrixType | NumericMatrix} n - The number to set as the diagonal element.
 * @returns {MatrixType | NumericMatrix} The matrix with diagonal elements set to the specified number.
 */

export const SetMatrixDiagonal = (
  matrix: MatrixType | NumericMatrix,
  n: MatrixType | NumericMatrix | number,
): MatrixType | NumericMatrix => {
  const dim = ComputeDimensions(matrix);
  return SetMatrixDiagonalRecursively(matrix, n, dim) as
    | MatrixType
    | NumericMatrix;
};
