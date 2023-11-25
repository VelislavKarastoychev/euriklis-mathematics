"use strict";

import { Integer, MatrixType, NumericType, TypedArray } from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts"

/**
 * @param rows - an integer number greater than zero.
 * @param columns - an integer
 * @param from - a real number
 * @param to - a real number
 * @param type {NumericType} - describes the type of the matrix elements.
 * @param seed - a real number
 * @returns a MatrixType (array of typed arrays)
 */
export const GenerateRandomMatrix = (
  rows: Integer,
  columns: Integer,
  from: Integer,
  to: Integer,
  type: NumericType,
  seed: number,
): MatrixType => {
  const d = [rows, columns];
  function RandomNumberGenerator(
    from: Integer,
    to: Integer,
    k: Integer,
  ): MatrixType | TypedArray | never [] {
    let n = d[k];
    const typedArray = CreateTypedArrayConstructor(type);
    const rand: TypedArray | MatrixType = k ? new typedArray(n) : Array(n);
    if (k) {
      let j = n;
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
      for (let i = n; i--;) rand[i] = RandomNumberGenerator(from, to, k + 1) as TypedArray;
    }
    return rand;
  }
  return RandomNumberGenerator(from, to, 0) as MatrixType;
};
