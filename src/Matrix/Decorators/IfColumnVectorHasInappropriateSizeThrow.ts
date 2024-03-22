"use strict";

import { Integer, MatrixType, NumericMatrix } from "../types";

export function ifColumnVectorHasInappropriateSizeThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      v: MatrixType | NumericMatrix,
    ) => void = descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      v: MatrixType | NumericMatrix,
    ): MatrixType | NumericMatrix {
      const r = v.length;
      const c = v[0].length;
      const n = Math.min(matrix.length, matrix[0].length);
      if (r !== n && c !== 1) error();
      return method.call(this, matrix, v);
    };
  };
}
