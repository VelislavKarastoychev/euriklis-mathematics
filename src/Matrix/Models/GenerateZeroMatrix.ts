"use strict";
import { MatrixType, NumericType } from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";

/**
 * Utility function for the zeros method.
 * Generates a matrix with zero elements
 * given the rows, the columns and the 
 * type (optionally).
 * 
 * @param rows - a positive integer
 * @param columns - a positive integer
 * @param type {NumericType} - the type 
 * of each element of the matrix
 * @returns {MatrixType} an array of typed arrays
 */
export const GenerateZeroMatrix = (
  rows: number,
  columns: number,
  type: NumericType,
): MatrixType => {
  const matrix: MatrixType = [];
  const bytesLength: number = ComputeBytesLength(type) * columns;
  const buffer = new ArrayBuffer(bytesLength * rows);
  const typedArray = CreateTypedArrayConstructor(type);
  let i: number;
  for (i = rows; i--;) {
    matrix[i] = new typedArray(buffer, i * bytesLength, columns);
  }
  
  return matrix;
};
