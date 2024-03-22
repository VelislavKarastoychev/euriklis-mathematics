"use strict";
import { Integer } from "../types";
import { CheckType } from "./CheckType";
import { IsIntegerArray } from "./IsIntegerArray";
/**
 * Implements the isArrayOfIntegerArraysWithEqualSize.
 *
 * @param {any | number [][]} value - the current validator value property.
 * @returns {boolean} if the "value" is an array of integer arrrays with equal size returns true, otherwise returns false.
 */
export const IsArrayOfIntegerArraysWithEqualSize = (
  value: any | Integer[][],
): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer, l: Integer | boolean;
  if (!CheckType(value[0], "Array")) return false;
  else l = value[0].length;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !IsIntegerArray(value[j]) || value[j].length !== l ||
      !IsIntegerArray(value[j + 1]) || value[j + 1].length !== l ||
      !IsIntegerArray(value[j + 2]) || value[j + 2].length !== l ||
      !IsIntegerArray(value[j + 3]) || value[j + 3].length !== l
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (!IsIntegerArray(value[j]) || value[j].length !== l) return false;
  }

  return true;
};
