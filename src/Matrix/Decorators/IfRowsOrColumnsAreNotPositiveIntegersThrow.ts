"use strict";
import { Integer } from "../types";
/**
 * If the rows or the columns are not positive
 * integers throws error message, otherwise executes
 * the defined method.
 *
 * @param {Function} error - a function which throws
 * the specified error for the method
 * @param {Integer} rowIndex - the index of the row
 * parameter in the ...args list of the method.
 * @param {Integer} columnIndex - the index of the
 * column parameter in the ...args list of the
 * method parameters.
 * @returns {(_: any, __: string, descriptor: any) => any} the result of
 * the method execution.
 */
export function ifRowsOrColumnsAreNotPositiveIntegersThrow(
  error: Function,
  rowIndex: Integer = 0,
  columnIndex: Integer = 1,
): (_: any, __: string, descriptor: any) => any {
  return function (_: any, __: string, descriptor: any) {
    const methodFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (
        args[rowIndex] <= 0 || args[columnIndex] <= 0 ||
        !Number.isInteger(args[rowIndex]) ||
        !Number.isInteger(args[columnIndex])
      ) error();
      return methodFunction(...args);
    };
  };
}
