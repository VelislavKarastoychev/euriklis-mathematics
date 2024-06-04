"use strict";

import type { Integer, MatrixType, NumericType } from "../../Types";

export function ifRowOrFromIndexOrToIndexIsIncorrectlyDefinedThrow(
  [
    IncorrectRowIndexParametersInExchangeRows,
    IncorrectFromColumnIndexParameterInExchangeRows,
    IncorrectToColumnIndexParameterInExcangeRows,
  ]: [
    Function,
    Function,
    Function,
  ],
) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method: Function = descriptor.value;
    descriptor.value = function (
      matrix: MatrixType | NumericType,
      row1: Integer,
      row2: Integer,
      fromColumn: Integer,
      toColumn: Integer,
    ) {
      if (
        row1 < 0 || row1 >= matrix.length || row2 < 0 || row2 >= matrix.length
      ) {
        IncorrectRowIndexParametersInExchangeRows();
      }

      if (fromColumn < 0 || fromColumn > toColumn) {
        IncorrectFromColumnIndexParameterInExchangeRows();
      }

      if (
        toColumn < fromColumn || toColumn > matrix[0].length || toColumn < 0
      ) {
        IncorrectToColumnIndexParameterInExcangeRows();
      }

      return method.call(this, matrix, row1, row2, fromColumn, toColumn);
    };
  };
}
