"use strict";

import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

const ReplicateIterator = (
  n: number,
  dim: Integer[],
  typedArray: TypedArrayConstructor | ArrayConstructor,
  it: Integer = 0,
): NumericMatrix | MatrixType | TypedArray => {
  let rep: MatrixType | TypedArray, i: Integer;
  const k = dim[it];
  if (it === dim.length - 1) {
    rep = new typedArray(k);
    for (i = k; i-- > 1;) {
      rep[i--] = n;
      rep[i] = n;
    }

    if (i === 0) rep[0] = n;
  } else {
    rep = [];
    for (i = k; i-- > 1;) {
      rep[i--] = ReplicateIterator(
        n,
        dim,
        typedArray,
        it + 1,
      ) as TypedArray;
      rep[i] = ReplicateIterator(
        n,
        dim,
        typedArray,
        it + 1,
      ) as TypedArray;
    }

    if (i === 0) {
      rep[0] = ReplicateIterator(
        n,
        dim,
        typedArray,
        it + 1,
      ) as TypedArray;
    }
  }
  return rep;
};

export const Replicate = (
  n: number,
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  return ReplicateIterator(n, [rows, columns], typedArray) as
    | MatrixType
    | NumericMatrix;
};
