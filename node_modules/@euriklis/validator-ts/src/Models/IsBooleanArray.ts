"use strict";

import { Integer } from "../types";

/**
 * Tests if an array contains only boolean elements.
 * Utility function for the isBooleanArray method.
 *
 * @param {any | boolean[]} value
 * @returns {boolean}
 */
export const IsBooleanArray = (value: any | boolean[]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      typeof value[j] !== "boolean" ||
      typeof value[j + 1] !== "boolean" ||
      typeof value[j + 2] !== "boolean" ||
      typeof value[j + 3] !== "boolean"
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (typeof value[j] !== "boolean") {
      return false;
    }
  }

  return true;
};
