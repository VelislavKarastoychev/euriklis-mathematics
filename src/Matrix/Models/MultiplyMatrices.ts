"use strict";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Gets a column of a matrix and stores it in an array.
 *
 * @param {MatrixType | NumericMatrix} m - The matrix from which to get the column.
 * @param {Integer} c - The index of the column to retrieve.
 * @param {Integer} rows - The number of rows in the matrix.
 * @param {number[] | TypedArray} vector - The array to store the column elements.
 */
export function GetColumnAsArray(
  m: MatrixType | NumericMatrix,
  c: Integer,
  rows: Integer,
  vector: number[] | TypedArray,
) {
  let i: Integer, im1: Integer;
  for (i = rows - 1; i > 0; i -= 2) {
    im1 = i - 1;
    vector[i] = m[i][c];
    vector[im1] = m[im1][c];
  }
  if (i === 0) vector[0] = m[0][c];
}

/**
 * Performs scalar multiplication of two vectors.
 *
 * @param {number[] | TypedArray} a - The first vector.
 * @param {number[] | TypedArray} b - The second vector.
 * @returns {number} The result of the scalar multiplication.
 */
export function ScalarMultiplicationOfVecotors(
  a: number[] | TypedArray,
  b: number[] | TypedArray,
): number {
  const n = a.length;
  let i: Integer, c: number = a[n - 1] * b[n - 1], im1: Integer;
  for (i = n - 2; i > 0; i -= 2) {
    im1 = i - 1;
    c += a[i] * b[i] + a[im1] * b[im1];
  }

  if (i === 0) c += a[0] * b[0];
  return c;
}

/**
 * Multiplies two matrices efficiently using optimized techniques.
 *
 * @param {MatrixType | NumericMatrix} a - The first matrix.
 * @param {MatrixType | NumericMatrix} b - The second matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor for the typed array.
 * @returns {MatrixType | NumericMatrix} The result of the matrix multiplication.
 */
export function MultiplyMatrices(
  a: MatrixType | NumericMatrix,
  b: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix {
  const n: Integer = a.length;
  const k: Integer = b.length;
  const m: Integer = b[0].length;
  const c: MatrixType | NumericMatrix = new Array(n);
  let i: Integer,
    j: Integer,
    aj: TypedArray | number[],
    bi: TypedArray | number[] = new typedArray(k),
    bim1: TypedArray | number[] = new typedArray(k);
  for (i = n; i--;) c[i] = new typedArray(m);
  for (i = m - 1; i > 0; i -= 2) {
    GetColumnAsArray(b, i, k, bi);
    GetColumnAsArray(b, i - 1, k, bim1);
    for (j = n - 1; j > 0; j -= 2) {
      aj = a[j];
      c[j][i] = ScalarMultiplicationOfVecotors(aj, bi);
      c[j][i - 1] = ScalarMultiplicationOfVecotors(aj, bim1);
      aj = a[j - 1];
      c[j - 1][i] = ScalarMultiplicationOfVecotors(aj, bi);
      c[j - 1][i - 1] = ScalarMultiplicationOfVecotors(aj, bim1);
    }

    if (j === 0) {
      aj = a[0];
      c[0][i] = ScalarMultiplicationOfVecotors(aj, bi);
      c[0][i - 1] = ScalarMultiplicationOfVecotors(aj, bim1);
    }
  }

  if (i === 0) {
    GetColumnAsArray(b, 0, k, bi);
    for (j = n - 1; j > 0; j -= 2) {
      aj = a[j];
      c[j][0] = ScalarMultiplicationOfVecotors(aj, bi);
      aj = a[j - 1];
      c[j - 1][0] = ScalarMultiplicationOfVecotors(aj, bi);
    }

    if (j === 0) {
      aj = a[0];
      c[0][0] = ScalarMultiplicationOfVecotors(aj, bi);
    }
  }

  return c;
}
