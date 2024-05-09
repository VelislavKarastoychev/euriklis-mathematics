"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
function exchangeColumns(
  matrix: MatrixType | NumericMatrix,
  col1: Integer,
  col2: Integer,
  fromRow: Integer,
  toRow: Integer,
) {
  // Check if the matrix is valid
  if (!matrix || matrix.length === 0 || !matrix[0]) {
    console.error("Invalid matrix");
    return;
  }

  // Check if column indices are within bounds
  if (
    col1 < 0 || col1 >= matrix[0].length || col2 < 0 || col2 >= matrix[0].length
  ) {
    console.error("Invalid column indices");
    return;
  }

  // Check if row indices are within bounds
  if (
    fromRow < 0 || fromRow >= matrix.length || toRow < 0 ||
    toRow >= matrix.length || fromRow > toRow
  ) {
    console.error("Invalid row indices");
    return;
  }

  // Exchange elements in the specified columns for each row within the given range
  for (let i = fromRow; i <= toRow; i++) {
    // Swap elements in columns col1 and col2 for row i
    const temp = matrix[i][col1];
    matrix[i][col1] = matrix[i][col2];
    matrix[i][col2] = temp;
  }

  return matrix;
}
(async () => {
  const m = Matrix.random(...dimensions);
  const col1 = Math.random() * dimensions[1] | 0;
  const col2 = Math.random() * dimensions[1] | 0;
  const fromRow = Math.random() * dimensions[0] | 0;
  const toRow = fromRow + Math.random() * (dimensions[0] - fromRow) | 0;
  const condition = Matrix.isEqualTo(
    Matrix.exchangeColumns(Matrix.copy(m), col1, col2, fromRow, toRow),
    exchangeColumns(Matrix.copy(m), col1, col2, fromRow, toRow),
  );
  const euriklisTest = (matrix: any) => matrix.exchangeColumns(m, col1, col2);
  const numericTest = (_: any) =>
    exchangeColumns(m, col1, col2, 0, m[0].length - 1);
  startPerformanceTest(
    "exchangeColumns",
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
