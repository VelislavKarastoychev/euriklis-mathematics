"use strict";

import { webcrypto } from "crypto";
import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types";

/**
 * Iteratively sets a the elements of a matrix
 * blolck by recursion
 *
 * @param matrix - The current Matrix instance as
 * collection of typed arrays
 * @param block - The block matrix, whoose elements will
 * be used for the setting of the matrix values.
 * @param from - The starting indices of the matrix
 * @param to - The endind indices of the matrix
 * @param k - Iterator parameter used for switching
 * between the cases
 */
const SetBlockIterator = (
  matrix: NumericMatrix | MatrixType | TypedArray,
  block: MatrixType | NumericMatrix | number[],
  from: [Integer, Integer],
  to: [Integer, Integer],
  k: Integer,
): void => {
  const n = to[k] - from[k] + 1;
  let i: Integer;
  if (k) {
    for (i = n; i--;) {
      (matrix as TypedArray)[i + from[k]] = (block as TypedArray | number[])[i];
    }
  } else {
    for (i = n; i--;) {
      SetBlockIterator(
        (matrix as MatrixType)[i + from[k]],
        (block as NumericMatrix)[i],
        from,
        to,
        k + 1,
      );
    }
  }
};

/**
 * Utility function used in setBlock method
 *
 * @param matrix - The current Matrix instance data
 * @param block - A collection of typed arrays or a
 * numeric matrix used for setting of the elements
 * of the "matrix"
 * @param from - Starting indices for setting the elements
 * of the "matrix"
 * @param to - Ending indices for the setting of the elements
 * of the "matrix"
 */
export const SetBlock = (
  matrix: MatrixType | NumericMatrix,
  block: MatrixType | NumericMatrix,
  from: [Integer, Integer],
  to: [Integer, Integer],
): void => SetBlockIterator(matrix, block, from, to, 0);
