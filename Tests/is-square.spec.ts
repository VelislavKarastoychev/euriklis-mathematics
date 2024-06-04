"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType } from "../src/Types";
new validator(Matrix.isSquare(Matrix.random(2, 2)))
  .isSame(true)
  .and.bind(
    new validator(Matrix.isSquare(Matrix.random(2, 3)))
      .isSame(false),
  )
  .describe("The isSquare method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. return true when the matrix has the same number of rows and columns and false otherwise.",
  )
  .test();

new validator((m: MatrixType) => Matrix.isSquare(m))
  .throwsErrorWith([
    [2, 3, 4],
    [2, 34],
    [234],
  ]).describe(
    "2. throws error when the matrix is incorrectly defined (i.e. the matrix is not a table).",
  )
  .test();
