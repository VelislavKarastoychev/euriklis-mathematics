"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const matrix = [[1, 2, 3], [-4, 5, 6], [7, 8, -9]];
let m = Matrix.random(4, 4);
const M = Matrix.copy(m, "generic");
M[2][2] = Math.PI;
m = Matrix.copy(M);
const callMaxNorm = (m: MatrixType | NumericMatrix) => Matrix.maxNorm(m);
new validator(Matrix.maxNorm(matrix))
  .describe("The maxNorm getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(9)
  .and.bind(
    new validator(Matrix.maxNorm(m)).isSame(Math.PI),
  )
  .describe(
    "1. returns the element with the greates absolute value of the matrix",
  )
  .test();

new validator(callMaxNorm)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("This throws!")
  .describe("2. throw error when the matrix is incorrectly defined.")
  .test();
