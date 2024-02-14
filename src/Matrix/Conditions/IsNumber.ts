"use strict";
import validator from "@euriklis/validator-ts";
export const IsNumber = (n: any) => new validator(n).isNumber.answer;
