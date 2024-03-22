"use strict";

import { Integer } from "../types";

/**
 * Checks if the value is positive numeric array.
 * Utility funciont for isArrayOfPositiveNumbers.
 *
 * @param {any | number []} value
 * @returns {boolean} if the "value" is numeric array
 * with positive elements,returns true, otherwise returns false.
 */
export const IsArrayOfPositiveNumbers = (value: any | number[]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
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

  for (j = i << 2; j < n; j++) {
    if (typeof value[j] !== "number" || value[j] < 0) {
      return false;
    }
  }
  return true;
};
