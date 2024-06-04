"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = Matrix.random(3, 3);
const result = [
  [1, 0, 0],
  [0, 0, 0],
  [1, 1, 1],
];
const runGt = (data: MatrixType | NumericMatrix | number) =>
  Matrix.gt(Matrix.random(4, 4), data);
new validator(
  Matrix.isEqualTo(Matrix.gt(m, 0.5), result),
).describe("The gt method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. return the correct answer when the input is a number.")
  .isSame(true).test();
new validator(
  Matrix.isEqualTo(Matrix.gt(m, Matrix.replicate(0.5, 3, 3)), result),
)
  .describe(
    "2. return the correct output, when the method parameter is a Matrix type",
  )
  .isSame(true).test();
new validator(
  Matrix.isEqualTo(
    Matrix.gt(m, Matrix.copy(Matrix.replicate(0.5, 3, 3), "float64")),
    result,
  ),
)
  .describe(
    "3. return the correct result when the method parameter is numeric matrix",
  )
  .isSame(true).test();
new validator(
  Matrix.isEqualTo(
    Matrix.gt(m, Matrix.copy(Matrix.replicate(0.5, 3, 3), "float32")),
    result,
  ),
)
  .describe(
    "4. returns the correct result, when the method parameter is a typed matrix.",
  )
  .isSame(true).test();
new validator(runGt).throwsErrorWith([[12]])
  .describe("5. throws error when the input matrix has wrong dimension.")
  .test();
new validator(runGt).throwsErrorWith("3e")
  .describe(
    "6. throws error when the parameter of the method is not number, Matrix or Matrix - like object.",
  )
  .test();
new validator((data: MatrixType | NumericMatrix) => Matrix.gt(data, 12))
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .describe("7. throws error when the first matrix parameter is not a table.")
  .test();
