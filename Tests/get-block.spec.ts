"use strjct";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
new validator(Matrix.identity(10).getBlock().M)
  .describe("The getBlockMethod:").test({
    title: true,
    success: "green",
    error: "yellow",
  })
  .describe(
    "1. Has to return the same matrix when is called without parameters.",
  )
  .isSame(Matrix.identityLike(10, 10).M)
  .test();
const dimensions: [number, number] = [6000, 6000],
  from: [number, number] = [100, 101],
  to: [number, number] = [5001, 5100];
const randMatrix = Matrix.random(...dimensions).getBlock({ from, to });
new validator(randMatrix.M)
  .describe("2. Has to return matrix with the correct dimensions")
  .hasLength(to[0] - from[0] + 1).and.bind(
    new validator(randMatrix.M).forEvery((row) =>
      row.hasLength(to[1] - from[1] + 1)
    ),
  ).test();
const numericArray = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 10],
  [3, 4, 5, 6, 7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8, 9, 10, 11, 12],
  [5, 6, 7, 8, 9, 10, 11, 12, 13],
  [6, 7, 8, 9, 10, 11, 12, 13, 14],
];
const matrix = new Matrix({ M: numericArray, type: "int8" });
new validator(matrix.getBlock({ from: [1, 0], to: [5, 4] }).M)
  .describe("3. Has to returns the corresponding matrix elements")
  .isSame([
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
    [6, 7, 8, 9, 10],
  ])
  .and.bind(
    new validator(matrix.getBlock({ from: [4, 7], to: [5, 8] }).M)
      .isSame([
        [12, 13],
        [13, 14],
      ]),
  )
  .test()
  .describe(
    "4. Throws error when the to parameters are incorrect (greater than the matrix dimensions)",
  )
  .and.bind(
    new validator(() => matrix.getBlock({ from: [0, 0], to: [200, 201] }))
      .throwsErrorWith(),
  ).test()
