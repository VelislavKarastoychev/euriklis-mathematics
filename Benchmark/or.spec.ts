"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(Matrix.or(m1, m2), numeric.or(m1, m2));
  const test = (m: any) => m.or(m1, m2);
  startPerformanceTest(
    "or",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
