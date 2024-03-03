"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.arctan(r),
    numeric.atan(r),
  );
  const euriklisTest = (m: any) => m.arctan(r);
  const numericTest = (m: any) => m.atan(r);
  startPerformanceTest(
    "arctan",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
