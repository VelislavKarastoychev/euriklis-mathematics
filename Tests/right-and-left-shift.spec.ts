"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m1 = Matrix.random(3, 4, 10, 20, "generic") as NumericMatrix;
const m2 = Matrix.bitwiseOr(
  Matrix.random(3, 4, 1, 2, "generic"),
  0,
) as NumericMatrix;
const r3 = Matrix.rightShiftBy(m1, m2);
const r4 = Matrix.leftShiftBy(m1, m2);

const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c >> m2[i][j])
);

const m4 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c << m2[i][j])
);

const runRightShiftBy = (
  matrix: number | MatrixType | NumericMatrix,
) => Matrix.rightShiftBy(Matrix.random(4, 5, 10, 20), matrix);

const runLeftShiftBy = (
  matrix: number | MatrixType | NumericMatrix,
) => Matrix.leftShiftBy(Matrix.random(4, 5, 10, 20), matrix);

new validator(Matrix.isEqualTo(r3, m3))
  .isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(r4, m4)).isSame(true),
  ).describe("The righshiftBy and leftShiftBy methods have to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct results when the methods parameters are Matrices.",
  )
  .test();

new validator(Matrix.isEqualTo(Matrix.rightShiftBy(m1, m2), m3))
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.leftShiftBy(m1, Matrix.copy(m2, "float64")), m4),
    ),
  ).isSame(true)
  .describe(
    "2. return the correct result when the methods parameters are Matrix like structure.",
  )
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.rightShiftBy(m1, 1),
    Matrix.bitwiseOr(Matrix.Hadamard(m1, 0.5), 0),
  ),
)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.leftShiftBy(m1, 1),
        Matrix.bitwiseOr(Matrix.Hadamard(Matrix.bitwiseOr(m1, 0), 2), 0),
      ),
    ),
  ).describe(
    "3. return the correct result when the methods parameters are numbers.",
  )
  .isSame(true)
  .test();

new validator(runRightShiftBy).throwsErrorWith(Matrix.random(2, 2))
  .and.bind(
    new validator(runLeftShiftBy).throwsErrorWith(Matrix.random(2, 2)),
  )
  .describe(
    "4. throws error when the methods parameters are Matrices with inappropriate dimension.",
  )
  .test();

new validator(runRightShiftBy).throwsErrorWith([[12, 13]])
  .and.bind(
    new validator(runLeftShiftBy).throwsErrorWith([[12, 13]]),
  ).describe(
    "5. throws error when the methods parameters are Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runRightShiftBy).throwsErrorWith("incorrect parameter")
  .and.bind(
    new validator(runLeftShiftBy).throwsErrorWith("incorrect parameter"),
  ).describe(
    "6. throws error when the methods parameters are not numbers or Matrices or MatrixTypes or NumericMatrices.",
  )
  .test();
