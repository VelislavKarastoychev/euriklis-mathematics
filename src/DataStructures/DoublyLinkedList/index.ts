"use strict";

import type { Integer } from "../../Matrix/types";
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
export class DoublyLinkedList {
  private _size: Integer = Infinity;
  private _head: LinkedDataNode | null = null;
  private _top: LinkedDataNode | null = null;
  private _currentSize = 0;
  constructor(data?: any, size: Integer = Infinity) {
    this.size = size;
    this.addLast(data);
  }

  get size(): Integer {
    return this._size;
  }

  set size(s: Integer) {
    this._size = s;
  }

  get head(): any {
    return this._head?.data || null;
  }

  get top(): any {
    return this._top?.data || null;
  }

  get length(): Integer {
    return this._currentSize;
  }

  get isEmpty(): boolean {
    return this.length === 0 && this._head === this._top && this._head === null;
  }

  addLast(data: any) {
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
    }
  }

  removeLast() {
    if (!this._head) {
      errors.StackUnderflow("DoublyLinkedList removeLast")();
    }
    const data = this.top;

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

  removeFirst() {
    if (this._head) {
      errors.StackUnderflow("DoublyLinkedList removeFirst")();
    }

    const data = (this._head as LinkedDataNode)?.data;
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

  remove(id: string) {
    const node: LinkedDataNode | null = this._findNodeById(id);
    if (node) {
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

  insertAfter(id: string, data: any) {
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
      this._currentSize++;
    }
  }

  insertBefore(id: string, data: any) {
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
      this._currentSize++;
    }
  }

  values(): Map<string, any> {
    let pointer = this._head;
    const values = new Map();
    while (pointer) {
      values.set(pointer.id, pointer.data);
      pointer = pointer.next;
    }

    return values;
  }

  private _findNodeById(id: string): LinkedDataNode | null {
    let node: LinkedDataNode | null = null;
    let currentNode: LinkedDataNode | null = this._head as LinkedDataNode;
    while (currentNode) {
      if (currentNode.id === id) {
        node = currentNode;
        break;
      } else currentNode = currentNode.next;
    }

    return node;
  }
}
