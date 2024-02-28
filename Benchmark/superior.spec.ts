"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { validateHeaderValue } from "http";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(Matrix.superior(r) - numeric.sup(cr.flat())) < 1e-8;
  const euriklisTest = (m: any) => m.superior(r);
  const numericTest = (m: any) => m.sup(cr.flat());
  startPerformanceTest(
    "superior",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
