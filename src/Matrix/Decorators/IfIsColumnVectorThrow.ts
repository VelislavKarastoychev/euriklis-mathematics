"use strict";

import { MatrixType, NumericMatrix, NumericType } from "../types";

export function ifIsColumnVectorThrow(error: Function): Function {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      type: NumericType,
    ) => MatrixType | NumericMatrix = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      type: NumericType,
    ): MatrixType | NumericMatrix {
      if (matrix[0].length === 1) error();
      return method.call(this, matrix, type);
    };
  };
}
