"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";
import numeric from "numericjs";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
  const sumOfSquaresOfColumnElementsExceptDiagonalAsRow = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += i === j ? 0 : xi[j] * xi[j];}",
      "let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);

  const sumOfSquaresOfColumnElementsExceptDiagonalAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += i === j ? 0 : xi[j] * xi[j];}",
      "let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);

  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfColumnElementsExceptDiagonal(r1),
          sumOfSquaresOfColumnElementsExceptDiagonalAsRow(r2),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfColumnElementsExceptDiagonal(
            r2,
            undefined,
            "column",
          ),
          sumOfSquaresOfColumnElementsExceptDiagonalAsColumn(r2),
        ),
      ) <= 1e-8;
  const euriklisTestAsRow = (m: any) =>
    m.sumOfSquaresOfColumnElementsExceptDiagonal(r1);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfSquaresOfColumnElementsExceptDiagonal(r1, undefined, "column");
  const numericTestAsRow = (_: any) =>
    sumOfSquaresOfColumnElementsExceptDiagonalAsRow(r2);
  const numericTestAsColumn = (_: any) =>
    sumOfSquaresOfColumnElementsExceptDiagonalAsColumn(r2);
  startPerformanceTest(
    "sumOfSquresOfColumnElementsExceptDiagonal in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestAsRow,
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsRow,
      },
    },
  );

  startPerformanceTest(
    "sumOfSquaresOfColumnElementsExceptDiagonal in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestAsColumn,
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsColumn,
      },
    },
  );
})();
