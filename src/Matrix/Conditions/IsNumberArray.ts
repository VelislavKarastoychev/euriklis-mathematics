"use strict";

import validator from "@euriklis/validator-ts";
export const IsNumberArray = (v: any) =>
  new validator(v).isNumberArray.or.isTypedArray.answer;
