"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const rc = Matrix.copy(r, "generic");
  const condition =
    Math.abs(Matrix.productOfAllElements(r) - numeric.prod(rc)) < 1e-8;
  const euriklisTest = (m: any) => m.productOfAllElements(r);
  const numericTest = (m: any) => m.prod(rc);
  startPerformanceTest(
    "productOfAllElements",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
