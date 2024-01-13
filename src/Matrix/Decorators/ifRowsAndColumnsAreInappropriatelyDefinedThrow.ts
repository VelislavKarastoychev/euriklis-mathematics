"use strict";
import { Integer } from "../types";
/**
 * Validates that the provided rows and columns are appropriately defined,
 * throwing an error if conditions are not met.
 * This function is a decorator for the reshape method.
 * 
 * @param {Function} error - The error function to be thrown if validation fails.
 * @returns {Function} Decorator function.
 */
export function ifRowsAndColumnsAreInappropriatelyDefinedThrow(
  error: Function,
): Function {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    descriptor.value = function (rows: Integer, columns: Integer) {
      if (
        rows < 0 || columns < 0 || this.rows * this.columns !== rows * columns
      ) {
        error();
      }
      return method.call(this, rows, columns);
    };
  };
}
