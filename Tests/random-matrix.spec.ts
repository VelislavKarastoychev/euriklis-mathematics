"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { Integer } from "../src/Types";

const randomMatrix = Matrix.random(3, 3, -1, 1, "float64", 123456);
const generateRandomMatrix = (rows: Integer, columns: Integer) =>
  Matrix.random(rows, columns, -1, 1, "float32");

new validator(randomMatrix)
  .describe("The Matrix.random static method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isArrayOfTypedArraysWithEqualSize
  .test();
new validator(() => Matrix.copy(randomMatrix, "generic"))
  .executeWith()
  .isArrayOfNumberArraysWithEqualSize
  .and.forEvery((row) =>
    row.isArrayOfNumbersInRange(-1, 1)
  )
  .describe("1. generate random matrix with numbers form -1 to 1")
  .test();
new validator(generateRandomMatrix)
  .throwsErrorWith(-1, 10)
  .and.throwsErrorWith(-10, -10)
  .and.throwsErrorWith(10, -2)
  .and.throwsErrorWith(10.1, Math.PI)
  .and.throwsErrorWith(Math.E, 10)
  .and.throwsErrorWith(0, 2)
  .and.throwsErrorWith(2, 0)
  .and.not.throwsErrorWith(2, 3)
  .describe("2. Throw error when the rows or columns are incorrectly declared.")
  .test();
