"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.bitwiseNegate(r),
    numeric.bnot(r),
  );
  const euriklisTest = (m: any) => m.bitwiseNegate(r);
  const numericTest = (m: any) => m.bnot(r);
  startPerformanceTest(
    "bitwiseNegate",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
