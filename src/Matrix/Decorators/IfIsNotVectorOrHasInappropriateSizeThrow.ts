"use strict";

import { IsArrayOfArraysWithEqualSize } from "../Conditions";
import type { MatrixType, NumericMatrix, NumericType } from "../../Types";

export function ifIsNotVectorOrHasInappropriateSizeThrow(
  error: Function,
  axis: "row" | "column" = "row",
) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      vector: MatrixType | NumericMatrix,
      type: NumericType,
      mode: "row" | "column",
    ) => MatrixType | NumericMatrix = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      vector: MatrixType | NumericMatrix,
      type: NumericType,
      mode: "row" | "column" = "row",
    ): MatrixType | NumericMatrix {
      // check if the vector is correctly defined:
      if (!IsArrayOfArraysWithEqualSize(vector)) error();
      // check if the dimensions of the vector are correct.
      if (axis === "row") {
        if (mode === "row") {
          if (vector.length !== 1 || vector[0].length !== matrix.length) {
            error();
          }
        }
        if (mode === "column") {
          if (vector.length !== matrix.length || vector[0].length !== 1) {
            error();
          }
        }
      } else {
        if (mode === "row") {
          if (vector.length !== 1 || vector[0].length !== matrix[0].length) {
            error();
          }
        }
        if (mode === "column") {
          if (vector.length !== matrix[0].length || vector[0].length !== 1) {
            error();
          }
        }
      }

      return method.call(this, matrix, vector, type, mode);
    };
  };
}
