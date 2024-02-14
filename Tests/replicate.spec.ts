"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const matrixArray = Array.from({ length: 37 }).map((_) =>
  Array.from({ length: 173 }).map((_) => 3.14)
);

new validator(Matrix.isEqualTo(Matrix.replicate(3.14, 37, 173), matrixArray))
  .describe("The replicate method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe("1. creates a matrix with elements which are equal.").test();

new validator((n: number, rows: number, columns: number) =>
  Matrix.replicate(n, rows, columns)
)
  .throwsErrorWith(5, -12, 12)
  .describe(
    "2. throws error when the rows or the columns are insufficiently defined",
  ).test();

new validator(Matrix.replicate(12, 3, 4, "generic"))
  .isSame(Array.from({length: 3}).map(_ => Array.from({length: 4}).map(_ => 12)))
  .describe("3. returns correct result for generic type.")
  .test();
