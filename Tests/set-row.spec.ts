"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";

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
const rowAsMatrix = Matrix.copy(rowAsArray);

new validator(
  Matrix.isEqualTo(
    Matrix.setRow(mat45, rowAsArray, 2, 1, 3),
    result,
  ),
)
  .describe("The setRow method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. Has to produce the correct result when the row is a numeric array.",
  )
  .test();
new validator(
  Matrix.isEqualTo(
    Matrix.setRow(mat45, rowAsMatrix, 2, 1, 3),
    result,
  ),
).isSame(true)
  .describe("2. Has to produce the correct result when the row is a Matrix.")
  .test();

new validator(() => Matrix.setRow(mat45, rowAsArray, 200, 1, 3))
  .throwsErrorWith()
  .describe("3. Has to throw error when the rowIndex parameter is incorrect.")
  .test();

new validator(() => Matrix.setRow(mat45, rowAsArray, 1, -1, 3))
  .throwsErrorWith()
  .describe("4. Has to throw error when the fromColumnIndex is incorrect.")
  .test();

new validator(() => Matrix.setRow(mat45, rowAsArray, 1, 11, 3))
  .throwsErrorWith()
  .describe("5. Has to throw error when the toColumnIndex is incorrect.")
  .test();

new validator(() => Matrix.setRow(mat45, rowAsArray, 1, 1, -3))
  .throwsErrorWith()
  .and.bind(
    new validator(() => Matrix.setRow(mat45, rowAsArray, 1, 1, 30))
      .throwsErrorWith(),
  )
  .describe(
    "6. Has to throw error when the row element is incorrectly defined.",
  )
  .and.bind(
    new validator(() => Matrix.setRow(mat45, Matrix.random(244, 3), 1, 1, 3))
      .throwsErrorWith(),
  )
  .test();
