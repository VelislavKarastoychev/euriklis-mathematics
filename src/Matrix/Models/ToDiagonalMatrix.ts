"use strict";
import {
  Integer,
  MatrixType,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types.ts";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Recursively constructs a collection of diagonal matrix blocks from a given matrix.
 *
 * @param {ArrayBuffer} buffer - The buffer used for storing the resulting matrix.
 * @param {TypedArray | MatrixType} matrix - The input matrix.
 * @param {Integer} bytes - The number of bytes for each element in the matrix.
 * @param {TypedArrayConstructor} typedArray - The constructor for the typed array.
 * @param {Integer} k - The index used for tracking the iteration.
 * @returns {TypedArray | MatrixType} - The resulting diagonal matrix or submatrix.
 */
const ToDiagonalMatrixIterator = (
  buffer: ArrayBuffer,
  matrix: TypedArray | MatrixType,
  bytes: Integer,
  typedArray: TypedArrayConstructor,
  k: Integer,
): MatrixType | TypedArray => {
  const n: Integer = matrix.length;
  if (k + 1) {
    const [r, c] = [k / n >> 0, k % n];
    const row: TypedArray = new typedArray(
      buffer,
      ((c + r * n) * n) * bytes,
      n,
    );
    row[c] = (matrix as TypedArray)[c];

    return row;
  } else {
    let m: MatrixType = [];
    let i: Integer, j: Integer, l: Integer = (matrix as MatrixType)[0].length;
    for (i = 0; i < n; i++) {
      const mi: TypedArray = (matrix as MatrixType)[i];
      for (j = 0; j < l; j++) {
        const row = ToDiagonalMatrixIterator(
          buffer,
          mi,
          bytes,
          typedArray,
          ++k,
        ) as TypedArray;
        (m as TypedArray[]).push(row);
      }
    }

    return m as MatrixType;
  }
};

/**
 * Calls the ToDiagonalMatrixIterator utility function.
 * Utility function for the toDiagonalMatrix method.
 *
 * @param {MatrixType} matrix - the matrix data of 
 * the current Matrix instance.
 * @param {NumericType} type - the type of the Matrix elements.
 * @returns {MatrixType} The resulting matrix.
 */
export const ToDiagonalMatrix = (
  matrix: MatrixType,
  type: NumericType,
): MatrixType => {
  const bytes: Integer = ComputeBytesLength(type);
  const typedArray: TypedArrayConstructor = CreateTypedArrayConstructor(type);
  const buffer = new ArrayBuffer(
    bytes * matrix.length * matrix[0].length * matrix[0].length,
  );

  return ToDiagonalMatrixIterator(
    buffer,
    matrix,
    bytes,
    typedArray,
    -1,
  ) as MatrixType;
};
