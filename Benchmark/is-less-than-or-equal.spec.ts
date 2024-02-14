"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r1 = Matrix.random(2, 3);
  const r2 = Matrix.random(2, 3);
  const r3 = Matrix.random(2, 3, 1, 2);
  const m1 = r1.M;
  const m2 = r2.M;
  const m3 = r3.M;
  new validator(r1.isLessThanOrEqual(r2)).isSame(true)
    .and.bind(
      new validator(r1.isLessThanOrEqual(r3)).isSame(true),
    ).and.bind(
      new validator(numeric.leq(m1, m2)).isArrayOfArraysWithEqualSize
        .and.forEvery((row) => row.forEvery((item) => item.isSame(true))),
    ).and.bind(
      new validator(numeric.leq(m1, m3)).isArrayOfArraysWithEqualSize
        .and.forEvery((row) => row.forEvery((item) => item.isSame(true))),
    ).on(true, (v) => {
      const br1 = Matrix.random(5000, 5000);
      const br2 = Matrix.random(5000, 5000, 1, 2);
      const bm1 = br1.M;
      const bm2 = br2.M;
      v.describe("Time performance of isLessThanOrEqual method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(br1).benchmark((m) => m.isLessThanOrEqual(br2));
      const t2 = new validator(bm1).benchmark((m) => numeric.leq(m, bm2));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    })
    .on(false, (v) => {
      v.describe("Internal error in isLessThanOrEqual method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
