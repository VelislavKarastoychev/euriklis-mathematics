"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const mina = [[4, 2, 3]];

new validator(Matrix.isEqualTo(Matrix.minColumnElementsExceptDiagonal(a), mina))
  .isSame(true)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.minColumnElementsExceptDiagonal(a, undefined, "column"),
        Matrix.transpose(mina),
      ),
    ).isSame(true),
  ).describe("The minColumnElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute the min elements for each column, excluding the diagonal one and to return a row vector by default.",
  ).test();
