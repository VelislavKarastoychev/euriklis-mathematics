"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";
import numeric from "numericjs";
(async () => {
  const addRowVectorToDiagonal = (
    m: MatrixType | NumericMatrix,
    v:
      | NumericMatrix
      | MatrixType,
  ) => numeric.mapreduce(`accum[i][i] += ${v[0]}[i]`, `accum = x;`)(m);
  const r = Matrix.uniqueRandom(...dimensions);
  const rowVector = Matrix.replicate(Math.E, 1, dimensions[1]);
  const cr = Matrix.copy(r);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addRowVectorToDiagonal(r, rowVector),
      addRowVectorToDiagonal(cr, rowVector),
    ),
  ) > 1e-8;

  const euriklisTest = (m: any) => m.addRowVectorToDiagonal(r, rowVector);
  const numericTest = (_: any) => addRowVectorToDiagonal(cr, rowVector);
  startPerformanceTest(
    "addRowVectorToiagonal",
    [{ param: "matrix", dimensions, type: "float64" }, {
      param: "row vector",
      dimensions: [1, dimensions[1]],
      type: "float64",
    }],
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
