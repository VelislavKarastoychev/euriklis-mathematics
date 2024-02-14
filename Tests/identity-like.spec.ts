"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { Integer } from "../src/Matrix/types.ts";
const generateIdentityLikeMatrix = (rows: Integer, columns: Integer) =>
  Matrix.identityLike(rows, columns);
new validator(Matrix.identityLike(15, 51))
  .describe("The identityLike and identity static methods have to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. generates matrix with zero elements except for the diagonal elements which are equal to onces with the correct type.",
  )
  .forEvery((row, i) => {
    return new validator([...row.value]).forEvery((el, j) => {
      return el.isSame(0).and.bind(
        new validator(i).not.isSame(j),
      ).or.isSame(1);
    });
  })
  .and.isArrayOfTypedArraysWithEqualSize
  .test();

new validator(Matrix.identityLike(21, 12, "generic"))
  .describe("2. creates a conventional array - like matrix when the type is generic.")
  .isArrayOfIntegerArraysWithEqualSize
  .and.forEvery((row, i) => {
    return row.forEvery((el, j) => {
      return el.isSame(0).and.bind(
        new validator(i).not.isSame(j)
      ).or.isSame(1)
    })
  }).test();

new validator(generateIdentityLikeMatrix)
  .throwsErrorWith(-10, 7)
  .and.throwsErrorWith(Math.E, 4)
  .and.throwsErrorWith(-2, 2)
  .and.not.throwsErrorWith(4, 3)
  .describe(
    "3. Throws error if the rows or columns parameters are inappropriately declared.",
  ).test();
