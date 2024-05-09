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
  const subtractVectorFromMatrixByColumnAxisInRowMode = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j] - v[j--];reti[j] = xi[j] - v[j];};\n" +
        "if(j === 0) reti[0] = xi[0] - v[0];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);

  const subtractVectorFromMatrixByColumnAxisInColumnMode = (
    m: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v[i]", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j] - v[j--][0];reti[j] = xi[j] - v[j][0];};\n" +
        "if(j === 0) reti[0] = xi[0] - v[0][0];",
      "let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.subtractVectorFromMatrixByColumnAxis(r1, v1),
          subtractVectorFromMatrixByColumnAxisInRowMode(r2, v1),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.subtractVectorFromMatrixByColumnAxis(
            r1,
            v2,
            undefined,
            "column",
          ),
          subtractVectorFromMatrixByColumnAxisInColumnMode(r2, v2),
        ),
      ) <= 1e-8;
  const euriklisTestForRowMode = (m: any) =>
    m.subtractVectorFromMatrixByColumnAxis(r1, v1);
  const euriklisTestForColumnMode = (m: any) =>
    m.subtractVectorFromMatrixByColumnAxis(r1, v2, undefined, "column");
  const numericTestForRowMode = (_: any) =>
    subtractVectorFromMatrixByColumnAxisInRowMode(r2, v1);
  const numericTestForColumnMode = (_: any) =>
    subtractVectorFromMatrixByColumnAxisInColumnMode(r2, v2);
  startPerformanceTest(
    "subtractVectorFromMatrixByColumnAxis in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForRowMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForRowMode,
      },
    },
  );

  startPerformanceTest(
    "subtractVectorFromMatrixByColumnAxis in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestForColumnMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestForColumnMode,
      },
    },
  );
})();
