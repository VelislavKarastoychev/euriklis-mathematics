"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const v1 = Matrix.uniqueRandom(1, dimensions[0]);
  const v2 = Matrix.uniqueRandom(dimensions[0], 1);
  const subtractRowVectorFromMatrixByRowAxis = (v, m) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] - v[i];reti[j] = xi[j] - v[i];};\n" +
        "if(j === 0) reti[0] = xi[0] - v[i];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const subtractColVectorFromMatrixByRowAxis = (v, m) =>
    numeric.pointwise2(
      ["v[i]", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] - v[i][0];reti[j] = xi[j] - v[i][0];};\n" +
        "if(j === 0) reti[0] = xi[0] - v[i][0];",
      "let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.subtractVectorFromMatrixByRowAxis(r1, v1),
          subtractRowVectorFromMatrixByRowAxis(v1, r1),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.subtractVectorFromMatrixByRowAxis(r1, v2, undefined, "column"),
          subtractColVectorFromMatrixByRowAxis(v2, r1),
        ),
      ) <= 1e-8;
  const euriklisTestForRow = (m: any) =>
    m.subtractVectorFromMatrixByRowAxis(r1, v1);
  const euriklisTestForCol = (m: any) =>
    m.subtractVectorFromMatrixByRowAxis(r1, v2, undefined, "column");
  const numericTestForRow = (_: any) =>
    subtractRowVectorFromMatrixByRowAxis(v1, r1);
  const numericTestForCol = (_: any) =>
    subtractColVectorFromMatrixByRowAxis(v2, r1);

  startPerformanceTest(
    "subtractVectorFromMatrixByRowAxis in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForRow,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForRow,
      },
    },
  );
  startPerformanceTest(
    "subtractVectorFromMatrixByRowAxis",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForCol,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForCol,
      },
    },
  );
})();
