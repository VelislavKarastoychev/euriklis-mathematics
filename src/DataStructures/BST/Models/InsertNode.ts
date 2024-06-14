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

/**
 * Inserts a new node with the given data into the Binary Search Tree (BST).
 * If the BST's `unique` property is set to true and a node with the same ID exists,
 * the existing node will be replaced with the new node.
 * @param tree The BST instance where the node should be inserted.
 * @param data The data to be stored in the new node.
 * @param id Optional. The ID for the new node. If not provided, `data.id` will be used if available.
 * @returns The newly inserted BSTDataNode.
 */
export const InsertNodeInBST = <T extends BSTDataNode>( 
  tree: BST<T>,
  node: T,
  id?: string,
) => {
  const orderCallback = tree.order;
  let root: T | null = tree.rootNode, y: T | null;
  if (id) node.id = id;
  y = searchForLeaf(root, node, orderCallback) as T | null;
  node.prev = y;
  if (!y) tree.rootNode = node as T;
  else {
    const comparison = orderCallback(node, y);
    if (comparison < 0) y.left = node;
    else if (comparison === 0) {
      if (tree.unique) {
        y.data = (node as T).data;
        return null;
      } else y.right = node;
    } else y.right = node;
  }

  return node;
};
