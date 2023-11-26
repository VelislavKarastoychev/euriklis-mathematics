"use strict";

import {
  Integer,
  MatrixType,
  TypedArrayConstructor,
} from "../types";

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
