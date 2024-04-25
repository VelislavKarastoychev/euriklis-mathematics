"use strict";
export class DataNode {
  private _data: any = null;
  private _prev: DataNode | null = null;
  private _next: DataNode | null = null;
  constructor(data: any) {
    this.data = data;
  }
  
  get data(): any {
    return (this as DataNode)._data;
  }

  set data(d: any) {
    (this as DataNode)._data = d;
  }

  get prev (): DataNode | null {
    return (this as DataNode)._prev;
  }

  set prev(node: DataNode | null) {
    (this as DataNode)._prev = node;
  }

  get next(): DataNode | null{
    return (this as DataNode)._next;
  }

  set next(node: DataNode | null) {
    (this as DataNode)._next = node;
  }
}
