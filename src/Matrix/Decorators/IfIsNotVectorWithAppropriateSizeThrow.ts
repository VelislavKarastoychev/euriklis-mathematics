"use strict";
import { ComputeDimensions } from "../Models";
import { Integer, MatrixType, NumericMatrix } from "../types";

export function ifIsNotVectorWithAppropriateSizeThrow(
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
    ): MatrixType | NumericMatrix {
      const dimMatrix: Integer[] = ComputeDimensions(matrix);
      const dimVector: Integer[] = ComputeDimensions(v);
      const l: Integer = Math.min(...dimMatrix);
      if (dimVector[0] === 1) {
        if (dimVector[1] !== l) error();
      } else if (dimVector[0] !== l) error();
      return method.call(this, matrix, v);
    };
  };
}
