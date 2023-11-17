"use strict";
import { IsNumberArray } from "./IsNumberArray.js";
/**
 * Checks if the "value" is an array of numeric arrays.
 *
 * @param {number [][]} value - the current validator instance.
 * @returns {boolean} if the "value" is an array of number arrays
 * returns true, otherwise return false.
 */
export const IsArrayOfNumberArrays = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !IsNumberArray(value[j]) ||
      !IsNumberArray(value[j + 1]) ||
      !IsNumberArray(value[j + 2]) ||
      !IsNumberArray(value[j + 3])
    ) {
      console.log(j)
    return false;
    }
  }

  j = i << 2;
  for (; j < n; j++) {
    if (!IsNumberArray(value[j])) return false;
  }

  return true;
};
