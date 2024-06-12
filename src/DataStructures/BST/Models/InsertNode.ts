"use strict";

import type { BST } from "..";
import type { BSTNodeComparisonCallbackType } from "../../../Types";
import { BSTDataNode } from "../../DataNode";

const searchForLeaf = <T extends BSTDataNode>(
  n1: T | null,
  n2: T,
  orderCallback: BSTNodeComparisonCallbackType,
  prev: T | null = null,
): T | null => {
  if (n1) {
    prev = n1;
    if (orderCallback(n2, n1) < 0) n1 = n1.left as T | null;
    else n1 = n1.right as T | null;
    return searchForLeaf(n1, n2, orderCallback, prev);
  } else return prev;
};

export const InsertNodeInBST = <T extends BSTDataNode>(
  tree: BST<T>,
  data: any,
  id?: string,
) => {
  const node = new BSTDataNode(data);
  const orderCallback = tree.order;
  let root: T | null = tree.rootNode, y: T | null;
  if (id) node.id = id;
  y = searchForLeaf(root, node, orderCallback) as T | null;
  node.prev = y;

  if (!y) tree.rootNode = node as T;
  else {
    if (orderCallback(node, y) < 0) y.left = node;
    else y.right = node;
  }

  return node;
};
