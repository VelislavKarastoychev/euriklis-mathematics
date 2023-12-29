"use strict";
import validator from "@euriklis/validator";
import { Matrix } from '../src/index.ts'

const matrix = new Matrix([[1, 2, 3], [-4, 5, 6], [7, 8, -9]]);
const m = Matrix.random(4, 4);
const M = m.M;
M[2][2] = Math.PI;
m.M = M;
new validator(matrix.maxNorm)
  .describe("The maxNorm getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  })
  .isSame(9)
  .and.bind(
    new validator(m.maxNorm).isSame(Math.PI)
  )
  .describe("1. Returns the element with the greates absolute value of the matrix")
  .test()
  .describe("2. Time performance of the maxNorm method for random matrix with dimension 5000 x 5000")
  .test()
  .on(true, () => {
    const rand = Matrix.random(5000, 5000);
    const t = new validator(rand).benchmark((m) => m.maxNorm);
    console.table(t);
  });
