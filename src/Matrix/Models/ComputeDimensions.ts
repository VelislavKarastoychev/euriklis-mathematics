"use strict";

import { Integer, MatrixType, NumericMatrix, TypedArray } from "../types";

const ComputeDimensionsIterator = (
  m: MatrixType | NumericMatrix | TypedArray | number[] | number,
  dimensions: number[],
): Integer[] => {
  if (typeof m !== "number") {
    dimensions.push(m.length);
    ComputeDimensionsIterator(m[0], dimensions);
  } else dimensions.push(0);
  return dimensions as Integer[];
};
export const ComputeDimensions = (m: MatrixType | NumericMatrix): number[] => {
  const dimensions: Integer[] = [];
  return ComputeDimensionsIterator(m, dimensions);
};
