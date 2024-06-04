"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import type { MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const v1 = Matrix.uniqueRandom(1, dimensions[0]);
  const v2 = Matrix.uniqueRandom(dimensions[0], 1);
  const pointwiseMultiplyRowVectorMatrixByRowAxis = (
    v: MatrixType | NumericMatrix,
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] * v[i];reti[j] = xi[j] * v[i];};\n" +
        "if(j === 0) reti[0] = xi[0] * v[i];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const pointwiseMultiplyColVectorMatrixByRowAxis = (
    v: MatrixType | NumericMatrix,
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v[i]", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] * v[i][0];reti[j] = xi[j] * v[i][0];};\n" +
        "if(j === 0) reti[0] = xi[0] * v[i][0];",
      "let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseMultiplyMatrixWithVectorByRowAxis(r1, v1),
          pointwiseMultiplyRowVectorMatrixByRowAxis(v1, r1),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseMultiplyMatrixWithVectorByRowAxis(
            r1,
            v2,
            undefined,
            "column",
          ),
          pointwiseMultiplyColVectorMatrixByRowAxis(v2, r1),
        ),
      ) <= 1e-8;
  const euriklisTestForRowVector = (m: any) =>
    m.pointwiseMultiplyMatrixWithVectorByRowAxis(r1, v1);
  const numericTestForRowVector = (_: any) =>
    pointwiseMultiplyRowVectorMatrixByRowAxis(v1, r1);
  const euriklisTestForColVector = (m: any) =>
    m.pointwiseMultiplyMatrixWithVectorByRowAxis(r1, v2, undefined, "column");
  const numericTestForColVector = (_: any) =>
    pointwiseMultiplyColVectorMatrixByRowAxis(v2, r1);
  startPerformanceTest(
    "pointwiseMultiplyMatrixWithVectorByRowAxis in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForRowVector,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForRowVector,
      },
    },
  );
  startPerformanceTest(
    "pointwiseMultiplyMatrixWithVectorByRowAxis in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForColVector,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForColVector,
      },
    },
  );
})();
