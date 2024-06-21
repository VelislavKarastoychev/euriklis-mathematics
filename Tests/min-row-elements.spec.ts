"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [1, 2, 3],
  [4, 5, .4],
  [7, 8, 9]
];

const mina = [[1, .4, 7]];

new validator(Matrix.isEqualTo(Matrix.minRowElements(a), mina)).isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.minRowElements(a, undefined, "column"), Matrix.transpose(mina))).isSame(true)
  ).describe("The minRowElements method has to:")
  .test({title: true, success: "green", error: "red"})
  .describe("1. compute the min elements for each row of the matrix and to return a row vector by default.")
  .test();
