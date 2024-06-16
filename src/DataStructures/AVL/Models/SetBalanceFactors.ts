"use strict";

import type { AVLTree } from "..";
import type { AVLDataNode } from "../../DataNode";

/**
 * Performs single right (left) rotation of an AVL
 * tree.
 *
 * @param {AVLDataNode} a - The node which has
 * balance equals to -2 or 2.
 * @returns{void}
 */
export const SingleRightRotation = (
  a: AVLDataNode,
  tree: AVLTree,
): void => {
  const b = a.left as AVLDataNode;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = b;
    else a.prev.right = b;
  } else tree.rootNode = b;

  b.prev = a.prev;
  a.prev = b;
  if (b.right) b.right.prev = a;
  a.left = b.right;
  b.right = a;
};
export const SingleLeftRotation = (a: AVLDataNode, tree: AVLTree): void => {

  const b = a.right as AVLDataNode;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = b;
    else a.prev.right = b;
  } else tree.rootNode = b;

  b.prev = a.prev;
  a.prev = b;
  if (b.left) b.left.prev = a;
  a.right = b.left;
  b.left = a;
};

export const DoubleLeftRightRotation = (
  a: AVLDataNode,
  tree: AVLTree,
): void => {

  const b = a.left as AVLDataNode;
  const c = b.right as AVLDataNode;
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

export const DoubleRightLeftRotation = (
  a: AVLDataNode,
  tree: AVLTree,
): void => {
  const b = a.right as AVLDataNode;
  const c = b.left as AVLDataNode;
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
  c.left = b;
  c.right = a;
};

export const SetBalanceFactorsForward = (
  node: AVLDataNode | null,
  tree: AVLTree,
): void => {
  if (!node) return;
  node.balance = tree.height(node.right) - tree.height(node.left);
  SetBalanceFactorsForward(node.left, tree);
  SetBalanceFactorsForward(node.right, tree);
};

export const SetBalanceFactorsAfterDeletion = (
  node: AVLDataNode | null,
  tree: AVLTree,
): void => {
  if (!node) return;
  SetBalanceFactorsForward(node, tree);
  UpdateNodeBalance(node, tree);
  return SetBalanceFactorsAfterDeletion(node.prev, tree);
};

export const UpdateNodeBalance = (node: AVLDataNode, tree: AVLTree) => {
  if (node.balance === -2) {
    if (node.left?.balance === -1) {
      SingleRightRotation(node, tree);
      SetBalanceFactorsForward(node, tree);
    } else if (node.left?.balance === 1) {
      DoubleLeftRightRotation(node, tree);
      SetBalanceFactorsForward(node, tree);
    }
  } else if (node.balance === 2) {
    if (node.right?.balance === 1) {
      SingleLeftRotation(node, tree);
      SetBalanceFactorsForward(node, tree);
    }
    if (node.right?.balance === -1) {
      DoubleRightLeftRotation(node, tree);
      SetBalanceFactorsForward(node, tree);
    }
  }
};

export const SetBalanceFactorsBackward = (
  node: AVLDataNode,
  tree: AVLTree,
  rebalancing: boolean = true,
): void => {
  if (node.prev) {
    if (node === node.prev.left) node.prev.balance -= 1;
    else node.prev.balance += 1;
    node = node.prev as AVLDataNode;
    if (!node.balance) return;
    if (rebalancing) UpdateNodeBalance(node, tree);

    return SetBalanceFactorsBackward(node, tree);
  }
};
