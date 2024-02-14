"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
import { run } from "node:test";

const r1 = Matrix.random(4, 5, 2, 3);
const r2 = Matrix.random(4, 5, 1, 2);

const m1 = r1.M;
const m2 = r2.M;
const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c / m2[i][j])
);

const runDivide = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(4, 5).divide(matrix);

new validator(r1.divide(r2).isEqualTo(m3))
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

new validator(r1.divide(r2.M).isEqualTo(m3))
  .and.bind(
    new validator(r1.divide(r2.data).isEqualTo(m3)),
  ).describe(
    "2. return the correct result when the method's parameter is Matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(r1.divide(1).isEqualTo(r1))
  .and.bind(
    new validator(r1.divide(0.5).isEqualTo(r1.Hadamard(2))),
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
