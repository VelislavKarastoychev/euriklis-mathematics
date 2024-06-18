"use strict";

import type { Integer } from "../../Types";
import { AVLTree } from "../AVL";
import { LinkedDataNode } from "../DataNode";
import * as errors from "../Errors";

/**
 * This class implements a doubly linked list
 * data structure. The implementation of the
 * DoublyLinkedList instance was largely inspired
 * by the work of programmer Georgi Stoychev, with
 * the exception of the concept of limiting the
 * list size and storing the data in AVL trees,
 * which are my own contributions.
 *
 * I chose to store the values in a BST (Binary Search Tree)
 * structure, specifically AVL trees, instead of using a
 * Map (hash table structure) for the following reasons:
 * 1. BSTs, and AVL trees in particular, are dynamic structures
 *    that offer relatively fast query operations.
 * 2. As a dynamic structure, BSTs help in avoiding the
 *    concentration of large memory blocks, thereby achieving
 *    better memory balancing.
 * 3. BSTs have predictable time complexity for operations,
 *    whereas hash tables can have amortized complexity in
 *    collision cases.
 * 4. The implementation of AVL trees is open source, providing
 *    me with full control over their manipulation, unlike the
 *    Map structure which is internally implemented in JavaScript.
 */
/**
 * @class DoublyLinkedList
 * @classdesc This class represents a doubly linked list
 * with optional size limitation.
 */
export class DoublyLinkedList {
  private _size: Integer = Infinity;
  private _head: LinkedDataNode | null = null;
  private _top: LinkedDataNode | null = null;
  private _currentSize = 0;
  private _map = new AVLTree();

  /**
   * Creates an instance of DoublyLinkedList.
   * @param {any} [data] - The initial data to add to the list.
   * @param {Integer} [size=Infinity] - The maximum size of the list.
   */
  constructor(data?: any, size: Integer = Infinity) {
    this.size = size;
    this.addLast(data);
  }

  /**
   * Gets the maximum size of the list.
   * @returns {Integer}
   */
  get size(): Integer {
    return this._size;
  }

  /**
   * Sets the maximum size of the list.
   * @type {Integer}
   */
  set size(s: Integer) {
    this._size = s;
  }

  /**
   * Gets the data of the head node.
   * @returns {any}
   */
  get head(): any {
    return this._head?.data || null;
  }

  /**
   * Gets the data of the top (last) node.
   * @returns {any}
   */
  get top(): any {
    return this._top?.data || null;
  }

  /**
   * Gets the current length of the list.
   * @returns {Integer}
   */
  get length(): Integer {
    return this._currentSize;
  }

  /**
   * Checks if the list is empty.
   * @returns {boolean}
   */
  get isEmpty(): boolean {
    return this.length === 0 && this._head === this._top && this._head === null;
  }

  /**
   * Adds a node with the given data to the end of the list.
   * @param {any} data - The data to add.
   * @returns {DoublyLinkedList} The updated list.
   */
  addLast(data: any): DoublyLinkedList {
    if (data) {
      if (this._size < this._currentSize + 1) {
        errors.StackOverflow("DoublyLinkedList addLast")();
      }
      const node: LinkedDataNode = new LinkedDataNode(data);
      if (this._head) {
        (this._top as LinkedDataNode).next = node;
        node.prev = this._top;
      } else this._head = node;

      this._top = node;
      this._currentSize++;
      this._map.insert(node)
    }

    return this;
  }

  /**
   * Adds an existing node to the end of the list.
   * @private
   * @param {LinkedDataNode} node - The node to add.
   */
  private _addLastNode(node: LinkedDataNode) {
    if (node) {
      if (this._size < this._currentSize + 1) {
        errors.StackOverflow("DoublyLinkedList addLastNode")();
      }
      if (this._head) {
        (this._top as LinkedDataNode).next = node;
        node.prev = this._top;
      } else this._head = node;

      this._top = node;
      this._map.insert(node)
      this._currentSize++;
    }
  }

  /**
   * Removes the last node from the list.
   * @returns {any} The data of the removed node.
   */
  removeLast(): DoublyLinkedList {
    if (!this._head) {
      errors.StackUnderflow("DoublyLinkedList removeLast")();
    }
    const data = this.top;
    this._map.delete(this._top?.id);
    if (this._head === this._top) {
      this._head = null;
      this._top = null;
    } else {
      this._top = (this._top as LinkedDataNode).prev;
      (this._top as LinkedDataNode).next = null;
    }
    this._currentSize--;

    return data;
  }

