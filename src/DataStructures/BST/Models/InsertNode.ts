"use strict";

import type { BST } from "..";
import type { BSTNodeComparisonCallbackType } from "../../../Types";
import { BSTDataNode } from "../../DataNode";

const searchForLeaf = (
  n1: BSTDataNode | null,
  n2: BSTDataNode,
  orderCallback: BSTNodeComparisonCallbackType,
  prev: BSTDataNode | null = null,
): BSTDataNode | null => {
  if (n1) {
    prev = n1;
    if (orderCallback(n2, n1) < 0) n1 = n1.left;
    else n1 = n1.right;
    return searchForLeaf(n1, n2, orderCallback, prev);
  } else return prev;
};

export const InsertNodeInBST = (
  tree: BST,
  data: any,
  id: string | undefined,
) => {
  const node = new BSTDataNode(data);
  const orderCallback = tree.order;
  let root: BSTDataNode | null = tree.rootNode, y: BSTDataNode | null;
  if (id) node.id = id;
  y = searchForLeaf(root, node, orderCallback);
  node.prev = y;

  if (!y) tree.rootNode = node;
  else {
    if (orderCallback(node, y) < 0) y.left = node;
    else y.right = node;
  }

  return node;
};
