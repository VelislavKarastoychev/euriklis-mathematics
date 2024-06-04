"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 5, 16],
];

// make a loop which extracts the eigenvalue.

let i: Integer,
  eigenvalue: number = 1,
  eigenvector: MatrixType | NumericMatrix = Matrix.random(4, 1, 100, 200),
  result: { eigenvalue: number; eigenvector: MatrixType | NumericMatrix };

for (i = 0; i < 8; i++) {
  result = Matrix.powerMethodIteration(matrix, eigenvector);
  eigenvalue = result.eigenvalue;
  eigenvector = result.eigenvector;
}

new validator(eigenvalue - Matrix.eigenproblem(matrix).eigenvalues.real[0])
  .isInRange(-1e-5, 1e-5)
  .describe("The powerMethodIteration method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute correctly an approximation of the eigenvalue and the eigenvector of a real matrix.",
  )
  .test();
