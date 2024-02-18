"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(
    Matrix.bitwiseAnd(m1, m2),
    Matrix.copy(numeric.band(m1, m2)),
  );
  const euriklisTest = (m: any) => m.bitwiseAnd(m1, m2);
  const numericTest = (m: any) => m.band(m1, m2);
  startPerformanceTest(
    "bitwiseAnd",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
