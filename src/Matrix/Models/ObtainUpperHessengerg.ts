"use strict";

import type { Integer, MatrixType, NumericMatrix } from "../types";

/**
 * This routine reduces the "a" matrix to a Hessenberg - like
 * matrix by the elimination method. The real non symmetric matrix
 * "a" is replaced by an upper Hessenberg matrix with identical
 * eigenvalues. Recommended but not required is that this routine
 * be preceded by the Balance utility function. On output, the Hessenberg
 * matrix is in elements a[i][j] with i <= j + 1. Elements with i >= j + 1
 * are to be throught of as zero, but are returned with RANDOM values.
 * Please be careful when use this routine outside of its context, which
 * is the hqr utiltiy function.
 */
export const ObtainUpperHessenberg = (a: MatrixType | NumericMatrix) => {
  const n = a.length;
  const abs: Function = Math.abs;
  let m: Integer, j: Integer, i: Integer;
  let y: number, x: number;
  // the m is the next row.
  for (m = 1; m < n - 1; m++) {
    x = 0;
    i = m;
    // find the pivot.
    for (j = m; j < n; j++) {
      if (abs(a[j][m - 1]) > abs(x)) {
        x = a[j][m - 1];
        i = j;
      }
    }

    if (i != m) {
      for (j = m - 1; j < n; j++) {
        [a[i][j], a[m][j]] = [a[m][j], a[i][j]];
      }
      for (j = 0; j < n; j++) {
        [a[j][i], a[j][m]] = [a[j][m], a[j][i]];
      }
    }

    if (x) {
      for (i = m + 1; i < n; i++) {
        if ((y = a[i][m - 1]) !== 0) {
          y /= x;
          a[i][m - 1] = y;
          for (j = m; j < n; j++) a[i][j] -= y * a[m][j];
          for (j = 0; j < n; j++) a[j][m] += y * a[j][i];
        }
      }
    }
  }

  return a;
};
