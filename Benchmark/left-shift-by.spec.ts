"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const m1 = Matrix.random(dimensions[0], dimensions[1], 10, 20);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 1, 2);
  const condition = Matrix.isEqualTo(
    Matrix.leftShiftBy(m1, m2),
    numeric.lshift(m1, m2),
  );
  const euriklisTest = (m: any) => m.leftShiftBy(m1, m2);
  const numericTest = (m: any) => m.lshift(m1, m2);
  startPerformanceTest(
    "leftShiftBy",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
