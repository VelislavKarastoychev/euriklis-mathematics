"use strict";

import { Integer } from "../types";

/**
 * Checks if all the elements of the array are integers.
 * Utility function used in isIntegerArray method.
 *
 * @param {any | Integer []} value
 * @returns {boolean} if all values are integers, then it will be
 * set to true, otherwise the output will be false.
 */
export const IsIntegerArray = (value: any | Integer[]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || !Number.isInteger(value[j])) || (
        typeof value[j + 1] !== "number" || !Number.isInteger(value[j + 1])
      ) ||
      (typeof value[j + 2] !== "number" || !Number.isInteger(value[j + 2])) || (
        typeof value[j + 3] !== "number" || !Number.isInteger(value[j + 3])
      )
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (typeof value[j] !== "number" || !Number.isInteger(value[j])) {
      return false;
    }
  }
  return true;
};
