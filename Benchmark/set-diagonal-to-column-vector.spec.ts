"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const v1 = Matrix.random(dimensions[0], 1);
  const v2 = Matrix.copy(v1);
  const setDiagonalToColumnVector = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix =>
    numeric.pointwise2(
      ["x[i]", "v"],
      "for (j = x[i].length;j--;) if (i === j) x[i][j] = v[i][0];\nret[i] = x[i];",
      "let j;",
    )(m, v);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.setDiagonalToColumnVector(r1, v1),
      setDiagonalToColumnVector(r2, v2),
    ),
  ) <= 1e-8;
  const euriklisTest = (m: any) => m.setDiagonalToColumnVector(r1, v1);
  const numericTest = (_: any) => setDiagonalToColumnVector(r2, v2);
  startPerformanceTest(
    "setDiagonalToColumnVector",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
