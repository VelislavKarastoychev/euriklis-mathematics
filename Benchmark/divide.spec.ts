"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.divide(r1, r2),
    numeric.div(r1, r2),
  );
  const euriklisTest = (m: any) => m.divide(r1, r2);
  const numericTest = (m: any) => m.div(r1, r2);
  startPerformanceTest(
    "divide",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
