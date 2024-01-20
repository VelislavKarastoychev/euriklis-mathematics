"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
const r1 = Matrix.random(3, 4, 4, 10);
const r2 = Matrix.random(3, 4, 1, 2);
const result = Matrix.zeros(3, 4);
result.setBlock({ from: [2, 3], to: [2, 3], block: [[1]] });
const result2 = [ [ 2, 2, 0, 0 ], [ 2, 2, 2, 2 ], [ 0, 0, 0, 0 ] ];
const runBitwiseAnd = (matrix: number | Matrix | MatrixType | NumericMatrix) => r1.bitwiseAnd(matrix);
new validator(r1.bitwiseAnd(r2).isEqualTo(result))
  .describe("The bitwiseAnd method has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  }).describe("1. return the correct result when the method's parameter is a Matrix.")
  .isSame(true)
  .test();

new validator(r1.bitwiseAnd(r2.data).isEqualTo(result.data))
  .and.bind(
    new validator(r1.bitwiseAnd(r2.M).isEqualTo(result.M))
  ).describe("2. return the correct result when the method's parameter is a Matrix - like structure.")
  .isSame(true)
  .test();

new validator(r1.bitwiseAnd(2).isEqualTo(result2))
  .isSame(true)
  .describe("3. return the correct result when the method's parameter is a number.")
  .test();
new validator(runBitwiseAnd).throwsErrorWith(Matrix.random(2, 2))
  .describe("4. throws error when the method's parameter is a Matrix with inappropriate dimension.")
  .test();
new validator(runBitwiseAnd).throwsErrorWith([[12, 13]])
  .describe("5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.")
  .test();
new validator(runBitwiseAnd).throwsErrorWith("incorrect parameter")
  .describe("6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix")
  .test();
