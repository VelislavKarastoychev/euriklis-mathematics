"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(dimensions[0], dimensions[1], 2, 3);
  const m2 = Matrix.random(...dimensions);
  const condition = numeric.geq(m1, m2) && Matrix.isGreaterThanOrEqual(m1, m2);
  const euriklisTest = (m: any) => m.isGreaterThanOrEqual(m1, m2);
  const numericTest = (m: any) => m.geq(m2, m1);
  startPerformanceTest(
    "isGreaterThanOrEqual",
    [{ param: "matrices" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
