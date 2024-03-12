"use strict";

import { Matrix } from "..";
import { Integer, MatrixType, NumericMatrix } from "../types";

/**
 * Implements the second suggeston of Pan and
 * Schreiber for initial inverse approximation.
 *
 * @param {MatrixType | NumericMatrix} a - The input matrix parameter.
 * @returns {MatrixType | NumericMatrix} The resulting matrix from the
 * computation.
 * @throws {Error} If the matrix is incorrectly defined.
 */
export const InverseApproximationPanSchreiber2 = (
  a: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => {
  const infNorm = Matrix.infinityNorm(a);
  const norm1 = Matrix.norm1(a);
  const s = 1 / (infNorm * norm1);
  return Matrix.Hadamard(a, s);
};

/**
 * Implements the Grosz suggestion for initial
 * inverse approximation.
 *
 * @param {MatrixType | NumericMatrix} a - The matrix input
 * @returns {MatrixType | NumericMatrix} The resulting matrix from
 * the computation.
 * @throws{Error} If the matrix is incorrectly defined.
 */
export const InverseApproximationGrosz = (
  a: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => {
  const diag = Matrix.toDiagonalMatrix(Matrix.inverted(Matrix.getDiagonal(a)));
  return diag;
};

/**
 * Implements the Codevico suggestion for the initial
 * inverse matrix for a symmetric matrix.
 *
 * @param {MatrixType | NumericMatrix} symmetric - The symmetric matrix input.
 * @returns {MatrixType | NumericMatrix} The resulting matrix from the computations.
 * @throws {Error} If the matrix parameter is incorrectly defined.
 */
export const InverseApproximationCodevico = (
  symmetric: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => {
  const n: Integer = symmetric.length;
  const I: MatrixType | NumericMatrix = Matrix.identity(n);
  const IF: number = 1 / Matrix.FrobeniusNorm(symmetric);
  return Matrix.Hadamard(I, IF);
};
