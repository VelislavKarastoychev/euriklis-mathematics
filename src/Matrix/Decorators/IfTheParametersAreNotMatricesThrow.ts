"use strict";
import { IsArrayOfArraysWithEqualSize } from "../Conditions";
import { MatrixType, NumericMatrix } from "../types";
export function ifTheParametersAreNotMatricesThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => any {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (
      m1: MatrixType | NumericMatrix,
      m2: MatrixType | NumericMatrix,
    ) {
      if (
        !IsArrayOfArraysWithEqualSize(m1) || !IsArrayOfArraysWithEqualSize(m2)
      ) error();
      return method.call(
        this,
        m1 as MatrixType | NumericMatrix,
        m2 as MatrixType | NumericMatrix,
      );
    };
  };
}
