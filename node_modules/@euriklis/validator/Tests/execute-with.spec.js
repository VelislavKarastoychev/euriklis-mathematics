"use strict";
import validator from "../src/validator.js";
import { print, addMatrices, matrix, matrix1 } from "./data.js";
const m = matrix.slice(0, 10);
const m1 = matrix1.slice(0, 10);
new validator(addMatrices).executeWith(m, m1).isArrayOfNumberArrays
  .describe("When the executeWith method is run with the function addMatrices, has to return matrix.").test()
  .on(true, () => {
  const t1 = new validator(addMatrices).benchmark((f) => new validator(f).executeWith(m, m1).answer);
  print('execute with', t1, {mean: null, std: null, iterations: null});
});
