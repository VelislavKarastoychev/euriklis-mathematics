"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { Integer } from "../src/Matrix/types.ts";

const randomMatrix = new validator(
  Matrix.random(3, 3, -1, 1, "float64", 123456),
);
const generateRandomMatrix = (rows: Integer, columns: Integer) =>
  Matrix.random(rows, columns, -1, 1, "float32");
randomMatrix
  .describe("The Matrix.random static method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isInstanceof(Matrix)
  .and.bind(
    new validator(() => randomMatrix.copy().value.M)
      .executeWith()
      .isArrayOfNumberArraysWithEqualSize,
  ).describe("1. Has to generate random matrix with numbers form -1 to 1")
  .test()
  .isInstanceof(Matrix)
  .describe("2. Throw error when the rows or columns are incorrectly declared.")
  .and.bind(
    new validator(generateRandomMatrix)
      .throwsErrorWith(-1, 10)
      .and.throwsErrorWith(-10, -10)
      .and.throwsErrorWith(10, -2)
      .and.throwsErrorWith(10.1, Math.PI)
      .and.throwsErrorWith(Math.E, 10)
      .and.throwsErrorWith(0, 2)
      .and.throwsErrorWith(2, 0)
      .and.not.throwsErrorWith(2, 3)
  ).test()
