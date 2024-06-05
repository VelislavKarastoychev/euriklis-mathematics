"use strict";
import validator from "@euriklis/validator-ts";
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
) => x.data > value ? -1 : x.data === value ? 0 : 1;

/**
 * This class implements the concept of the Binary search trees
 * using the BSTDataNode extension of the DataNode model.
 */
export class BST {
  public compare = compareNodes;
  public search = compareNodeWithValue;
  private _root: BSTDataNode | null = null;

  constructor(data?: any) {
    this.root = data;
  }

  get root(): any {
    return this._root?.data || null;
  }

  set root(data) {
    if (data) {
      const node = new BSTDataNode(data);
      this._root = node;
    }
  }

  get rootNode(): BSTDataNode | null {
    return this._root;
  }

  get isEmpty(): boolean {
    return !this._root;
  }

  clean() {
    this._root = null;
    this.compare = compareNodes;

    return this;
  }

  copy(): BST {
    const tree = new BST();
    tree.compare = this.compare;
    this.DFS((node) => {
      tree.insert(node?.data, node?.id);
    });

    return tree;
  }

  isSame(tree: BST) {
    const r1 = this._root,
      r2 = tree._root,
      S1 = new DynamicStack(r1),
      S2 = new DynamicStack(r2);
    let same = false, t1: BSTDataNode, t2: BSTDataNode;
    while (!S1.isEmpty && !S2.isEmpty) {
      t1 = S1.pop();
      t2 = S2.pop();
      same = new validator(t1.data).isSame(t2.data)
        .and.bind(
          new validator(t1.id).isSame(t2.id),
        ).answer;
      if (!same) break;
      if (t1.left) S1.push(t1.left);
      if (t1.right) S1.push(t1.right);
      if (t2.left) S2.push(t2.left);
      if (t2.right) S2.push(t2.right);
    }

    if (!S1.isEmpty || !S2.isEmpty) return false;
    return same;
  }

  insert(data: any, id?: string) {
    if (data?.id) id = data.id;
    const node = new BSTDataNode(data);
    let r: BSTDataNode | null = this._root, y: BSTDataNode | null = null;
    if (id) node.id = id;
    while (r) {
      y = r;
      if (this.compare(node, r) < 0) r = r.left;
      else r = r.right;
    }

    node.prev = y;

    if (!y) this._root = node;
    else {
      if (this.compare(node, y) < 0) y.left = node;
      else y.right = node;
    }
    return this;
  }

  delete(id: any) {
    const node: BSTDataNode | null = this.binarySearchNode((node) =>
      node.data > id ? -1 : node.data === id ? 0 : 1
    );
    return this.deleteNode(node)?.data || null;
  }

  deleteNode(node: BSTDataNode | null): BSTDataNode | null {
    // implementation of the delete algorithm for BSTs.
    let y: BSTDataNode | null, z: BSTDataNode | null;
    if (node?.left || node?.right) {
      y = node;
    } else y = this.successorNode(node);
    if (y?.left) z = y.left;
    else z = y?.right as BSTDataNode | null;
    if (z) {
      z.prev = y?.prev as BSTDataNode | null;
    }

    if (!y?.prev) this._root = z;
    else if ((y === y.prev?.left)) {
      (y.prev as BSTDataNode).left = z;
    }
    if (y !== node) {
      node = y;
    }
    return node;
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

  successor(x: BSTDataNode | null = this._root): any {
    if (x?.right) return this.min(x.right);
    else return models.Backward(x)?.data || null;
  }

  successorNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    if (x?.right) return this.minNode(x);
    else return models.Backward(x);
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

  toArray() {
    const __values__: any = [];
    this.DFS((node) => __values__.push(node?.data));

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
      this.print(node.left, level + 1, "L--- ");
    }

    if (node.right) {
      this.print(node.right, level + 1, "R--- ");
    }
  }
}
