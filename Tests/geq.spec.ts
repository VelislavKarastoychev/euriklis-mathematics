"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m = Matrix.random(3, 4);
const runGeq = (matrix: Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(2, 5).geq(matrix);
new validator(m.geq(0.5).M)
  .isSame(
    [[0, 0, 0, 1], [0, 0, 0, 0], [0, 1, 1, 1]],
  )
  .describe("The geq method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. return the correct result when the argument is a number.")
  .test();
new validator(m.geq(
  Matrix.replicate(0.5, 3, 4),
).M).isSame(
  [[0, 0, 0, 1], [0, 0, 0, 0], [0, 1, 1, 1]],
).describe(
  "2. return the correct result when the method parameter is a Matrix.",
)
  .test();

new validator(m.geq(
  Matrix.replicate(0.5, 3, 4).M,
)).describe(
  "3. return the correct result when the method parameter is a MatrixType of a Numeric matrix.",
)
  .test();

new validator(runGeq).throwsErrorWith(Matrix.random(1, 2))
  .describe(
    "4. throws error when the matrix parameter has inappropriate dimension.",
  )
  .test();
new validator(runGeq).throwsErrorWith("123jdka")
  .describe(
    "5. throws error when the method parameter is not matrix, number or matix - like structure.",
  )
  .test();

new validator(runGeq).throwsErrorWith([[123]])
  .describe(
    "6. throws error when the parameter is numeric matrix or typed matrix with inappropriate dimension.",
  )
  .test();
