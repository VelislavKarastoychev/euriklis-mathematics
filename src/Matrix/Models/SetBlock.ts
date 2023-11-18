"use strict";

import { MatrixType, NumericMatrix, TypedArray } from "../types";

const SetBlockIterator = (
  matrix: MatrixType | TypedArray,
  block: MatrixType | NumericMatrix | number[],
  from: [number, number],
  to: [number, number],
  k: number,
): void => {
  const n = to[k] - from[k] + 1;
  let i: number;
  if (k) {
    for (i = n; i--;) (matrix as TypedArray)[i + from[k]] = (block as TypedArray | number[])[i];
  } else {
    for (i = n; i--;) {
      SetBlockIterator((matrix as MatrixType)[i + from[k]], (block as NumericMatrix)[i], from, to, k + 1);
    }
  }
};

export const SetBlock = (
  matrix: MatrixType,
  block: MatrixType | NumericMatrix,
  from: [number, number],
  to: [number, number],
): void => {
  return SetBlockIterator(matrix, block, from, to, 0);
};
