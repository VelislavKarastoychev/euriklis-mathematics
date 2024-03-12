"use strict";
import { Matrix } from "../src";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
import validator from "@euriklis/validator-ts";

const a = Matrix.uniqueRandom(3, 3);
const inva = Matrix.inverse(a);
const I = Matrix.identity(3);
const ainva = Matrix.times(a, inva);
const norm = Matrix.FrobeniusNorm(
  Matrix.minus(ainva, I),
);
const r55 = Matrix.uniqueRandom(5, 5);
new validator(norm)
  .describe("The inverse method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isLessThanOrEqual(1e-8)
  .describe(
    "1. compute the inverse matrix with hight precision with the LU decomposition method.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.times(
        r55,
        Matrix.inverse(r55, undefined, "Gauss"),
      ),
      Matrix.identity(5),
    ),
  ),
).isLessThanOrEqual(1e-8)
  .describe(
    "2. compute the inverse with hight precision with the Gauss method.",
  )
  .test();

new validator((r: Integer, c: Integer): MatrixType | NumericMatrix => Matrix.inverse(Matrix.random(r, c)))
  .throwsErrorWith(6, 7)
  .and.throwsErrorWith(-Infinity, Infinity)
  .describe("3. throws error when the matrix is incorrectly defined or if is not wquare.")
  .test();
