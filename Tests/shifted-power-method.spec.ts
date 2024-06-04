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

let i: Integer,
  eigenvalue: number = 1.0,
  eigenvector: MatrixType | NumericMatrix = Matrix.random(matrix.length, 1),
  result: {
    eigenvalue: number;
    eigenvector: MatrixType | NumericMatrix;
    remainder: number;
  };

for (i = 0; i < 10; i++) {
  result = Matrix.shiftedPowerMethodIteraton(
    matrix,
    eigenvector,
    i ? (1 / eigenvalue) : 1,
  );
  eigenvalue = result.eigenvalue;
  eigenvector = result.eigenvector;
}

new validator(eigenvalue - Matrix.eigenproblem(matrix).eigenvalues.real[0])
  .isInRange(-1e-8, 1e-8)
  .describe("The shiftedPowerMethodIteration has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. compute correctly an approximation of the eigenvalue.")
  .test();
