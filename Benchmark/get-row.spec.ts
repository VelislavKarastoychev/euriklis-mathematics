"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
const mat6 = Matrix.random(6000, 6000);
const dataMat6 = mat6.M;

new validator(
  mat6.getRow(400, 989, 5988).isEqualTo(
    new Matrix(numeric.getBlock(dataMat6, [400, 989], [400, 5988])),
  ),
).isSame(true)
  .describe(
    "Time performance for the getRow method with parameters matrix --> 6000 x 6000, row 400, from column 989 to column 5988",
  ).test({ title: true, success: "green", error: "red" })
  .on(true, () => {
    const t1 = new validator(mat6).benchmark((m) => m.getRow(400, 989, 5988));
    const t2 = new validator(dataMat6).benchmark((matrix) =>
      numeric.getBlock(matrix, [400, 989], [400, 5988])
    );
    console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
  }).on(false, () => console.log("Something went wrong in get row benchmark test..."));
