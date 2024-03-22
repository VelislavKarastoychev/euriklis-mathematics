"use strict";
import { Integer } from "../types";
import { CheckType } from "./CheckType";
import { IsStringArray } from "./IsStringArray";
/**
 * Checks if the "value" is an array of string
 * arrays with arbitrary length.
 * Utility function for the isArrayOfStringArrays method.
 * @param {any | string [][]} value - the "value" property
 * of the current validator instance.
 * @returns {boolean} if the "value" is an array of
 * string arrays, returns true, otherwise returns false.
 */
export const IsArrayOfStringArrays = (value: any | string[][]): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !CheckType(value[j], "Array") || !IsStringArray(value[j]) ||
      !CheckType(value[j + 1], "Array") || !IsStringArray(value[j + 1]) ||
      !CheckType(value[j + 2], "Array") || !IsStringArray(value[j + 2]) ||
      !CheckType(value[j + 3], "Array") || !IsStringArray(value[j + 3])
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (!CheckType(value[j], "Array") || !IsStringArray(value[j])) return false;
  }

  return true;
};
