"use strict";
import validator from "@euriklis/validator-ts";
export const IsComplexMatrix = (z: any) =>
  new validator(z).isArrayOfArraysWithEqualSize.and.forEvery((row) =>
    row.isArrayOfArraysWithEqualSize
  );
