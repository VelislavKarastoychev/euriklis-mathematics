"use strict";

import { Matrix } from "..";
import { MatrixType, NumericMatrix } from "../types";

export function ifSecureAndNotSymmetricThrow(error: Function) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: (
      matrix: MatrixType | NumericMatrix,
      secure: boolean,
    ) => MatrixType | NumericMatrix = descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      secure: boolean,
    ) {
      if (secure) {
        if (!Matrix.isSymmetric(matrix)) error();
      }

      return method.call(this, matrix, secure);
    };
  };
}
