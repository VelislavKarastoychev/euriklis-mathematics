"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 2, 3);
  const condition = numeric.leq(m1, m2) && Matrix.isLessThanOrEqual(m1, m2);
  const euriklisTest = (m: any) => m.isLessThanOrEqual(m1, m2);
  const numericTest = (m: any) => m.leq(m1, m2);
  startPerformanceTest(
    "isLessThanOrEqual",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
