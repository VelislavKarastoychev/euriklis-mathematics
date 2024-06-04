"use strict";

import { Matrix } from "../src/index.ts";
import type { Integer } from "../src/Types";
import validator from "@euriklis/validator-ts";
const rand55 = Matrix.random(5, 5);
const rand55M = Matrix.copy(rand55, "generic");
new validator(
  Matrix.isEqualTo(
    Matrix.getDiagonal(rand55),
    [Array.from({ length: 5 }).map((_, i) => rand55M[i][i])],
  ),
)
  .describe("The getDiagonal method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. get the diagonal of the matrix in an row vector vector when no argument is passed (Matrix with 1 x columns elements)",
  )
  .isSame(true).test();

new validator(Matrix.getDiagonal(rand55, 1, "generic")[0]).forEvery((di, i) => {
  return di.isSame(rand55M[i as number + 1][i as number]);
}).on(false, (v) => {
  const diag = v.value;
  console.table(diag);
  console.table(rand55M);
})
  .describe(
    "2. return the subdiagonal of an matrix when an row index is defined",
  )
  .test();

new validator((row: Integer) => Matrix.getDiagonal(rand55, row))
  .throwsErrorWith(-1)
  .and.throwsErrorWith(100)
  .describe(
    "3. throws error when the row index parameter is incorrectly defined.",
  )
  .test();
