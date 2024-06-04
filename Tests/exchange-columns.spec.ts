"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { Integer } from "../src/Types";

const a = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
];

const a13 = [
  [1, 4, 3, 2, 5, 6, 7, 8, 9],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
];

const a1345 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 5, 4, 3, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
];

new validator(
  Matrix.isEqualTo(
    Matrix.exchangeColumns(Matrix.copy(a), 1, 3),
    a13,
  ),
)
  .describe("exchangeColumns method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .on(false, (v) => {
    console.table(v.value);
    console.table(a13);
  })
  .describe(
    "1. exchange the columns for all row indices when the from and to indices are not defined.",
  )
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.exchangeColumns(Matrix.copy(a), 1, 3, 4, 5),
    a1345,
  ),
)
  .isSame(true)
  .describe(
    "2. return the correct output when the from and to parameters are defined",
  ).test();

new validator((col1: Integer, col2: Integer) =>
  Matrix.exchangeColumns(Matrix.copy(a), col1, col2)
)
  .throwsErrorWith(-1, 0)
  .and.throwsErrorWith(1, Infinity)
  .describe(
    "3. throws error when some of the column indices is incorectly defined.",
  )
  .test();

new validator((row1: Integer, row2: Integer) =>
  Matrix.exchangeColumns(Matrix.copy(a), 0, 1, row1, row2)
).throwsErrorWith(-1, 2)
  .and.throwsErrorWith(1, Infinity)
  .describe(
    "4. throws error when some of the row indices is incorrectly defined.",
  )
  .test();
