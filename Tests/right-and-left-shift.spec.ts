"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1 = Matrix.random(3, 4, 10, 20);
const r2 = Matrix.random(3, 4, 1, 2).bitwiseOr(0);
const r3 = r1.rightShiftBy(r2);
const r4 = r1.leftShiftBy(r2);

const m1 = r1.M;
const m2 = r2.M;

const m3 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c >> m2[i][j])
);

const m4 = m1.map((r: number[], i: number) =>
  r.map((c: number, j: number) => c << m2[i][j])
);

const runRightShiftBy = (
  matrix: number | Matrix | MatrixType | NumericMatrix,
) => Matrix.random(4, 5, 10, 20).rightShiftBy(matrix);

const runLeftShiftBy = (
  matrix: number | Matrix | MatrixType | NumericMatrix,
) => Matrix.random(4, 5, 10, 20).leftShiftBy(matrix);

new validator(r3.isEqualTo(m3))
  .and.bind(
    new validator(r4.isEqualTo(m4)),
  ).describe("The righshiftBy and leftShiftBy methods have to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct results when the methods parameters are Matrices.",
  )
  .isSame(true)
  .test();

new validator(r1.rightShiftBy(m2).isEqualTo(m3))
  .and.bind(
    new validator(r1.leftShiftBy(r2.data).isEqualTo(m4)),
  ).isSame(true)
  .describe(
    "2. return the correct result when the methods parameters are Matrix like structure.",
  )
  .test();

new validator(r1.rightShiftBy(1).isEqualTo(r1.Hadamard(0.5).bitwiseOr(0)))
  .and.bind(
    new validator(
      r1.leftShiftBy(1).isEqualTo(r1.bitwiseOr(0).Hadamard(2).bitwiseOr(0)),
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
