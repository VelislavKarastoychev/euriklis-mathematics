"use strict";
/**
 * Checks if the "value" is an array of functions.
 * Utility function for the isArrayOfFunctions method.
 *
 * @param {Function []} value - the current validator
 * instance, which has to be array of functions.
 * @returns {boolean} if the "value" is an array
 * of functions, returns true, otherwise returns false.
 */
export const IsArrayOfFunctions = (value) => {
  const n = value.length;
  let i, j;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "function" ||
      typeof value[j + 1] !== "function" ||
      typeof value[j + 2] !== "function" ||
      typeof value[j + 3] !== "function"
    ) return false;
  }

  j = i << 2;
  for (; j < n; j++) {
    if (typeof value[j] !== "function") return false;
  }

  return true;
};
