"use strict";
import { IsComplexNumber, IsComplexMatrix } from "../Conditions";
import type { ComplexMatrix, ComplexNumber } from "../types";

export function ifIsNotComplexNumberOrComplexMatrixThrow(
  error: Function,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const setter = descriptor.set;
    descriptor.set = function (z: ComplexNumber | ComplexMatrix) {
      if (!IsComplexNumber(z) && !IsComplexMatrix(z)) error();
    }
  };
}
