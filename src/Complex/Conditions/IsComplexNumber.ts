"use strict";
import validator from "@euriklis/validator-ts";
export const IsComplexNumber = (z: any) =>
  new validator(z).isNumberArray.and.hasLength(2).answer;

