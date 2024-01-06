"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

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

new validator(new Matrix(a).exchangeColumns(1, 3).M)
  .describe("exchangeColumns method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(a13)
  .on(false, (v) => {
    console.table(v.value);
    console.table(a13);
  })
  .describe(
    "1. Has to exchange the columns for all row indices when the from and to indices are not defined.",
  )
  .test()
  .describe(
    "2. Has to return the correct output when the from and to parameters are defined",
  )
  .and.bind(
    new validator(new Matrix(a).exchangeColumns(1, 3, 4, 5).M).isSame(a1345),
  ).test()
  .describe(
    "3. Time performance of exchangeColumns method for parameters matrix --> 6000 x 6000, col1 = 99, col2 = 5198, from = 99 to 5098",
  ).test()
