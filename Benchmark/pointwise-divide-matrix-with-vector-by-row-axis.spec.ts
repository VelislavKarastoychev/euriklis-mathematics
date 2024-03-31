"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import {  MatrixType, NumericMatrix } from "../src/Matrix/types";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const v1 = Matrix.uniqueRandom(1, dimensions[0]);
  const v2 = Matrix.uniqueRandom(dimensions[0], 1);
  const pointwiseDivideRowVectorMatrixByRowAxis = (
    v: MatrixType | NumericMatrix,
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] / v[i];reti[j] = xi[j] / v[i];};\n" +
        "if(j === 0) reti[0] = xi[0] / v[i];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const pointwiseDivideColVectorMatrixByRowAxis = (
    v: MatrixType | NumericMatrix,
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v[i]", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] / v[i][0];reti[j] = xi[j] / v[i][0];};\n" +
        "if(j === 0) reti[0] = xi[0] / v[i][0];",
      "let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseDivideMatrixWithVectorByRowAxis(r1, v1),
          pointwiseDivideRowVectorMatrixByRowAxis(v1, r1),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.pointwiseDivideMatrixWithVectorByRowAxis(r1, v2, undefined, "column"),
          pointwiseDivideColVectorMatrixByRowAxis(v2, r1),
        ),
      ) <= 1e-8;
  const euriklisTestForRowVector = (m: any) =>
    m.pointwiseDivideMatrixWithVectorByRowAxis(r1, v1);
  const numericTestForRowVector = (_: any) =>
    pointwiseDivideRowVectorMatrixByRowAxis(v1, r1);
  const euriklisTestForColVector = (m: any) =>
    m.pointwiseDivideMatrixWithVectorByRowAxis(r1, v2, undefined, "column");
  const numericTestForColVector = (_: any) =>
    pointwiseDivideColVectorMatrixByRowAxis(v2, r1);
  startPerformanceTest(
    "pointwiseDivideMatrixWithVectorByRowAxis in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestForRowVector,
    numericTestForRowVector,
  );
  startPerformanceTest(
    "pointwiseDivideMatrixWithVectorByRowAxis in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestForColVector,
    numericTestForColVector,
  );
})();

