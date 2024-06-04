"use strict";
import { epsilon } from "../..";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../../Types";
import { MatrixDegenerate } from "../Errors";
/**
 * @param {MatrixType | NumericMatrix} M - the matrix which will be decomposed.
 * @returns {{LU: MatrixType | NumericMatrix, P: Integer[], permutations: Integer}}
 * @throws {Error} If some of the division elements is too small.
 */
export const CompactLUFactorizationWithPermutations = (
  M: MatrixType | NumericMatrix,
): { LU: MatrixType | NumericMatrix; P: Integer[]; permutations: Integer } => {
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
    permutations: Integer = 0,
    maxmp: number,
    absm: number,
    mr: TypedArray | number[],
    mr1: TypedArray | number[],
    s1: number,
    s2: number;
  for (p = n; p--;) P[p] = p;
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
    if (maxmp < 0.5 * epsilon) MatrixDegenerate();
    // swap the p with pmax
    if (pmax !== p) {
      [M[p], M[pmax], P[p], P[pmax]] = [M[pmax], M[p], P[pmax], P[p]];
      permutations++;
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
  return { LU: M, P, permutations };
};
