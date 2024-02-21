"use strict";
import { Integer, MatrixType, NumericMatrix } from "../types";
export function ifColumnsOrFromRowIndexOrToRowIndexIsIncorrectlyDefinedThrow([
  IncorrectColumnIndexParametersInExchangeColumns,
  IncorrectFromRowIndexParameterInExchangeColumns,
  IncorrectToRowIndexParameterInExchangeColumns,
]: [Function, Function, Function]) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;

    descriptor.value = function (
      matrix: MatrixType | NumericMatrix,
      col1: Integer,
      col2: Integer,
      fromRow: Integer = 0,
      toRow: Integer = matrix.length - 1,
    ) {
      if (
        col1 < 0 || col1 > matrix[0].length || col2 < 0 ||
        col2 >= matrix[0].length
      ) {
        IncorrectColumnIndexParametersInExchangeColumns();
      }

      if (fromRow < 0 || fromRow > toRow) {
        IncorrectFromRowIndexParameterInExchangeColumns();
      }

      if (toRow < 0 || toRow >= matrix.length) {
        IncorrectToRowIndexParameterInExchangeColumns();
      }

      return method.call(this, matrix, col1, col2, fromRow, toRow);
    };
  };
}
