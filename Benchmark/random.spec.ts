"use strict";

import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const condition = true;
  const conditionGeneric = true;
  const euriklisTest = (m: any) => m.random(5000, 5000, "float64");
  const euriklisTestGeneric = (m: any) => m.random(5000, 5000);
  const numericTest = (m: any) => m.random([5000, 5000]);
  startPerformanceTest(
    "random()",
    [{ param: "matrix", dimensions: [5000, 5000], type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );

  // startPerformanceTest(
  //   "random",
  //   [{ param: "matrix", dimensions: [5000, 5000], type: "generic" }],
  //   conditionGeneric,
  //   euriklisTestGeneric,
  //   numericTest,
  // );
})();
