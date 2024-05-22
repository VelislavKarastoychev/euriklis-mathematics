"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  // NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
// import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";
// import { ComputeBytesLength } from "./ComputeBytesLength.ts";
// import { Replicate } from "./Replicate.ts";

const CreateZerosRecursively = (
  dim: Integer[],
  typedArray: TypedArrayConstructor | ArrayConstructor,
  it: Integer = 0,
): TypedArray | number[] | MatrixType | NumericMatrix => {
  const n = dim[it];
  let z: TypedArray | number[] | MatrixType | NumericMatrix;
  let i: Integer;
  if (it === dim.length - 1) {
    z = new typedArray(n);
    if (Array.isArray(z)) {
      for (i = n; i-- > 3;) {
        z[i--] = 0;
        z[i--] = 0;
        z[i--] = 0;
        z[i] = 0;
      }
      for (++i;i--;) z[0] = 0;
    }

    return z as TypedArray | number[];
  }

  z = [];
  for (i = n; i-- > 3;) {
    z[i--] = CreateZerosRecursively(dim, typedArray, it + 1) as
      | TypedArray
      | number[];
    z[i--] = CreateZerosRecursively(dim, typedArray, it + 1) as
      | TypedArray
      | number[];
    z[i--] = CreateZerosRecursively(dim, typedArray, it + 1) as
      | TypedArray
      | number[];
    z[i] = CreateZerosRecursively(dim, typedArray, it + 1) as
      | TypedArray
      | number[];
  }

  for (++i;i--;) {
    z[i] = CreateZerosRecursively(dim, typedArray, it + 1) as
      | TypedArray
      | number[];
  }

  return z as MatrixType | NumericMatrix;
};

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
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  // const matrix: MatrixType | NumericMatrix = [];
  // const bytesLength: number = (ComputeBytesLength(type) as Integer) * columns;
  // const buffer = new ArrayBuffer(bytesLength * rows);
  // const typedArray = CreateTypedArrayConstructor(type);
  // let i: Integer;
  // if (type !== "generic") {
  //   for (i = rows; i--;) {
  //     matrix[i] = new (typedArray as TypedArrayConstructor)(
  //       buffer,
  //       i * bytesLength,
  //       columns,
  //     );
  //   }
  // } else return Replicate(0, rows, columns, type);
  return CreateZerosRecursively([rows, columns], typedArray) as
    | MatrixType
    | NumericMatrix;
};
