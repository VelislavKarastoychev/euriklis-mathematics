"use strict";
import validator from "@euriklis/validator";
import { MatrixDeclaration } from "../types";

export const IsMatrixDeclaration = (options: MatrixDeclaration): boolean => {
  return new validator(options).interface({
    M: (matrix) =>
      matrix.isArrayOfArraysWithEqualSize
        .or.isArrayAndForEvery((row) => row.isTypedArray),
    type: (t) =>
      t.isUndefined.or.isSameWithAny([
        "int8",
        "unsignedInt8",
        "unsignedClampedInt8",
        "int16",
        "unsignedInt16",
        "int32",
        "unsignedInt32",
        "float32",
        "float64",
      ]),
  }).answer;
};
