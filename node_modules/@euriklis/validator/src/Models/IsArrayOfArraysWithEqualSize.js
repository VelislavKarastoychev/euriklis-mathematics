"use strict";

import { CheckType } from "./CheckType.js";

/**
 * Checks if the "value" is an array of
 * arbitrary arrays with equal size.
 * Utility function for the isArrayOfArraysWithEqualSize method.
 *
 * @param {[][]} value - an array of arrays
 * which have to be with equal size.
 * @returns {boolean} Returns true if the value is an array
 * which consists of arrays with equal size, otherwise
 * returns false.
 */
export const IsArrayOfArraysWithEqualSize = (value) => {
  const n = value.length;
  let i, j, l;
  if (CheckType(value[0], "Array")) {
    l = value[0].length;
  } else return false;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") || value[j].length !== l ||
      !CheckType(value[j + 1], "Array") || value[j + 1].length !== l ||
      !CheckType(value[j + 2], "Array") || value[j + 2].length !== l ||
      !CheckType(value[j + 3], "Array") || value[j + 3].length !== l
    ) return false;
  }

  j = i << 2;
  for (; j < n; j++) {
    if (!CheckType(value[j], "Array") || value[j].length !== l) return false;
  }

  return true;
};
