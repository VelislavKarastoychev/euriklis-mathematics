"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m1 = Matrix.random(2, 3);
const m2 = Matrix.random(2, 4);
const m3 = Matrix.random(3, 4);

new validator(m1.appendBlockRight(m2).M).forEvery((row) =>
  row.isNumberArray.and.hasLength(7)
)
  .describe("appendBlockRight method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. Append two matrices.").test()
  .and.bind(
    new validator(m1.appendBlockRight(m2.M).M).forEvery((row) =>
      row.isNumberArray.and.hasLength(7)
    ),
  ).describe("2. Append matrix and numerix matrix.").test()
  .and.bind(
    new validator(m1.appendBlockRight(m2.data).M).forEvery((row) =>
      row.isNumberArray.and.hasLength(7)
    ),
  )
  .describe("3. Append matrix and typed matrix.").test()
  .and.bind(
    new validator((m: Matrix) => m1.appendBlockRight(m)).throwsErrorWith(m3),
  ).describe("4. Throw error when the block is with inappropriate size.").test()
  .and.bind(
    new validator((m: Matrix) => m1.appendBlockRight(m)).not.throwsErrorWith([])
      .and.not.throwsErrorWith(new Matrix()),
  ).describe(
    "5. Not throw when the argument is empty array or empty matrix but returns the same matrix."
  ).test()
  .describe("6. Time performance the appendBlockRight method for two matrices 5000 x 5000").test()
  .on(true, () => {
    const m1 = Matrix.random(5000, 5000);
    const m2 = Matrix.random(5000, 5000);
    const benchmark = new validator(m1).benchmark(m => m.appendBlockRight(m2))
    console.table(benchmark);
  })
