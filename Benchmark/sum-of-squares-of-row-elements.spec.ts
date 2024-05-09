"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1, "generic");
  const sumOfSquaresOfRowElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += (xi[j] * xi[j]);}\n accum[0][i] = sum;",
      "let j, sum, accum = [[]];",
    )(m);

  const sumOfSquaresOfRowElementsAsColumn = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += (xi[j] * xi[j]);}\n accum[i] = [sum];",
      "let j, sum, xij, accum = [];",
    )(m);

  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfRowElements(r1),
          sumOfSquaresOfRowElementsAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfRowElements(r1, undefined, "column"),
          sumOfSquaresOfRowElementsAsColumn(r2),
        ),
      ) < 1e-8;
  const euriklisTestAsRow = (m: any) => m.sumOfSquaresOfRowElements(r1);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfSquaresOfRowElements(r1, undefined, "column");
  const numericTestAsRow = (_: any) => sumOfSquaresOfRowElementsAsRow(r2);
  const numericTestAsColumn = (_: any) => sumOfSquaresOfRowElementsAsColumn(r2);
  startPerformanceTest(
    "sumOfSquaresOfRowElements in row mode",
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
    "sumOfSquaresOfRowElements in column mode",
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
