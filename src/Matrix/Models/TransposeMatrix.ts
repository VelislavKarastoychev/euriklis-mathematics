"use strict";

import {
  Integer,
  MatrixType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

export const TransposeMatrix = (
  matrix: MatrixType,
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor,
): MatrixType => {
  const transposed: MatrixType = [];
  const r = matrix.length;
  const c = matrix[0].length;
  let A0: TypedArray,
    A1: TypedArray,
    A2: TypedArray,
    A3: TypedArray,
    B0: TypedArray,
    B1: TypedArray,
    B2: TypedArray,
    B3: TypedArray;
  let i: Integer, j: Integer, p: Integer, q: Integer;
  for (i = c; i--;) transposed[i] = new typedArray(r);
  for (i = 0; i < r >> 2; i++) {
    j = i << 2;
    A0 = matrix[j];
    A1 = matrix[j + 1];
    A2 = matrix[j + 2];
    A3 = matrix[j + 3];
    for (p = 0; p < c >> 2; p++) {
      q = p << 2;

      B0 = transposed[q];
      B1 = transposed[q + 1];
      B2 = transposed[q + 2];
      B3 = transposed[q + 3];

      B0[j] = A0[q];
      B0[j + 1] = A1[q];
      B0[j + 2] = A2[q];
      B0[j + 3] = A3[q];

      B1[j] = A0[q + 1];
      B1[j + 1] = A1[q + 1];
      B1[j + 2] = A2[q + 1];
      B1[j + 3] = A3[q + 1];

      B2[j] = A0[q + 2];
      B2[j + 1] = A1[q + 2];
      B2[j + 2] = A2[q + 2];
      B2[j + 3] = A3[q + 2];
      
      B3[j] = A0[q + 3];
      B3[j + 1] = A1[q + 3];
      B3[j + 2] = A2[q + 3];
      B3[j + 3] = A3[q + 3];
    }

    for (q = p << 2;q < c;q++) {
      B0 = transposed[q];
      B0[j] = A0[q];
      B0[j + 1] = A1[q];
      B0[j + 2] = A2[q];
      B0[j + 3] = A3[q];
    }
  }
  for (j = i << 2;j < r;j++) {
    A0 = matrix[j];
    
  }
  return [new Float32Array(12)];
};
