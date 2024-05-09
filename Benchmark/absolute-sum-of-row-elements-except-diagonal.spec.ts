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
  const absoluteSumOfRowElementsExceptDiagonal = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += +(i !== j) * abs(xi[j]);}\n accum[0][i] = sum;",
      "const abs = Math.abs;let j, sum, accum = [[]];",
    )(m);

  const absoluteSumOfRowElementsExceptDiagonalAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) { sum += +(i !== j) * abs(xi[j]);}\n accum[i] = [sum];",
      "const abs = Math.abs;let j, sum, xij, accum = [];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfRowElementsExceptDiagonal(r1),
          absoluteSumOfRowElementsExceptDiagonal(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfRowElementsExceptDiagonal(
            r2,
            undefined,
            "column",
          ),
          absoluteSumOfRowElementsExceptDiagonalAsColumn(r2),
        ),
      ) < 1e-8;

  const euriklisTestAsRow = (m: any) =>
    Matrix.absoluteSumOfRowElementsExceptDiagonal(r1);
  const euriklisTestAsColumn = (m: any) =>
    Matrix.absoluteSumOfRowElementsExceptDiagonal(r1, undefined, "column");
  const numericTestAsRow = (_: any) =>
    absoluteSumOfRowElementsExceptDiagonal(r2);
  const numericTestAsColumn = (_: any) =>
    absoluteSumOfRowElementsExceptDiagonalAsColumn(r2);
  startPerformanceTest(
    "absoluteSumOfRowElementsExceptDiagonal in row mode",
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
    "absoluteSumOfRowElementsExceptDiagonal in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestAsColumn,
      },
      numericjs: {
        instance: Matrix,
        test: numericTestAsColumn,
      },
    },
  );
})();
