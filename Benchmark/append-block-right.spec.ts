"use strict";

import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m1 = Matrix.random(5000, 5000);
const m2 = Matrix.random(5000, 5000);
(async () =>
  new validator(true).describe("appendBlockRight method performance:")
    .test({
      title: true,
      success: "green",
      error: "red",
    }).isBoolean
    .on(true, () => {
      const r1 = m1.M;
      const r2 = m2.M;
      const benchmark1 = new validator(m1).benchmark((m) =>
        m.appendBlockRight(m2)
      );
      const benchmark2 = new validator([r1, r2])
        .benchmark((data) => {
          const r3 = [];
          for (let i = 0; i < r1.length; i++) {
            r3[i] = [...data[0][i], ...data[1][i]];
          }
          return r3;
        });
      console.table({
        "@euriklis/mathematics": benchmark1,
        "numericjs": benchmark2,
      });
    }))();
