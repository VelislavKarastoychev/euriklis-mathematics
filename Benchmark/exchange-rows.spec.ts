"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";
function exchangeRows(
  matrix: NumericMatrix | MatrixType,
  row1: Integer,
  row2: Integer,
  fromCol: Integer = 0,
  toCol: Integer = matrix.length - 1,
) {
  // Check if the matrix is valid
  if (!matrix || matrix.length === 0 || !matrix[0]) {
    console.error("Invalid matrix");
    return;
  }

  // Check if column indices are within bounds
  if (
    fromCol < 0 || fromCol >= matrix[0].length || toCol < 0 ||
    toCol >= matrix[0].length || fromCol > toCol
  ) {
    console.error("Invalid column indices");
    return;
  }

  // Check if row indices are within bounds
  if (row1 < 0 || row1 >= matrix.length || row2 < 0 || row2 >= matrix.length) {
    console.error("Invalid row indices");
    return;
  }

  // Exchange elements in the specified rows within the specified column range
  for (let i = fromCol; i <= toCol; i++) {
    const temp = matrix[row1][i];
    matrix[row1][i] = matrix[row2][i];
    matrix[row2][i] = temp;
  }

  return matrix;
}

(async () => {
  const m = Matrix.uniqueRandom(...dimensions);
  const r1 = Math.random() * dimensions[0] | 0;
  const r2 = Math.random() * dimensions[1] | 0;
  const condition = Matrix.isEqualTo(
    Matrix.exchangeRows(Matrix.copy(m), r1, r2, 0, dimensions[0] - 1),
    exchangeRows(m, r1, r2, 0, dimensions[1] - 1),
  );
  const euriklisTest = (matrix: any) =>
    matrix.exchangeRows(m, r1, r2, 0, dimensions[0] - 1);
  const numericTest = (matrix: any) =>
    exchangeRows(m, r1, r2, 0, dimensions[1] - 1);
  startPerformanceTest(
    "exchangeRows",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      conventionalJS: {
        instance: undefined,
        test: numericTest
      }
    }
  );
})();
