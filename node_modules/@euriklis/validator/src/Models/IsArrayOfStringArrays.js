"use strict";
import { CheckType } from "./CheckType.js";
import { IsStringArray } from "./IsStringArray.js";
/**
 * Checks if the "value" is an array of string
 * arrays with arbitrary length.
 * Utility function for the isArrayOfStringArrays method.
 * @param {string [][]} value - the "value" property
 * of the current validator instance.
 * @returns {boolean} if the "value" is an array of
 * string arrays, returns true, otherwise returns false.
 */
export const IsArrayOfStringArrays = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") || !IsStringArray(value[j]) ||
      !CheckType(value[j + 1], "Array") || !IsStringArray(value[j + 1]) ||
      !CheckType(value[j + 2], "Array") || !IsStringArray(value[j + 2]) ||
      !CheckType(value[j + 3], "Array") || !IsStringArray(value[j + 3])
    ) return false;
  }

  j = i << 2;
  for (; j < n; j++) {
    if (!CheckType(value[j], "Array") || !IsStringArray(value[j])) return false;
  }

  return true;
};
