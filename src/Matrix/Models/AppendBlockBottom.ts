"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Recursively (recurrently) appends a block to the bottom
 * of a matrix.
 *
 * Note that this utility function is implemented in a general form and
 * allows to be used also for appending of elements to tensor.
 *
 * @param {MatrixType | NumericMatrix} x - A matrix
 * @param {MatrixType | NumericMatrix} y - A matrix
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The
 * typeedArray constructor of the extended matrix (z).
 * @param {Integer} dimensions - The dimensions of the matrix (in this library is two).
 * @param {Integer} k - The iterator counter.
 * @returns {MatrixType | NumericMatrix | TypedArray | number[]}
 */
const AppendBlockBottomIterator = (
  x: MatrixType | NumericMatrix | TypedArray | number[],
  y: MatrixType | NumericMatrix | TypedArray | number[],
  typedArray: TypedArrayConstructor | ArrayConstructor,
  dimensions: Integer,
  k: Integer = 0,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  const n1 = x.length;
  const n2 = y.length;
  let i: Integer, j: Integer;
  let z: MatrixType | NumericMatrix | TypedArray | number[];
  if (k === dimensions - 1) {
    if (typedArray === Array) {
      z = new typedArray(n1);
      for (i = 0; i < n1 >> 2; i++) {
        j = i << 2;
        z[j] = x[j++];
        z[j] = x[j++];
        z[j] = x[j++];
        z[j] = x[j];
      }

      for (j = i << 2; j < n1; j++) {
        z[j] = x[j];
      }
    } else z = new (typedArray as TypedArrayConstructor)(x as TypedArray);
  } else {
    z = new Array(n1 + n2);
    for (i = n1; i--;) {
      z[i] = AppendBlockBottomIterator(
        (x as MatrixType | NumericMatrix)[i],
        (y as MatrixType | NumericMatrix)[i],
        typedArray,
        dimensions,
        k + 1,
      ) as TypedArray | number[];
    }

    for (i = n2; i--;) {
      z[i + n1] = AppendBlockBottomIterator(
        (y as MatrixType | NumericMatrix)[i],
        (x as MatrixType | NumericMatrix)[i],
        typedArray,
        dimensions,
        k + 1,
      ) as TypedArray | number[];
    }
  }

  return z;
};

/**
 * Utility function to append a block to the bottom of a matrix.
 * The abstract implementation allows to be used also for tensors.
 *
 * @param {MatrixType | NumericMatrix} matrix - The current matrix instance.
 * @param {MatrixType | NumericMatrix} block - The block to append.
 * @param {TypedArrayConstructor} typedArray - The typed array constructor.
 * @param {Integer} dimensions - The dimensions of the matrix (in this library is two).
 * @returns {MatrixType | NumericMatrix} - The result of appending the block.
 */
export const AppendBlockBottom = (
  matrix: MatrixType | NumericMatrix,
  block: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  dimensions: Integer,
): MatrixType | NumericMatrix =>
  AppendBlockBottomIterator(matrix, block, typedArray, dimensions) as
    | MatrixType
    | NumericMatrix;
