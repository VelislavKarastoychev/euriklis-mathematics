"use strict";

import { Matrix } from "..";
import { NumericType } from "../types";

export function resetMatrix (
    _: any,
    __: string,
    propertyDescriptor: PropertyDescriptor,
  ) {
    const setter: Function = propertyDescriptor.set as Function;
    propertyDescriptor.set = function (type: NumericType) {
      if ((this as Matrix).rows) (this as Matrix).M = (this as Matrix).M;
      setter.call(this, type);
    };
  };
