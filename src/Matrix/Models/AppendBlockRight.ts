"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";

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
  matrix: NumericMatrix | MatrixType | TypedArray,
  block: NumericMatrix | MatrixType | TypedArray,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  k: Integer,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  const n1: Integer = matrix.length;
  const n2: Integer = block.length;
  const n: Integer = n1 + n2;
  let i: Integer;
  let temp: TypedArray | NumericMatrix | MatrixType | number[];
  if (k) {
    temp = new typedArray(n);
    if (typedArray !== Array) {
      (temp as TypedArray).set(matrix as TypedArray);
      (temp as TypedArray).set(block as TypedArray, n1);
    } else {
      for (i = n1; i-- > 1;) temp[i] = matrix[i];
      if (i === 0) temp[0] = matrix[0];
      for (i = n2; i-- > 1;) temp[i + n1] = block[i];
      if (i === 0) temp[n1] = block[0];
    }
  } else {
    temp = [];
    for (i = 0; i < n1; i++) {
      temp[i] = AppendBlockRightIterator(
        (matrix as MatrixType)[i],
        (block as MatrixType)[i],
        typedArray,
        k + 1,
      ) as TypedArray | number[];
    }
  }

  return temp;
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
  matrix: NumericMatrix | MatrixType,
  block: NumericMatrix | MatrixType,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix =>
  AppendBlockRightIterator(matrix, block, typedArray, 0) as
    | MatrixType
    | NumericMatrix;
