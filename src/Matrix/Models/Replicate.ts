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

const ReplicateIterator = (
  n: number,
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  it: boolean = false,
): NumericMatrix | MatrixType | TypedArray => {
  let rep: MatrixType | TypedArray, i: Integer;
  if (it) {
    rep = new typedArray(columns);
    for (i = columns; i-- > 1;) {
      rep[i--] = n;
      rep[i] = n;
    }

    if (i === 0) rep[0] = n;

    return rep;
  }
  rep = [];
  for (i = rows; i-- > 1;) {
    rep[i--] = ReplicateIterator(
      n,
      rows,
      columns,
      typedArray,
      !it,
    ) as TypedArray;
    rep[i] = ReplicateIterator(
      n,
      rows,
      columns,
      typedArray,
      !it,
    ) as TypedArray;
  }

  if (i === 0) {
    rep[0] = ReplicateIterator(
      n,
      rows,
      columns,
      typedArray,
      !it,
    ) as TypedArray;
  }
  return rep;
};

export const Replicate = (
  n: number,
  rows: Integer,
  columns: Integer,
  type: NumericType,
): MatrixType | NumericMatrix => {
  const typedArray = CreateTypedArrayConstructor(type);
  return ReplicateIterator(n, rows, columns, typedArray) as
    | MatrixType
    | NumericMatrix;
};
