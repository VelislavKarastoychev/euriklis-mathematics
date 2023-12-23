"use strict";

import { Integer, MatrixType, NumericType, TypedArray, TypedArrayConstructor } from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

const ReplicateIterator = (
  n: number,
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor,
  it: Integer = 0,
): MatrixType | TypedArray => {
  let rep: MatrixType | TypedArray, i: Integer, j: Integer;
  if (!it) {
    rep = [];
    for (i = rows;i--;) {
      rep[i] = ReplicateIterator(n, rows, columns, typedArray,it + 1) as TypedArray;
    }
  } else {
    rep = new typedArray(columns);
    for (i = 0;i < columns >> 2;i++) {
      j = i << 2;
      rep[j] = rep[j + 1] = rep[j + 2] = rep[j + 3] = n;
    }

    for (j = i << 2;j < columns;j++) rep[j] = n;
  }
  return rep;
};

export const Replicate = (
  n: number,
  rows: Integer,
  columns: Integer,
  type: NumericType
): MatrixType => {
  const typedArray = CreateTypedArrayConstructor(type);
  return ReplicateIterator(n, rows, columns, typedArray) as MatrixType;
};
