"use strict";
import validator from "@euriklis/validator-ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { Matrix } from "../src";

const colVector = Matrix.replicate(Math.E, 7, 1);
const r = Matrix.uniqueRandom(7, 8);
const cr = Matrix.copy(r);
const callAddColVector = (m: MatrixType | NumericMatrix) =>
  Matrix.addColumnVectorToDiagonal(m, colVector);
const callAddColVector2 = (v: MatrixType | NumericMatrix) =>
  Matrix.addColumnVectorToDiagonal(Matrix.random(7, 7), v);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.minus(
        Matrix.addColumnVectorToDiagonal(r, colVector),
        Matrix.addRowVectorToDiagonal(
          Matrix.zeros(7, 8),
          Matrix.transpose(colVector),
        ),
      ),
      cr,
    ),
  ) < 1e-8,
).describe("The addColumnVectorToDiagonal method has to: ")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct output when the parameters are correctly defined.",
  )
  .test();

new validator(callAddColVector)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws!!!")
  .describe("2. throws error when the matrix parameter is incorrectly defined.")
  .test();

new validator(callAddColVector2)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith(Matrix.random(8, 1))
  .and.throwsErrorWith("it throws")
  .describe("2. throws error when the column vector parameter is incorrectly defined.")
  .test();



