"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
const cOutput = [
  [1.00000000, 6.84615421, 3.49999952, 3.00000000],
  [13.00000000, 31.76923180, 21.49999619, 15.00000000],
  [0.69230771, 2.93491054, 1.23076892, 1.23076916],
  [0.38461539, 0.49999979, -0.00000072, -0.00000024],
];
const areNearlyEquals = Matrix.isNearlyEqualTo(
  Matrix.toUpperHessenberg(matrix),
  cOutput,
  1e-5,
);

new validator(areNearlyEquals)
  .describe("The toUpperHessenberg method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. transform the matrix in a triangular - like matrix and to produce output similar to the elmhes routine in C.",
  )
  .test();
