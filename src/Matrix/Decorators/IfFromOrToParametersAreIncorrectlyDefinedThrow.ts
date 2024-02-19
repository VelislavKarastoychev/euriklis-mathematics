"use strict";

import { MatrixBlockOptions, MatrixType, NumericMatrix } from "../types";
import { AreFromAndToCorrectlyDefined } from "../Conditions";

/**
 * Initialize the from and to parameters of a block
 * to the beginning and end point of the matrix and
 * tests if the "from" and the "to" parameters are
 * correctly defined.
 *
 * @param {Function} error - the error function which will
 * be thrown if the "from" and "to" parameters are incorrectly
 * defined.
 * @returns {Function} the decorator function which will execute
 * the method if the condition is passed
 */
export function ifFromOrToParametersAreIncorrectlyDefinedThrow(
  error: Function,
): Function {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (matrix: MatrixType | NumericMatrix, options: MatrixBlockOptions | undefined) {
      if (typeof options === "undefined") {
        options = {
          from: [0, 0],
          to: [matrix.length - 1, matrix[0].length - 1],
        };
      }
      const { from, to } = options;
      if (
        !AreFromAndToCorrectlyDefined(from, to, [
          matrix.length,
          matrix[0].length,
        ])
      ) error();
      
      return method.call(null, matrix, options as MatrixBlockOptions);
    };
  };
}
