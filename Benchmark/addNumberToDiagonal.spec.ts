"use strict";

import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const addNumberToDiagonal = (m: MatrixType | NumericMatrix, n: number) =>
    numeric.mapreduce2(`accum[i][i] += ${n}`, "accum = x")(m);

  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addNumberToDiagonal(r1, Math.PI),
      addNumberToDiagonal(r2, Math.PI),
    ),
  ) < 1e-8;

  const euriklisTest = (m: any) => m.addNumberToDiagonal(r1, Math.E);
  const numericTest = (m: any) => addNumberToDiagonal(r2, Math.E);

  startPerformanceTest(
    "addNumberToDiagonal",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
