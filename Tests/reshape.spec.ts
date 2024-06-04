"use strict";
import type { Integer } from "../src/Types";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";

const m = Matrix.random(3, 4);
const reshaped = Matrix.reshape(m, 2, 6);
const reshapeMatrix = (rows: Integer, columns: Integer) =>
  Matrix.reshape(Matrix.random(12, 5), rows, columns);
const r1 = Matrix.random(3, 11);
new validator(m)
  .isInstanceof(Array)
  .describe("The reshape method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  });
new validator(reshaped).isArrayOfTypedArraysWithEqualSize
  .and.bind(
    new validator(reshaped.length).isSame(2),
  ).and.bind(
    new validator(reshaped[0].length).isSame(6),
  ).and.bind(
    new validator(Matrix.isEqualTo(Matrix.reshape(reshaped, 3, 4), m)).isSame(
      true,
    ),
  )
  .describe(
    "1. Regroups the elements of the matrix according to the rows and the columns of the method.",
  )
  .test();
new validator(
  Matrix.isEqualTo(
    Matrix.reshape(
      Matrix.reshape(
        Matrix.reshape(r1, 1, 33),
        33,
        1,
      ),
      3,
      11,
    ),
    r1,
  ),
).isSame(true)
  .describe("2. Returns the correct answer when the columns are even number.")
  .test();
new validator(reshapeMatrix).throwsErrorWith(2, 4)
  .and.throwsErrorWith(-1, 60)
  .and.throwsErrorWith(Math.PI, 60 / Math.PI)
  .and.not.throwsErrorWith(1, 60)
  .describe(
    "3. Throws error when the rows and the columns of the matrix are not positive integers",
  ).test();
