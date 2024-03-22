"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const rows = Math.random() * 100 >> 0 || 1;
const columns = Math.random() * 100 >> 0 | 1;
const d = Math.min(rows, columns);
const r = Matrix.random(rows, columns);
const rp4 = Matrix.addNumberToDiagonal(Matrix.copy(r), 4);
const zeros = Matrix.zeros(rows, columns);
const zp4 = Matrix.addNumberToDiagonal(Matrix.copy(zeros), 4);
const callAddNumberToDiagonal = (m: MatrixType | NumericMatrix) =>
  Matrix.addNumberToDiagonal(m, Math.PI);
const callAddNumberToDiagonal1 = (n: number) =>
  Matrix.addNumberToDiagonal(r, n);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.minus(
        rp4,
        r,
      ),
      zp4,
    ),
  ) < 1e-8,
).describe("The addNumberToDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. return the correct rersult when is correctly called.")
  .test();

new validator(callAddNumberToDiagonal)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws!!!")
  .describe("2. throw error when the matrix parameter is incorrectly defined.")
  .test();

new validator(callAddNumberToDiagonal1)
  .throwsErrorWith("Hello")
  .and.throwsErrorWith([1234])
  .describe("3. throw error when the number parameter is incorrectly defined.")
  .test();
