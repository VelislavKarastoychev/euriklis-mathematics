"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../../Types";

/**
 * Exchange rows in a matrix.
 *
 * @param {MatrixType} matrix - The matrix to perform row exchange on.
 * @param {Integer} r1 - The index of the first row to exchange.
 * @param {Integer} r2 - The index of the second row to exchange.
 * @param {Integer} from - The starting column index (inclusive).
 * @param {Integer} to - The ending column index (exclusive).
 */
export const ExchangeRows = (
  matrix: MatrixType | NumericMatrix,
  r1: Integer,
  r2: Integer,
  from: Integer,
  to: Integer,
): void => {
  let j: Integer, temp: number;
  const mr1: TypedArray | number[] = matrix[r1];
  const mr2: TypedArray | number[] = matrix[r2];

  for (j = from; j <= to; j++) {
    temp = mr1[j];
    mr1[j] = mr2[j];
    mr2[j] = temp;
  }
};
