"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const m = numeric.random(dimensions);
  const m1 = numeric.clone(m)
  const condition = numeric.same(m, m1) && Matrix.isEqualTo(m, m1);
  const euriklisTest = (lib: any) => lib.isEqualTo(m, m1);
  const numericTest = (lib: any) => lib.same(m, m1);
  startPerformanceTest(
    "isEqualTo",
    [{ param: "matrices", dimensions, type: "generic" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
