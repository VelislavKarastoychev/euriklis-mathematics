"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m = Matrix.random(3, 4);
const runGeq = (matrix: MatrixType | NumericMatrix) =>
  Matrix.geq(Matrix.random(2, 5), matrix);
new validator(Matrix.copy(Matrix.geq(m, 0.5), "generic"))
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
new validator(
  Matrix.copy(
    Matrix.geq(
      m,
      Matrix.replicate(0.5, 3, 4),
    ),
    "generic",
  ),
).isSame(
  [[0, 0, 0, 1], [0, 0, 0, 0], [0, 1, 1, 1]],
).describe(
  "2. return the correct result when the method parameter is a Matrix.",
)
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.geq(
      Matrix.copy(m, "float64"),
      Matrix.replicate(0.5, 3, 4),
    ),
    Matrix.copy([[0, 0, 0, 1], [0, 0, 0, 0], [0, 1, 1, 1]], "float64"),
  ),
).describe(
  "3. return the correct result when the method parameter is a MatrixType of a Numeric matrix.",
)
  .isSame(
    true,
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
