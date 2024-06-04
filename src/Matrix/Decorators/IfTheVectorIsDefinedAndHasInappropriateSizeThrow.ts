"use strict";
import { Matrix } from "..";
import type { Integer, MatrixType, NumericMatrix } from "../../Types";

export function ifTheVectorIsDefinedAndHasInappropriateSizeThrow(
  error: Function,
  paramIndex: Integer = 1,
) {
  return function (_: any, __: any, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const matrix: MatrixType | NumericMatrix = args[0];
      const vector: MatrixType | NumericMatrix | undefined = args[paramIndex];
      if (vector) {
        if (Matrix.dimensions(matrix)[1] !== Matrix.dimensions(vector)[0]) error();
      }
      return method.apply(this, args)
    };
  };
}
