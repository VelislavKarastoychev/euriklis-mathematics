"use strict";


import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const condition = true;
  const conditionGeneric = true;
  const euriklisTest = (m: any) => m.random(dimensions[0], dimensions[1]);
  const numericTest = (m: any) => m.random(dimensions);
  const euriklisRandomFast = (m: any) =>
    m.uniqueRandom(dimensions[0], dimensions[1]);
  startPerformanceTest(
    "random()",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );

  Matrix.setType("generic");
  startPerformanceTest(
    "random",
    [{ param: "matrix", dimensions, type: "generic" }],
    conditionGeneric,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );
  Matrix.setType("float64");

  startPerformanceTest(
    "uniqueRandom()",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );

  Matrix.setType("generic");
  startPerformanceTest(
    "uniqueRandom()",
    [{ param: "matrix", dimensions, type: "generic" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
    },
  );
  Matrix.setType("float64");
})();
