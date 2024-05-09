"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

(async () => {
  const r1 = Matrix.uniqueRandom(5, 5);
  const r2 = Matrix.copy(r1);
  const v1 = Matrix.random(1, 5);
  const v2 = Matrix.copy(v1);
  const setDiagonalToRowVector = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["x[i]", "v"],
      "for (j = x[i].length;j--;) (i === j) ? x[i][j] = vi[j] : x[i][j];\nret[i] = x[i];",
      "let j, vi = v[0];",
    )(m, v);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.setDiagonalToRowVector(r1, v1),
      setDiagonalToRowVector(r2, v2),
    ),
  ) <= 1e-8;
  const euriklisTest = (m: any) => m.setDiagonalToRowVector(r1, v1);
  const numericTest = (_: any) => setDiagonalToRowVector(r1, v2);
  startPerformanceTest(
    "setDiagonalToRowVector",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numericjs: {
        instance: numeric,
        test: numericTest,
      },
    },
  );
})();
