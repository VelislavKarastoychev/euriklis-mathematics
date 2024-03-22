"use strict";
import { Integer } from "../types";
import { IsIntegerArray } from "./IsIntegerArray";
/**
 * Checks if the "value" is an array of integer arrays.
 * Utility function for isArrayOfIntegerArrays method.
 *
 * @param {any | Integer [][]} value - the current validator
 * instance value property.
 * @returns {boolean} if the "value" is an arrray of
 * integer arrays returns true, otherwise returns false.
 */
export const IsArrayOfIntegerArrays = (value: any | Integer[][]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !IsIntegerArray(value[j]) ||
      !IsIntegerArray(value[j + 1]) ||
      !IsIntegerArray(value[j + 2]) ||
      !IsIntegerArray(value[j + 3])
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (!IsIntegerArray(value[j])) return false;
  }

  return true;
};
