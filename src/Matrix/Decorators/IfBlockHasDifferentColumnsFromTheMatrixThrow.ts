"use strict";

import type { MatrixType, NumericMatrix, NumericType } from "../types";

export function ifBlockHasDifferentColumnsFromTheMatrixThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (
    _: any,
    __: string,
    descriptor: PropertyDescriptor,
  ): void {
    const method: (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ) => MatrixType | NumericMatrix = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ) {
      if (matrix[0].length !== block[0].length) error();

      return method.call(this, matrix, block, type);
    };
  };
}
