"use strict";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

export const GetColumnAsArray = (
  m: MatrixType | NumericMatrix,
  c: Integer,
  rows: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
) => {
  let i: Integer, j: Integer;
  const vector: number[] | TypedArray = new typedArray(rows);
  for (i = 0; i < rows >> 2; i++) {
    j = i << 2;
    vector[j] = m[j++][c];
    vector[j] = m[j++][c];
    vector[j] = m[j++][c];
    vector[j] = m[j][c];
  }

  for (j = i << 2; j < rows; j++) {
    vector[j] = m[j][c];
  }

  return vector;
};

export const ScalarMultiplicationOfVecotors = new Function(
  "a",
  "b",
  `
   const n = a.length;
   let i, j, c = 0;
   
   for (i = 0;i < n >> 2;i++) {
      j = i << 2;
      c += a[j] * b[j] + a[j + 1] * b[j + 1] + a[j + 2] * b[j + 2] * a[j + 3] * b[j + 3];
   }
   
   for (j = i << 2;j < n;j++) c += a[j] * b[j];

   return c;
  `,
);

export const MultiplyMatrices = (
  a: MatrixType | NumericMatrix,
  b: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  const n = a.length;
  const columns = a[0].length;
  const m = b[0].length;
  const c: MatrixType | NumericMatrix = new Array(n);
  let i: Integer,
    j: Integer,
    ai: TypedArray | number[],
    bj: TypedArray | number[];
  if (columns > 50) {
    for (i = n; i--;) {
      ai = a[i];
      c[i] = new typedArray(m);
      for (j = 0; j < m; j++) {
        bj = GetColumnAsArray(b, j, columns, typedArray);
        c[i][j] = ScalarMultiplicationOfVecotors(ai, bj);
      }
    }
  } else {
    let k: Integer;
    for (i = n; i--;) {
      ai = a[i];
      c[i] = new typedArray(m);
      for (j = m; j--;) {
        c[i][j] = 0;
        for (k = columns; k-- > 1;) {
          c[i][j] = ai[k] * b[k--][j];
          c[i][j] = ai[k] * b[k][j];
        }

        if (k === 0) c[i][j] += ai[0] * b[0][j];
      }
    }
  }
  return c;
};
