"use strict";
import { Integer } from "../types";
import { CheckType } from "./CheckType";
import { IsTypedArray } from "./IsTypedArray";

/**
 * Utility function for the isArrayOfAbstractArraysWithEqualSize
 * Checks if the "value" property is
 * an array of generic or typed arrays with
 * equal size, i.e. if the "value" is an matrix
 * or typed matrix.
 *
 * @param {any} value
 * @returns {boolean} Ture if the "value" is an
 * array of generic or typed arrays with equal
 * size, false otherwise.
 */
export const IsArrayOfAbstractArraysWithEqualSize = (value: any): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer, l: Integer | boolean;
  if (CheckType(value[0], "Array") || IsTypedArray(value[0])) {
    l = value[0].length;
  } else l = false;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      ((!CheckType(value[j], "Array") &&
        !IsTypedArray(value[j])) ||
        value[j].length !== l) ||
      (
        (!CheckType(value[j + 1], "Array") &&
          !IsTypedArray(value[j + 1])) ||
        value[j + 1].length !== l
      ) || (
        (!CheckType(value[j + 2], "Array") &&
          !IsTypedArray(value[j + 2])) ||
        value[j + 2].length !== l
      ) || (
        (!CheckType(value[j + 3], "Array") &&
          !IsTypedArray(value[j + 3])) ||
        value[j + 3].length !== l
      )
    ) {
      return false;
    }
  }

  for (j = i << 2; j < n; j++) {
    if (
      (!CheckType(value[j], "Array") &&
        !IsTypedArray(value[j])) ||
      value[j].length !== l
    ) {
      return false;
    }
  }
  return true;
};
