"use strict";
import { Integer } from "../types";
import { IsObjectArray } from "./IsObjectArray";
/**
 * Checks if the "value" is a matrix of objects.
 * Utility function for the isArrayOfObjectArraysWithEqualSize method.
 *
 * @param {any | object [][]} value - the current validator parameter, which
 * is expected to be a matrix of objects.
 * @returns {boolean} If the "value" is a matrix of object elements,
 * then returns true, otherwise returns false.
 */
export const IsArrayOfObjectArraysWithEqualSize = (
  value: any | object[][],
): boolean => {
  const n: Integer = value.length;
  let i: Integer, j: Integer, l: Integer | boolean;
  if (!Array.isArray(value[0])) return false;
  else l = value[0].length;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      !Array.isArray(value[j]) || !IsObjectArray(value[j]) ||
      value[j].length !== l ||
      !Array.isArray(value[j + 1]) || !IsObjectArray(value[j + 1]) ||
      value[j + 1].length !== l ||
      !Array.isArray(value[j + 2]) || !IsObjectArray(value[j + 2]) ||
      value[j + 2].length !== l ||
      !Array.isArray(value[j + 3]) || !IsObjectArray(value[j + 3]) ||
      value[j + 3].length !== l
    ) return false;
  }

  for (j = i << 2; j < n; j++) {
    if (
      !Array.isArray(value[j]) || !IsObjectArray(value[j]) ||
      value[j].length !== l
    ) return false;
  }

  return true;
};
