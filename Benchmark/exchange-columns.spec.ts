"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
function exchangeColumns(matrix, col1, col2, fromRow, toRow) {
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
(async () =>
  new validator(true).describe(
    " Time performance of exchangeColumns method for parameters matrix --> 6000 x 6000, col1 = 99, col2 = 5198, from = 99 to 5098",
  ).test({
    title: true,
    success: "green",
    error: "red",
  }).isBoolean
    .on(true, () => {
      const m = Matrix.random(6000, 6000);
      const benchmark1 = new validator(m).benchmark((
        matrix,
      ) => matrix.exchangeColumns(99, 5198, 99, 5098));
      const benchmark2 = new validator(m.M).benchmark((matrix) => {
        return exchangeColumns(matrix, 99, 5198, 99, 5098);
      });
      console.table({
        "@euriklis/mathematics": benchmark1,
        "numericjs": benchmark2,
      });
    }))();
