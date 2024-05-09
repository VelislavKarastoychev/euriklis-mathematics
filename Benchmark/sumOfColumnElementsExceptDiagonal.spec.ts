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
  const sumOfColumnElementsExceptDiagonalAsRow = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += i === j ? 0 : xi[j];}",
      "let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);
  const sumOfColumnElementsExceptDiagonalAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += i === j ? 0 : xi[j];}",
      "let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfColumnElementsExceptDiagonal(r1),
          sumOfColumnElementsExceptDiagonalAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfColumnElementsExceptDiagonal(r1, undefined, "column"),
          sumOfColumnElementsExceptDiagonalAsColumn(r2),
        ),
      ) < 1e-8;
  const euriklisTestAsRow = (m: any) => m.sumOfColumnElementsExceptDiagonal(r1);
  const numericTestAsRow = (_: any) =>
    sumOfColumnElementsExceptDiagonalAsRow(r2);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfColumnElementsExceptDiagonal(r1, undefined, "column");
  const numericTestAsColumn = (_: any) =>
    sumOfColumnElementsExceptDiagonalAsColumn(r2);
  startPerformanceTest(
    "sumOfColumnElementsExceptDiagonal in row mode",
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
    "sumOfColumnsExceptDiagonal in column mode",
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
