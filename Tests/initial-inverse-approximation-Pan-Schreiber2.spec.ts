"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const initializationMatrixName = "second suggestion of Pan and Schreiber";
import type { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
type inverseStepNameType =
  | "Schulz"
  | "Li et al."
  | "second suggestion of Li et al."
  | "Li and Li"
  | "Soleymani";
const m = Matrix.uniqueRandom(100, 100, -10.00, 10.0);
// const invm = Matrix.inverse(m);
const PS1 = Matrix.initialInverseApproximationPanSchreiber2(m);
new validator(true).isSame(true)
  .describe(
    `Testing of ${initializationMatrixName} initial matrix for all the inverse steps:`,
  )
  .test({ title: true, success: "green", error: "red" });
const inverseStepList: {
  [__name__: inverseStepNameType]: (
    a: MatrixType | NumericMatrix,
    b: MatrixType | NumericMatrix,
  ) => MatrixType | NumericMatrix;
} = {
  Schulz: Matrix.numericalInverseStepSchulz,
  Soleymani: Matrix.numericalInverseStepSoleymaniAndToutounian,
  "Li et al.": Matrix.numericalInverseStepLiEtAl,
  "second suggestion of Li et al.": Matrix.numericalInverseStepLiEtAl2,
  "Li and Li": Matrix.numericalInverseStepLiAndLi,
};
let test: Integer = 0;
const runInverseStep = (inverseStepName: inverseStepNameType) => {
  let a: MatrixType | NumericMatrix = Matrix.copy(PS1),
    its: Integer = 0,
    mnorm = Matrix.FrobeniusNorm(
      Matrix.addNumberToDiagonal(Matrix.negate(Matrix.times(a, m)), 1),
    ),
    t1: number,
    t2: number;

  t1 = performance.now();
  try {
    while (true) {
      ++its;
      a = inverseStepList[inverseStepName](m, a) as MatrixType | NumericMatrix;

      mnorm = Matrix.FrobeniusNorm(
        Matrix.addNumberToDiagonal(Matrix.negate(Matrix.times(a, m)), 1),
      );
      if (mnorm <= 1e-8) {
        t2 = performance.now();
        new validator(true).isSame(true).describe(
          `${++test}. Convergence of ${inverseStepName} algorithm with ${initializationMatrixName} initial approximation achieved in ${its} iterations, epsilon = ${mnorm} for ${
            t2 - t1
          } miliseconds.`,
        ).test();
        break;
      }
    }
  } catch (error) {
    new validator(false).isSame(true).describe(
      `${inverseStepName} step fail. ${(error as Error).message}`,
    )
      .test();
  }
};
runInverseStep("Schulz");
runInverseStep("Li and Li");
runInverseStep("Li et al.");
runInverseStep("second suggestion of Li et al.");
runInverseStep("Soleymani");
