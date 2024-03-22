"use strict";

import { Integer } from "../types";

/**
 * Checks if the "value" is an array of negative numbers.
 * Utility function for the isArrayOfNegetiveNumbers.
 *
 * @param {any | number []} value
 * @returns {boolean} if the "value" is an array of
 * negative numbers returns true, otherwise returns false.
 */
export const IsArrayOfNegativeNumbers = (value: any | number[]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || !(value[j] < 0)) ||
      (typeof value[j + 1] !== "number" || !(value[j + 1] < 0)) ||
      (typeof value[j + 2] !== "number" || !(value[j + 2] < 0)) ||
      (typeof value[j + 3] !== "number" || !(value[j + 3] < 0))
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (typeof value[j] !== "number" || !(value[j] < 0)) {
      return false;
    }
  }

  return true;
};
