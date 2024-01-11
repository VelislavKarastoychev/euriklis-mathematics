"use strict";
import { Integer } from "../src/Matrix/types.ts";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";

const m = Matrix.random(3, 4);
const reshaped = m.reshape(2, 6);
const reshapeMatrix = (rows: Integer, columns: Integer) =>
  Matrix.random(12, 5).reshape(rows, columns);
new validator(m)
  .isInstanceof(Matrix)
  .describe("The reshape method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  });
new validator(reshaped.M).isArrayOfNumberArraysWithEqualSize
  .and.bind(
    new validator(reshaped.rows).isSame(2),
  ).and.bind(
    new validator(reshaped.columns).isSame(6),
  ).and.bind(
    new validator(reshaped.reshape(3, 4).isEqualTo(m)).isSame(true),
  )
  .describe(
    "1. Regroups the elements of the matrix according to the rows and the columns of the method.",
  )
  .test();
new validator(reshapeMatrix).throwsErrorWith(2, 4)
  .and.throwsErrorWith(-1, 60)
  .and.throwsErrorWith(Math.PI, 60 / Math.PI)
  .and.not.throwsErrorWith(1, 60)
  .describe(
    "2. Throws error when the rows and the columns of the matrix are not positive integers",
  ).test();
