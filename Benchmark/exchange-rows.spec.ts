"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { Integer } from "../src/Matrix/types";

function exchangeRows(
  matrix: number[][],
  fromCol: Integer,
  toCol: Integer,
  row1: Integer,
  row2: Integer,
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

(async () =>
  new validator(true)
    .isBoolean
    .describe(
      "Time performance of the exchangeRows method with parameters matrix --> 6000 x 6000, row1 = 99, row2 = 5189, fromColumn = 99, toColumn = 5098",
    )
    .test({
      title: true,
      success: "green",
      error: "red",
    }).on(true, () => {
      const m = Matrix.random(6000, 6000);
      const benchmark1 = new validator(m).benchmark(
        (matrix) => matrix.exchangeRows(99, 5189, 99, 5098),
      );
      const benchmark2 = new validator(m.M).benchmark((matrix) =>
        exchangeRows(matrix, 99, 5189, 99, 5098)
      );
      console.table({
        "@euriklis/mathematics": benchmark1,
        "numericjs": benchmark2,
      });
    }))();
