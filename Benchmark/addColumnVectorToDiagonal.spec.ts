"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r);
  const colVector = Matrix.replicate(Math.E, dimensions[0], 1);
  const addColumnVectorToDiagonal = (
    m: MatrixType | NumericMatrix,
    v:
      | NumericMatrix
      | MatrixType,
  ) =>
    numeric.mapreduce2(
      `accum[i][i] += v[i][0]`,
      `accum = x;const v = ${JSON.stringify(v)};`,
    )(m);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addColumnVectorToDiagonal(r, colVector),
      addColumnVectorToDiagonal(cr, colVector),
    ),
  ) < 1e-8;

  const euriklisTest = (m: any) => m.addColumnVectorToDiagonal(r, colVector);
  const numericTest = (_: any) => addColumnVectorToDiagonal(cr, colVector);
  startPerformanceTest(
    "addColumnVectorToDiagonal",
    [{ param: "matrix", type: "float64", dimensions }],
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
