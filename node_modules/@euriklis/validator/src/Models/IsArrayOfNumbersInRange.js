"use strict";
/**
 * Checks if the "value" is an array of numbers in some open range (a, b).
 * Utility function for the isArrayOfNumbersInRange method.
 *
 * @param {number []} value - the current validator instance value.
 * @param {number} a - the lower bound of the elements of the "value" array.
 * @param {number} b - the upper bound of the "value" elements in the array.
 * @returns {boolean} if all the elements are numbers in the open interval (a, b) returns true, otherwise returns false.
 */

export const IsArrayOfNumbersInRange = (value, a, b) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || isNaN(value[j]) || value[j] <= a ||
        value[j] >= b) ||
      (typeof value[j + 1] !== "number" || isNaN(value[j + 1]) ||
        value[j + 1] <= a || value[j + 1] >= b) ||
      (typeof value[j + 2] !== "number" || isNaN(value[j + 2]) ||
        value[j + 2] <= a || value[j + 2] >= b) ||
      (typeof value[j + 3] !== "number" || isNaN(value[j + 3]) ||
        value[j + 3] <= a || value[j + 3] >= b)
    ) {
      return false;
    }
  }

  j = i << 2;
  for (; j < n; j++) {
    if (
      (typeof value[j] !== "number" || isNaN(value[j]) || value[j] <= a ||
        value[j] >= b)
    ) {
      areAllNumbersInRange = false;
      break;
    }
  }

  return true;
};
