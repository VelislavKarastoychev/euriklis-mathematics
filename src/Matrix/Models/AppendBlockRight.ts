"use strict";
import {
  Integer,
  MatrixType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Iteratively appends a block to the right side of a matrix by recursion.
 *
 * @param {MatrixType | TypedArray} matrix - The current matrix instance or typed array.
 * @param {MatrixType | TypedArray} block - The block to append.
 * @param {TypedArrayConstructor} typedArray - The typed array constructor.
 * @param {Integer} k - Iterator parameter used for switching between cases.
 * @returns {MatrixType | TypedArray} - The result of appending the block.
 */
const AppendBlockRightIterator = (
  matrix: MatrixType | TypedArray,
  block: MatrixType | TypedArray,
  typedArray: TypedArrayConstructor,
  k: Integer,
): MatrixType | TypedArray => {
  const n1 = matrix.length;
  const n2 = block.length;
  const n = n1 + n2;
  let temp: TypedArray | MatrixType;
  if (k) {
    temp = new typedArray(n);
    temp.set(matrix as TypedArray);
    temp.set(block as TypedArray, n1);

    return temp as TypedArray;
  } else {
    let i: Integer;
    temp = [];
    for (i = 0; i < n1; i++) {
      temp[i] = AppendBlockRightIterator(
        (matrix as MatrixType)[i],
        (block as MatrixType)[i],
        typedArray,
        k + 1,
      ) as TypedArray;
    }

    return temp as MatrixType;
  }
};

/**
 * Utility function to append a block to the right side of a matrix.
 *
 * @param {MatrixType} matrix - The current matrix instance.
 * @param {MatrixType} block - The block to append.
 * @param {TypedArrayConstructor} typedArray - The typed array constructor.
 * @returns {MatrixType} - The result of appending the block.
 */
export const AppendBlockRight = (
  matrix: MatrixType,
  block: MatrixType,
  typedArray: TypedArrayConstructor,
): MatrixType =>
  AppendBlockRightIterator(matrix, block, typedArray, 0) as MatrixType;
