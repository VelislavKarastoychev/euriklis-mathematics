"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 2, Math.PI);
  const condition = Matrix.isEqualTo(
    Matrix.lt(m1, m2),
    Matrix.copy(numeric.lt(m1, m2)),
  );
  const test = (m: any) => m.lt(m1, m2);
  startPerformanceTest(
    "lt",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
