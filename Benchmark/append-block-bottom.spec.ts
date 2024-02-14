"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
const rand1 = Matrix.random(5000, 5000);
const rand2 = Matrix.random(5000, 5000);
(async () =>
  new validator(true).describe("appendBlockBottom performance:")
    .test({
      title: true,
      success: "green",
      error: "red",
    }).isBoolean
    .on(true, () => {
      const r1 = rand1.M;
      const r2 = rand2.M;
      const benchmark1 = new validator(rand1).benchmark((m) =>
        m.appendBlockBottom(rand2)
      );
      const benchmark2 = new validator([r1, r2]).benchmark((data) => {
        return [...data[0], ...data[1]];
      });

      console.table({
        "@euriklis/mathematics": benchmark1,
        "numericjs": benchmark2,
      });
    }))();
