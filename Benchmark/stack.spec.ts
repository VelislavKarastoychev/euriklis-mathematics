"use strict";
import { dimensions, startPerformanceTest } from "./utils";
import { DynamicStack, StaticStack } from "../src";
import type { Integer } from "../src/Matrix/types";
(async () => {
  const SStack = new StaticStack();
  const DStack = new DynamicStack();
  const condition = (SStack.pop() === DStack.pop()) &&
    (SStack.push(1),
      DStack.push(0.99999999999999998),
      ([SStack.pop(), DStack.pop()].every((el) => el === 1))) &&
    (SStack.size === 0 && DStack.size === 0);
  const SStackPushTest = (_: any) => {
    SStack.clear();
    for (let i: Integer = 0; i < 6e5; i++) SStack.push(Math.random());
    return SStack;
  };

  const items = Array.from({ length: 6e5 }).map(Math.random);
  SStack.pushMany(items);
  const SStackPopTest = (_: any) => {
    for (let i: Integer = 0; i < 6e3; i++) SStack.pop();
    return SStack;
  };

  const DStackPushTest = (_: any) => {
    SStack.clear();
    for (let i: Integer = 0; i < 6e5; i++) DStack.push(Math.random());
    return DStack;
  };
  DStack.pushMany(items);
  const DStackPopTest = (_: any) => {
    for (let i: Integer = 0; i < 6e3; i++) DStack.pop();
    return DStack;
  };


  const SStackPushManyTest = (_: any) => {
    SStack.clear();
    SStack.pushMany(items);
  };
  const DStackPushManyTest = (_: any) => {
    DStack.clear();
    DStack.pushMany(items);
  };
  const SStackAppendTest = (_: any) => {
    SStack.clear();
    SStack.append((i) => (i + 1) * Math.random(), 6e5);
  };
  const DStackAppendTest = (_: any) => {
    DStack.clear();
    DStack.append((i) => (i + 1) * Math.random(), 6e5);
  };
  SStack.clear();
  DStack.clear();
  SStack.pushMany(items);
  DStack.pushMany(items);
  const SStackFilterTest = (_: any) => {
    return SStack.filter((el => el > .5));
  }


  const DStackFilterTest = (_: any) => {
    return DStack.filter((el) => el > .5)
  }
  startPerformanceTest(
    "push",
    [{ param: "StaticStack", size: 6e5 }],
    condition,
    {
      "static stack": {
        instance: StaticStack,
        test: SStackPushTest,
      },
      "dynamic stack": {
        instance: DynamicStack,
        test: DStackPushTest,
      },
    },
  );
  startPerformanceTest(
    "pop",
    [{ param: "StaticStack", size: 6e5 }, { param: "pop batch", size: 6e3 }],
    condition,
    {
      "static stack": {
        instance: StaticStack,
        test: SStackPopTest,
      },
      "dynamic stack": {
        instance: DynamicStack,
        test: DStackPopTest,
      },
    },
  );
  startPerformanceTest(
    "pushMany",
    [{ param: "StaticStack and DynamicStack", size: 6e5 }, {
      param: "array of items",
      length: 6e5,
    }],
    condition,
    {
      "static stack": {
        instance: StaticStack,
        test: SStackPushManyTest,
      },
      "dynamic stack": {
        instance: DynamicStack,
        test: DStackPushManyTest,
      },
    },
  );
  startPerformanceTest(
    "append",
    [{ param: "StaticStack and DynamicStack", size: 6e5 }, {
      param: "callback",
      size: 6e5,
    }],
    condition,
    {
      "static stack": {
        instance: StaticStack,
        test: SStackAppendTest,
      },
      "dynamic stack": {
        instance: DynamicStack,
        test: DStackAppendTest,
      },
    },
  );

startPerformanceTest(
    "filter",
    [{ param: "StaticStack and DynamicStack", size: 6e5 }, {
      param: "callback",
      size: 6e5,
    }],
    condition,
    {
      "static stack": {
        instance: StaticStack,
        test: SStackFilterTest,
      },
      "dynamic stack": {
        instance: DynamicStack,
        test: DStackFilterTest,
      },
    },
  );
})();
