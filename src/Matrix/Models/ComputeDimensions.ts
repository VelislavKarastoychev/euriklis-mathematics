"use strict";

import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../../Types";

const ComputeDimensionsIterator = (
  m: MatrixType | NumericMatrix | TypedArray | number[] | number,
  dimensions: number[],
): Integer[] => {
  if (typeof m !== "number") {
    dimensions.push(m.length);
    ComputeDimensionsIterator(m[0], dimensions);
  }
  return dimensions as Integer[];
};
export const ComputeDimensions = (m: MatrixType | NumericMatrix): number[] => {
  const dimensions: Integer[] = [];
  return ComputeDimensionsIterator(m, dimensions);
};
