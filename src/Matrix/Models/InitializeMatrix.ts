"use strict";
import { MatrixType, NumericMatrix, TypedArrayConstructor } from "../types.ts";
/**
 * Generates a matrix with a typed array form
 * which is needed for more efficient computations.
 */
export const InitializeMatrix = (
  typedArray: TypedArrayConstructor,
  matrix: NumericMatrix,
  M: MatrixType | undefined,
): MatrixType => {
  let i: number;
  if (!M) M = [];
  else {
    const rows = matrix.length;
    for (i = rows; i--;) {
      M[i] = new typedArray(matrix[i]);
    }
  }
  return M;
};
