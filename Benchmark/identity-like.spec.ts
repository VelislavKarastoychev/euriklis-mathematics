"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const identity = Matrix.identityLike(dimensions[0], dimensions[1]);
  const numericIdentity = numeric.identity(dimensions[0]);
  const condition = Matrix.isEqualTo(identity, numericIdentity);
  const euriklisTest = (m: any) => m.identityLike(dimensions[0], dimensions[1]);
  const numericTest = (m: any) => m.identity(dimensions[0]);
  const euriklisTestGeneric = (m: any) =>
    m.identityLike(dimensions[0], dimensions[1], "generic");
  startPerformanceTest(
    "identitiLike and identity",
    [{ param: "matrix", dimensions, "type": "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      "numericjs": {
        instance: numeric,
        test: numericTest,
      },
    },
  );
  startPerformanceTest(
    "identityLike and identity",
    [{ param: "matrix", dimensions, type: "generic" }],
    Matrix.isEqualTo(
      Matrix.identityLike(41, 41, "generic"),
      numeric.identity(41),
    ),
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
