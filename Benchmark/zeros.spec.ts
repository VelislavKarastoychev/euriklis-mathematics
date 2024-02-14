"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const z = Matrix.zeros(dimensions[0], dimensions[1]);
  const zm = numeric.rep(dimensions, 0) as number[][];
  const condition = Matrix.isEqualTo(z, zm);
  const conditionGeneric = Matrix.isEqualTo(Matrix.zeros(501, 501), numeric.rep([501, 501], 0));
  const euriklisTest = (m) => m.zeros(dimensions[0], dimensions[1]);
  const euriklisTestGeneric = (m) => m.zeros(dimensions[0], dimensions[1], "generic");
  const numericTest = (m) => m.rep(dimensions, 0);
  startPerformanceTest(
    "zeros and zero",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );

  startPerformanceTest(
    "zeros and zero",
    [{ param: "matrix", dimensions, type: "generic" }],
    conditionGeneric,
    euriklisTestGeneric,
    numericTest,
  );
})();
