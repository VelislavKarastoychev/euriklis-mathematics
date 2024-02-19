"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const m1 = Matrix.random(dimensions[0], dimensions[1], 10, 20);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 1, 2);
  const condition = Matrix.isEqualTo(
    Matrix.rightShiftBy(m1, m2),
    numeric.rshift(m1, m2),
  );
  const euriklisTest = (m: any) => m.rightShiftBy(m1, m2);
  const numericTest = (m: any) => m.rshift(m1, m2);
  startPerformanceTest(
    "rightShiftBy",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
