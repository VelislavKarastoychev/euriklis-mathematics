"use strict";

import {
  MatrixType,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

const GetBlockIterator = (
  m: MatrixType | TypedArray,
  from: [number, number],
  to: [number, number],
  typedArray: TypedArrayConstructor,
  k: number,
): MatrixType | TypedArray => {
  let i: number,
    start: number = from[k],
    n: number = to[k] - start + 1,
    block: MatrixType | TypedArray;
  if (k) {
    block = new typedArray(n);
    for (i = n; i--;) {
      (block as TypedArray)[i] = (m as TypedArray)[i + start];
    }
    return block as TypedArray;
  } else {
    block = new Array(n);
    for (i = n; i--;) {
      block[i] = GetBlockIterator(
        (m as MatrixType)[i + start],
        from,
        to,
        typedArray,
        k + 1,
      ) as TypedArray;
    }
  }
  return block as MatrixType;
};

export const GetBlock = (
  m: MatrixType,
  from: [number, number],
  to: [number, number],
  type: NumericType,
): MatrixType => {
  const typedArray = CreateTypedArrayConstructor(type);
  return GetBlockIterator(m, from, to, typedArray, 0) as MatrixType;
};
