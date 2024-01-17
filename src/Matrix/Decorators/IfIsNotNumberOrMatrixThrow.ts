"use strict";

import { Matrix } from "../index.ts";
import { IsArrayOfArraysWithEqualSize, IsNumber } from "../Conditions/index.ts";
import { MatrixType, NumericMatrix } from "../types";

export function ifIsNotNumberOrMatrixThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => any {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    descriptor.value = function (
      m: number | Matrix | MatrixType | NumericMatrix,
    ) {
      if (
        Matrix.isMatrix(m) ||
        IsArrayOfArraysWithEqualSize(m as MatrixType | NumericMatrix) ||
        IsNumber(m)
      ) {
        return method.call(
          this,
          m as number | Matrix | MatrixType | NumericMatrix,
        );
      } else error();
    };
  };
}
