"use strict";

import { Integer, MatrixType } from "../types";

/**
 * Exchange rows in a matrix.
 *
 * @param {MatrixType} m - The matrix to perform row exchange on.
 * @param {Integer} r1 - The index of the first row to exchange.
 * @param {Integer} r2 - The index of the second row to exchange.
 * @param {Integer} from - The starting column index (inclusive).
 * @param {Integer} to - The ending column index (exclusive).
 */
export const ExchangeRows = (
  m: MatrixType,
  r1: Integer,
  r2: Integer,
  from: Integer,
  to: Integer,
): void => {
  let temp: number, i: Integer;
  for (i = to + 1; i--;) {
    if (i < from) break;
    temp = m[r1][i];
    m[r1][i] = m[r2][i];
    m[r2][i] = temp;
  }
};
