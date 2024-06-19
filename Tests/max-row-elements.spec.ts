"use strict";

import validator from "@euriklis/validator-ts";
import {Matrix} from "../src";

const a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const maxa = [[3, 6, 9]];
const maxaAsCol = [[3], [6], [9]];
new validator(Matrix.isEqualTo(Matrix.maxRowElements(a), maxa))
  .isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.maxRowElements(a, undefined, "column"), maxaAsCol)).isSame(true)
  )
  .describe("The maxRowElements method of the Matrix library has to:")
  .test({title: true, success: "green", error: "red"})
  .describe("1. compute the max elements in every row as row vector by default.")
  .test();
