"use strict";
export const IncorrectParameterInPushManyTxt =
  "Incorrect parameter in the pushMany method of the current Stack instance. Note that this parameter has to be an array of arbitrary elements.";

export const StackOverflowTxt: (method: string) => string = (name) =>
  `Stack overflow in method ${name}. The data structure limit size was achieved.`;

export const StackUnderflowTxt: (method: string) => string = (method) =>
  `Stack underflow in method ${method}. The data structure is empty.`;
