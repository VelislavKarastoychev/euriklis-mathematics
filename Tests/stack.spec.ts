"use strict";
import { Stack } from "../src";
import validator from "@euriklis/validator-ts";

const callStackPushMany = (arg: any) => {
  const stack = new Stack();
  stack.pushMany(arg);
  console.log(stack);
  return stack;
};
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
new validator(stack.pop() === 5)
  .isSame(true)
  .describe("The stack data structure has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. be valid and correctly implemented")
  .test();
const last = stack.pop();
new validator(last)
  .isSame(4)
  .and.bind(
    new validator(stack.pop())
      .isSame(3)
      .and.bind(
        new validator(stack.pop())
          .isSame(2),
      ),
  ).describe(
    "2. remove the last element when the pop method is called and to return it.",
  )
  .test();
new validator(stack.top === 1)
  .describe("3. may return the last element without deletion.")
  .isSame(true)
  .test();
stack.pushMany([1, 2, 3, 4]);
new validator(stack.list)
  .isSame([1, 1, 2, 3, 4])
  .and.bind(
    new validator(stack.isEmpty).isSame(true),
  )
  .describe(
    "4. transform the stack to a static list / array and destroy the stack structure.",
  )
  .test();
stack.pushMany([123, 456, { hello: "world" }]);
new validator(stack.isEmpty)
  .isSame(false)
  .describe("5. checks if the stack is currently empty.")
  .test();
new validator(callStackPushMany)
  .throwsErrorWith("this throws")
  .describe("6. throw error when the argument is not an array of items.")
  .test();
