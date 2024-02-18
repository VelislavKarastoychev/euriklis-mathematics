"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(Matrix.xor(m1, m2), numeric.bxor(m1, m2));
  const test = (m: any) => m.xor(m1, m2);
  const ntest = (m: any) => m.bxor(m1, m2)
  startPerformanceTest(
    "xor",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    ntest,
  );
})();
