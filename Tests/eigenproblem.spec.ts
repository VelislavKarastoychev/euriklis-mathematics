"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 5, 16],
];

const eigenvalues = [32.4642, -2.46425, 4, 0],
  eigenvectors = [
    [.25531, -.978357, 0, 2],
    [.600834, -.443225, -1, -3],
    [.946137, .0919069, -2, 0],
    [1, 1, 2, 1],
  ];
new validator(
  Matrix.isNearlyEqualTo(
    [
      Matrix.eigenproblem(matrix, { method: "HQR2" }).eigenvalues.real,
    ] as MatrixType | NumericMatrix,
    [eigenvalues],
    1e-4,
  ),
).isSame(true)
  .describe("The eigenproblem method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. compute the correct eigenpairs with the method HQR.")
  .test();
