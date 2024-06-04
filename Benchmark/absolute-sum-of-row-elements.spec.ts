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
  const absoluteSumOfRowElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += abs(xi[j]);}\n accum[0][i] = sum;",
      "const abs = Math.abs;let j, sum, accum = [[]];",
    )(m);

  const absoluteSumOfRowElementsAsColumn = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += abs(xi[j]);}\n accum[i] = [sum];",
      "const abs = Math.abs;let j, sum, xij, accum = [];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfRowElements(r1),
          absoluteSumOfRowElementsAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfRowElements(r1, undefined, "column"),
          absoluteSumOfRowElementsAsColumn(r2),
        ),
      ) < 1e-8;

  const euriklisTestAsRow = (m: any) => m.absoluteSumOfRowElements(r1);
  const euriklisTestAsColumn = (m: any) =>
    m.absoluteSumOfRowElements(r1, undefined, "column");
  const numericTestAsRow = (_: any) => absoluteSumOfRowElementsAsRow(r2);
  const numericTestAsColumn = (_: any) => absoluteSumOfRowElementsAsColumn(r2);
  startPerformanceTest(
    "absoluteSumOfRowElements in row mode",
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
    "absoluteSumOfRowsElements in column mode",
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
