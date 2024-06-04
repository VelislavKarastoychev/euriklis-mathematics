"use strict";

import type { MatrixType, NumericMatrix, NumericType } from "../../Types";

export function ifBlockHasDifferentRowsFromTheMatrixThrow(
  error: Function,
) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ) => MatrixType | NumericMatrix = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ): MatrixType | NumericMatrix {
      if (matrix.length !== block.length) error();

      return method.call(this, matrix, block, type);
    };
  };
}
