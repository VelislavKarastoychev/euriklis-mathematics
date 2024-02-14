"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1 = Matrix.random(3, 4);
const r2 = Matrix.random(3, 4);

const m1 = r1.M;
const m2 = r2.M;

const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c ** m2[i][j])
);

const m4 = m1.map((r: number[]) => r.map((c: number) => c ** 2));

const runPower = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(3, 4).power(matrix);
new validator(r1.power(r2).isEqualTo(m3))
  .describe("The power method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .isSame(true)
  .test();

new validator(r1.power(r2.M).isEqualTo(m3))
  .and.bind(
    new validator(r1.power(r2.data).isEqualTo(m3)),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(r1.power(2).isEqualTo(m4))
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();

new validator(runPower).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();

new validator(runPower).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runPower).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();

new validator(runPower).throwsErrorWith()
  .describe("7. throws error when the method's parameter is undefined.")
  .test();
