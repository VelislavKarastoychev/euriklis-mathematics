"use strict";

import { Integer } from "../types";

/**
 * Checks if the value is an array of negative integers.
 * Utility function for the isArrayOfNegativeIntegers method.
 *
 * @param {any | Integer []} value
 * @returns {boolean} if the "value" is an array of negative
 * integers returns true, otherwise, returns false.
 */
export const IsArrayOfNegativeIntegers = (value: any | Integer[]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || !Number.isInteger(value[j]) ||
        !(value[j] < 0)) ||
      (
        typeof value[j + 1] !== "number" || !Number.isInteger(value[j + 1]) ||
        !(value[j + 1] < 0)
      ) || (
        typeof value[j + 2] !== "number" || !Number.isInteger(value[j + 2]) ||
        !(value[j + 2] < 0)
      ) || (
        typeof value[j + 3] !== "number" || !Number.isInteger(value[j + 3]) ||
        !(value[j + 3] < 0)
      )
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (
      (typeof value[j] !== "number" || !Number.isInteger(value[j]) ||
        !(value[j] < 0))
    ) {
      return false;
    }
  }

  return true;
};
