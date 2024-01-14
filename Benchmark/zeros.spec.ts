"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { title } from "process";

(async () => {
  const z = Matrix.zero(5000);
  const zm = numeric.rep([5000, 5000], 0);
  new validator(z.isEqualTo(zm)).isSame(true)
    .on(true, (v) => {
      v.describe("Time performance for zeros method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(Matrix).benchmark((m) => m.zero(5000));
      const t2 = new validator(numeric).benchmark((num) =>
        num.rep([5000, 5000], 0)
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in zero (zeros) method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
