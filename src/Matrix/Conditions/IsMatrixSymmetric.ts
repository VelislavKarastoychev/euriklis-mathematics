"use strict";

import { Integer, MatrixType, NumericMatrix } from "../types";
/**
 * Checks if a matrix is symmetric.
 *
 * @param {MatrixType | NumericMatrix} matrix - The matrix to check for symmetry.
 * @returns {boolean} True if the matrix is symmetric, false otherwise.
 */
export const IsMatrixSymmetric = (matrix: MatrixType | NumericMatrix) => {
  const n: Integer = matrix.length;
  let i: Integer, j: number;
  for (i = n; i-- > 0;) {
    const ai = matrix[i];
    for (j = i; j--;) {
      const aj = matrix[j];
      if (ai[j] !== aj[i]) return false;
    }
  }

  return true;
};
