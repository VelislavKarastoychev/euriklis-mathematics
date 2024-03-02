"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.power(r1, r2),
    numeric.pow(r1, r2),
  );
  const euriklisTest = (m: any) => m.power(r1, r2);
  const numericTest = (m: any) => m.pow(r1, r2);
  startPerformanceTest(
    "power",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
