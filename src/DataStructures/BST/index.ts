"use strict";
import * as models from "./Models";
import type { Integer } from "../../Types";
import type { BSTNodeValueComparisonCallbackType } from "../../Types";
import { BSTDataNode } from "../DataNode";
import { DynamicStack } from "../Stack";
import { Queue } from "../Queue";
import { max } from "../../utils";

/**
 * This class implements the concept of Binary Search Trees (BSTs)
 * using the BSTDataNode extension of the DataNode model.
 *
 * The implementation employs a dynamic approach, using linked nodes
 * rather than arrays to store the nodes of the BST, providing flexibility
 * and efficiency in memory usage.
 *
 * Additionally, the class uses recursive algorithms for BST operations,
 * which have been found to be more time-efficient compared to loop-based
 * implementations.
 *
 * The class is designed with a generic type parameter to support specialized
 * data structures such as AVL trees and Red-Black Binary Search Trees, making
 * it versatile and extensible for various use cases.
 */
export class BST<T extends BSTDataNode> {
  /** A callback function which is used
   * for the correct classification of
   * the nodes.
   * It compares two nodes to determine their order in the BST.
   */
  public order = models.CompareNodes;
  /** a callback function which is used to
   * find the position of a node with a
   * given value.
   * It compares a node to a value to
   * determine their relative position in the BST.
   */
  public search = models.CompareNodeWithValue;

  /**
   * The root node of the BST.
   * This node serves as the starting
   * point for all BST operations.
   * @type {T | null}
   * @protected
   */
  protected _root: T | null = null;

  /**
   * Indicates whether the BST allows only unique node values.
   * When set to true, inserting a node with an existing ID will replace the existing node.
   * Defaults to false (allowing duplicate IDs).
   */
  protected __unique__: boolean = false;

  /**
   * Creates an instance of the BST class.
   * If data is provided, it sets the root
   * of the BST to a new node containing this data.
   *
   * @param {any} [data] - The initial data to set as
   * the root of the BST.
   * If not provided, the BST is initialized empty.
   */
  constructor(data?: any) {
    this.root = data;
  }

  /**
   * Gets the data of the root node of the BST.
   *
   * @returns {any} The data of the root node, or null if the BST is empty.
   */
  get root(): any {
    return this._root?.data || null;
  }

  /**
   * Sets the root of the BST to a new node
   * containing the provided data.
   * If no data is provided, the root is not changed.
   *
   * @param {any} data - The data to set as the root
   * of the BST. If not provided, the root remains unchanged.
   */
  set root(data: any) {
    if (data) {
      this._root = new BSTDataNode(data) as T;
    }
  }

  /**
   * Gets the root node of the BST.
   *
   * @returns {T | null} The root node
   * of the BST, or null if the BST is empty.
   */
  get rootNode(): T | null {
    return this._root as T;
  }

  /**
   * Sets the root node of the BST to the provided node.
   *
   * @param {T} node - The node to set as the root of the BST.
   *
   * @remarks
   * Be cautious when using the `rootNode` setter, as directly setting the root node can bypass
   * certain invariants or validations that might be enforced by other methods in the class.
   */
  set rootNode(node: T) {
    this._root = node;
  }

  /**
   * Checks if the BST is empty.
   *
   * @returns {boolean} True if the BST is empty, false otherwise.
   */
  get isEmpty(): boolean {
    return !this._root;
  }

  /**
   * Returns the number of nodes in the BST.
   *
   * @returns {Integer} The size of the BST, i.e., the number of nodes.
   */
  get size(): Integer {
    let s: Integer = 0;
    this.BFS((_) => s++);

    return s;
  }

  /**
   * @returns{boolean} If True no unique records are allowed,
   * otherwise the duplicate records according to the order
   * callback are allowed.
   */
  get unique(): boolean {
    return this.__unique__;
  }

  /**
   * Sets the ability of the BST to contain unique items.
   */
  set unique(isUnique: boolean) {
    this.__unique__ = isUnique;
  }

  /**
   * Calculates the height of the tree from the given node.
   * The height is the number of edges on the longest path from the node to a leaf.
   *
   * @param {T | null} [node=this._root] - The node from which to calculate the height. Defaults to the root node.
   * @returns {Integer} The height of the tree from the given node.
   */
  height(node: T | null = this._root): Integer {
    if (!node) return 0;
    return 1 +
      max(
        this.height(node.left as T | null),
        this.height(node.right as T | null),
      );
  }

