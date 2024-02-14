"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

const r1 = Matrix.random(5, 11);
const r2 = numeric.random([5, 11]);
const onces = Matrix.replicate(1, 5, 11);

(async () =>
  new validator(r1.isLessThan(onces))
    .isSame(true)
    .and.bind(
      new validator(new Matrix(r2).isLessThan(onces)).isSame(true),
    ).describe("Time performance of random method for matrix with dimension 5000 x 5000:")
    .test({
      title: true,
      success: "green",
      error: "red",
    })
    .on(true, () => {
      const t1 = new validator(Matrix).benchmark((m) => m.random(5000, 5000));
      const t2 = new validator(numeric).benchmark((num) =>
        num.random([5000, 5000])
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }))();
