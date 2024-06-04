"use strict";
import type { Integer, MatrixType, NumericMatrix } from "../../Types";

/**
 * @param {MatrixType} matrix - The matrix data.
 * @param {Integer} col1 - The index of first column to exchange
 * @param {Integer} col2 - The index of second column to exchange
 * @param {Integer} from - The starting row index
 * @param {Integer} to - The ending row index
 */
export const ExchangeColumns = (
  matrix: MatrixType | NumericMatrix,
  col1: Integer,
  col2: Integer,
  from: Integer,
  to: Integer,
): void => {
  let i: Integer,
    temp: number;
  for (i = from; i <= to; i++) {
    temp = matrix[i][col1];
    matrix[i][col1] = matrix[i][col2];
    matrix[i][col2] = temp;
  }
};
