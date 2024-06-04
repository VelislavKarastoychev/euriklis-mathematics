"use strict";

import { IsArrayOfArraysWithEqualSize } from "../Conditions/index.ts";
import type { Integer, MatrixType, NumericMatrix } from "../../Types";

/**
 * Decorator function to check if the parameter is a number or a matrix-like structure,
 * and throws an error if not.
 *
 * @param {Function} error - The error function to throw if the check fails.
 * @returns {Function} Decorator function.
 */
export function ifIsNotNumberOrMatrixThrow(
  error: Function,
  paramIndex: Integer = 0,
): (_: any, __: string, descriptor: PropertyDescriptor) => any {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const m = args[paramIndex];
      if (
        !IsArrayOfArraysWithEqualSize(m as MatrixType | NumericMatrix) &&
        typeof m !== "number"
      ) error();
      else {
        return method.call(
          this,
          ...args,
        );
      }
    };
  };
}
