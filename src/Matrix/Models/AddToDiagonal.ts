"use strict";

import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types";

export const AddNumberToDiagonal = (
  m: MatrixType | NumericMatrix,
  v: number,
): MatrixType | NumericMatrix => {
  const n = Math.min(m.length, m[0].length);
  let i: Integer;
  for (i = n; i--;) {
    m[i][i] += v;
  }
  return m;
};

export const AddVectorToDiagonal = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => {
  const n = Math.min(m.length, m[0].length);
  let i: Integer;
  for (i = n; i--;) m[i][i] += v[i][0];
  return m;
};

export const AddArrayToDiagonal = (
  m: MatrixType | NumericMatrix,
  v: TypedArray | number[],
): MatrixType | NumericMatrix => {
  const n = Math.min(m.length, m[0].length);
  let i: Integer;
  for (i = n; i--;) m[i][i] += v[i];
  return m;
};
