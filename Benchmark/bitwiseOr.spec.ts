"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(
    Matrix.bitwiseOr(m1, m2),
    numeric.bor(m1, m2),
  );
  const euriklislTest = (m: any) => m.bitwiseOr(m1, m2);
  const numericTest = (m: any) => m.bor(m1, m2);
  startPerformanceTest(
    "bitwiseOr",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklislTest,
    numericTest,
  );
})();
