"use strict";

import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix([[1, 2, 3], [-4, 5, 6], [7, 8, -9]]);

// check if the infinity norm is equal to pi
new validator(m.infinityNorm).isSame(24)
  .describe("The maxNorm getter method has to:").test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. Has to return the greatest in absolute value element of a matrix.",
  ).test()
  .describe(
    "2. Time performance of the infiniteNorm method for random matrix with dimension 5000 x 5000",
  ).test()
  .on(true, () => {
    const rand = Matrix.random(5000, 5000);
    const t = new validator(rand).benchmark((m) => m.infinityNorm);
    console.table(t);
  });
