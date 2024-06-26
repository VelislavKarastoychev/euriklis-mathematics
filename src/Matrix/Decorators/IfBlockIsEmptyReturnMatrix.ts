"use strict";

import { IsEmpty } from "../Conditions";
import type { MatrixType, NumericMatrix, NumericType } from "../../Types";

export function ifBlockIsEmptyReturnMatrix() {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ) => MatrixType | NumericType = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      block: MatrixType | NumericMatrix,
      type: NumericType,
    ) {
      if (IsEmpty(block)) return matrix;
      return method.call(this, matrix, block, type);
    };
  };
}
