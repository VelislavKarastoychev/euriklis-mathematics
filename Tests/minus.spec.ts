"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r1 = Matrix.random(3, 4);
const r2 = Matrix.random(3, 4, 1, 2);
const runMinus = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(3, 4).minus(matrix);
new validator(r2.minus(r1).minus(Matrix.replicate(1, 3, 4)).FrobeniusNorm)
  .isInRange(-Matrix.epsilon, Matrix.epsilon)
  .describe("The minus method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();

new validator(r2.minus(r1.M).minus(Matrix.replicate(1, 3, 4).M).FrobeniusNorm)
  .and.bind(
    new validator(
      r2.minus(r1.data).minus(Matrix.replicate(1, 3, 4).data).FrobeniusNorm,
    ),
  )
  .isInRange(-Matrix.epsilon, Matrix.epsilon)
  .describe(
    "2. return the correct result when the method's parameter is Matrix - like structure.",
  )
  .test();

new validator(Matrix.replicate(1, 3, 4).minus(1).isEqualTo(Matrix.zeros(3, 4)))
  .isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .test();

new validator(runMinus).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();

new validator(runMinus).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error wihen the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();
new validator(runMinus).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number, Matrix, MatrixType or NumericMatrix.",
  )
  .test();
