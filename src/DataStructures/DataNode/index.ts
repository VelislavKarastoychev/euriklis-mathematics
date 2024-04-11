"use strict";
export class DataNode {
  private _data = null;
  private _prev = null;
  private _next = null;
  constructor(data: any) {
    this.data = data;
  }
  
  get data(): any {
    return this._data;
  }

  set data(d: any) {
    this._data = d;
  }

  get prev (): DataNode {
    return this._prev;
  }

  set prev(node: DataNode) {
    this._prev = node;
  }

  get next(): DataNode {
    return this._next;
  }

  set next(node: DataNode) {
    this._next = node;
  }
}
