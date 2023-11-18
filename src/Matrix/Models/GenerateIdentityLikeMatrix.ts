"use strict";
import { MatrixType, NumericType } from "../types";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Generates an identity-like matrix with specified dimensions.
 * The identity-like matrix has ones on its main diagonal (up to the minimum
 * of rows and columns) and zeros elsewhere.
 *
 * @param {number} rows - The number of rows of the matrix.
 * @param {number} columns - The number of columns of the matrix.
 * @param {NumericType} type - The type of each element of the matrix.
 * @returns {MatrixType} - An identity-like matrix.
 */
export const GenerateIdentityLikeMatrix = (
  rows: number,
  columns: number,
  type: NumericType,
): MatrixType => {
  const I = [];
  const bytesLength = ComputeBytesLength(type) * columns;
  const buffer = new ArrayBuffer(bytesLength * rows);
  const typedArray = CreateTypedArrayConstructor(type);
  const k: number = rows < columns ? rows : columns;
  let i: number;
  for (i = rows; i--;) {
    I[i] = new typedArray(buffer, i * bytesLength, columns);
    if (i < k) {
      I[i][i] = 1;
    }
  }
  return I;
};
