"use strict";
import { CheckType } from "./CheckType.js";
import { IsNumberArray } from "./IsNumberArray.js";

/**
 * Checks if the "value" is a numeric matrix.
 *
 * @param {number [][]} value - the current validator instance value.
 * @returns {boolean} If the "value" is a numeric matrix
 * returns true, otherwise returns false.
 */
export const IsArrayOfNumberArraysWithEqualSize = (value) => {
  const n = value.length;
  let i, j, l;
  if (!CheckType(value[0], "Array")) return false;
  else l = value[0].length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !IsNumberArray(value[j]) || value[j].length !== l ||
      !IsNumberArray(value[j + 1]) || value[j + 1].length !== l ||
      !IsNumberArray(value[j + 2]) || value[j + 2].length !== l ||
      !IsNumberArray(value[j + 3]) || value[j + 3].length !== l
    ) return false;
  }

  j = i << 2;
  for (;j < n;j++) {
    if (!IsNumberArray(value[j]) || value[j].length !== l) return false;
  }

  return true;
};
