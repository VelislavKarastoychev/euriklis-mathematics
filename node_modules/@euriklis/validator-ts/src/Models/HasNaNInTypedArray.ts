"use strict";
import { Integer } from "../types";
/**
 * Checks if in the elements of the typed array exists a NaN element.
 * Utility funciton used in the isNumberArray, isIntegerArray etc.
 *
 * @param {any} value
 * @returns {boolean} if all the elements of the array are numbers
 * returns false, otherwise returns true.
 */
export const HasNaNInTypedArray = (value: any): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      isNaN(value[j]) ||
      isNaN(value[j + 1]) ||
      isNaN(value[j + 2]) ||
      isNaN(value[j + 3])
    ) {
      return true;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (isNaN(value[j])) {
      return true;
    }
  }

  return false;
};
