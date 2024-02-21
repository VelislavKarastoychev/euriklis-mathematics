"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Recursively constructs a block matrix from the provided matrix
 * based on the specified starting and ending indices.
 * This function is implemented in very abstract form in order
 * to be applied for tensor structures.
 *
 * @param {NumericMatrix | MatrixType | TypedArray} m - The original matrix or typed array.
 * @param {Integer[]} from - The starting indices for the block.
 * @param {Integer[]} to - The ending indices for the block.
 * @param {TypedArrayConstructor} typedArray - The constructor for the typed array.
 * @param {Integer} k - Iterator parameter for recursion.
 * @returns {MatrixType | TypedArray} - The constructed block matrix or typed array.
 */
const GetBlockIterator = (
  m: NumericMatrix | MatrixType | TypedArray,
  from: [Integer, Integer],
  to: [Integer, Integer],
  typedArray: TypedArrayConstructor | ArrayConstructor,
  k: Integer,
): MatrixType | TypedArray => {
  let i: Integer, j: Integer,
    start: number = from[k],
    n: Integer = to[k] - start + 1,
    block: MatrixType | TypedArray;
  const l = from.length;
  if (k === l - 1) {
    block = new typedArray(n);
    for (i = 0; i < n >> 2;i++) {
      j = i << 2;
      (block as TypedArray)[j] = (m as TypedArray)[j++ + start];
      (block as TypedArray)[j] = (m as TypedArray)[j++ + start];
      (block as TypedArray)[j] = (m as TypedArray)[j++ + start]; 
      (block as TypedArray)[j] = (m as TypedArray)[j + start];
    }
    for (j = i << 2;j < n;j++) {
      (block as TypedArray)[j] = (m as TypedArray)[j + start];
    }
    return block as TypedArray;
  }
  block = new Array(n);
  for (i = n;i--;) {
    block[i] = GetBlockIterator(
      (m as MatrixType)[i + start],
      from,
      to,
      typedArray,
      k + 1,
    ) as TypedArray;
  }

  return block as MatrixType;
};

/**
 * Constructs a block matrix from the provided original matrix
 * based on the specified starting and ending indices.
 *
 * @param {MatrixType | NumericMatrix} m - The original matrix.
 * @param {Integer[]} from - The starting indices for the block.
 * @param {Integer[]} to - The ending indices for the block.
 * @param {NumericType} type - The numeric type of the matrix elements.
 * @returns {MatrixType} - The constructed block matrix.
 */
export const GetBlock = (
  m: MatrixType | NumericMatrix,
  from: [Integer, Integer],
  to: [Integer, Integer],
  type: NumericType,
): MatrixType | NumericMatrix => {
  const typedArray = CreateTypedArrayConstructor(type);

  return GetBlockIterator(m, from, to, typedArray, 0) as MatrixType;
};
