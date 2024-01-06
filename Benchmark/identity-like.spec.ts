"use strict";

import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

const identity = Matrix.identityLike(5000, 5000);
const numericIdentity = numeric.identity(5000);

new validator(identity.isEqualTo(new Matrix(numericIdentity))).isSame(true)
  .describe("Time performance of the identityLike method for matrix with dimension 500 x 5000")
  .test({
    title: true,
    success: "green",
    error: "red"
  })
  .on(true, () => {
    const t1 = new validator(Matrix).benchmark((m) => m.identityLike(5000, 500)); 
    const t2 = new validator(numeric).benchmark((n) => n.identity(5000));
    console.table({"@euriklis/mathematics": t1, numericjs: t2});
  });


