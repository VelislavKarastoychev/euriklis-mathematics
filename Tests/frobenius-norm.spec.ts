"use strict";
import type {
  MatrixType,
  NumericMatrix,
} from "../src/Types";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";
const m: MatrixType | NumericMatrix = Matrix.random(31, 21);
const mNorm = (Matrix.copy(m, "generic") as NumericMatrix).reduce(
  (acc: number, row: number[]): number => {
    acc = acc + row.reduce((acc1: number, element: number): number => {
      return acc1 + element * element;
    }, 0);
    return acc;
  },
  0,
);
const callFrobeniusNorm = (m: MatrixType | NumericMatrix) => Matrix.FrobeniusNorm(m);
new validator(Matrix.FrobeniusNorm(Matrix.identity(5))).isSame(Math.sqrt(5))
  .describe("Frobenius norm method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .and.bind(
    new validator(Matrix.FrobeniusNorm(m))
      .isSame(Math.sqrt(mNorm)),
  )
  .describe("1. compute correctly the norm of a matrix").test();

new validator(callFrobeniusNorm)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("This throws!!!")
  .describe("2. throw error when the matrix is incorrectly defined.")
  .test();
