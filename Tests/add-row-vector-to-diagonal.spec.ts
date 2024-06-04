"use strict";

import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const rowVector = Matrix.replicate(Math.PI, 1, 5);

const r = Matrix.uniqueRandom(5, 5);

const rc = Matrix.copy(r);

const addedRow = Matrix.addRowVectorToDiagonal(rc, rowVector);
const callAddRowVectorToDiagonal = (m: MatrixType | NumericMatrix) =>
  Matrix.addRowVectorToDiagonal(m, [[1, 2, 3, 4]]);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.minus(addedRow, Matrix.toDiagonalMatrix(rowVector)),
      r,
    ),
  ) < 1e-8,
)
  .describe("The addRowVectorToDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct result when the parameters are correctly defined.",
  )
  .test();
new validator(callAddRowVectorToDiagonal)
  .throwsErrorWith(Matrix.random(5, 5))
  .and.throwsErrorWith("it throws")
  .and.throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .describe("2. throw error when the matrix parameter is incorrectly defined.")
  .test();