  /**
   * Removes the first node from the list.
   * @returns {any} The data of the removed node.
   */
  removeFirst(): any {
    if (!this._head) {
      errors.StackUnderflow("DoublyLinkedList removeFirst")();
    }
  
    const data = (this._head as LinkedDataNode)?.data;
    this._map.delete(this._head?.id);
    if (this._head === this._top) {
      this._head = null;
      this._top = null;
    } else {
      this._head = (this._head as LinkedDataNode)?.next;
      (this._head as LinkedDataNode).prev = null;
    }
    this._currentSize--;

    return data;
  }

  /**
   * Removes a node by its ID.
   * @param {string} id - The ID of the node to remove.
   * @returns {any} The data of the removed node.
   */
  remove(id: string): any {
    const node: LinkedDataNode | null = this._findNodeById(id);
    if (node) {
      this._map.delete(node.id);
      if ((this._head as LinkedDataNode).id === id) {
        this.removeFirst();
      } else if ((this._top as LinkedDataNode).id === id) {
        this.removeLast();
      } else {
        ((node as LinkedDataNode).next as LinkedDataNode).prev = node.prev;
        ((node as LinkedDataNode).prev as LinkedDataNode).next =
          (node as LinkedDataNode).next;
      }

      node.prev = null;
      node.next = null;
      this._currentSize--;

      return node.data;
    }
  }

  /**
   * Inserts a node with the given data after the node with the specified ID.
   * @param {string} id - The ID of the node to insert after.
   * @param {any} data - The data to insert.
   * @returns {DoublyLinkedList} The updated list.
   */
  insertAfter(id: string, data: any): DoublyLinkedList {
    const node = this._findNodeById(id);
    const newNode: LinkedDataNode | null = new LinkedDataNode(data);
    if (node) {
      if (this._size < this._currentSize + 1) {
        errors.StackOverflow("DoublyLinkedList insertAfter")();
      }
      newNode.prev = node;
      newNode.next = node.next;
      if (node === this._top) {
        this._top = newNode;
      } else {
        (node.next as LinkedDataNode).prev = newNode;
      }

      node.next = newNode;
      this._map.insert(newNode);
      this._currentSize++;
    }

    return this;
  }

  /**
   * Inserts a node with the given data before the node with the specified ID.
   * @param {string} id - The ID of the node to insert before.
   * @param {any} data - The data to insert.
   * @returns {DoublyLinkedList} The updated list.
   */
  insertBefore(id: string, data: any): DoublyLinkedList {
    const node: LinkedDataNode | null = this._findNodeById(id);
    const newNode = new LinkedDataNode(data);
    if (node) {
      if (this._size < this._currentSize + 1) {
        errors.StackOverflow("DoublyLinkedList insertBefore")();
      }
      newNode.prev = node.prev;
      newNode.next = node;

      if (node === this._head) {
        this._head = newNode;
      } else {
        (node.prev as LinkedDataNode).next = newNode;
      }

      node.prev = newNode;
      this._map.insert(newNode);
      this._currentSize++;
    }

    return this;
  }

  /**
   * Returns a map of all node values, keyed by their IDs.
   * @returns {Map<string, any>} The map of node values.
   */
  values(): Map<string, any> {
    let pointer = this._head;
    const values = new Map();
    while (pointer) {
      values.set(pointer.id, pointer.data);
      pointer = pointer.next;
    }

    return values;
  }

  /**
   * Checks if a node with the specified ID exists in the list.
   * @param {string} id - The ID to check for.
   * @returns {boolean} True if the node exists, otherwise false.
   */
  has(id: string): boolean {
    return this._findNodeById(id) !== null;
  }

  /**
   * Traverses the list, applying the given callback to each node.
   * @param {function} callback - The function to apply to each node.
   * @param {boolean} [inversed=false] - Whether to traverse in reverse order.
   * @returns {DoublyLinkedList} The traversed list.
   */
  traverse(
    callback: (d: any, id?: string, list?: DoublyLinkedList) => any,
    inversed: boolean = false,
  ): DoublyLinkedList {
    let data: any,
      id: string,
      pointer: LinkedDataNode | null = inversed ? this._top : this._head;
    while (pointer) {
      data = pointer.data;
      id = pointer.id;
      callback(data, id, this);
      pointer = inversed ? pointer.prev : pointer.next;
    }

    return this;
  }

