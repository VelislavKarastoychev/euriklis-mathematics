"use strict";

import { MatrixType, NumericMatrix } from "../types";
import { MatrixReduce } from "./MatrixReduce.ts";
/**
 * Calculates the Frobenius (Euclidean)
 * norm of a matrix using matrix reduction.
 *
 * @param {MatrixType | NumericMatrix} a - The input matrix.
 * @returns {number} The Frobenius norm of the matrix.
 */
export const FrobeniusNorm = (a: MatrixType | NumericMatrix): number => {
  return Math.sqrt(MatrixReduce(a, "square"));
};
