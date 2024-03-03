"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4, -1, 1);
const m = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.round(c))
);
const m1 = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.round(2 * c + 3))
);
const callRound = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.round(m);

new validator(Matrix.isEqualTo(Matrix.round(r), m))
  .describe("The round method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without parameters.")
  .test();

new validator(Matrix.isEqualTo(Matrix.round(r, 2, 3), m1))
  .isSame(true)
  .describe(
    "2. return the correct result when the method's parameters are declared.",
  )
  .test();

new validator(callRound)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
