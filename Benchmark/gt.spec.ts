"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 2, 3);
  const condition = Matrix.isEqualTo(
    Matrix.gt(m2, m1),
    Matrix.copy(numeric.gt(m2, m1)),
  );
  const test = (m: any) => m.gt(m2, m1);
  startPerformanceTest(
    "gt",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
