"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";

export const DoubleRightLeftRotation = <T extends BSTDataNode>(
  a: T,
  tree: BST<T>,
): void => {
  const b = a.right as T;
  const c = b.left as T;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = c;
    else a.prev.right = c;
  } else tree.rootNode = c;

  c.prev = a.prev || null;
  a.prev = c;
  b.prev = c;

  b.left = c.right;
  if (c.right) c.right.prev = b;
  a.right = c.left;
  if (c.left) c.left.prev = a;
  c.right = b;
  c.left = a;
};

