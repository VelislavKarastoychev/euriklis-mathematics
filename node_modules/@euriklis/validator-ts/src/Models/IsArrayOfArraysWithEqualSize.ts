"use strict";

import { Integer } from "../types";
import { CheckType } from "./CheckType";

/**
 * Checks if the "value" is an array of
 * arbitrary arrays with equal size.
 * Utility function for the isArrayOfArraysWithEqualSize method.
 *
 * @param {any | [][]} value - an array of arrays
 * which have to be with equal size.
 * @returns {boolean} Returns true if the value is an array
 * which consists of arrays with equal size, otherwise
 * returns false.
 */
export const IsArrayOfArraysWithEqualSize = (value: any | [][]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer, l: Integer | boolean;
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

  for (j = i << 2; j < n; j++) {
    if (!CheckType(value[j], "Array") || value[j].length !== l) return false;
  }

  return true;
};
