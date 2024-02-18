"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(...dimensions);
  const m2 = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(Matrix.and(m1, m2), numeric.and(m1, m2));
  const test = (m: any) => m.and(m1, m2);
  startPerformanceTest(
    "and",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
