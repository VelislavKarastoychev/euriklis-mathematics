"use strict";
import * as models from "./Models";
import type { Integer } from "../../Types";
import type {
  BSTNodeComparisonCallbackType,
  BSTNodeValueComparisonCallbackType,
} from "../../Types";
import { BSTDataNode } from "../DataNode";
import { DynamicStack } from "../Stack";
import { Queue } from "../Queue";

const compareNodes: BSTNodeComparisonCallbackType = (x, y) =>
  x.id < y.id ? -1 : x.id === y.id ? 0 : 1;

const compareNodeWithValue: BSTNodeValueComparisonCallbackType = (
  x,
  value,
) => x.id > value ? -1 : x.id === value ? 0 : 1;

/**
 * This class implements the concept of the Binary search trees
 * using the BSTDataNode extension of the DataNode model.
 */
export class BST {
  public order = compareNodes;
  public search = compareNodeWithValue;
  protected _root: BSTDataNode | null = null;

  constructor(data?: any) {
    this.root = data;
  }

  get root(): any {
    return this._root?.data || null;
  }

  set root(data) {
    if (data) {
      this._root = new BSTDataNode(data);
    }
  }

  get rootNode(): BSTDataNode | null {
    return this._root;
  }

  get isEmpty(): boolean {
    return !this._root;
  }

  get size(): Integer {
    let s: Integer = 0;
    this.BFS((_) => s++);

    return s;
  }

  clean() {
    this._root = null;
    this.order = compareNodes;

    return this;
  }

  copy(): BST {
    const tree = new BST();
    tree.order = this.order;
    tree.search = this.search;
    this.BFS((node) => {
      tree.insert(node?.data, node?.id);
    });

    return tree;
  }

  isSame(tree: BST) {
    const r1 = this._root,
      r2 = tree._root,
      S1 = new DynamicStack(r1),
      S2 = new DynamicStack(r2);

    if (!S1.isEmpty && !S2.isEmpty) return models.IsNodeSame(S1, S2);
  }

  insert(data: any, id?: string) {
    if (data?.id) id = data.id;
    const node = new BSTDataNode(data);
    let r: BSTDataNode | null = this._root, y: BSTDataNode | null = null;
    if (id) node.id = id;
    while (r) {
      y = r;
      if (this.order(node, r) < 0) r = r.left;
      else r = r.right;
    }

    node.prev = y;

    if (!y) this._root = node;
    else {
      if (this.order(node, y) < 0) y.left = node;
      else y.right = node;
    }
    return this;
  }

  insertMany(data: any[]): BST {
    const n = data.length;
    let i: Integer;
    for (i = 0; i < n - 1; i++) {
      this.insert(data[i++]);
      this.insert(data[i]);
    }

    if (i === (n - 1)) this.insert(data[n - 1]);

    return this;
  }

  delete(
    value: any,
    callback: BSTNodeValueComparisonCallbackType = this.search,
  ) {
    const node = models.BinarySearch(this._root, value, callback);
    if (!node) return null;
    if (!node.left) models.ShiftNodes(this, node, node?.right);
    else if (!node.right) models.ShiftNodes(this, node, node?.left || null);
    else {
      const successor = this.successorNode(node) as BSTDataNode;
      if (successor.prev !== node) {
        models.ShiftNodes(this, successor, successor.right as BSTDataNode);
        successor.right = node?.right || null;
        (successor.right as BSTDataNode).prev = successor;
      }
      models.ShiftNodes(this, node, successor);
      if (!node.prev) this._root = successor;
      if (node === node.prev?.left) node.prev.left = successor;
      if (node === node.prev?.right) node.prev.right = successor;
      successor.left = node.left;
      (successor.left as BSTDataNode).prev = successor;
    }

    // It is no needed to delete the node connection
    // because the garbadge collector will delete it.
    return node?.data || null;
  }

  deleteNode(
    callback: (node: BSTDataNode, tree?: BST) => -1 | 0 | 1,
  ): BSTDataNode | null {
    const node = this.binarySearchNode(callback);
    if (!node) return null;
    if (!node.left) models.ShiftNodes(this, node, node?.right);
    else if (!node.right) models.ShiftNodes(this, node, node?.left || null);
    else {
      //  Note that it is possible to run the predecessorNode
      const successor = this.successorNode(node) as BSTDataNode;
      if (successor.prev !== node) {
        models.ShiftNodes(this, successor, successor.right as BSTDataNode);
        successor.right = node.right;
        (successor.right as BSTDataNode).prev = successor;
      }
      models.ShiftNodes(this, node, successor);
      successor.left = node.left;
      (successor.left as BSTDataNode).prev = successor;
    }
    // delete the connection of the node because it is deleted.
    node.prev = null;
    node.right = null;
    node.left = null;

    return node || null;
  }

  binarySearch(
    value: any,
    callback: BSTNodeValueComparisonCallbackType = this.search,
  ): any {
    return models.BinarySearch(this._root, value, callback)?.data || null;
  }

  binarySearchNode(
    callback: (node: BSTDataNode, tree?: BST) => -1 | 0 | 1,
  ): BSTDataNode | null {
    return models.BinarySearchNode(this, this._root, callback);
  }

  min(x: BSTDataNode | null = this._root): any {
    // shallow copy of x!
    let y: BSTDataNode | null = x;
    if (y?.left) return this.min(y.left);
    return y?.data || null;
  }

  minNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    let y: BSTDataNode | null = x;
    if (y?.left) return this.minNode(y.left);
    return y;
  }

  max(x: BSTDataNode | null = this._root): any {
    let y: BSTDataNode | null = x;
    if (y?.right) return this.max(y.right);
    return y?.data || null;
  }

  maxNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    let y: BSTDataNode | null = x;
    if (y?.right) return this.maxNode(y.right);
    return y;
  }

  predecessor(x: BSTDataNode | null = this._root): any | null {
    if (x?.left) return this.max(x.left);
    else return models.LeftBackward(x)?.data || null;
  }

  predecessorNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    if (x?.left) return this.maxNode(x.left);
    else return models.LeftBackward(x);
  }

  successor(x: BSTDataNode | null = this._root): any {
    if (x?.right) return this.min(x.right);
    else return models.RightBackward(x)?.data || null;
  }

  successorNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    if (x?.right) return this.minNode(x.right);
    else return models.RightBackward(x);
  }

  filter(callback: (node: BSTDataNode | null, tree?: BST) => boolean): BST {
    const tree = new BST();
    tree.order = this.order;
    this.BFS((node, bst) => {
      if (callback(node, bst)) tree.insert(node?.data);
    });

    return tree;
  }

  BFS(callback: (node: BSTDataNode | null, tree: BST) => void): BST {
    const Q = new Queue(this._root);
    models.CallBFS(this, Q, callback);

    return this;
  }

  DFS(callback: (node: BSTDataNode | null, tree: BST) => void): BST {
    const S = new DynamicStack(this._root);
    models.CallDFS(this, S, callback);

    return this;
  }

  toArray(mode: "BFS" | "DFS" = "DFS") {
    const __values__: any = [];
    this[mode]((node) => __values__.push(node?.data));

    return __values__;
  }

  print(
    node: BSTDataNode | null = this._root,
    level: Integer = 0,
    prefix: string = "Root: ",
  ) {
    if (node === null) {
      return;
    }
    console.log(" ".repeat(level * 2) + prefix + node.data);

    if (node.left) {
      this.print(node.left, level + 1, "L--> ");
    }

    if (node.right) {
      this.print(node.right, level + 1, "R--> ");
    }
  }
}
