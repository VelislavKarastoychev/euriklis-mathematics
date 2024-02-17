"use strict";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";
import { Replicate } from "./Replicate.ts";

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
 * @returns {MatrixType | NumericMatrix} an array of typed arrays
 */
export const GenerateZeroMatrix = (
  rows: Integer,
  columns: Integer,
  type: NumericType,
): MatrixType | NumericMatrix => {
  const matrix: MatrixType | NumericMatrix = [];
  const bytesLength: number = (ComputeBytesLength(type) as Integer) * columns;
  const buffer = new ArrayBuffer(bytesLength * rows);
  const typedArray = CreateTypedArrayConstructor(type);
  let i: Integer;
  if (type !== "generic") {
    for (i = rows; i--;) {
      matrix[i] = new (typedArray as TypedArrayConstructor)(
        buffer,
        i * bytesLength,
        columns,
      );
    }
  } else return Replicate(0, rows, columns, type);
  return matrix;
};
