"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [4, 2, 3],
  [4, 19, 5],
  [7, 8, 9]
];

const maxamd = [[3, 5, 8]];

const maxamdAsCol = [[3], [5], [8]];
new validator(Matrix.isEqualTo(Matrix.maxRowElementsExceptDiagonal(a), maxamd)).isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.maxRowElementsExceptDiagonal(a, undefined, "column"), maxamdAsCol)).isSame(true)
  )
  .describe("The maxRowElementsExceptDiagonal method has to:")
  .test({title: true, success: "green", error: "red"})
  .describe("1. compute the max element of each row, excluding the diagonal elements.")
  .test();
