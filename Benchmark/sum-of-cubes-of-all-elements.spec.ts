"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const m = Matrix.random(5000, 5000);
  const md = m.M;
  new validator(
    m.sumOfCubesOfAllElements -
      numeric.mapreduce("accum += xi * xi * xi", "0")(md),
  ).isInRange(-1e-6, 1e-6)
    .on(true, (v) => {
      v.describe("Time performance of sumOfCubesOfAllElements getter method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(m).benchmark((m) => m.sumOfCubesOfAllElements);
      const t2 = new validator(md).benchmark((m) =>
        numeric.mapreduce("accum += xi * xi * xi", "0")(m)
      );
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    });
})();
