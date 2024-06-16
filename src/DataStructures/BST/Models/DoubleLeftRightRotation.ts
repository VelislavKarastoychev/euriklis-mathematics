"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";

export const DoubleLeftRightRotation = <T extends BSTDataNode>(
  a: T,
  tree: BST<T>,
): void => {

  const b = a.left as T;
  const c = b.right as T;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = c;
    else a.prev.right = c;
  } else tree.rootNode = c;

  c.prev = a.prev || null;
  a.prev = c;
  b.prev = c;

  b.right = c.left;
  if (c.left) c.left.prev = b;
  a.left = c.right;
  if (c.right) c.right.prev = a;
  c.left = b;
  c.right = a;
};

