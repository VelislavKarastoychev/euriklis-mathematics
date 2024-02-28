"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m = [[1, 2, 3], [-4, 5, 6], [7, 8, -9]];
const callInfinityNorm = (m: MatrixType | NumericMatrix) => Matrix.infinityNorm(m); 

// check if the infinity norm is equal to pi
new validator(Matrix.infinityNorm(m)).isSame(24)
  .describe("The maxNorm/infinity method has to:").test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the greatest in absolute value sum of elements in a row of a matrix.",
  ).test()

new validator(callInfinityNorm)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("This throws!")
  .describe("2. throw error when the matrix is incorrectly defined.")
  .test();
