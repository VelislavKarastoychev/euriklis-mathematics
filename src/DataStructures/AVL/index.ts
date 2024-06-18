"use strict";

import { BST } from "../BST";
import { AVLDataNode } from "../DataNode";
import { BinarySearch, DeleteNodeInBST, InsertNodeInBST } from "../BST/Models";
import * as models from "./Models";
import type { BSTNodeValueComparisonCallbackType, Integer } from "../../Types";

export class AVLTree extends BST<AVLDataNode> {
  constructor(data?: any) {
    super(data);
  }

  get root(): any {
    return this._root?.data || null;
  }
  set root(data: any) {
    if (data) this._root = new AVLDataNode(data) as AVLDataNode;
  }

  insert(data: any, id?: string) {
    if (data?.id) id = data.id;
    const n = new AVLDataNode(data);
    const node = InsertNodeInBST(this, n, id);
    // set the balance factors recursively for the all nodes of the tree.
    if (node) models.SetBalanceFactorsBackward(node, this);

    return this;
  }

  delete(
    value: any,
    callback: BSTNodeValueComparisonCallbackType = this.search,
  ): any | null {
    const node = BinarySearch(this._root, value, callback);
    if (!node) return null;
    const predecessor = DeleteNodeInBST(node, this) as AVLDataNode | null;
    models.SetBalanceFactorsForward(predecessor, this);

    return node.data;
  }

  deleteNode(
    callback: (node: AVLDataNode, tree?: AVLTree) => -1 | 0 | 1,
  ): AVLDataNode | null {
    const node = this.binarySearchNode(callback);
    if (!node) return null;
    const predecessor = DeleteNodeInBST(node, this) as AVLDataNode | null;
    models.SetBalanceFactorsAfterDeletion(predecessor, this);
    node.prev = null;
    node.left = null;
    node.right = null;
    node.balance = 0;

    return node;
  }

  copy(): AVLTree {
    const tree = new AVLTree();
    this.BFS((node) => {
      const copiedNode = new AVLDataNode(node.data);
      copiedNode.id = node.id;
      const insertedNode = InsertNodeInBST(tree, copiedNode, undefined);
      if (insertedNode) models.SetBalanceFactorsBackward(insertedNode, this);
    });
    return tree;
  }

  print(
    node: AVLDataNode | null = this._root,
    level: Integer = 0,
    prefix: string = "Root: ",
    callback: (node: AVLDataNode, tree?: AVLTree) => any = (node) => node.data,
  ): void {
    if (node === null) {
      return;
    }
    console.log(
      " ".repeat(level * 2) + prefix + callback(node, this) + ` [BF = ${node.balance}]`,
    );

    if (node.left) {
      this.print(node.left as AVLDataNode, level + 1, "L--> ", callback);
    }

    if (node.right) {
      this.print(node.right as AVLDataNode, level + 1, "R--> ", callback);
    }
  }
}
