"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const absoluteSumOfColumnElementsAsRow = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accumi[j] += Math.abs(xi[j]);}",
      "let accum = [[]], accumi = accum[0];for (let j = x[0].length;j--;) accumi[j] = 0;",
    )(m);

  const absoluteSumOfColumnElementsAsColumn = (m: MatrixType | NumericMatrix) =>
    numeric.mapreduce2(
      "for (j = xi.length;j--;) {accum[j][0] += Math.abs(xi[j]);}",
      "let accum = []; for(let j = x[0].length;j--;) accum[j] = [0];",
    )(m);

  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfColumnElements(r1),
          absoluteSumOfColumnElementsAsRow(r2),
        ),
      ) < 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.absoluteSumOfColumnElements(r1, undefined, "column"),
          absoluteSumOfColumnElementsAsColumn(r2),
        ),
      ) < 1e-8;

  const euriklisTestRowMode = (m: any) =>
    Matrix.absoluteSumOfColumnElements(r1);
  const euriklisTestColumnMode = (m: any) =>
    Matrix.absoluteSumOfColumnElements(r1, undefined, "column");
  const numericTestRowMode = (_: any) => absoluteSumOfColumnElementsAsRow(r2);
  const numericTestColumnMode = (_: any) =>
    absoluteSumOfColumnElementsAsColumn(r2);
  startPerformanceTest(
    "absoluteSumOfColumnElements in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestRowMode,
    numericTestRowMode,
  );

  startPerformanceTest(
    "absoluteSumOfColumnElements in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestColumnMode,
    numericTestColumnMode,
  );
})();
