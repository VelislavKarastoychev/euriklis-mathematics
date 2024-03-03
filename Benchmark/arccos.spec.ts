"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.arccos(r),
    numeric.acos(r),
  );
  const euriklisTest = (m: any) => m.arccos(r);
  const numericTest = (m: any) => m.acos(r);
  startPerformanceTest(
    "arccos",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
