"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];
const callSuperior = (m: MatrixType | NumericMatrix) => Matrix.superior(m);
new validator(Matrix.superior(m)).describe("The superior method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(8).describe(
    "1. returns the correct value (the element with maximum value in the matrix).",
  )
  .test();

new validator(callSuperior)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("2. thorws error when the matrix is incorrectly declared")
  .test();
