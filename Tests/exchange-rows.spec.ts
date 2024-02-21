"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const a = [
  [1, 2, 3, 4, 5, 6, 7],
  [2, 3, 4, 5, 6, 7, 8],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
];

const a14 = [
  [1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
];

const a1435 = [
  [1, 2, 3, 4, 5, 6, 7],
  [2, 3, 4, 6, 7, 8, 8],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 5, 6, 7, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
  [3, 4, 5, 6, 7, 8, 9],
];

new validator(
  Matrix.isEqualTo(
    Matrix.exchangeRows(Matrix.copy(a), 1, 4),
    a14,
  ),
)
  .describe("Tne exchangeRows method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. Has to exchange two rows when the fromColumn and toColumn parameters are not defined",
  )
  .test();
new validator(
  Matrix.isEqualTo(
    Matrix.exchangeRows(Matrix.copy(a), 1, 4, 3, 5),
    a1435,
  ),
)
  .isSame(true)
  .describe(
    "2. Has to exchange a column range of two rows when the fromColumn and toColumn parameters are defined.",
  )
  .test();
