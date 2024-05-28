"use strict";

import { v4 as uuidv4 } from "uuid";

import type { Integer } from "../../Matrix/types";

export class DataNode<T extends DataNode<any>> {
  protected _id: string = "";
  protected _data: any = null;
  protected _prev: T | null = null;
  constructor(data?: any) {
    this.data = data;
    if (data?.id && !this.id) this.id = data.id;
    else if (typeof data === "string" || typeof data === "number") {
      this.id = data + "";
    } else this.id = uuidv4();
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
  get data(): any {
    return this._data;
  }

  set data(d: any) {
    if (typeof d !== "undefined") this._data = d;
  }

  get prev(): T | null {
    return this._prev;
  }

  set prev(node: T | null) {
    this._prev = node;
  }
}

export class LinkedDataNode extends DataNode<LinkedDataNode> {
  protected _next: LinkedDataNode | null = null;
  constructor(data: any) {
    super(data);
  }
  get next(): LinkedDataNode | null {
    return (this as LinkedDataNode)._next;
  }

  set next(node: LinkedDataNode | null) {
    (this as LinkedDataNode)._next = node;
  }
}

