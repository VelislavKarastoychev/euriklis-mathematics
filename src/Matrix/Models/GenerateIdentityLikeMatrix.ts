"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArrayConstructor,
} from "../types";
import { GenerateZeroMatrix } from "./GenerateZeroMatrix.ts";
/**
 * Generates an identity-like matrix with specified dimensions.
 * The identity-like matrix has ones on its main diagonal (up to the minimum
 * of rows and columns) and zeros elsewhere.
 *
 * @param {number} rows - The number of rows of the matrix.
 * @param {number} columns - The number of columns of the matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The type of each element of the matrix.
 * @returns {MatrixType} - An identity-like matrix.
 */
export const GenerateIdentityLikeMatrix = (
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  const k: Integer = rows < columns ? rows : columns;
  const I = GenerateZeroMatrix(rows, columns, typedArray);
  let i: Integer;
  for (i = k; i--;) {
    I[i][i] = 1;
  }

  return I;
};
