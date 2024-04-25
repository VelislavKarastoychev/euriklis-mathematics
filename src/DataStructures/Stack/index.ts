import { Integer } from "../../Matrix/types";
import { DataNode } from "../DataNode";
import * as errors from "./Errors";
import { ifIsNotArrayThrow } from "../Decorators";
/**
 * This class implements the Stack data structure
 * using the idea of the linekd lists. So in each
 * instance of a Stack we have to generate a top.
 * when we push an element in the stack, then the
 * top element change and a reference to the previous
 * node is kept.
 * If the top element is null, then the Stack is empty.
 */
export class Stack {
  private _top: DataNode | null = null;
  private _size: Integer = 0;
  /**
   * @param {any} data - The data which will be staored
   * in the Stack data structure.
   */
  constructor(data: any = undefined) {
    this.push(data);
  }

  /**
   * Gets the last element of the stack but
   * does not deletes it from the stack.
   * @returns {any} returns the last element of
   * the stack without deletion.
   */
  get top(): any {
    return (this._top as DataNode).data;
  }

  /**
   * Pushesh an element in the stack.
   * When an element is pushed in a Stack
   * Data structure, then the top element
   * is set to it.
   */
  push(data: any): void {
    if (typeof data !== "undefined") {
      this._size++;
      if (this._top) {
        const dn = new DataNode(data);
        dn.prev = this._top;
        (this._top as DataNode).next = dn;
        this._top = dn;
      } else this._top = new DataNode(data);
    }
  }

  /**
   * @param{any[]} items - An array of items which
   * will be pushed into the top of the stack.
   * Pushes many items to the Stack.
   */
  @ifIsNotArrayThrow(errors.IncorrectParameterInPushMany)
  pushMany(items: any[]): void {
    const n: Integer = items.length;
    let i: Integer;
    for (i = 0; i < n; i++) this.push(items[i]);
  }

  /**
   * Gets the last / top element of the
   * Stack and removes it from the Stack
   * data structure. Returns the top element.
   * @returns {DataNode}
   */
  pop(): any {
    let data: any;
    if (this._size) {
      this._size--;
      if (!this._size) {
        data = (this._top as DataNode).data;
        this._top = null;
        return data;
      }
      data = (this._top as DataNode).data;
      this._top = (this._top as DataNode).prev;
      (this._top as DataNode).next = null;
      return data;
    }
  }

  get size() {
    return this._size;
  }

  /**
   * Creates a static list from the stack elements
   * and degenerate the stack.
   * @returns {any[]} the elements of the stack as array.
   */
  get list(): any[] {
    const list: any[] = [], n: Integer = this.size;
    let i: Integer;
    for (i = n; i-- > 1;) {
      list[i--] = this.pop();
      list[i] = this.pop();
    }
    if (i === 0) list[0] = this.pop();

    return list;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }
}
