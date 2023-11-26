"use strict";

import { Integer, MatrixType, TypedArrayConstructor } from "../types";

/**
 * Utility function to append a block to the bottom of a matrix.
 *
 * @param {MatrixType} matrix - The current matrix instance.
 * @param {MatrixType} block - The block to append.
 * @param {TypedArrayConstructor} typedArray - The typed array constructor.
 * @returns {MatrixType} - The result of appending the block.
 */
export const AppendBlockBottom = (
  matrix: MatrixType,
  block: MatrixType,
  typedArray: TypedArrayConstructor,
): MatrixType => {
  const n1 = matrix.length;
  const n2 = block.length;
  const n = n1 + n2;
  let i: Integer;
  const extendedMatrix: MatrixType = [];
  for (i = 0; i < n; i++) {
    extendedMatrix[i] = i < n1
      ? new typedArray(matrix[i])
      : new typedArray(block[i - n1]);
  }

  return extendedMatrix;
};
