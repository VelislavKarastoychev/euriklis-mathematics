"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r = Matrix.random(1, 5000);
  const rm = r.toDiagonalMatrix();
  new validator(rm.isEqualTo(numeric.diag(r.M[0])))
    .isSame(true)
    .on(true, (v) => {
      const m = r.M[0];
      v.describe("Time performance of toDiagonalMatrix method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.toDiagonalMatrix());
      const t2 = new validator(m).benchmark((m) => numeric.diag(m));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in toDiagonalMatrix benchmark method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
