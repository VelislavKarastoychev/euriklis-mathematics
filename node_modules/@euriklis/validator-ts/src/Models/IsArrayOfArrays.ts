"use strict";

import { Integer } from "../types";
import { CheckType } from "./CheckType";

/**
 * Checks if the "value" is an array of arbitrary array
 * elements.
 *
 * @param {any} value - an array of arbitrary arrays.
 * @returns {boolean} if the "value" is an array whoose
 * elements are all arbitrary arrays.
 */
export const IsArrayOfArrays = (value: any | [][]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") ||
      !CheckType(value[j + 1], "Array") ||
      !CheckType(value[j + 2], "Array") ||
      !CheckType(value[j + 3], "Array")
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (!CheckType(value[j], "Array")) return false;
  }
  return true;
};
