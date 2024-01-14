"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r1 = Matrix.random(3, 4);
  const r2 = Matrix.random(3, 4);
  const r3 = Matrix.random(3, 4, 1, 2);
  const m1 = r1.M;
  const m2 = r2.M;
  const m3 = r3.M;
  new validator(r1.isGreaterThanOrEqual(r2)).isSame(true)
    .and.bind(
      new validator(r3.isGreaterThanOrEqual(r1)).isSame(true),
    ).and.bind(
      new validator(numeric.geq(m1, m2)).isArrayOfArraysWithEqualSize
        .and.forEvery((row) => row.forEvery((item) => item.isSame(true))),
    ).and.bind(
      new validator(numeric.geq(m3, m1)).isArrayOfArraysWithEqualSize
        .and.forEvery((row) => row.forEvery((item) => item.isSame(true))),
    ).on(true, (v) => {
      v.describe("Time performance of isGreaterThanOrEqual method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const br1 = Matrix.random(5000, 5000);
      const br2 = Matrix.random(5000, 5000);
      const bm1 = br1.M;
      const bm2 = br2.M;
      const t1 = new validator(br1).benchmark((m) =>
        m.isGreaterThanOrEqual(br2)
      );
      const t2 = new validator(bm1).benchmark((m) => numeric.geq(m, bm2));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in isGreaterThanOrEqualTo method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
