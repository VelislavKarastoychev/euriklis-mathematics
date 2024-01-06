"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m1 = Matrix.random(2, 5);
const m2 = Matrix.random(3, 5);
const m3 = Matrix.random(1, 4);

new validator(m1.appendBlockBottom(m2).M)
  .describe("appendBlockBottom method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. Appends correctly a block matrix when the columns are equal to the initial matrix columns.",
  )
  .forEvery((row) => row.isNumberArray.and.hasLength(5)).and.hasLength(5)
  .test()
  .describe("2. Appends block when the argument is NumericMatrix.")
  .and.bind(
    new validator(m1.appendBlockBottom(m2.M).M).forEvery((row) =>
      row.isNumberArray.and.hasLength(5)
    ).and.hasLength(5),
  ).test()
  .describe("3. Appends correctly a block when the argument is typed matrix.")
  .and.bind(
    new validator(m1.appendBlockBottom(m2.data).M).forEvery((row) =>
      row.isNumberArray.and.hasLength(5)
    ).and.hasLength(5),
  ).test()
  .describe("4. Throws error when the argument is with inappropriate size.")
  .and.bind(
    new validator((m: Matrix) => m1.appendBlockBottom(m).M).throwsErrorWith(m3),
  ).test()
  .describe(
    "5. Not throws error when the argument is empty matrix or empty array.",
  )
  .and.bind(
    new validator((m: Matrix) => m1.appendBlockBottom(m)).not.throwsErrorWith(
      [],
    )
      .and.not.throwsErrorWith(new Matrix()),
  ).test()
