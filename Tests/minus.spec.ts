"use strict";
import validator from "@euriklis/validator-ts";
import { epsilon, Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r1 = Matrix.random(3, 4);
const r2 = Matrix.random(3, 4, 1, 2);
const runMinus = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.minus(Matrix.random(3, 4), matrix);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(Matrix.minus(r2, r1), Matrix.replicate(1, 3, 4)),
  ),
)
  .isInRange(-epsilon, epsilon)
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

new validator(
  Matrix.FrobeniusNorm(
    Matrix.copy(
      Matrix.minus(
        Matrix.minus(r2, Matrix.copy(r1, "generic")),
        Matrix.replicate(1, 3, 4),
      ),
      "generic",
    ),
  ),
)
  .and.bind(
    new validator(
      Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.minus(r2, Matrix.copy(r1, "float32")),
          Matrix.copy(Matrix.replicate(1, 3, 4), "float32"),
        ),
      ),
    ),
  )
  .isInRange(-epsilon, epsilon)
  .describe(
    "2. return the correct result when the method's parameter is Matrix - like structure.",
  )
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.minus(Matrix.replicate(1, 3, 4), 1),
    Matrix.zeros(3, 4),
  ),
)
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
