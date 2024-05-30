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
    }

    return this;
  }

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
      this._currentSize++;
    }
  }

  removeLast(): DoublyLinkedList {
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

  removeFirst(): any {
    if (!this._head) {
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

  remove(id: string): any {
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
      this._currentSize++;
    }

    return this;
  }

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
      this._currentSize++;
    }

    return this;
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

  has(id: string): boolean {
    return this._findNodeById(id) !== null;
  }

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

  copy(inversed: boolean = false) {
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

  clean() {
    this._size = Infinity;
    this._currentSize = 0;
    this._head = null;
    this._top = null;

    return this;
  }

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

  private _findNodeById(id: string): LinkedDataNode | null {
    let node: LinkedDataNode | null = null;
    let currentNode: LinkedDataNode | null = this._head;
    while (currentNode) {
      if (currentNode.id === id) {
        node = currentNode;
        break;
      } else currentNode = currentNode.next;
    }

    return node;
  }
}
