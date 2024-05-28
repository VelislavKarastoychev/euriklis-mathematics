"use strict";
export class DataNode<T extends DataNode<any>> {
  protected _data: any = null;
  protected _prev: T | null = null;
  constructor(data?: any) {
    this.data = data;
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
