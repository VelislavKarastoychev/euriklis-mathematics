"use strict";

import { Matrix } from "../src/index.ts";
import {} from "../src/Matrix/types";
import validator from "@euriklis/validator";
const rand55 = Matrix.random(5, 5);
const rand55M = rand55.M;
new validator(rand55.getDiagonal().M[0])
  .describe("The getDiagonal method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. Has to get the diagonal of the matrix in an row vector vector when no argument is passed (Matrix with 1 x columns elements)",
  )
  .forEvery((di, i) => {
    return di.isSame(rand55M[i as number][i as number]);
  }).test()
  .describe(
    "2. Has to return the subdiagonal of an matrix when an row index is defined",
  )
  .and.bind(
    new validator(rand55.getDiagonal(1).M[0]).forEvery((di, i) => {
      return di.isSame(rand55M[i as number + 1][i as number]);
    }).on(false, (v) => {
      const diag = v.value;
      console.table(diag);
      console.table(rand55M);
    }),
  ).test()
  .describe(
    "3. Time performance of getDiagonal method for matrix with parameters 5000 x 5000",
  ).test()
  .on(true, () => {
    const rand5kx5k = Matrix.random(5000, 5000);
    const benchmark = new validator(rand5kx5k).benchmark((matrix) =>
      matrix.getDiagonal(),
      100
    );
    console.table(benchmark);
  });
