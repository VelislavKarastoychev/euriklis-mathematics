"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];

const callProductsOfAllElements = (m: MatrixType | NumericMatrix) =>
  Matrix.productOfAllElements(m);
new validator(Matrix.productOfAllElements(m)).isSame(0)
  .describe("The productOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result (the product of all matrix elements).",
  )
  .test();

new validator(callProductsOfAllElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .throwsErrorWith("this throws!")
  .describe("2. throws error when the matrix is incorrectly defined.")
  .test();
