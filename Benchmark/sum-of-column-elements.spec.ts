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
  const sumOfColumnElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += xi[j];}",
      "let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);

  const sumOfColumnElementsAsColumn = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += xi[j];}",
      "let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfColumnElements(r1),
          sumOfColumnElementsAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfColumnElements(r1, undefined, "column"),
          sumOfColumnElementsAsColumn(r2),
        ),
      ) < 1e-8;
  const euriklisTestsRow = (m: any) => m.sumOfColumnElements(r1);
  const numericTestsAsRow = (_: any) => sumOfColumnElementsAsRow(r2);
  const euriklisTestsAsColumn = (m: any) =>
    m.sumOfColumnElements(r1, undefined, "column");
  const numericTestAsColumn = (_: any) => sumOfColumnElementsAsColumn(r2);

  startPerformanceTest(
    "sumOfColumnElements in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestsRow,
      },
      numericjs: {
        instance: numeric,
        test: numericTestsAsRow,
      },
    },
  );
  startPerformanceTest(
    "sumOfColumnElements in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestsAsColumn
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsColumn
      }
    }
  );
})();
