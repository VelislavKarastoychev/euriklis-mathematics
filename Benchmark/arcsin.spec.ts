"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.arcsin(r),
    numeric.asin(r),
  );
  const euriklisTest = (m: any) => m.arcsin(r);
  const numericTest = (m: any) => m.asin(r);
  startPerformanceTest(
    "arcsin",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
