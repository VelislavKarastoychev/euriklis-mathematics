"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const identity = Matrix.identityLike(dimensions[0], dimensions[1]);
  const numericIdentity = numeric.identity(dimensions[0]);
  const condition = Matrix.isEqualTo(identity, numericIdentity);
  const euriklisTest = (m) => m.identityLike(dimensions[0], dimensions[1]);
  const numericTest = (m) => m.identity(dimensions[0]);
  startPerformanceTest(
    "identitiLike and identity",
    [{ param: "matrix", dimensions, "type": "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
  startPerformanceTest(
    "identityLike and identity",
    [{ param: "matrix", dimensions, type: "generic" }],
    Matrix.isEqualTo(
      Matrix.identityLike(41, 41, "generic"),
      numeric.identity(41),
    ),
    (m) => m.identityLike(dimensions[0], dimensions[1], "generic"),
    (m) => m.identity(dimensions[0]),
  );
})();
