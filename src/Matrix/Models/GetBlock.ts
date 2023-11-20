"use strict";

import {
  MatrixType,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Recursively constructs a block matrix from the provided matrix
 * based on the specified starting and ending indices.
 *
 * @param {MatrixType | TypedArray} m - The original matrix or typed array.
 * @param {number[]} from - The starting indices for the block.
 * @param {number[]} to - The ending indices for the block.
 * @param {TypedArrayConstructor} typedArray - The constructor for the typed array.
 * @param {number} k - Iterator parameter for recursion.
 * @returns {MatrixType | TypedArray} - The constructed block matrix or typed array.
 */
const GetBlockIterator = (
  m: MatrixType | TypedArray,
  from: [number, number],
  to: [number, number],
  typedArray: TypedArrayConstructor,
  k: number,
): MatrixType | TypedArray => {
  let i: number,
    start: number = from[k],
    n: number = to[k] - start + 1,
    block: MatrixType | TypedArray;
  if (k) {
    block = new typedArray(n);
    for (i = n; i--;) {
      (block as TypedArray)[i] = (m as TypedArray)[i + start];
    }
    return block as TypedArray;
  } else {
    block = new Array(n);
    for (i = n; i--;) {
      block[i] = GetBlockIterator(
        (m as MatrixType)[i + start],
        from,
        to,
        typedArray,
        k + 1,
      ) as TypedArray;
    }
  }
  
  return block as MatrixType;
};

/**
 * Constructs a block matrix from the provided original matrix
 * based on the specified starting and ending indices.
 *
 * @param {MatrixType} m - The original matrix.
 * @param {number[]} from - The starting indices for the block.
 * @param {number[]} to - The ending indices for the block.
 * @param {NumericType} type - The numeric type of the matrix elements.
 * @returns {MatrixType} - The constructed block matrix.
 */
export const GetBlock = (
  m: MatrixType,
  from: [number, number],
  to: [number, number],
  type: NumericType,
): MatrixType => {
  const typedArray = CreateTypedArrayConstructor(type);
  
  return GetBlockIterator(m, from, to, typedArray, 0) as MatrixType;
};
