"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r1 = Matrix.random(2, 3);
  const r2 = Matrix.random(2, 3, 1, 2);
  const m1 = r1.M;
  const m2 = r2.M;
  new validator(r2.isGreaterThan(r1)).isSame(true)
    .and.bind(
      new validator(
        numeric.gt(m2, m1).every((row: boolean[]) =>
          row.every((el: boolean) => el === true)
        )
      ).isSame(true),
    ).on(true, (v) => {
      const br1 = Matrix.random(5000, 5000);
      const br2 = Matrix.random(5000, 5000, 1, 2);
      const bm1 = br1.M;
      const bm2 = br2.M;
      v.describe("Time performance of isGreaterThan method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(br2).benchmark((m) => m.isGreaterThan(br1));
      const t2 = new validator(bm2).benchmark((m) => numeric.gt(m, bm1));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in isGreaterThan benchmark.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
