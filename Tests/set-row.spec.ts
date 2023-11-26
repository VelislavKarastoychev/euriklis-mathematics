"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";

const mat45 = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];
const result = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 1, 1, 1, 5],
  [1, 2, 3, 4, 5],
];

const rowAsArray = [[1, 1, 1]];
const rowAsMatrx = new Matrix(rowAsArray);

new validator(new Matrix(mat45).setRow(2, 1, 3, rowAsArray).M)
  .describe("The setRow method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(result)
  .describe(
    "1. Has to produce the correct result when the row is a numeric array.",
  )
  .test()
  .describe("2. Has to produce the correct result when the row is a Matrix.")
  .and.bind(
    new validator(new Matrix(mat45).setRow(2, 1, 3, rowAsMatrx).M).isSame(
      result,
    ),
  ).test()
  .describe("3. Has to throw error when the rowIndex parameter is incorrect.")
  .and.bind(
    new validator(() => new Matrix(mat45).setRow(200, 1, 3, rowAsArray).M)
      .throwsErrorWith(),
  ).test()
  .describe("4. Has to throw error when the fromColumnIndex is incorrect.")
  .and.bind(
    new validator(() => new Matrix(mat45).setRow(1, -1, 3, rowAsArray).M)
      .throwsErrorWith(),
  ).and.bind(
    new validator(() => new Matrix(mat45).setRow(1, 11, 3, rowAsArray).M)
      .throwsErrorWith(),
  )
  .describe("5. Has to throw error when the toColumnIndex is incorrect.")
  .and.bind(
    new validator(() => new Matrix(mat45).setRow(1, 1, -3, rowAsArray).M)
      .throwsErrorWith(),
  ).and.bind(
    new validator(() => new Matrix(mat45).setRow(1, 1, 30, rowAsArray).M)
      .throwsErrorWith(),
  )
  .describe("6. Has to throw error when the row element is incorrectly defined.")
  .and.bind(
    new validator(() => new Matrix(mat45).setRow(1, 1, 3, Matrix.random(244, 3)).M)
      .throwsErrorWith()
  )
  .test();
