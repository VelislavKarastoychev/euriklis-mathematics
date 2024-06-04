"use strict";

import type { Integer, MatrixType, NumericMatrix } from "../../Types";

export function ifIsNotRowVectorOrHasInappropriateSizeThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      v: MatrixType | NumericMatrix,
    ) => MatrixType | NumericMatrix = descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      v: MatrixType | NumericMatrix,
    ) {
      const r: Integer = v.length;
      const c: Integer = v[0].length;
      const n = Math.min(matrix.length, matrix[0].length);
      if (r !== 1 || c !== n) error();
      return method.call(this, matrix, v);
    };
  };
}
