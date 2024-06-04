"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];

const callInferior = (m: MatrixType | NumericMatrix) => Matrix.inferior(m);
new validator(Matrix.inferior(m))
  .describe("The inferior method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(-3).describe(
    "1. return the correct value (the element with the minimal value in the matrix).",
  )
  .test();

new validator(callInferior)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws!")
  .describe("2. throw error when the matrix is incorrectly defined.")
  .test();
