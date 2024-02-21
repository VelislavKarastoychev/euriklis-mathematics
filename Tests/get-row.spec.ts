"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const mat45 = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];
new validator(
  Matrix.isEqualTo(
    Matrix.getRow(mat45, 2),
    [[1, 2, 3, 4, 5]],
  ),
)
  .describe("The getRow method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. Has to return all the elements of the row when starting and ending indices are not inserted",
  )
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.getRow(mat45, 2, 1),
    [[2, 3, 4, 5]],
  ),
)
  .isSame(true)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.getRow(mat45, 3, 1, 3),
        [[2, 3, 4]],
      ),
    )
      .isSame(true),
  )
  .describe(
    "2. Has to return the correct output for given starting and ending indices",
  )
  .test();

new validator(() => Matrix.getRow(mat45, -1)).throwsErrorWith()
  .describe(
    "3. Has to throw error when the index, starting or ending indices are incorrectly defined.",
  )
  .and.bind(
    new validator(() => Matrix.getRow(mat45, 1, -1, 2)).throwsErrorWith(),
  ).and.bind(
    new validator(() => Matrix.getRow(mat45, 0, 0, 1000)).throwsErrorWith(),
  )
  .test();