  /**
   * Filters the list, returning a new list with nodes that match the given callback.
   * @param {function} callback - The function to apply to each node.
   * @param {boolean} [inversed=false] - Whether to traverse in reverse order.
   * @returns {DoublyLinkedList} The filtered list.
   */
  filter(
    callback: (d: any, id?: string, list?: DoublyLinkedList) => boolean,
    inversed: boolean = false,
  ): DoublyLinkedList {
    const list = new DoublyLinkedList();
    let data: any,
      id: string,
      pointer: LinkedDataNode | null = inversed ? this._top : this._head;
    while (pointer) {
      data = pointer.data;
      id = pointer.id;
      if (callback(data, id, this)) {
        list.addLast(data);
      }
      pointer = inversed ? pointer.prev : pointer.next;
    }

    return list;
  }

  /**
   * Creates a copy of the list.
   * @param {boolean} [inversed=false] - Whether to traverse in reverse order.
   * @returns {DoublyLinkedList} The copied list.
   */
  copy(inversed: boolean = false): DoublyLinkedList {
    const DLL = new DoublyLinkedList();
    DLL.size = this.size;
    let pointer: LinkedDataNode | null = inversed ? this._top : this._head;
    while (pointer) {
      const node = new LinkedDataNode(pointer.data);
      node.id = pointer.id;
      DLL._addLastNode(node);
      pointer = inversed ? pointer.prev : pointer.next;
    }

    return DLL;
  }

  /**
   * Checks if every node in the list satisfies the given callback.
   * @param {function} callback - The function to apply to each node.
   * @returns {boolean} True if all nodes satisfy the callback, otherwise false.
   */
  every(
    callback: (d: any, id?: string, list?: DoublyLinkedList) => boolean,
  ): boolean {
    let answer: boolean = true,
      pointer: LinkedDataNode | null = this._head,
      data: any,
      id: string;
    while (pointer) {
      data = pointer.data;
      id = pointer.id;
      if (!callback(data, id, this)) {
        answer = false;
        break;
      }
      pointer = pointer.next;
    }

    return answer;
  }

  /**
   * Checks if any node in the list satisfies the given callback.
   * @param {function} callback - The function to apply to each node.
   * @returns {boolean} True if any node satisfies the callback, otherwise false.
   */
  any(
    callback: (d: any, id?: string, list?: DoublyLinkedList) => boolean,
  ): boolean {
    let answer: boolean = false,
      pointer: LinkedDataNode | null = this._head,
      data: any,
      id: string;
    while (pointer) {
      data = pointer.data;
      id = pointer.id;
      if (callback(data, id, this)) {
        answer = true;
        break;
      }
      pointer = pointer.next;
    }

    return answer;
  }

  /**
   * Clears the list.
   * @returns {DoublyLinkedList} The cleared list.
   */
  clean(): DoublyLinkedList {
    this._size = Infinity;
    this._currentSize = 0;
    this._head = null;
    this._top = null;

    return this;
  }

  /**
   * Merges another doubly linked list into this list.
   * @param {DoublyLinkedList} list - The list to merge.
   * @returns {DoublyLinkedList} The merged list.
   */
  merge(list: DoublyLinkedList): DoublyLinkedList {
    if (!list.isEmpty) {
      this._size = this._size + list._size;
      if (this.isEmpty) {
        this._head = list._head;
        this._top = list._top;
      } else {
        const top: LinkedDataNode = this._top as LinkedDataNode;
        top.next = list._head;
        (top.next as LinkedDataNode).prev = this._top;
        this._top = list._top;
      }
      this._currentSize += list._currentSize;
    }

    return this;
  }
  /**
   * Finds a node by its ID.
   * @private
   * @param {string} id - The ID of the node to find.
   * @returns {LinkedDataNode | null} The found node or null if not found.
   */
  private _findNodeById(id: string): LinkedDataNode | null {
    let node: LinkedDataNode | null = this._map.binarySearch(id) as LinkedDataNode | null;
  //   let currentNode: LinkedDataNode | null = this._head;
  //   while (currentNode) {
  //     if (currentNode.id === id) {
  //       node = currentNode;
  //       break;
  //     } else currentNode = currentNode.next;
  //   }
  //
    return node;
  }
}
