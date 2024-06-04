"use strict";

import { epsilon } from "../..";
import { NonPositiveSemidefinedMatrixInCholeskyLL } from "../Errors";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../../Types";

/**
 * utility function, which performs the Cholesky LL factorization on a given
 * symmetric positive definite matrix.
 * Implements the Cholesky - Banachiewicz algorithm.
 *
 * Cholesky LL factorization decomposes a symmetric positive definite matrix into
 * the product of a lower triangular matrix and its transpose.
 *
 * @param {MatrixType | NumericMatrix} L - The symmetric positive definite matrix to be factorized.
 * @param {boolean} secure - Indicates whether to perform secure operations (this parameter is never used).
 * @returns {MatrixType | NumericMatrix} The lower triangular matrix resulting from the LL factorization.
 * @throws {Error} If the input matrix is not symmetric positive definite.
 */
export const CholeskyBanachiewiczAlgorithm = (
  L: MatrixType | NumericMatrix,
  secure: boolean,
): MatrixType | NumericMatrix => {
  const abs = Math.abs;
  const n = L.length;
  let i: Integer,
    j: Integer,
    k: Integer,
    s: number,
    Lk: TypedArray | number[],
    Li: TypedArray | number[],
    v: number;
  for (k = 0; k < n; k++) {
    Lk = L[k];
    for (i = 0; i < k; i++) {
      s = 0;
      Li = L[i];
      for (j = 0; j < i; j++) s += Li[j] * Lk[j];

      Lk[i] -= s;
      Lk[i] /= Li[i];
    }
    v = 0;
    for (j = 0; j < k; j++) v += Lk[j] * Lk[j];
    Lk[k] -= v;
    if (Lk[k] < 0) NonPositiveSemidefinedMatrixInCholeskyLL();
    Lk[k] = Math.sqrt(Lk[k]);
    // if L(k, k) is closed to zero throw error message:
    if (abs(Lk[k]) < 0.5 * epsilon) {
      NonPositiveSemidefinedMatrixInCholeskyLL();
    }
    // zerowise the upper diagonal elements:
    for (i = k + 1; i < n; i++) Lk[i] = 0;
  }
  return L;
};
