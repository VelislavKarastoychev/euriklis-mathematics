"use strict";

import validator from "@euriklis/validator";

export const IsTypedArrayOrArray = (item: any) =>
  new validator(item).isTypedArray.or.isArray.answer;
