"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const mat45 = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];
new validator(new Matrix(mat45).getRow(2).M)
  .describe("The getRow method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame([[1, 2, 3, 4, 5]])
  .describe(
    "1. Has to return all the elements of the row when starting and ending indices are not inserted",
  )
  .test()
  .describe(
    "2. Has to return the correct output for given starting and ending indices",
  )
  .and.bind(
    new validator(new Matrix(mat45).getRow(2, 1).M)
      .isSame([[2, 3, 4, 5]])
      .and.bind(
        new validator(new Matrix(mat45).getRow(3, 1, 3).M)
          .isSame([[2, 3, 4]]),
      ),
  ).test()
  .describe(
    "3. Has to throw error when the index, starting or ending indices are incorrectly defined.",
  )
  .and.bind(
    new validator(() => new Matrix(mat45).getRow(-1)).throwsErrorWith(),
  ).and.bind(
    new validator(() => new Matrix(mat45).getRow(1, -1, 2)).throwsErrorWith(),
  ).and.bind(
    new validator(() => new Matrix(mat45).getRow(0, 0, 1000)).throwsErrorWith(),
  )
  .test()
  .describe(
    "4. Time performance of the getRow method with parameters matrix --> 6000 x 6000, row 400, from 989 to 5988:",
  )
  .test().on(true, () => {
    const mat6 = Matrix.random(6000, 6000);
    const benchmark = new validator(mat6).benchmark((m) =>
      m.getRow(400, 989, 5988)
    );
    console.table(benchmark);
  });
