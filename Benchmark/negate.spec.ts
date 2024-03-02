"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.negate(r1),
    numeric.neg(r1),
  );
  const euriklisTest = (m: any) => m.negate(r1);
  const numericTest = (m: any) => m.neg(r1);
  startPerformanceTest(
    "negate",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
