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
  const sumOfRowElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += xi[j];}\n accum[0][i] = sum;",
      "let j, sum, accum = [[]];",
    )(m);

  const sumOfRowElementsAsColumn = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += xi[j];}\n accum[i] = [sum];",
      "let j, sum, xij, accum = [];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfRowElements(r1, undefined, "row"),
          sumOfRowElementsAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfRowElements(r1, undefined, "column"),
          sumOfRowElementsAsColumn(r2),
        ),
      ) < 1e-8;

  const euriklisTestRow = (m: any) => m.sumOfRowElements(r1);
  const numericTestAsRow = (_: any) => sumOfRowElementsAsRow(r2);
  const euriklisTestColumn = (m: any) =>
    m.sumOfRowElements(r1, undefined, "column");
  const numericTestAsColumn = (_: any) => sumOfRowElementsAsColumn(r2);

  startPerformanceTest(
    "sumOfRowElements method in row mode",
    [{ param: "matrix" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestRow,
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsRow,
      },
    },
  );

  startPerformanceTest(
    "sumOfRowElements in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestColumn,
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsColumn,
      },
    },
  );
})();
