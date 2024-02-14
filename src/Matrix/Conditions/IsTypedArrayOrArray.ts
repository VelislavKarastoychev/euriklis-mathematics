"use strict";

import validator from "@euriklis/validator-ts";

export const IsTypedArrayOrArray = (item: any) =>
  new validator(item).isTypedArray.or.isArray.answer;
