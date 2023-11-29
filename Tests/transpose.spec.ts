"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";
const a = Matrix.random(27, 23);
new validator(a.transpose().M).forEvery((row, i) =>
  row.forEvery((el, j) => el.isSame(a.M[j as number][i as number]))
).describe("transpose method has to:").test({title: true, success: "green", error: "red"})
.describe("1. Has to produce the correct result").test()
.and.bind(
    new validator(a.transpose().transpose().M).isSame(a.M)
  ).describe("2. return the initial matrix, when is called again").test()
  .describe("3. Time performance of transpose for a 5000 x 5000 matrix:").test()
  .on(true, () => {
    const rand = Matrix.random(5000, 5000);
    const benchmark = new validator(rand).benchmark((m) => m.transpose());
    console.table(benchmark);
  })
