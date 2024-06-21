"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, -9],
];

const mina = [[1, 2, -9]];

new validator(Matrix.isEqualTo(Matrix.minColumnElements(a), mina)).isSame(true)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.minColumnElements(a, undefined, "column"),
        Matrix.transpose(mina),
      ),
    ).isSame(true),
  ).describe("The minColumnElements has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute the min element of each column and to return a row vector by defalt.",
  )
  .test();
