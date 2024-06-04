"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r1 = Matrix.random(4, 5, 2, 3);
const r2 = Matrix.random(4, 5, 1, 2);

const m1 = Matrix.copy(r1, "generic") as NumericMatrix;
const m2 = Matrix.copy(r2, "generic") as NumericMatrix;
const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c / m2[i][j])
);

const runDivide = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.divide(Matrix.random(4, 5), matrix);

new validator(Matrix.isEqualTo(Matrix.divide(r1, r2), m3))
  .describe("The divide method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is Matrix.",
  )
  .test();

new validator(Matrix.isEqualTo(Matrix.divide(r1, m2), m3))
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.divide(r1, r2), m3)),
  ).describe(
    "2. return the correct result when the method's parameter is Matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(Matrix.divide(r1, 1), r1))
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.divide(r1, 0.5),
        Matrix.Hadamard(r1, 2),
      ),
    ),
  ).isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .test();

new validator(runDivide).throwsErrorWith(Matrix.random(2, 3))
  .describe(
    "4. throws error when the method's parameter is a Matrix with incorrect dimension.",
  )
  .test();

new validator(runDivide).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the matrix parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runDivide).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the methods parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();
