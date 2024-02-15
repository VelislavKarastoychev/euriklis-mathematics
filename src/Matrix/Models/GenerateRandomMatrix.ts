"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Generates a matrix with static random numbers.
 * The utility function is generalized in order to
 * creates tensors if dimensions is with length
 * greater than two.
 * @param {Integer[]} dimensions
 * @param {number} from - a real number
 * @param {number} to - a real number
 * @param {NumericType} type - describes the type of the matrix elements.
 * @param {number} seed - a real number
 * @returns {MatrixType | NumericMatrix} (array of typed arrays)
 */
export const GenerateRandomMatrix = (
  dimensions: Integer[],
  from: Integer,
  to: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  seed: number,
): MatrixType | NumericMatrix => {
  function RandomNumberGenerator(
    from: Integer,
    to: Integer,
    k: Integer = 0,
  ): MatrixType | TypedArray | never[] {
    const n: Integer = dimensions[k];
    const l: Integer = dimensions.length - 1;
    let rand: TypedArray | MatrixType;
    if (k === l) {
      let j = n;
      rand = new typedArray(n);
      for (let i = n >> 1; i--;) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
      }
      if (j) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
      }
      return rand as TypedArray;
    } else {
      rand = new Array(n);
      for (let i = n; i--;) {
        rand[i] = RandomNumberGenerator(from, to, k + 1) as TypedArray;
      }
    }
    return rand;
  }
  return RandomNumberGenerator(from, to) as MatrixType;
};
