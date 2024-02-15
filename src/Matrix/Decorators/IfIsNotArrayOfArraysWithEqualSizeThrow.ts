"use strict";
import { IsArrayOfArraysWithEqualSize } from "../Conditions/index.ts";
import { MatrixType, NumericMatrix } from "../types";

export function ifIsNotArrayOfArraysWithEqualSizeThrow(error: Function) {
  return function (_: any, __: string, propertyDescriptor: PropertyDescriptor) {
    const method = propertyDescriptor.value as Function;
    propertyDescriptor.value = function (matrix: MatrixType | NumericMatrix, ...params: any[]) {
      if (!IsArrayOfArraysWithEqualSize(matrix)) error();
      return method.call(this, matrix, ...params);
    };
  };
}
