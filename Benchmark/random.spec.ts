"use strict";

import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const condition = true;
  const conditionGeneric = true;
  const euriklisTest = (m: any) => m.random(dimensions[0], dimensions[1]);
  const numericTest = (m: any) => m.random(dimensions);
  const euriklisRandomFast = (m: any) => m.uniqueRandom(dimensions[0], dimensions[1]);
  startPerformanceTest(
    "random()",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );

  Matrix.setType("generic");
  startPerformanceTest(
    "random",
    [{ param: "matrix", dimensions, type: "generic" }],
    conditionGeneric,
    euriklisTest,
    numericTest,
  );
  Matrix.setType("float64");

  startPerformanceTest(
    "uniqueRandom()",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisRandomFast,
    numericTest,
  );

  Matrix.setType("generic");
  startPerformanceTest(
    "uniqueRandom()",
    [{ param: "matrix", dimensions, type: "generic" }],
    condition,
    euriklisRandomFast,
    numericTest,
  );
  Matrix.setType("float64");
})();