  /**
   * Cleans the Binary Search Tree by resetting its root node to null
   * and clearing the callback functions used for node comparison and search.
   *
   * @returns {BST<T>} The instance of the BST after cleaning.
   */
  clean(): BST<T> {
    this._root = null;
    this.order = models.CompareNodes;
    this.search = models.CompareNodeWithValue;

    return this;
  }

  /**
   * Creates a deep copy of the Binary Search Tree.
   *
   * @returns {BST<T>} A new instance of BST
   * containing copies of all nodes with the
   * same order and search criteria as the
   * original tree.
   */
  copy(): BST<T> {
    const tree = new BST();
    tree.order = this.order;
    tree.search = this.search;
    this.BFS((node) => {
      tree.insert(node?.data, node?.id);
    });

    return tree as BST<T>;
  }

  /**
   * Checks if the current Binary Search Tree is
   * identical to another tree.
   *
   * @param {BST<T>} tree - The tree to compare with.
   * @returns {boolean} True if both trees have
   * identical structures and node values, false otherwise.
   */
  isSame(tree: BST<T>): boolean {
    const r1 = this._root,
      r2 = tree._root,
      S1 = new DynamicStack(r1),
      S2 = new DynamicStack(r2);

    if (!S1.isEmpty && !S2.isEmpty) return models.IsNodeSame(S1, S2);

    return false;
  }

  /**
   * Inserts a new node with the provided data
   * into the Binary Search Tree.
   * If data is object and contains an 'id' property,
   * it can optionally be used as the node's ID.
   *
   * @param {any} data The data to be inserted into the tree.
   * @param {string} [id] Optional ID for the node. If not
   * provided, 'data.id' will be used if available.
   * @returns {BST<T>} The updated Binary Search Tree after insertion.
   */
  insert(data: any, id?: string): BST<T> {
    if (data?.id) id = data.id;
    const node = new BSTDataNode(data);
    models.InsertNodeInBST(this, node, id);

    return this;
  }

  /**
   * Inserts multiple nodes into the Binary Search Tree
   * from an array of data.
   * Each element in the array will be inserted as a
   * separate node.
   *
   * @param {any[]} data An array of data elements to
   * be inserted into the tree.
   * @returns {BST<T>} The updated Binary Search Tree
   * after all insertions.
   */
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

  /**
   * Deletes a node with the specified value
   * from the Binary Search Tree.
   *
   * @param {any} value The value to search for
   * and delete from the tree.
   * @param {BSTNodeValueComparisonCallbackType} [callback=this.search] Optional
   * callback function used to compare node values. Defaults to the search callback of the tree.
   * @returns {any | null} The data of the deleted node if found and deleted; otherwise, null.
   */
  delete(
    value: any,
    callback: BSTNodeValueComparisonCallbackType = this.search,
  ): any | null {
    const node = models.BinarySearch(this._root, value, callback);
    models.DeleteNodeInBST(node, this);
    // It is no needed to delete the node connection
    // because the garbadge collector will delete it.
    return node?.data || null;
  }

  /**
   * Deletes a specific node from the Binary Search Tree
   * using a callback function to find the node.
   *
   * @param {(node: T, tree?: BST<T>) => -1 | 0 | 1} callback - A
   * callback function that returns
   *        -1 if the node should be searched in the left subtree,
   *         0 if the node is found,
   *         1 if the node should be searched in the right subtree.
   * @returns {T | null} The deleted node if found and deleted; otherwise, null.
   */
  deleteNode(
    callback: (node: T, tree?: BST<T>) => -1 | 0 | 1,
  ): T | null {
    const node = this.binarySearchNode(callback);
    if (!node) return null;
    models.DeleteNodeInBST(node, this);
    // delete the connection of the node because it is deleted.
    node.prev = null;
    node.right = null;
    node.left = null;

    return node;
  }

  /**
   * Searches for a node in the Binary Search Tree
   * based on the given value.
   *
   * @param {any} value The value to search for in the tree nodes.
   * @param {BSTNodeValueComparisonCallbackType} [callback=this.search] Optional
   * callback function to determine the comparison logic between nodes.
   * @returns {any | null} The data of the node if found; otherwise, null.
   */
  binarySearch(
    value: any,
    callback: BSTNodeValueComparisonCallbackType = this.search,
  ): any | null {
    return models.BinarySearch(this._root, value, callback)?.data || null;
  }

