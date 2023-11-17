"use strict";

import { CheckType } from "./CheckType.js";

/**
 * Checks if the "value" is an array of arbitrary array
 * elements.
 * 
 * @param {[][]} value - an array of arbitrary arrays.
 * @returns {boolean} if the "value" is an array whoose
 * elements are all arbitrary arrays.
 */
export const IsArrayOfArrays = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0;i < n >> 2;i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") ||
      !CheckType(value[j + 1], "Array") ||
      !CheckType(value[j + 2], "Array") ||
      !CheckType(value[j + 3], "Array") 
    ) return false;
  }

  j = i << 2;
  for (;j < n;j++) {
    if (!CheckType(value[j], "Array")) return false;
  }
  return true;
}
