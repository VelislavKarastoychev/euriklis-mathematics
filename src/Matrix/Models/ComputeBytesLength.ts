"use strict";
import type { NumericType } from "../../Types";

/**
 * Utility function.
 * Computes the length of bytes for each element, given the
 * type of the matrix.
 * @param type - the type of the elements of the matrix
 * @returns the number of bytes of the matrix elements
 */
export const ComputeBytesLength = (type: NumericType) => {
  switch (type) {
    case "int8":
    case "unsignedInt8":
      return 1;
    case "int16":
    case "unsignedInt16":
      return 2;
    case "int32":
    case "unsignedInt32":
      return 4;
    case "float32":
      return 4;
    case "float64":
      return 8;
  }
};
