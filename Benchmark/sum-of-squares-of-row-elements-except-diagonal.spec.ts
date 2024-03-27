"use strict";
import { dimensions, startPerformanceTest } from "./utils";
import { Matrix } from "../src";
import numeric from "numericjs";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const sumOfSquaresOfRowElementsExceptDiagonalAsRow = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) {sum += i !== j ? (xi[j] * xi[j]) : 0;}; accum[0][i] = sum;",
      "let j, xij, sum, accum = [[]];",
    )(m);

  const sumOfSquaresOfRowElementsExceptDiagonalAsColumn = (
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.mapreduce2(
      "sum = 0;for (j = xi.length;j--;) {sum += i !== j ? xi[j] * xi[j] : 0;}; accum[i] = [sum];",
      "let j, xij, sum, accum = [];",
    )(m);

  const condition = Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfRowElementsExceptDiagonal(r1),
          sumOfSquaresOfRowElementsExceptDiagonalAsRow(r2),
        ),
      ) <= 1e-8 && Matrix.FrobeniusNorm(
        Matrix.minus(
          Matrix.sumOfSquaresOfRowElementsExceptDiagonal(
            r1,
            undefined,
            "column",
          ),
          sumOfSquaresOfRowElementsExceptDiagonalAsColumn(r2),
        ),
      ) <= 1e-8;
  const euriklisTestAsRow = (m: any) =>
    m.sumOfSquaresOfRowElementsExceptDiagonal(r1);
  const euriklisTestAsColumn = (m: any) =>
    m.sumOfSquaresOfRowElementsExceptDiagonal(r1, undefined, "column");
  const numericTestAsRow = (_: any) =>
    sumOfSquaresOfRowElementsExceptDiagonalAsRow(r2);
  const numericTestAsColumn = (_: any) =>
    sumOfSquaresOfRowElementsExceptDiagonalAsColumn(r2);
  startPerformanceTest(
    "sumOfSquaresOfRowElementsExceptDiagonal in row mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestAsRow,
    numericTestAsRow,
  );

  startPerformanceTest(
    "sumOfSquaresOfRowElementsExceptDiagonal in column mode",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTestAsColumn,
    numericTestAsColumn,
  );
})();
