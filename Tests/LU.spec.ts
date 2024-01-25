"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
const m = [
  [
    0.8403662590985688,
    0.5715380713840723,
    0.7541840624384091,
    0.5171508409355441,
  ],
  [
    0.07798419972749863,
    0.6544274267291487,
    0.6234428925642668,
    0.9257965587100367,
  ],
  [
    0.4213043120178374,
    0.26460425503295026,
    -0.3181672242457532,
    0.281970912571312,
  ],
  [
    0.5413994251708117,
    0.17300346727949184,
    0.31246565099886753,
    -0.07663506221510691,
  ],
];
const r = Matrix.random(4, 4);
const lupc = r.LUPC();
console.log(lupc.LU.M, m);
new validator(lupc.LU.isEqualTo(m))
  .describe("The LU compact factorization with permutations has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  }).describe("1. return the correct result")
  .isSame(true)
  .test();
