"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () =>
  new validator(true)
    .isBoolean
    .describe(
      "Time performance of the FrobeniusNorm method for Matrix with dimension 5000 x 5000:",
    ).test({
      title: true,
      success: "green",
      error: "red",
    }).on(true, () => {
      const m = Matrix.random(5000, 5000);
      const t1 = new validator(m).benchmark(
        (matrix) => matrix.FrobeniusNorm,
        100,
      );
      const t31 = performance.now();
      const vec = m.M.reduce(
        (accum: number[], row: number[]) => {
          accum.push(...row);
          return accum;
        },
        [],
      );
      const t32 = performance.now();
      const t2 = new validator(vec).benchmark((v) => {
        return numeric.norm2(v);
      });
      console.table({
        "@euriklis/mathematics": t1,
        "numericjs": { ...t2, mean: t2.mean + t32 - t31 },
      });
    }))();
