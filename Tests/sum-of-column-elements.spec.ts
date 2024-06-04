"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.uniqueRandom(4, 7);
const sum = Matrix.sumOfColumnElements(r);
const sum1 = Matrix.sumOfColumnElements(r, undefined, "column");
new validator(
  Matrix.isEqualTo(
    Matrix.transpose(sum1),
    sum,
  ),
).describe("The sumOfColumnElements method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. produce correct result and to return row vector by default and column vector with mode 'column'.",
  )
  .test();

new validator((m: MatrixType | NumericMatrix) => Matrix.sumOfColumnElements(m))
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("2. throw error when the matrix parameter is incorrectly defined.")
  .test();
