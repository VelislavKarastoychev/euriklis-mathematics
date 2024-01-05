"use strict";
import { IsArrayOfArraysWithEqualSize } from "../Conditions/index.ts";
import { MatrixType, NumericMatrix } from "../types";

export function ifIsNotArrayOfArraysWithEqualSizeThrow(error: Function) {
  return function (_: any, __: string, propertyDescriptor: PropertyDescriptor) {
    const setter = propertyDescriptor.set as Function;
    propertyDescriptor.set = function (matrix: MatrixType | NumericMatrix) {
      if (!IsArrayOfArraysWithEqualSize(matrix)) error();
      setter.call(this, matrix);
    };
  };
}
