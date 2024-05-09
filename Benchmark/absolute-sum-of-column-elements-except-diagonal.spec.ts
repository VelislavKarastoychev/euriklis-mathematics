"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const absoluteSumOfColumnElementsExceptDiagonalRowMode = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += i === j ? 0 : abs(xi[j]);}",
      "const abs = Math.abs;let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);
  const absoluteSumOfColumnElementsExceptDiagonalColumnMode = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += i === j ? 0 : abs(xi[j]);}",
      "const abs = Math.abs;let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfColumnElementsExceptDiagonal(r1),
          absoluteSumOfColumnElementsExceptDiagonalRowMode(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfColumnElementsExceptDiagonal(
            r1,
            undefined,
            "column",
          ),
          absoluteSumOfColumnElementsExceptDiagonalColumnMode(r2),
        ),
      ) < 1e-8;
  const euriklisTestRowMode = (m: any) =>
    m.absoluteSumOfColumnElementsExceptDiagonal(r1);
  const euriklisTestColumnMode = (m: any) =>
    m.absoluteSumOfColumnElementsExceptDiagonal(r1, undefined, "column");
  const numericTestRowMode = (_: any) =>
    absoluteSumOfColumnElementsExceptDiagonalRowMode(r2);
  const numericTestColumnMode = (_: any) =>
    absoluteSumOfColumnElementsExceptDiagonalColumnMode(r2);
  startPerformanceTest(
    "absoluteSumOfColumnElementsExceptDiagonal in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestRowMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestRowMode,
      },
    },
  );

  startPerformanceTest(
    "absoluteSumOfColumnElementsExceptDiagonal in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestColumnMode,
      },
      numericjs: {
        instance: numeric,
        test: numericTestColumnMode,
      },
    },
  );
})();
