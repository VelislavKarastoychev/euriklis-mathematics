"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
const rep1 = Matrix.replicate(Math.PI, 5, 5);
const rep2 = numeric.rep([5, 5], Math.PI);
const condition: boolean = Matrix.isEqualTo(rep1, rep2);
const euriklisTestFloat = (m: any) =>
  m.replicate(Math.PI, dimensions[0], dimensions[1]);
const euriklisTestGeneric = (m: any) =>
  m.replicate(Math.PI, dimensions[0], dimensions[1], "generic");
const numericTest = (m: any) => m.rep(dimensions, Math.PI);

(async () => {
  startPerformanceTest(
    "replilcate",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestFloat,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );
  startPerformanceTest(
    "replilcate",
    [{ param: "matrix", dimensions, type: "generic" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTestGeneric,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );
})();
