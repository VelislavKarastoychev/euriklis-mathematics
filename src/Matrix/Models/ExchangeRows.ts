"use strict";
import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types";

export const ExchangeRows = (
  matrix: MatrixType | NumericMatrix,
  r1: Integer,
  r2: Integer,
  from: Integer,
  to: Integer,
) => {
  let i: Integer, j: Integer, temp: number;
  const mr1: TypedArray | number[] = matrix[r1];
  const mr2: TypedArray | number[] = matrix[r2];
  
  for (i = from; i < to >> 2; i++) {
    j = i << 2;
    temp = mr1[j];
    mr1[j] = mr2[j];
    mr2[j] = temp;
    temp = mr1[j + 1];
    mr1[j + 1] = mr2[j + 1];
    mr2[j + 1] = temp;
    temp = mr1[j + 2];
    mr1[j + 2] = mr2[j + 2];
    mr2[j + 2] = temp;
    temp = mr1[j + 3];
    mr1[j + 3] = mr2[j + 3];
    mr2[j + 3] = temp;
  }
  
  for (j = i << 2; j < to; j++) {
    temp = mr1[j];
    mr1[j] = mr2[j];
    mr2[j] = temp;
  }
};
