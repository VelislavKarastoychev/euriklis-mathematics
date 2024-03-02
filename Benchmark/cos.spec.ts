"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.cos(r),
    numeric.cos(r),
  );
  const test = (lib: any) => lib.cos(r);
  startPerformanceTest(
    "cos",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
