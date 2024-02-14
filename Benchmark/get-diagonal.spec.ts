"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

new validator(true).isBoolean
  .describe(
    "Time performance of getDiagonal method for matrix with parameters 5000 x 5000",
  )
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .on(true, () => {
    const rand5kx5k = Matrix.random(5000, 5000);
    const t1 = new validator(rand5kx5k).benchmark(
      (matrix) => matrix.getDiagonal(),
      100,
    );
    const t2 = new validator(rand5kx5k.M).benchmark((m) => [numeric.getDiag(m)]);
    console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
  });
