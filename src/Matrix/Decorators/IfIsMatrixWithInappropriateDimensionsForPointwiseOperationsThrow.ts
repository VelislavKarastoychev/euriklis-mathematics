"use strict";

import { MatrixType, NumericMatrix, NumericType } from "../types";
import { IsNumber } from "../Conditions";
export function ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      m: MatrixType | NumericMatrix | number,
      type: NumericType,
    ) {
      if (!IsNumber(m)) {
        if (
          (m as MatrixType | NumericMatrix).length !== matrix.length &&
          (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
        ) {
          error();
        }
      }
      return method.call(this, matrix, m, type);
    };
  };
}
