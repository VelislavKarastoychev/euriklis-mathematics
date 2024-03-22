"use strict";

import { Integer } from "../types";

/**
 * Checks if the value is an array of number elements
 * utility funtion for the isNumberArray method.
 *
 * @param {any} value - the current validator value.
 * @returns {boolean} if the value is number array returns
 * true, otherwise returns false.
 */
export const IsNumberArray = (value: any): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (typeof value[j] !== "number" || isNaN(value[j])) ||
      (typeof value[j + 1] !== "number" || isNaN(value[j + 1])) ||
      (typeof value[j + 2] !== "number" || isNaN(value[j + 2])) ||
      (typeof value[j + 3] !== "number" || isNaN(value[j + 3]))
    ) {
      return false;
    }
  }
  
  
  for ( j = i << 2; j < n; j++) {
    if (typeof value[j] !== "number" || isNaN(value[j])) {
      return false;
    }
  }

  return true;
};
