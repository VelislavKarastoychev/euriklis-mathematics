"use strict";

import { InternalErrorInFrobeniusNorm } from "../Errors/index.ts";
import { MatrixType, NumericMatrix } from "../types";
import { MatrixReduce } from "./MatrixReduce.ts";
/**
 * Calculates the Frobenius (Euclidean) 
 * norm of a matrix using matrix reduction.
 *
 * @param {MatrixType | NumericMatrix} a - The input matrix.
 * @throws {Error} If the matrix is not valid.
 * @returns {number} The Euclidean norm of the matrix.
 */
export const FrobeniusNorm = (a: MatrixType | NumericMatrix): number => {
  const squareSum: number = MatrixReduce(a, "square");
  if (squareSum < 0 || isNaN(squareSum)) InternalErrorInFrobeniusNorm();
  return Math.sqrt(squareSum);
};
