"use strict";
import type { DynamicStack } from "../../Stack";
import type { BSTDataNode } from "../../DataNode";
import validator from "@euriklis/validator-ts";

export const IsNodeSame = <T extends BSTDataNode>(
  S1: DynamicStack,
  S2: DynamicStack,
): boolean => {
  let t1: T, t2: T;
  if (!S1.isEmpty && !S2.isEmpty) {
    t1 = S1.pop();
    t2 = S2.pop();
    const same: boolean = new validator(t1.data).isSame(t2.data)
      .and.bind(
        new validator(t1.id).isSame(t2.id),
      )
      .answer;
    if (!same) return false;
    if (t1.left) S1.push(t1.left);
    if (t1.right) S1.push(t1.right);
    if (t2.left) S2.push(t2.left);
    if (t2.right) S2.push(t2.right);
    return IsNodeSame(S1, S2);
  } else if (!S1.isEmpty || !S2.isEmpty) return false;
  return true;
};
