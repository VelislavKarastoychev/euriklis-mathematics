"use strict";
import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types.ts";

/**
 * Copies elements from a TypedArray to a regular array.
 *
 * @param {TypedArray} m1 - The source TypedArray.
 * @param {number[]} m2 - The destination array to which elements are copied.
 * @returns {void} - This function does not return a value; it directly modifies the destination array.
 */
const AssignRow = (m1: TypedArray, m2: number[]): void => {
  const n = m1.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    m2[j] = m1[j];
    m2[j + 1] = m1[j + 1];
    m2[j + 2] = m1[j + 2];
    m2[j + 3] = m1[j + 3];
  }
  j = i << 2;
  for (; j < n; j++) {
    m2[j] = m1[j];
  }
};

/**
 * Converts a matrix represented as a TypedArray of numbers into a regular numeric matrix.
 *
 * @param {MatrixType} m - The matrix represented as a TypedArray.
 * @returns {NumericMatrix} - The numeric matrix.
 */
export const ObtainMatrixFromTypedMatrix = (m: MatrixType): NumericMatrix => {
  const n: Integer = m.length, matrix: number[][] = [];
  let i: Integer;
  for (i = n; i--;) AssignRow(m[i], matrix[i] = []);
  return matrix;
};
