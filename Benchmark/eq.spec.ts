"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(dimensions[0], dimensions[1], 3, Math.PI, "generic");
  const m2 = Matrix.random(dimensions[0], dimensions[1], 3, Math.PI);
  const condition = Matrix.isEqualTo(
    Matrix.copy(numeric.eq(m1, m2)),
    Matrix.eq(m1, m2),
  );
  const test = (m: any) => m.eq(m1, m2);
  startPerformanceTest(
    "eq",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
