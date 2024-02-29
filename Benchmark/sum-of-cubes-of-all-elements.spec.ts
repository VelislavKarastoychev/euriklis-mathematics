"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const rc = Matrix.copy(r, "generic");
  const condition =
    Math.abs(
      Matrix.sumOfCubesOfAllElements(r) -
        numeric.mapreduce("accum += xi * xi * xi", "0")(rc),
    ) < 1e-5;
  const euriklisTest = (m: any) => m.sumOfCubesOfAllElements(r);
  const numericTest = (m: any) => m.mapreduce("accum += xi * xi * xi", "0")(rc);
  startPerformanceTest(
    "sumOfCubesOfAllElements",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
