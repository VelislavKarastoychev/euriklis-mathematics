"use strict";
import validator from "@euriklis/validator-ts";
import type { MatrixType } from "../src/Types";
import { Matrix } from "../src";

const m1 = Matrix.random(2, 5);
const m2 = Matrix.random(3, 5);
const m3 = Matrix.random(1, 4);

new validator(Matrix.appendBlockBottom(m1, m2, "generic"))
  .describe("appendBlockBottom method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. Appends correctly a block matrix when the columns are equal to the initial matrix columns.",
  )
  .forEvery((row) => row.isNumberArray.and.hasLength(5)).and.hasLength(5)
  .test();
new validator(Matrix.appendBlockBottom(m1, Matrix.copy(m2, "generic")))
  .forEvery((row) => row.isNumberArray.and.hasLength(5)).and.hasLength(5)
  .describe("2. Appends block when the argument is NumericMatrix.")
  .test();
new validator(
  Matrix.appendBlockBottom(m1, Matrix.copy(m2, "float32"), "generic"),
).forEvery((row) => row.isNumberArray.and.hasLength(5)).and.hasLength(5)
  .describe("3. Appends correctly a block when the argument is typed matrix.")
  .test();

new validator((m: MatrixType) => Matrix.appendBlockBottom(m1, m, "generic"))
  .throwsErrorWith(m3)
  .describe("4. Throws error when the argument is with inappropriate size.")
  .test();
new validator((m: MatrixType) => Matrix.appendBlockBottom(m1, m)).not
  .throwsErrorWith(
    [],
  )
  .and.not.throwsErrorWith(new Array())
  .describe(
    "5. Not throws error when the argument is empty matrix or empty array.",
  )
  .test();
