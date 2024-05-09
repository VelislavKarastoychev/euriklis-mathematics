"use strict";
import { DynamicStack } from "../src/DataStructures";
import validator from "@euriklis/validator-ts";
import { Integer } from "../src/Matrix/types";

new validator(new DynamicStack())
  .describe(
    "The DynamicStack type is an instance which represents the Stack data structure by nodes and has to:",
  )
  .test({ title: true, error: "red", success: "green" });

let DStack = new DynamicStack();
for (let i: Integer = 0; i < 1e6; i++) DStack.push(Math.random());
new validator(DStack.size)
  .describe("1. return the correct size of the stack.")
  .isSame(1e6)
  .test();
DStack = new DynamicStack();
DStack.push(10);
DStack.push(21);
DStack.push(22);
DStack.push(7);
new validator(DStack.list)
  .isSame([10, 21, 22, 7])
  .describe("2. push correctly the order of the elements.")
  .test();
DStack.pushMany([10, 21, 22, 7, 15.0001, 18]);
new validator(DStack.filter((el) => el > 15).list)
  .isSame([21, 22, 15.0001, 18])
  .describe(
    "3. provide a correct method for filtering through the elements of the Stack which returns a DynamicStack.",
  )
  .test();
DStack = new DynamicStack();
const data = [{ name: "v0", attributes: { attention: 2 }, value: 1 }];
DStack.pushMany(data);
new validator(DStack.list)
  .isSame(data)
  .describe(
    "4. provide a method for pushing more than one elements in the stack.",
  )
  .test();

DStack = new DynamicStack().pushMany(
  Array.from({ length: 10 }).map((_, i: Integer) => i + 1),
);

new validator(DStack.popMany(5))
  .isSame([10, 9, 8, 7, 6])
  .and.bind(
    new validator(DStack.size).isSame(5).on(false, (v) => console.log(v.value)),
  )
  .describe("5. provide a method for pop of many elements.")
  .test();

DStack = new DynamicStack();
DStack.push(Math.random()).pop();
new validator(DStack.isEmpty)
  .isSame(true)
  .describe("6. provide a method for checking if the Stack is empty.")
  .test();
DStack = new DynamicStack();
DStack.pushMany(
  Array.from({ length: 10 }).map((_, i: Integer) => ({
    item: Math.random(),
    index: i,
  })),
);
new validator(
  DStack.traverse((el: { item: number; index: Integer }, stack) =>
    el.index > 5 ? stack.pop() : null
  ).size,
)
  .isSame(6)
  .describe(
    "7. provide a method for traversion through the elements of the stack.",
  )
  .test();

DStack = new DynamicStack()
  .pushMany(Array.from({ length: 100 }).map(Math.random));

new validator(DStack.popAndTraverse((_, stack) => stack.isEmpty))
  .isNumberArray.and.hasLength(100)
  .and.bind(new validator(DStack.isEmpty).isSame(true))
  .describe(
    "8. provide a method for pop and traverse through the elements of a stack.",
  )
  .test();

DStack = new DynamicStack();
DStack.pushMany(Array.from({ length: 100 }).map(Math.random));

new validator(
  DStack.loop((_, stack) => {
    stack.pop();
    return !stack.isEmpty;
  }, 11).size,
).isSame(89)
  .on(false, (v) => console.log(v.value))
  .describe(
    "9. provide a method for loop through the elements of the stack with given number of iterations or a callback function.",
  ).test();

DStack = new DynamicStack().pushMany(
  Array.from({ length: 100 }).map(Math.random),
);
const cDStack = DStack.copy();
cDStack.popMany(10);
new validator(cDStack.size)
  .isSame(90)
  .on(false, (v) => console.log(v.value))
  .and.bind(
    new validator(DStack.size).isSame(100).on(
      false,
      (v) => console.log(v.value),
    ),
  )
  .describe("10. provide a method for coping of the stack.")
  .test();

DStack.clear();
cDStack.clear();
new validator(DStack.isEmpty && cDStack.isEmpty)
  .isSame(true)
  .describe("11. provide a method for clearing of the Stack elements.")
  .test();

DStack.append((i) => ({ name: `v${i + 1}`, value: 1 }), 10);
new validator(DStack.size)
  .isSame(10)
  .and.bind(
    new validator(DStack.list).isSame(
      Array.from({ length: 10 }).map((_, i: Integer) => ({
        name: `v${i + 1}`,
        value: 1,
      })),
    ),
  ).describe("12. provide a method for appending of elements.")
  .test();


