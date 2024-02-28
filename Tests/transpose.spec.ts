"use strict";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";
const a = Matrix.random(27, 23);
const runTranspose = (m: MatrixType | NumericMatrix) => Matrix.transpose(m);
new validator(Matrix.transpose(a, "generic")).forEvery((row, i) =>
  row.forEvery((el, j) => el.isSame(a[j as number][i as number]))
).describe("transpose method has to:").test({
  title: true,
  success: "green",
  error: "red",
})
  .describe("1. Has to produce the correct result").test();

new validator(Matrix.transpose(Matrix.transpose(a), "generic")).isSame(
  Matrix.copy(a, "generic"),
)
  .describe(
    "2. return the initial matrix, when is called again",
  ).test();

new validator(runTranspose)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .describe("3. throws error when the input matrix is not correcly defined.")
  .test();
