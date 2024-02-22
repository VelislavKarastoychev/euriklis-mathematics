"use strict";
import { Integer, MatrixType, NumericMatrix, NumericType } from "../types";
/**
 * Decorator function for the getDiagonal method.
 * @param {Function} error - The error which will be thrown if the condition is
 * not fulfiled.
 * @returns {Function} The method getDiagonal
 * @throws {Error} If the row condition is fulfilled, then the error function
 * will be executed.
 */
export function ifRowParameterIsInappropriatelyDefinedThrow(
  error: Function,
): Function {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      row: Integer = 0,
      type: NumericType,
    ) {
      if (row < 0 || row >= matrix.length) {
        error();
      }

      return method.call(this, matrix, row, type);
    };
  };
}
