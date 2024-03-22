"use strict";
import { Integer } from "../types";
import { CheckType } from "./CheckType";
import { IsStringArray } from "./IsStringArray";
/**
 * Implements the isArrayOfStringArraysWithEqualSize method.
 * @param {any | string [][]} value - the current validator "value" property.
 * @returns {boolean} if the "value" is string matrix, returns true, otherwise returns false.
 */
export const IsArrayOfStringArraysWithEqualSize = (
  value: any | string[][],
): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer, l: Integer | boolean;
  if (!CheckType(value[0], "Array")) return false;
  else l = value[0].length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") || !IsStringArray(value[j]) ||
      value[j].length !== l ||
      !CheckType(value[j], "Array") || !IsStringArray(value[j + 1]) ||
      value[j + 1].length !== l ||
      !CheckType(value[j + 2], "Array") || !IsStringArray(value[j + 2]) ||
      value[j + 2].length !== l ||
      !CheckType(value[j + 3], "Array") || !IsStringArray(value[j + 3]) ||
      value[j + 3].length !== l
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (
      !CheckType(value[j], "Array") || !IsStringArray(value[j]) ||
      value[j].length !== l
    ) return false;
  }

  return true;
};
