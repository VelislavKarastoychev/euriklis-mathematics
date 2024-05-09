"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const v1 = Matrix.uniqueRandom(1, dimensions[1]);
  const v2 = Matrix.transpose(v1);
  const pointwiseMultiplyMatrixWithVectorByColumnAxisInRowMode = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j] * v[j--];reti[j] = xi[j] * v[j];};\n" +
        "if(j === 0) reti[0] = xi[0] * v[0];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);

  const pointwiseMultiplyMatrixWithVectorByColumnAxisInColumnMode = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v[i]", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j] * v[j--][0];reti[j] = xi[j] * v[j][0];};\n" +
        "if(j === 0) reti[0] = xi[0] * v[0][0];",
      "let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);

  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseMultiplyMatrixWithVectorByColumnAxis(r1, v1),
          pointwiseMultiplyMatrixWithVectorByColumnAxisInRowMode(r2, v1),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseMultiplyMatrixWithVectorByColumnAxis(
            r1,
            v2,
            undefined,
            "column",
          ),
          pointwiseMultiplyMatrixWithVectorByColumnAxisInColumnMode(r2, v2),
        ),
      ) <= 1e-8;

  const euriklisTestInRowMode = (m: any) =>
    m.pointwiseMultiplyMatrixWithVectorByColumnAxis(r1, v1);
  const euriklisTestInColumnMode = (m: any) =>
    m.pointwiseMultiplyMatrixWithVectorByColumnAxis(
      r1,
      v2,
      undefined,
      "column",
    );
  const numericTestInRowMode = (_: any) =>
    pointwiseMultiplyMatrixWithVectorByColumnAxisInRowMode(r2, v1);
  const numericTestInColumnMode = (_: any) =>
    pointwiseMultiplyMatrixWithVectorByColumnAxisInColumnMode(r2, v2);
  startPerformanceTest(
    "pointwiseMultiplyMatrixWithVectorByColumnAxis in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestInRowMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestInRowMode,
      },
    },
  );

  startPerformanceTest(
    "pointwiseMultiplyMatrixWithVectorByColumnAxis in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestInColumnMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestInColumnMode,
      },
    },
  );
})();
