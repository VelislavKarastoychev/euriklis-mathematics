"use strict";
import { errorGenerator } from "../../utils";
import {
  IncorrectParameterInPushManyTxt,
  StackOverflowTxt,
  StackUnderflowTxt,
} from "./texts";
const runError = errorGenerator(
  "@euriklis/mathematics DataStructures library error message",
);
export const IncorrectParameterInPushMany: () => never = () =>
  runError(IncorrectParameterInPushManyTxt);
export const StackUnderflow: (methodName: string) => () => never =
  (methodName) => () => runError(StackUnderflowTxt(methodName));
export const StackOverflow: (methodName: string) => () => never =
  (methodName) => () => runError(StackOverflowTxt(methodName));
