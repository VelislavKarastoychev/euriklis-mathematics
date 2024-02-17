"use strict";
import { win32 } from "path";
import {
  Integer,
  MatrixType,
  NumericType,
  NumericMatrix,
  TypedArrayConstructor,
} from "../types";
import { ComputeBytesLength } from "./ComputeBytesLength.ts";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";
import { Replicate } from "./Replicate.ts";
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
  rows: Integer,
  columns: Integer,
  type: NumericType,
): MatrixType | NumericMatrix => {
  let I = [];
  const bytesLength = (ComputeBytesLength(type) as Integer) * columns;
  const buffer = new ArrayBuffer(bytesLength * rows);
  const typedArray = CreateTypedArrayConstructor(type);
  const k: Integer = rows < columns ? rows : columns;
  let i: Integer;
  if (type === "generic") {
    I = Replicate(0, rows, columns, "generic");
    for (i = k;i--;) {
      I[i][i] = 1;
    }
  } else {
    for (i = rows; i--;) {
      I[i] = new (typedArray as TypedArrayConstructor)(
        buffer,
        i * bytesLength,
        columns,
      );
      if (i < k) {
        I[i][i] = 1;
      }
    }
  }

  return I;
};
