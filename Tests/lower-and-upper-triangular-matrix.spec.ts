"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";

const n = Math.random() * 100 >> 0;
const l1 = Matrix.lowerTriangularRandom(n, n, -1, 1);
const l2 = Matrix.lowerTriangularUniqueRandom(n, n, -1, 1);

const u1 = Matrix.upperTriangularRandom(n, n, -1, 1);
const u2 = Matrix.upperTriangularUniqueRandom(n, n, -1, 1);

const callLowerTriangularRandom = (
  rows: Integer,
  columns: Integer,
  from: number,
  to: number,
): MatrixType | NumericMatrix =>
  Matrix.lowerTriangularRandom(rows, columns, from, to);

const callUpperTriangularRandom = (
  rows: Integer,
  columns: Integer,
) => Matrix.upperTriangularRandom(rows, columns);
const epsilon = 1e-8;
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.times(l1, l2),
      Matrix.multiplyLL(l1, l2),
    ),
  ),
).isInRange(-epsilon, epsilon)
  .describe(
    "The lower triangular random matrix and lower triangular unique random matrix methods have to;",
  )
  .and.bind(
    new validator(Matrix.FrobeniusNorm(
      Matrix.minus(
        Matrix.times(l1, u2),
        Matrix.multiplyLU(l1, u2),
      ),
    )).isInRange(-epsilon, epsilon),
  )
  .test({ title: true, success: "green", error: "red" })
  .describe("1. return the correct result.")
  .test();

new validator(callLowerTriangularRandom)
  .throwsErrorWith(-1, 2)
  .and.throwsErrorWith(2, -1)
  .and.throwsErrorWith(-Infinity, Infinity)
  .and.throwsErrorWith(Infinity, Infinity)
  .describe(
    "2. throw error when the rows or columns parameters are not correct.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.times(u1, u2),
      Matrix.multiplyUU(u1, u2),
    ),
  ),
).isInRange(-epsilon, epsilon)
  .describe(
    "The upperTriangularRandom and upperTriangularUniqueRandom methods have to:",
  )
  .test({ title: true, success: "green", error: "red" })
  .describe("1. return the correct rresult.")
  .test();

new validator(callUpperTriangularRandom)
  .throwsErrorWith(-1, 12)
  .and.throwsErrorWith(Math.PI, Math.E)
  .and.throwsErrorWith(-Infinity, 23)
  .and.throwsErrorWith(Infinity, Infinity)
  .describe(
    "2. throw error when the rows or columns parameters are incorrectly defined.",
  )
  .test();
