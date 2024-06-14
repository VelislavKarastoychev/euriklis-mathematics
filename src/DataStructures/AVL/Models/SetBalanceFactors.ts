"use strict";

import type { AVLTree } from "..";
import type { Integer } from "../../../Types";
import type { AVLDataNode } from "../../DataNode";


/**
 * Performs single right (left) rotation of an AVL
 * tree.
 *
 * The main strategy of the single rotations is
 * is take care of the children, set the parents
 * and then "work" for yourself.
 *
 * @param {AVLDataNode} a - The node which has
 * balance equals to -2 or 2.
 * @returns{void}
 */
const SingleRightRotation = (
  a: AVLDataNode,
  tree: AVLTree
): void => {
  const b = a.left as AVLDataNode;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = b;
    else a.prev.right = b;
  } else tree.rootNode = b;
  b.prev = a.prev;
  a.prev = b;
  a.left = b.right;
  b.right = a;
};
const SingleLeftRotation = (a: AVLDataNode, tree: AVLTree): void => {
  const b = a.right as AVLDataNode;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = b;
    else a.prev.right = b;
  } else tree.rootNode = b;

  b.prev = a.prev;
  a.prev = b;
  a.right = b.left;
  b.left = a;
}

const DoubleLeftRightRotation = (a: AVLDataNode, tree: AVLTree): void => {
  // 
}

export const SetBalanceFactorsForward = (
  node: AVLDataNode | null,
  tree: AVLTree,
): void => {
  if (!node) return;
  node.balance = tree.height(node.right) - tree.height(node.left);
  SetBalanceFactorsForward(node.left, tree);
  SetBalanceFactorsForward(node.right, tree);
};

export const SetBalanceFactorsBackward = (
  node: AVLDataNode,
  tree: AVLTree,
): void => {
  if (node.prev) {
    if (node === node.prev.left) node.prev.balance -= 1;
    else node.prev.balance += 1;
    node = node.prev as AVLDataNode;
    if (!node.balance) return;
    if (node.balance === -2) {
      if (node.left?.balance === -1) {
        SingleRightRotation(node, tree);
        SetBalanceFactorsForward(node, tree);
        return;
      } else if (node.left?.balance === 1) {
        DoubleLeftRightRotation(node, tree);
        SetBalanceFactorsForward(node, tree);
      }
    } else if (node.balance === 2) {
      if (node.right?.balance === 1) {
        SingleLeftRotation(node, tree);
        SetBalanceFactorsForward(node, tree);
        return;
      }
    }
    return SetBalanceFactorsBackward(node, tree);
  }
};
