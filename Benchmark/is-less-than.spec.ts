"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r1 = Matrix.random(5, 13);
  const r2 = Matrix.random(5, 13, 1, 2);
  const m1 = r1.M;
  const m2 = r2.M;
  new validator(r1.isLessThan(r2)).isSame(true)
    .and.bind(
      new validator(numeric.lt(m1, m2)).isArrayOfArraysWithEqualSize
        .and.forEvery((row) => row.forEvery((item) => item.isSame(true))),
    ).on(true, (v) => {
      v.describe("Time performance for the isLessThan method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const br1 = Matrix.random(5000, 5000);
      const br2 = Matrix.random(5000, 5000, 1, 2);
      const bm1 = br1.M;
      const bm2 = br2.M;
      const t1 = new validator(br1).benchmark((m) => m.isLessThan(br2));
      const t2 = new validator(bm1).benchmark((m) => numeric.lt(m, bm2));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in isLessThan benchmark method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
