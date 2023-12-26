"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";
const m = Matrix.random(31, 21);
const mNorm = m.M.reduce((acc, row) => {
  acc = acc + row.reduce((acc1, element) => {
    return acc1 + element * element;
  }, 0);
  return acc;
}, 0);
new validator(Matrix.identity(5).FrobeniusNorm).isSame(Math.sqrt(5))
  .describe("Frobenius norm method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .and.bind(
    new validator(m.FrobeniusNorm)
      .isSame(Math.sqrt(mNorm))
  )
  .describe("1. Compute correctly the norm of a matrix").test()
  .describe("2. Time performance of the FrobeniusNorm method for Matrix with dimension 5000 x 5000:").test()
  .on(true, () => {
    const m = Matrix.random(5000, 5000);
    const t = new validator(m).benchmark(m => m.FrobeniusNorm, 100);
    console.table(t);
  });
