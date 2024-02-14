"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { Integer, NumericMatrix } from "../src/Matrix/types";
function reshapeMatrix(matrix: NumericMatrix, newRows: Integer, newColumns: Integer) {
  const flattened = matrix.flat(); // Convert matrix to a 1D array
  const reshaped = [];

  for (let i = 0; i < newRows; i++) {
    reshaped[i] = [];
    for (let j = 0; j < newColumns; j++) {
      const index = i * newColumns + j;
      reshaped[i][j] = flattened[index];
    }
  }

  return reshaped;
}
const m = Matrix.random(5000, 5000);
const reshaped = m.reshape(2500, 10000);
(async () => new validator(reshaped.reshape(5000, 5000).isEqualTo(m))
  .isSame(true)
  .describe("Time performance of reshape method:")
  .test({
    title: true,
    success: "green",
    error: "red"
  }).on(true, () => {
    const t1 = new validator(m).benchmark((matrix) => matrix.reshape(2500, 10000))
    // const t2 = new validator(m.M).benchmark((matrix) => reshapeMatrix(matrix, 2500, 10000));
    console.table({"@euriklis/mathematics": t1});
  })
)();
