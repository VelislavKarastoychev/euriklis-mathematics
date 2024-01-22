"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r1 = Matrix.random(4, 5, 1, 2);
const r2 = Matrix.random(4, 5, 5, 6);

const m1 = r1.M;
const m2 = r2.M;

const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => {
    return c ^ m2[i][j];
  })
);

const m4 = m1.map((r: number[]) => r.map((c) => c ^ 4));
const runXor = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(4, 5).xor(matrix);

new validator(r1.xor(r2).isEqualTo(m3))
  .describe("The xor method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result when the method's parameter is a Matrix",
  )
  .isSame(true)
  .test();
new validator(r1.xor(r2.M).isEqualTo(m3))
  .and.bind(
    new validator(r1.xor(r2.data).isEqualTo(m3)),
  ).describe(
    "2. return the correct result when the method's parameter is a matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(r1.xor(4).isEqualTo(m4))
  .isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number",
  )
  .test();

new validator(runXor).throwsErrorWith(Matrix.random(2, 2))
  .describe("4. throws error when the method's parameter is a Matrix with inappropriate dimension.")
  .test();

new validator(runXor).throwsErrorWith([[12, 13]])
  .describe("5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.")
  .test();

new validator(runXor).throwsErrorWith("incorrect parameter")
  .describe("6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.")
  .test();

new validator(runXor).throwsErrorWith()
  .describe("7. throws error when the method's parameter is undefined.")
  .test();