  /**
   * Searches for a node in the Binary Search Tree
   * based on the given callback function.
   *
   * @param {(node: T, tree?: BST<T>) => -1 | 0 | 1} callback - The
   * callback function that determines the comparison logic between nodes.
   * @returns {T | null} The node matching the callback condition
   * if found; otherwise, null.
   */
  binarySearchNode(
    callback: (node: T, tree?: BST<T>) => -1 | 0 | 1,
  ): T | null {
    return models.BinarySearchNode(this, this._root, callback);
  }

  /**
   * Finds the minimum value in the Binary Search Tree
   * starting from the specified node.
   *
   * @param {T | null} x The starting node to search from.
   * Defaults to the root of the tree.
   * @returns {any} The minimum value found, or null if the tree is empty.
   */
  min(x: T | null = this._root): any {
    // shallow copy of x!
    let y: T | null = x;
    if (y?.left) return this.min(y.left as T);

    return y?.data || null;
  }

  /**
   * Finds the node containing the minimum value in the
   * Binary Search Tree starting from the specified node.
   *
   * @param {T | null} x The starting node to search from.
   * Defaults to the root of the tree.
   * @returns {T | null} The node containing the minimum value,
   * or null if the tree is empty.
   */
  minNode(x: T | null = this._root): T | null {
    let y: T | null = x;
    if (y?.left) return this.minNode(y.left as T);
    return y;
  }

  /**
   * Finds the maximum value in the Binary Search Tree
   * starting from the specified node.
   *
   * @param {T | null} x The starting node to search from.
   * Defaults to the root of the tree.
   * @returns {any} The maximum value found in the tree,
   * or null if the tree is empty.
   */
  max(x: T | null = this._root): any {
    let y: T | null = x;
    if (y?.right) return this.max(y.right as T);
    return y?.data || null;
  }

  /**
   * Finds the node with the maximum value in the Binary Search Tree
   * starting from the specified node.
   *
   * @param {T | null} x The starting node to search from. Defaults to
   * the root of the tree.
   * @returns {T | null} The node containing the maximum value found
   * in the tree, or null if the tree is empty.
   */
  maxNode(x: T | null = this._root): T | null {
    let y: T | null = x;
    if (y?.right) return this.maxNode(y.right as T | null);
    return y;
  }

  /**
   * Finds the predecessor value of a given node
   * in the Binary Search Tree.
   *
   * @param {T | null} x The node for which to find
   * the predecessor. Defaults to the root of the tree.
   * @returns {any | null} The predecessor value of the
   * given node, or null if the node is not found.
   */
  predecessor(x: T | null = this._root): any | null {
    if (x?.left) return this.max(x.left as T);
    else return models.LeftBackward(x)?.data || null;
  }

  /**
   * Finds the predecessor node of a given node
   * in the Binary Search Tree.
   *
   * @param {T | null} x - The node for which to find
   * kkkkkkthe predecessor node.
   * Defaults to the root of the tree.
   * @returns {T | null} The predecessor node of the given
   * node, or null if the node is not found.
   */
  predecessorNode(x: T | null = this._root): T | null {
    if (x?.left) return this.maxNode(x.left as T);
    else return models.LeftBackward(x) as T | null;
  }

  /**
   * Finds the successor value of a given node in the
   * Binary Search Tree.
   *
   * @param {T | null} x The node for which to find the
   * successor value. Defaults to the root of the tree.
   * @returns {any} The successor value of the given node,
   * or null if the node is not found.
   */
  successor(x: T | null = this._root): any {
    if (x?.right) return this.min(x.right as T);
    else return models.RightBackward(x)?.data || null;
  }

  /**
   * Finds the successor node of a given node in the
   * Binary Search Tree.
   *
   * @param {T | null} x - The node for which to find
   * the successor node. Defaults to the root of the tree.
   * @returns {T | null} The successor node of the given node,
   * or null if the node is not found.
   */
  successorNode(x: T | null = this._root): T | null {
    if (x?.right) return this.minNode(x.right as T | null);
    else return models.RightBackward(x) as T | null;
  }

  /**
   * Creates a new Binary Search Tree containing nodes
   * that satisfy the provided condition.
   *
   * @param {Function} callback - A function that tests each
   * node in the Binary Search Tree. Returns true to include
   * the node, false otherwise.
   * @returns {BST<T>} A new Binary Search Tree containing nodes
   * that satisfy the callback condition.
   */
  filter(callback: (node: T | null, tree?: BST<T>) => boolean): BST<T> {
    const tree = new BST();
    tree.order = this.order;

    // Perform Breadth-First Search (BFS) to traverse the tree
    this.BFS((node, bst) => {
      if (callback(node as T, bst)) tree.insert(node?.data);
    });

    return tree as BST<T>;
  }

