"use strict";
import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types";
export const CompactLUFactorizationWithPermutations = (
  M: MatrixType | NumericMatrix,
): { LU: MatrixType | NumericMatrix; P: Integer[] } => {
  const n = M.length;
  const P = [];
  const abs = Math.abs;
  const nm1 = n - 1;
  // fill the permutation pseudo matrix;
  let p: Integer,
    r: Integer,
    c: Integer,
    k: Integer,
    pmax: Integer,
    maxmp: number,
    absm: number,
    mr: TypedArray,
    mr1: TypedArray,
    s1: number,
    s2: number;
  for (p = n; p--;) P[p] = p;
  P[n] = 0;
  // start the factorization:
  for (p = 0; p < n; p++) {
    // execute pivot strategy:
    pmax = p;
    maxmp = 0;
    for (k = p; k < nm1; k++) {
      if ((absm = abs(M[k][p])) > maxmp) {
        maxmp = absm;
        pmax = k++;
      }
      if ((absm = abs(M[k][p])) > maxmp) {
        maxmp = absm;
        pmax = k;
      }
    }

    if (k === nm1) {
      if ((absm = abs(M[k][p])) > maxmp) {
        maxmp = absm;
        pmax = k;
      }
    }

    // swap the p with pmax
    if (pmax !== p) {
      [M[p], M[pmax], P[p], P[pmax]] = [M[pmax], M[p], P[pmax], P[p]];
      P[n]++;
    }

    // execute the LU factoriization:
    const mp = M[p];
    const mpp = mp[p];
    for (r = p + 1; r < nm1; r++) {
      mr = M[r++];
      mr1 = M[r];
      s1 = -mr[p] / mpp;
      s2 = -mr1[p] / mpp;
      mr[p] = -s1;
      mr1[p] = -s2;
      for (c = p + 1; c < nm1; c++) {
        mr[c] += s1 * mp[c];
        mr1[c] += s2 * mp[c++];
        mr[c] += s1 * mp[c];
        mr1[c] += s2 * mp[c];
      }
      if (c === nm1) {
        mr[c] += s1 * mp[c];
        mr1[c] += s2 * mp[c];
      }
    }

    if (r === nm1) {
      mr = M[r];
      s1 = -mr[p] / mpp;
      mr[p] = -s1;
      for (c = p + 1; c < nm1; c++) {
        mr[c] += s1 * mp[c++];
        mr[c] += s1 * mp[c];
      }
      if (c === nm1) {
        mr[c] += s1 * mp[c];
      }
    }
  }
  return { LU: M, P };
};