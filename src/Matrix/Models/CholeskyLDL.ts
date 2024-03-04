"use strict";

import { epsilon } from "../..";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { DiagonalElementClosedToZeroInLDL } from "../Errors";

/**
 * Performs the LDL decomposition on a given symmetric positive definite matrix using the Cholesky LDL algorithm.
 *
 * @param {MatrixType | NumericMatrix} L - The symmetric positive definite matrix to be decomposed.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor for the typed array.
 * @returns {{ L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix }} The lower
 * triangular matrix L and the diagonal matrix D resulting from the LDL decomposition.
 * @throws {Error} If some of the diagonal elements is closed to zero.
 */
export const CholeskyLDL = (
  L: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): { L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix } => {
  const n: Integer = L.length;
  const D: TypedArray | number[] = new typedArray(n);
  let i: Integer,
    j: Integer,
    k: Integer,
    Lj: number[] | TypedArray,
    Li: number[] | TypedArray;
  for (i = 0; i < n; i++) {
    Li = L[i];
    D[i] = Li[i];
    for (k = 0; k < i; k++) D[i] -= Li[k] * Li[k] * D[k];
    if (D[i] < 0.5 * epsilon) DiagonalElementClosedToZeroInLDL();
    for (j = i; j < n; j++) {
      Lj = L[j];
      for (k = 0; k < i; k++) {
        Lj[i] -= Lj[k] * Li[k] * D[k];
      }
      Lj[i] /= D[i];
    }
    for (j = i + 1; j < n; j++) Li[j] = 0;
  }
  return {
    L,
    D: [D] as MatrixType | NumericMatrix,
  };
};
