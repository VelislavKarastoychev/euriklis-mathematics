"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m = Matrix.random(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.transpose(m),
    numeric.transpose(m),
  );
  const test = (lib: any) => lib.transpose(m);

  startPerformanceTest(
    "transpose",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
