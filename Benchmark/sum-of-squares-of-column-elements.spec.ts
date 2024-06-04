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
  const sumOfSquaresOfColumnElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += (xi[j] * xi[j]);}",
      "let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);
  const sumOfSquaresOfColumnElementsAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += (xi[j] * xi[j]);}",
      "let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfColumnElements(r1),
          sumOfSquaresOfColumnElementsAsRow(r2),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfColumnElements(r1, undefined, "column"),
          sumOfSquaresOfColumnElementsAsColumn(r2),
        ),
      ) <= 1e-8;
  const euriklisTestAsRow = (m: any) => m.sumOfSquaresOfColumnElements(r1);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfSquaresOfColumnElements(r1, undefined, "column");
  const numericTestAsRow = (_: any) => sumOfSquaresOfColumnElementsAsRow(r2);
  const numericTestAsColumn = (_: any) =>
    sumOfSquaresOfColumnElementsAsColumn(r2);

  startPerformanceTest(
    "sumOfSquaresOfColumn elements in row mode",
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
    "sumOfSquaresOfColumnElements in column mode",
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
