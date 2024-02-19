"use strjct";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
new validator(
  Matrix.isEqualTo(
    Matrix.getBlock(Matrix.identity(10)),
    Matrix.identityLike(10, 10),
  ),
)
  .describe("The getBlockMethod:").test({
    title: true,
    success: "green",
    error: "yellow",
  })
  .describe(
    "1. Has to return the same matrix when is called without parameters.",
  )
  .isSame(true)
  .test();
const dimensions: [number, number] = [60, 60],
  from: [number, number] = [10, 11],
  to: [number, number] = [51, 51];
const randMatrix = Matrix.getBlock(Matrix.random(...dimensions), { from, to });
new validator(randMatrix)
  .describe("2. Has to return matrix with the correct dimensions")
  .hasLength(to[0] - from[0] + 1).and.bind(
    new validator(randMatrix).forEvery((row) =>
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
const matrix = Matrix.copy(numericArray, "int8");
new validator(
  Matrix.getBlock(matrix, { from: [1, 0], to: [5, 4], type: "generic" }),
)
  .describe("3. Has to returns the corresponding matrix elements")
  .isSame([
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
    [6, 7, 8, 9, 10],
  ])
  .and.bind(
    new validator(
      Matrix.getBlock(matrix, { from: [4, 7], to: [5, 8], type: "generic" }),
    )
      .isSame([
        [12, 13],
        [13, 14],
      ]),
  )
  .test();

new validator(() => Matrix.getBlock(matrix, { from: [0, 0], to: [200, 201] }))
  .throwsErrorWith()
  .describe(
    "4. Throws error when the to parameters are incorrect (greater than the matrix dimensions)",
  ).test();

