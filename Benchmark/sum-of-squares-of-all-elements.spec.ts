"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const rc = Matrix.copy(r, "generic");
  const condition =
    Math.abs(
      Matrix.sumOfSquaresOfAllElements(r) -
        numeric.mapreduce("accum += xi*xi", "0")(rc),
    ) < 1e-6;
  const euriklisTest = (m: any) => m.sumOfSquaresOfAllElements(r);
  const numericTest = (m: any) => m.mapreduce("accum += xi * xi", "0")(rc);
  startPerformanceTest(
    "sumOfSquaresOfAllElements",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
