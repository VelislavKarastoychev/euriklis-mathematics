"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const m = Matrix.random(6000, 6000);
  const b = Matrix.replicate(Math.PI, 5000, 5000);
  const m1 = m.M;
  const b1 = b.M;
  new validator(
    m.setBlock({
      from: [121, 119],
      to: [5120, 5118],
      block: b,
    }).isEqualTo(numeric.setBlock(m1, [121, 119], [5120, 5118], b1)),
  ).isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of setBlock method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(m).benchmark((m) =>
        m.setBlock({ from: [121, 119], to: [5120, 5118], block: b })
      );
      const t2 = new validator(m1).benchmark((m) =>
        numeric.setBlock(m, [121, 119], [5120, 5118], b1)
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in setBlock benchmark.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
