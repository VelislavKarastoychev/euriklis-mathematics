"use strict";
import { IsNumber } from "../Conditions";
import type { MatrixType, NumericMatrix } from "../../Types";

export function ifTheParametersAreMatricesWithInappropriateSizeThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (
      a: number | MatrixType | NumericMatrix,
      b: number | MatrixType | NumericMatrix,
    ): MatrixType | NumericMatrix {
      if (!IsNumber(a) && !IsNumber(b)) {
        const someOfTheMatricesIsNumber =
          ((a as MatrixType | NumericMatrix).length === 1 &&
            (a as MatrixType | NumericMatrix)[0].length === 1) ||
          ((b as MatrixType | NumericMatrix).length === 1 &&
            (b as MatrixType | NumericMatrix)[0].length === 1);
        const matricesAreInappropriate =
          (a as MatrixType | NumericMatrix)[0].length !==
            (b as MatrixType | NumericMatrix).length;

        if (matricesAreInappropriate && !someOfTheMatricesIsNumber) {
          error();
        }
      }
      return method.call(this, a, b);
    };
  };
}
