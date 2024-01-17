"use strict";
import validator from "@euriklis/validator";
export const IsNumber = (n: any) => new validator(n).isNumber.answer;
