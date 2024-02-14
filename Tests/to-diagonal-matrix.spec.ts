"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
const mtx = Matrix.random(3, 1);
const m: Matrix = Matrix.random(2, 50);
new validator(m.toDiagonalMatrix().M).forEvery((row, i) => {
  return row.forEvery((el, j) =>
    (i as number % 50) === j ? el.isNotEqual(0) : el.isEqual(0)
  );
})
  .describe("toDiagonalMatrix method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. Has to generate a row oriented collection of diagonal block matrices for each row of the matrix.",
  ).test();
