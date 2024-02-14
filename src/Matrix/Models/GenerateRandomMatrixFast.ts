"use strict";

import {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor";

const GenerateRandomMatrixFastIterator = (
  rows: Integer,
  columns: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  from: number,
  to: number,
  it: boolean = false,
): MatrixType | NumericMatrix | TypedArray | number[] => {
  let i: Integer,
    rand: TypedArray | number[] | MatrixType | NumericMatrix;
  if (it) {
    const random = Math.random;
    let j: Integer;
    rand = new typedArray(columns);
    if (from === 0 && to === 1) {
      for (i = 0;i < columns >> 2;i++) {
        j = i << 2;
        rand[j++] = random();
        rand[j++] = random();
        rand[j++] = random();
        rand[j] = random();
      }

      for (j = i << 2;j < columns;j++) {
        rand[j] = random();
      }
      
    } else {
      const ri = to - from;
      for (i = columns; i-- > 1;) {
        rand[i--] = from + ri * random();
        rand[i] = from + ri * random();
      }

      if (i === 0) rand[0] = from + ri * random();
    }
  } else {
    rand = [];
    for (i = rows; i-- > 1;) {
      rand[i--] = GenerateRandomMatrixFastIterator(
        rows,
        columns,
        typedArray,
        from,
        to,
        !it,
      ) as number[] | TypedArray;
      rand[i] = GenerateRandomMatrixFastIterator(
        rows,
        columns,
        typedArray,
        from,
        to,
        !it,
      ) as number[] | TypedArray;
    }

    if (i === 0) {
      rand[0] = GenerateRandomMatrixFastIterator(
        rows,
        columns,
        typedArray,
        from,
        to,
        !it,
      ) as number[] | TypedArray;
    }
  }
  return rand;
};

export const GenerateRandomMatrixFast = (
  rows: Integer,
  columns: Integer,
  from: number,
  to: number,
  type: NumericType,
): MatrixType | NumericMatrix => {
  const typedArray: TypedArrayConstructor | ArrayConstructor =
    CreateTypedArrayConstructor(type);
  return GenerateRandomMatrixFastIterator(
    rows,
    columns,
    typedArray,
    from,
    to,
  ) as MatrixType | NumericMatrix;
};
