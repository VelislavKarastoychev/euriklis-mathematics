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

const ToDiagonalMatrixIterator = (
  buffer: ArrayBuffer,
  matrix: TypedArray | MatrixType,
  bytes: Integer,
  typedArray: TypedArrayConstructor,
  r: Integer,
  c: Integer,
): MatrixType | TypedArray => {
  const n: Integer = matrix.length;
  if (r || c) {
    const row: TypedArray = new typedArray(buffer, (r * n + c) * bytes, n);
    row[c] = (matrix as TypedArray)[c];

    return row;
  } else {
    let m: MatrixType = [];
    let i: Integer, j: Integer, k: Integer = (matrix as MatrixType)[0].length;
    for (i = 0; i < n; i++) {
      const mi: TypedArray = (matrix as MatrixType)[i];
      for (j = 0; j < k; j++) {
        const row = ToDiagonalMatrixIterator(
          buffer,
          mi,
          bytes,
          typedArray,
          i,
          j,
        ) as TypedArray;
        (m as TypedArray[]).push(row);
      }
    }

    return m as MatrixType;
  }
};

export const ToDiagonalMatrix = (
  matrix: MatrixType,
  type: NumericType,
): MatrixType => {
  const bytes: Integer = ComputeBytesLength(type);
  const typedArray: TypedArrayConstructor = CreateTypedArrayConstructor(type);
  const buffer = new ArrayBuffer(
    bytes * matrix.length * matrix.length * matrix[0].length,
  );

  return ToDiagonalMatrixIterator(buffer, matrix, bytes, typedArray, 0, 0) as MatrixType;
};
