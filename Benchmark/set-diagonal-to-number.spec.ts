"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import type { MatrixType, NumericMatrix } from "../src/Types";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const setDiagonalToNumber = (m: MatrixType | NumericMatrix, k: number) =>
    numeric.pointwise2(
      ["x[i]", "k"],
      "for (j = x[i].length;j--;) i === j ? x[i][j] = k : x[i][j];\nret[i] = x[i];",
      "let j;",
    )(m, k);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.setDiagonalToNumber(r1, Math.PI),
      setDiagonalToNumber(r2, Math.PI),
    ),
  ) <= 1e-8;
  const rand = Math.random();
  const euriklisTest = (m: any) => m.setDiagonalToNumber(r1, rand);
  const numericTest = (_: any) => setDiagonalToNumber(r2, rand);
  startPerformanceTest(
    "setDiagonalToNumber",
    [{param: "matrix", dimensions, type: "float64"}],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      }
    }
  );
})();
