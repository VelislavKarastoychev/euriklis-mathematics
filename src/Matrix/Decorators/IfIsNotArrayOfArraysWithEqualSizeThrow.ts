"use strict";
import { IsArrayOfArraysWithEqualSize } from "../Conditions/index.ts";
import type { Integer, MatrixType, NumericMatrix } from "../../Types";

export function ifIsNotArrayOfArraysWithEqualSizeThrow(
  error: Function,
  paramIndex: Integer = 0,
) {
  return function (_: any, __: string, propertyDescriptor: PropertyDescriptor) {
    const method = propertyDescriptor.value as Function;
    propertyDescriptor.value = function (...params: any[]) {
      const matrix: MatrixType | NumericMatrix = params[paramIndex];
      if (!IsArrayOfArraysWithEqualSize(matrix)) error();
      return method.call(this, ...params);
    };
  };
}
