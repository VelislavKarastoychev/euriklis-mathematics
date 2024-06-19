"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const maxa = [[7, 8, 6]];

new validator(Matrix.isEqualTo(Matrix.maxColumnElementsExceptDiagonal(a), maxa))
  .isSame(true)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.maxColumnElementsExceptDiagonal(a, undefined, "column"),
        Matrix.transpose(maxa),
      ),
    ).isSame(true),
  ).describe("The maxColumnElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute the max elements for each column excluding the diagonal one.",
  )
  .test();
