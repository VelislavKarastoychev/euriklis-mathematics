"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Recursive iterator function to generate a random matrix with unique values.
 * This utility function is implemented in more general way, so it may be used
 * to create a tensor object.
 *
 * @param {Integer[]} dimensions - An array representing the dimensions of the matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor for 
 * the typed array or array to be used for storing the matrix elements.
 * @param {number} from - The lower bound of the random values range.
 * @param {number} to - The upper bound of the random values range.
 * @param {Integer} it - The index indicating the current dimension being processed.
 * @returns {MatrixType | NumericMatrix | TypedArray | number[]} A random matrix or array with unique values.
 */
const GenerateRandomMatrix2Iterator = (
  dimensions: Integer[],
  typedArray: TypedArrayConstructor | ArrayConstructor,
  from: number,
  to: number,
  it: Integer = 0,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  const n = dimensions[it];
  const l = dimensions.length - 1;
  let i: Integer,
    rand: TypedArray | number[] | MatrixType | NumericMatrix;
  if (it === l) {
    const random = Math.random;
    rand = new typedArray(n);
    if (from === 0 && to === 1) {
      for (i = n; i-- > 1;) {
        rand[i--] = random();
        rand[i] = random();
      }

      if (i === 0) rand[0] = random();
    } else {
      const ri = to - from;
      for (i = n; i-- > 1;) {
        rand[i--] = from + ri * random();
        rand[i] = from + ri * random();
      }

      if (i === 0) rand[0] = from + ri * random();
    }
  } else {
    rand = new Array(n);
    for (i = n; i-- > 1;) {
      rand[i--] = GenerateRandomMatrix2Iterator(
        dimensions,
        typedArray,
        from,
        to,
        it + 1,
      ) as number[] | TypedArray;
      rand[i] = GenerateRandomMatrix2Iterator(
        dimensions,
        typedArray,
        from,
        to,
        it + 1,
      ) as number[] | TypedArray;
    }

    if (i === 0) {
      rand[0] = GenerateRandomMatrix2Iterator(
        dimensions,
        typedArray,
        from,
        to,
        it + 1,
      ) as number[] | TypedArray;
    }
  }
  return rand;
};

/**
 * Generates a random matrix with unique values each time the method is called.
 *
 * @param {Integer[]} dimensions - An array representing the dimensions of the generated matrix.
 * @param {number} from - The lower bound of the random values range.
 * @param {number} to - The upper bound of the random values range.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor
 * for the typed array or array to be used for storing the matrix elements.
 * @returns {MatrixType | NumericMatrix} A random matrix with unique values.
 */
export const GenerateRandomMatrix2 = (
  dimensions: Integer[],
  from: number,
  to: number,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  return GenerateRandomMatrix2Iterator(
    dimensions,
    typedArray,
    from,
    to,
  ) as MatrixType | NumericMatrix;
};
