"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";

import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);

  const sumOfRowElementsExceptDiagonalAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) {sum += i !== j ? xi[j] : 0;}; accum[0][i] = sum;",
      "let j, xij, sum, accum = [[]];",
    )(m);

  const sumOfRowElementsExceptDiagonalAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) {sum += i !== j ? xi[j] : 0;}; accum[i] = [sum];",
      "let j, xij, sum, accum = [];",
    )(m);
  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfRowElementsExceptDiagonal(r1),
          sumOfRowElementsExceptDiagonalAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfRowElementsExceptDiagonal(r1, undefined, "column"),
          sumOfRowElementsExceptDiagonalAsColumn(r2),
        ),
      ) < 1e-8;

  const euriklisTestAsRow = (m: any) => m.sumOfRowElementsExceptDiagonal(r2);
  const numericTestAsRow = (_: any) => sumOfRowElementsExceptDiagonalAsRow(r2);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfRowElementsExceptDiagonal(r1, undefined, "column");
  const numericTestAsColumn = (_: any) =>
    sumOfRowElementsExceptDiagonalAsColumn(r2);

  startPerformanceTest(
    "sumOfRowElementsExceptDiagonal in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestAsRow
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsRow
      }
    }
  );

  startPerformanceTest(
    "sumOfRowElementsExceptDiagonal in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestAsColumn
      },
      numericjs: {
        instance: numeric,
        test: numericTestAsColumn
      }
    }
  );
})();
