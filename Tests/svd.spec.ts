"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 5, 16],
];
const s = [[35.37349085, 6.4937679459, 1.5959708277, 0]];
const v = [[
  -0.4651853149790976,
  0.3160314831782701,
  -0.6308822700422441,
  -0.5345224838248486,
], [
  -0.516191743145752,
  0.24403061154755423,
  -0.17645963300067707,
  0.8017837257372732,
], [
  -0.3673850571524129,
  -0.9113546992128074,
  -0.185636289566053,
  0,
], [
  -0.6182045994790609,
  0.10002886828612281,
  0.7323856410824561,
  -0.26726124191242473,
]];
const d = [[
  -0.1433995415385907,
  -0.23558832575469946,
  0.8702114947459341,
  0.40824829046386285,
], [
  -0.3658222278428631,
  -0.3903605555560085,
  0.2170853924505793,
  -0.8164965809277257,
], [
  -0.5882449141471354,
  -0.5451327853573179,
  -0.43604070984477494,
  0.408248290463863,
], [
  -0.7068087365636024,
  0.7035247143936556,
  0.07398909483626345,
  0,
]];
const svd = Matrix.svd(matrix, {copy: true});
new validator(Matrix.isNearlyEqualTo([svd.s] as MatrixType | NumericMatrix, s))
  .isSame(true)
  .and.bind(
    new validator(Matrix.isNearlyEqualTo(svd.v, v)).isSame(true)
      .on(false, (_) => {
        console.table(Matrix.minus(svd.v, v));
      }),
  ).and.bind(
    new validator(Matrix.isNearlyEqualTo(svd.d, d)).isSame(true)
      .on(false, (_) => console.table(Matrix.minus(svd.d, d))),
  ).describe("The svd method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. compute correctly the singular value decomposition of a matrix.",
  ).test()

