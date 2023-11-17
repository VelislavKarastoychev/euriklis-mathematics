"use strict";
/**
 * Checks if the "value" is an array of integers in the
 * open interval (a, b).
 * Utility function for the isArrayOfIntegersInRange.
 *
 * @param {number []} value an array of integers.
 * @param {number} a - the lower bound of the value elements.
 * @param {number} b - the upper bound of the value elements.
 * @returns {boolean} if the "value" property is integer array in the open interval (a, b) returns true, otherwise returns false.
 */
export const IsArrayOfIntegersInRange = (value, a, b) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (!Number.isInteger(value[j]) || !(value[j] > a && value[j] < b)) ||
      (!Number.isInteger(value[j + 1]) ||
        !(value[j + 1] > a && value[j + 1] < b)) ||
      (!Number.isInteger(value[j + 2]) ||
        !(value[j + 2] > a && value[j + 2] < b)) ||
      (!Number.isInteger(
        value[j + 3],
      ) || !(value[j + 3] > a && value[j + 3] < b))
    ) {
      return false;
    }
  }
  j = i << 2;
  for (; j < n; j++) {
    if (
      (!Number.isInteger(value[j]) || !(value[j] > a && value[j] < b))
    ) {
      return false;
    }
  }

  return true;
};
