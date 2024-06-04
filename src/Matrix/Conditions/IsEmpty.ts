"use strict";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../../Types";

export const IsEmpty = (item: [] | MatrixType | NumericMatrix) =>
  new validator(item).isEmpty.answer;
