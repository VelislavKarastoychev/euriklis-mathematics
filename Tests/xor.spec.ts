"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m1 = Matrix.random(4, 5, 1, 2, "generic") as NumericMatrix;
const m2 = Matrix.random(4, 5, 5, 6, "generic") as NumericMatrix;

const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => {
    return c ^ m2[i][j];
  })
);

const m4 = m1.map((r: number[]) => r.map((c) => c ^ 4));
const runXor = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.xor(Matrix.random(4, 5), matrix);

new validator(Matrix.isEqualTo(Matrix.xor(m1, m2), m3))
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
new validator(Matrix.isEqualTo(Matrix.xor(m1, Matrix.copy(m2, "float64")), m3))
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.xor(Matrix.copy(m1, "float64"), m2), m3),
    ),
  ).describe(
    "2. return the correct result when the method's parameter is a matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(Matrix.xor(m1, 4), m4))
  .isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number",
  )
  .test();

new validator(runXor).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();

new validator(runXor).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runXor).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();

new validator(runXor).throwsErrorWith()
  .describe("7. throws error when the method's parameter is undefined.")
  .test();
