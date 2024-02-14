"use strict";

import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const row = Matrix.random(1, 5000);
  const r = Matrix.random(4, 6000);
  const m = r.M;
  new validator(
    r.setRow(2, 120, 5119, row).isEqualTo(
      numeric.setBlock(m, [2, 120], [2, 5119], row.M),
    ),
  )
    .isSame(true)
    .on(true, (v) => {
      const rowm = row.M;
      v.describe("Time performance for setRow method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.setRow(2, 120, 5119, row));
      const t2 = new validator(r).benchmark((m) =>
        numeric.setBlock(m, [2, 120], [2, 5119], rowm)
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in setRow benchmark.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
