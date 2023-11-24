"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
const emptyMatrix = new Matrix();
const matrix = new Matrix({
  M: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],
  type: "int8",
});
const incorrectNumericMatrix = [
  [1, 2, 3],
  [3, 4],
  [5, 6, 7, 8],
];
const matrixFromNumericInput = (numArr: number[][]) => new Matrix(numArr);
const getMatrixData = (matrix: Matrix) => matrix.M;
const getMatrixType = (matrix: Matrix) => matrix.type;
const numericArray = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
];
const typedArrayCollection = [
  new Float32Array([1, 2, 3, 4, 5, 6]),
  new Float32Array([1, 2, 3, 4, 5, 6])
];
new validator(emptyMatrix)
  .describe("The Matrix constructor:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isInstanceof(Matrix)
  .and.bind(
    new validator(getMatrixData).executeWith(emptyMatrix).isArray.and.isEmpty,
  )
  .and.bind(
    new validator(getMatrixType).executeWith(emptyMatrix).isSame("float64"),
  )
  .describe(
    "1. Has to return empty matrix when the Matrix is without arguments",
  ).test()
  .describe(
    "2. Has to generate a Matrix from object input {M -> number [][], type: <THE NUMERIC TYPE>}",
  )
  .and.bind(
    new validator(matrix).isInstanceof(Matrix)
      .and.bind(
        new validator(getMatrixData).executeWith(matrix)
          .isArrayOfArraysWithEqualSize,
      )
      .and.bind(
        new validator(getMatrixType).executeWith(matrix).isSame("int8"),
      ),
  ).test()
  .describe(
    "3. Has to generate a float64 Matrix from numeric matrix input (number[][])",
  )
  .and.bind(
    new validator(matrixFromNumericInput).executeWith(numericArray)
      .isInstanceof(Matrix)
      .and.bind(
        new validator(getMatrixData).executeWith(
          matrixFromNumericInput(numericArray),
        ).isArrayOfArraysWithEqualSize,
      )
      .and.bind(
        new validator(getMatrixType).executeWith(
          matrixFromNumericInput(numericArray),
        ).isSame("float64"),
      ),
  ).test()
  .describe(
    "4. Has to throw error when the input is not array of numeric arrays with equal size/length",
  )
  .and.bind(
    new validator(matrixFromNumericInput).throwsErrorWith(
      incorrectNumericMatrix,
    ),
  ).test()
  .describe("5. Has to not throw error when the input is a collection of typed arrays with equal size")
  .and.bind(
    new validator(matrixFromNumericInput).not.throwsErrorWith(typedArrayCollection)
  ).test();
