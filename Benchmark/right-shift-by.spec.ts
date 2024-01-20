"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
(async () => {
  const r2 = Matrix.random(5000, 5000, 2, 5);
  const r1 = Matrix.random(5000, 5000, 1, 2).or(0);
  const m1 = r1.M;
  const m2 = r2.M;
  new validator(r2.rightShiftBy(r1).isEqualTo(numeric.rshift(m2, m1)))
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the rightShiftBy method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r2).benchmark((m) => m.rightShiftBy(r1));
      const t2 = new validator(m2).benchmark((m) => numeric.rshift(m, m1));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in xor method.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
