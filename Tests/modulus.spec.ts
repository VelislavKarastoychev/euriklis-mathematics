"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r1 = Matrix.random(3, 4, 2, 10);
const r2 = Matrix.random(3, 4, 5, 15);
const m1 = r1.M;
const m2 = r2.M;
const m3 = m2.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c % m1[i][j])
);
const m4 = m2.map((r: number[], i: number) => r.map((c: number) => c % 3));
const runModulus = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(5, 4).modulus(matrix);
new validator(r2.modulus(r1).isEqualTo(m3))
  .describe("The modulus method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();

new validator(r2.modulus(m1).isEqualTo(m3))
  .and.bind(
    new validator(r2.modulus(r1.data).isEqualTo(m3)),
  ).isSame(true)
  .describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .test();

new validator(r2.modulus(3).isEqualTo(m4))
  .isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .test();

new validator(runModulus).throwsErrorWith(Matrix.random(3, 4))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();

new validator(runModulus).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runModulus).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();

new validator(runModulus).throwsErrorWith()
  .describe("7. throws error when the method's parameter is undefined.")
  .test();
