"use strict";
import type { Integer, MatrixType, NumericMatrix } from "../types";

const RADIX: Integer = 2;

// Given a matrix a which is square, this function (subroutine)
// replaces it by a balanced matrix with identical eigenvalues.
// A symmetric matrix is already balanced and is unaffected by
// this procedure. The parameter RADIX should be the machine's
// floating point radix.
export const Balance = (
  a: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => {
  let last: Integer, j: Integer, i: Integer;
  let s: number, r: number, g: number, f: number, c: number, sqrdx: number;
  const n: Integer = a.length;
  const abs: Function = Math.abs;
  sqrdx = RADIX * RADIX;
  last = 0;
  while (last === 0) {
    last = 1;
    for (i = 0; i < n; i++) {
      r = c = 0;
      for (j = 0; j < n; j++) {
        if (j !== i) {
          c += abs(a[j][i]);
          r += abs(a[i][j]);
        }
      }
      if (c && r) {
        g = r / RADIX;
        f = 1;
        s = c + r;
        while (c < g) {
          f *= RADIX;
          c *= sqrdx;
        }
        g = r * RADIX;
        while (c > g) {
          f /= RADIX;
          c /= sqrdx;
        }
        if ((c + r) / f < .95 * s) {
          last = 0;
          g = 1 / f;
          for (j = 0; j < n; j++) a[i][j] *= g;
          for (j = 0; j < n; j++) a[j][i] *= f;
        }
      }
    }
  }

  return a;
};
