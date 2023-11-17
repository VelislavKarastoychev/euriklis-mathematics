"use strict";
/**
 * Checks if the value is positive numeric array.
 * Utility funciont for isArrayOfPositiveNumbers.
 *
 * @param {number []} value
 * @returns {boolean} if the "value" is numeric array
 * with positive elements,returns true, otherwise returns false.
 */
export const IsArrayOfPositiveNumbers = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || value[j] < 0) ||
      (typeof value[j + 1] !== "number" || value[j + 1] < 0) ||
      (typeof value[j + 2] !== "number" || value[j + 2] < 0) ||
      (typeof value[j + 3] !== "number" || value[j + 3] < 0)
    ) {
      return false;
    }
  }
  j = i << 2;
  for (; j < n; j++) {
    if (typeof value[j] !== "number" || value[j] < 0) {
      return false;
    }
  }
  return true;
};
