"use strict";

import { IsNumber } from "../Conditions";
import { Integer } from "../types";

export function ifIsNotNumberThrow(
  error: Function,
  argIndex: Integer,
): (_: any, __: string, descriptor: PropertyDescriptor) => void {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!IsNumber(args[argIndex])) error();
      return method.apply(this, args);
    };
  };
}
