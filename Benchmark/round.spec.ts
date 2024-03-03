"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(dimensions[0], dimensions[1], -2, 2);
  const condition = Matrix.isEqualTo(
    Matrix.round(r),
    numeric.round(r),
  );
  const test = (lib: any) => lib.round(r);
  startPerformanceTest(
    "round",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
