"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [1, 2, 3],
  [4, 15, 16],
  [7, 8, 9],
];

const maxa = [[7, 15, 16]];

new validator(Matrix.isEqualTo(Matrix.maxColumnElements(a), maxa)).isSame(true)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.maxColumnElements(a, undefined, "column"),
        Matrix.transpose(maxa),
      ),
    ).isSame(true),
  )
  .describe("The maxColumnElements method of the Matrix library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute the max element for each column of the matrix and to return them as row vector by default.",
  )
  .test();
