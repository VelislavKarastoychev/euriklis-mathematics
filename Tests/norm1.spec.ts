"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];

const callNorm1 = (m: MatrixType | NumericMatrix) => Matrix.norm1(m);
new validator(Matrix.norm1(m)).isSame(19)
  .describe("The norm1 method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. compoute the correct result of the maximum absolute column sum for a matrix.",
  )
  .test();

new validator(callNorm1)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("This throws")
  .describe("2. throws error when the matrix is incorrectly defined.")
  .test();
