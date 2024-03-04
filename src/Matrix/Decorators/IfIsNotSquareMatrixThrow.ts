"use strict";
import { Matrix } from "..";
import { MatrixType, NumericMatrix, NumericType } from "../types";

export function ifIsNotSquareMatrixThrow(error) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      type: NumericType,
    ) => { L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix } =
      descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      type: NumericType,
    ): { L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix } {
      if (!Matrix.isSquare(matrix)) error();
      return method.call(this, matrix, type);
    };
  };
}
