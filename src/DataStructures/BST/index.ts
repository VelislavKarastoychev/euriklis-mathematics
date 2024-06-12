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
export class BST<T extends BSTDataNode> {
  public order = compareNodes;
  public search = compareNodeWithValue;
  protected _root: T | null = null;

  constructor(data?: any) {
    this.root = data;
  }

  get root(): any {
    return this._root?.data || null;
  }

  set root(data) {
    if (data) {
      this._root = new BSTDataNode(data) as T;
    }
  }

  get rootNode(): T | null {
    return this._root as T;
  }

  set rootNode(node: T) {
    this._root = node;
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
    this.search = compareNodeWithValue;

    return this;
  }

  copy(): BST<T> {
    const tree = new BST();
    tree.order = this.order;
    tree.search = this.search;
    this.BFS((node) => {
      tree.insert(node?.data, node?.id);
    });

    return tree as BST<T>;
  }

  isSame(tree: BST<T>) {
    const r1 = this._root,
      r2 = tree._root,
      S1 = new DynamicStack(r1),
      S2 = new DynamicStack(r2);

    if (!S1.isEmpty && !S2.isEmpty) return models.IsNodeSame(S1, S2);
  }

  insert(data: any, id?: string) {
    if (data?.id) id = data.id;
    models.InsertNodeInBST(this, data, id);

    return this;
  }

  insertMany(data: any[]): BST<T> {
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
      const successor = this.successorNode(node as T) as T;
      if (successor.prev !== node) {
        models.ShiftNodes(this, successor, successor.right as T);
        successor.right = node?.right || null;
        (successor.right as T).prev = successor;
      }
      models.ShiftNodes(this, node, successor);
      if (!node.prev) this._root = successor;
      if (node === node.prev?.left) node.prev.left = successor;
      if (node === node.prev?.right) node.prev.right = successor;
      successor.left = node.left;
      (successor.left as T).prev = successor;
    }

    // It is no needed to delete the node connection
    // because the garbadge collector will delete it.
    return node?.data || null;
  }

  deleteNode(
    callback: (node: T, tree?: BST<T>) => -1 | 0 | 1,
  ): T | null {
    const node = this.binarySearchNode(callback);
    if (!node) return null;
    if (!node.left) models.ShiftNodes(this, node, node?.right);
    else if (!node.right) models.ShiftNodes(this, node, node?.left || null);
    else {
      //  Note that it is possible to run the predecessorNode
      const successor = this.successorNode(node as T) as T;
      if (successor.prev !== node) {
        models.ShiftNodes(this, successor, successor.right as T);
        successor.right = node.right;
        (successor.right as T).prev = successor;
      }
      models.ShiftNodes(this, node, successor);
      successor.left = node.left;
      (successor.left as T).prev = successor;
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
    callback: (node: T, tree?: BST<T>) => -1 | 0 | 1,
  ): T | null {
    return models.BinarySearchNode(this, this._root, callback);
  }

  min(x: T | null = this._root): any {
    // shallow copy of x!
    let y: T | null = x;
    if (y?.left) return this.min(y.left as T);
    return y?.data || null;
  }

  minNode(x: T | null = this._root): T | null {
    let y: T | null = x;
    if (y?.left) return this.minNode(y.left as T);
    return y;
  }

  max(x: T | null = this._root): any {
    let y: T | null = x;
    if (y?.right) return this.max(y.right as T);
    return y?.data || null;
  }

  maxNode(x: T | null = this._root): T | null {
    let y: T | null = x;
    if (y?.right) return this.maxNode(y.right as T | null);
    return y;
  }

  predecessor(x: T | null = this._root): any | null {
    if (x?.left) return this.max(x.left as T);
    else return models.LeftBackward(x)?.data || null;
  }

  predecessorNode(x: T | null = this._root): T | null {
    if (x?.left) return this.maxNode(x.left as T);
    else return models.LeftBackward(x) as T | null;
  }

  successor(x: T | null = this._root): any {
    if (x?.right) return this.min(x.right as T);
    else return models.RightBackward(x)?.data || null;
  }

  successorNode(x: T | null = this._root): T | null {
    if (x?.right) return this.minNode(x.right as T | null);
    else return models.RightBackward(x) as T | null;
  }

  filter(callback: (node: T | null, tree?: BST<T>) => boolean): BST<T> {
    const tree = new BST();
    tree.order = this.order;
    this.BFS((node, bst) => {
      if (callback(node as T, bst)) tree.insert(node?.data);
    });

    return tree as BST<T>;
  }

  BFS(callback: (node: T | null, tree: BST<T>) => void): BST<T> {
    const Q = new Queue(this._root);
    models.CallBFS(this, Q, callback);

    return this;
  }

  DFS(callback: (node: T | null, tree: BST<T>) => void): BST<T> {
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
    node: T | null = this._root,
    level: Integer = 0,
    prefix: string = "Root: ",
  ) {
    if (node === null) {
      return;
    }
    console.log(" ".repeat(level * 2) + prefix + node.data);

    if (node.left) {
      this.print(node.left as T, level + 1, "L--> ");
    }

    if (node.right) {
      this.print(node.right as T, level + 1, "R--> ");
    }
  }
}
