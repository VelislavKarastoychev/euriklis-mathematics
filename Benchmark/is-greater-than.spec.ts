"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 1, 2);
  const condition = numeric.gt(m2, m1) && Matrix.isGreaterThan(m2, m1);
  const euriklisTest = (m: any) => m.isGreaterThan(m2, m1);
  const numericTest = (m: any) => m.gt(m2, m1);
  startPerformanceTest(
    "isGreaterThan",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
