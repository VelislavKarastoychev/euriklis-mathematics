"use strict";
import validator from "@euriklis/validator";
import { MatrixType, NumericMatrix } from "../types";

export const IsEmpty = (item: [] | MatrixType | NumericMatrix) =>
  new validator(item).isEmpty.answer;
