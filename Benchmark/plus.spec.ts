"use strict";
import * as tf from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  // const rt2 = Matrix.copy(r, undefined, 2, 0);
  const r1 = tf.randomNormal([5000, 5000]);
  const condition = Matrix.isEqualTo(
    Matrix.plus(r, r),
    numeric.add(r, r),
  );
  const euriklisTest = (m: any) => m.plus(r, r);
  const numericTest = (m: any) => m.add(r, r);
  const tfTest = (_: any) => tf.add(r1, r1);
  startPerformanceTest(
    "plus",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
  
  startPerformanceTest(
    "plus",
    [{param: "matrix", dimensions, type: "float64"}],
    condition,
    euriklisTest,
    tfTest
  );
})();
