"use strict";
import { Integer } from "../types";
import { CheckType } from "./CheckType";
import { IsTypedArray } from "./IsTypedArray";

/**
 * Utility function for the isArrayOfAbstractArrays.
 * Checks if the "value" parameter is an array of
 * generic or typed arrays.
 *
 * @param {any} value
 * @returns {boolean} True if the "value" is an
 * array of generic or typed arrays, false otherwise.
 */
export const IsArrayOfAbstractArrays = (value: any): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (!CheckType(value[j], "Array") && !IsTypedArray(value[j])) ||
      (!CheckType(value[j + 1], "Array") && !IsTypedArray(value[j + 1])) ||
      (!CheckType(value[j + 2], "Array") && !IsTypedArray(value[j + 2])) ||
      (!CheckType(value[j + 3], "Array") && !IsTypedArray(value[j + 3]))
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (!CheckType(value[j], "Array") && !IsTypedArray(value[j])) {
      return false;
    }
  }
  return true;
};
