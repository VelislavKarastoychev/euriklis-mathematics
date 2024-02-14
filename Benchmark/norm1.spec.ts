"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

const m = Matrix.random(5000, 5000);
const md = m.M;
console.log(m.norm1);
console.log(
  numeric.sup(numeric.transpose(md).map(numeric.norm1)),
);
(async () => {
  new validator(
    m.norm1 -
        numeric.sup(numeric.transpose(md).map(numeric.norm1)) <
      1e-8,
  ).isSame(true)
    .on(true, (v) => {
      v.describe("  Time performance of norm1 method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(m).benchmark((m) => m.norm1, 20);
      const t2 = new validator(md).benchmark(
        (m) => numeric.sup(numeric.transpose(m).map(numeric.norm1)),
        20,
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in norm1 benchmark method test.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
