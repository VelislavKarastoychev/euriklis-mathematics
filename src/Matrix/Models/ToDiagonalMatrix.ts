"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Recursively constructs a collection of diagonal matrix blocks from a given matrix.
 *
 * @param {ArrayBuffer} buffer - The buffer used for storing the resulting matrix.
 * @param {TypedArray | MatrixType} matrix - The input matrix.
 * @param {Integer} bytes - The number of bytes for each element in the matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor for the typed array.
 * @param {Integer} k - The index used for tracking the iteration.
 * @returns {TypedArray | MatrixType} - The resulting diagonal matrix or submatrix.
 */
const ToDiagonalMatrixIterator = (
  buffer: ArrayBuffer,
  matrix: TypedArray | MatrixType | NumericMatrix,
  bytes: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  k: Integer,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  const n: Integer = matrix.length;
  if (k + 1) {
    let row: TypedArray | number[];
    const [r, c] = [k / n >> 0, k % n];
    if (typedArray !== Array) {
      row = new (typedArray as TypedArrayConstructor)(
        buffer,
        ((c + r * n) * n) * bytes,
        n,
      );
      row[c] = (matrix as TypedArray)[c];
    } else {
      row = new Array(n).fill(0);
      row[c] = (matrix as number[])[c];
    }

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

    return m as MatrixType | NumericMatrix;
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
  matrix: MatrixType | NumericMatrix,
  type: NumericType,
): MatrixType | NumericMatrix => {
  const bytes: Integer = ComputeBytesLength(type) as Integer;
  const typedArray: TypedArrayConstructor | ArrayConstructor =
    CreateTypedArrayConstructor(type);
  const buffer = new ArrayBuffer(
    bytes * matrix.length * matrix[0].length * matrix[0].length,
  );

  return ToDiagonalMatrixIterator(
    buffer,
    matrix,
    bytes,
    typedArray,
    -1,
  ) as MatrixType | NumericMatrix;
};