  /**
   * Performs Breadth-First Search (BFS) traversal
   * on the Binary Search Tree.
   * Executes the provided callback function on each
   * node in BFS order.
   *
   * @param {Function} callback A function to execute
   * on each node. Receives the node and the current BST instance.
   * @returns {BST<T>} The Binary Search Tree instance after BFS traversal.
   */
  BFS(callback: (node: T, tree: BST<T>) => void): BST<T> {
    // Initialize a queue with the root node
    const Q = new Queue(this._root);
    // Call BFS implementation with the queue and callback
    models.CallBFS(this, Q, callback);

    // Return the BST instance for method chaining
    return this;
  }

  /**
   * Performs Depth-First Search (DFS) traversal
   * on the Binary Search Tree.
   * Executes the provided callback function on
   * each node in DFS order.
   *
   * @param {Function} callback A function to execute
   * on each node. Receives the node and the current BST instance.
   * @returns {BST<T>} The Binary Search Tree instance after DFS traversal.
   */
  DFS(callback: (node: T, tree: BST<T>) => void): BST<T> {
    // Initialize a stack with the root node
    const S = new DynamicStack(this._root);
    // call the DFS implementation with the stack and the callback.
    models.CallDFS(this, S, callback);

    // Return the BST instance for method chaining.
    return this;
  }

  /**
   * Performs a single right rotation on the specified node.
   * This operation is typically used to rebalance an AVL tree.
   *
   * @param {T | null} node - The node on which to perform the right rotation.
   * @returns {BST<T>} The updated tree after the rotation.
   */
  singleRightRotation(node: T | null): BST<T> {
    if (!node!) return this;
    models.SingleRightRotation(node, this);

    return this;
  }

  /**
   * Performs a single left rotation on the specified node.
   * This operation is typically used to rebalance an AVL tree.
   *
   * @param {T | null} node - The node on which to perform the left rotation.
   * @returns {BST<T>} The updated tree after the rotation.
   */
  singleLeftRotation(node: T | null): BST<T> {
    if (!node) return this;
    models.SingleLeftRotation(node, this);

    return this;
  }

  /**
   * Performs a double left-right rotation on the specified node.
   * This operation is typically used to rebalance an AVL tree when
   * a left-right imbalance is detected.
   *
   * @param {T | null} node - The node on which to perform the double left-right rotation.
   * @returns {BST<T>} The updated tree after the rotation.
   */
  doubleLeftRightRotation(node: T | null): BST<T> {
    if (!node) return this;
    models.DoubleLeftRightRotation(node, this);

    return this;
  }

  /**
   * Performs a double right-left rotation on the specified node.
   * This operation is typically used to rebalance an AVL tree when
   * a right-left imbalance is detected.
   *
   * @param {T} node - The node on which to perform the double right-left rotation.
   * @returns {BST<T>} The updated tree after the rotation.
   */
  doubleRightLeftRotation(node: T): BST<T> {
    if (!node) return this;
    models.DoubleRightLeftRotation(node, this);

    return this;
  }

  /**
   * Converts the Binary Search Tree into an array
   * based on the specified traversal mode.
   * Default traversal mode is Depth-First Search (DFS).
   *
   * @param {"BFS" | "DFS"} mode - The traversal mode to
   * use: "BFS" for Breadth-First Search, "DFS" for
   * Depth-First Search (default: "DFS").
   * @returns {any[]} An array containing the data of all
   * nodes in the BST, based on the specified traversal mode.
   */
  toArray(mode: "BFS" | "DFS" = "DFS"): any[] {
    const __values__: any = [];
    this[mode]((node) => __values__.push(node?.data));

    return __values__;
  }

  /**
   * Prints the structure of the Binary Search Tree
   * starting from the specified node.
   *
   * @param {T | null} node The starting node to begin
   * printing the BST structure (default: this._root).
   * @param {Integer} level The current level of the node
   * in the BST (default: 0).
   * @param {string} prefix The prefix label indicating the
   * position relative to its parent (default: "Root: ").
   * @returns {void}
   */
  print(
    node: T | null = this._root,
    level: Integer = 0,
    prefix: string = "Root: ",
    callback: (node: T, tree?: BST<T>) => any = node => node.id
  ): void {
    if (node === null) {
      return;
    }
    console.log(" ".repeat(level * 2) + prefix + callback(node, this));

    if (node.left) {
      this.print(node.left as T, level + 1, "L--> ", callback(node, this));
    }

    if (node.right) {
      this.print(node.right as T, level + 1, "R--> ", callback(node, this));
    }
  }
}
