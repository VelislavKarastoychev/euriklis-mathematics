"use strict";
import validator from "@euriklis/validator-ts";
import type { Integer } from "../../Matrix/types";
import { BSTDataNode } from "../DataNode";
import { DynamicStack } from "../Stack";

const compareNodes: (x: BSTDataNode, y: BSTDataNode) => -1 | 0 | 1 = (x, y) =>
  x.id < y.id ? -1 : x.id === y.id ? 0 : 1;

/**
 * This class implements the concept of the Binary search trees
 * using the BSTDataNode extension of the DataNode model.
 */
export class BST {
  public compare = compareNodes;
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
      tree.insert(node.data, node.id);
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

  delete(id: string) {
    const node = this.searchNode((node) =>
      node.id > id ? -1 : node.id === id ? 0 : 1
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
    else if ((y = y.prev?.left)) {
      (y.prev as BSTDataNode).left = z;
    }
    if (y !== node) {
      node = y;
    }
    return node;
  }

  binarySearch(callback: (node: BSTDataNode, tree?: BST) => -1 | 0 | 1): any {
    let found = false, r: BSTDataNode | null = this._root;
    while (r && !found) {
      if (callback(r, this) === 0) found = true;
      else if (callback(r, this) === -1) r = r.left;
      else r = r.right;
    }

    if (found) return r?.data;
    else return null;
  }

  binarySearchNode(
    callback: (node: BSTDataNode, tree?: BST) => -1 | 0 | 1,
  ): BSTDataNode | null {
    let found = false, r: BSTDataNode | null = this._root;
    while (r && !found) {
      if (callback(r, this) === 0) found = true;
      else if (callback(r, this) === -1) r = r.left;
      else r = r.right;
    }

    if (found) return r;
    else return null;
  }

  min(x: BSTDataNode | null = this._root): any {
    let y: BSTDataNode | null = x;
    while (y?.left) {
      y = y.left;
    }

    return y?.data || null;
  }

  minNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    let y: BSTDataNode | null = x;
    while (y?.left) {
      y = y.left;
    }

    return y;
  }

  max(x: BSTDataNode | null = this._root): any {
    let y: BSTDataNode | null = x;
    while (y?.right) {
      y = y.right;
    }

    return y?.data || null;
  }

  maxNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    let y: BSTDataNode | null = x;
    while (y?.right) {
      y = y.right;
    }

    return y;
  }

  successor(x: BSTDataNode | null = this._root): any {
    let s: BSTDataNode | null;
    if (x?.right) {
      return this.min(x.right);
    } else {
      s = x?.prev || null;
    }

    while (s && (x = s.right)) {
      x = s;
      s = s?.prev || null;
    }

    if (!s && (x = x?.right || null)) {
      s = null;
      return s;
    } else return x?.data || null;
  }

  successorNode(x: BSTDataNode | null = this._root): BSTDataNode | null {
    let s: BSTDataNode | null;
    if (x?.right) {
      return this.minNode(x.right);
    } else {
      s = x?.prev || null;
    }

    while (s && (x = s.right)) {
      x = s;
      s = s?.prev || null;
    }

    if (!s && (x = x?.right || null)) {
      s = null;
      return s;
    } else return x;
  }

  DFS(callback: (node: BSTDataNode, tree?: BST) => void): BST {
    const S = new DynamicStack(this._root);
    while (!S.isEmpty) {
      const node: BSTDataNode = S.pop();
      callback(node);
      if (node.right) S.push(node.right);
      if (node.left) S.push(node.left);
    }

    return this;
  }

  values() {
    const __values__: any = [];
    this.DFS((node) => __values__.push(node.data));

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
