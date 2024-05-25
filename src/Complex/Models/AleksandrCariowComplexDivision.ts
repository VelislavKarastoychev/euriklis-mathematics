"use strict";

import { Matrix } from "../../Matrix";
export const AleksandrCariowComplexDivision = (
  x: number,
  y: number,
  z1: number,
  z2: number,
): number[] => {
  const delta = 1 / (z1 * z1 + z2 * z2);
  const D2 = [[delta, 0], [0, delta]];
  const D3 = [[x - y, 0, 0], [0, x + y, 0], [0, 0, y]];
  const T23 = [[1, 0, 1], [0, 1, 1]];
  const T32 = [[1, 0], [0, -1], [1, 1]];
  const Z21 = [[z1], [z2]];
  // Y21 = D2 * T23 * D3 * T32 * Z21
  const Y21 = Matrix.times(
    Matrix.times(
      Matrix.times(D2, T23),
      Matrix.times(D3, T32),
    ),
    Z21,
  );
  return [Y21[0][0], Y21[1][0]];
};
