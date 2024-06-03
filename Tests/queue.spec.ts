"use strict";
import validator from "@euriklis/validator-ts";
import { Queue } from "../src";

const q = new Queue();
new validator(
  q.isEmpty && q.size === Infinity && q.peek === null && q.rear === null,
)
  .isSame(true)
  .describe("The Queue library of the @euriklis/mathematics package has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. create an empty queue with size Infinity and null head and tail element when is called without parameter.",
  )
  .test();

q.size = 1;
new validator(() => q.enqueue(1).enqueue(2))
  .throwsErrorWith()
  .and.bind(
    new validator(q.size).isSame(1),
  )
  .describe(
    "2. provide a setter size which sets the maxiimal length of elements which may be put in the queue.",
  )
  .test();
q.size = Infinity;
q.clean();
new validator(q.isEmpty).isSame(true)
  .and.bind(
    new validator(q.enqueue(1).isEmpty).isSame(false),
  ).describe(
    "3. provide a getter method isEmpty which checks if the queue is without elements.",
  )
  .test();

q.clean();
q.enqueueMany([1, 2, 3, () => console.log(1, 2, 3)]);
new validator(q.length).isSame(4)
  .and.bind(
    new validator((q.dequeueMany(2), q.length)).isSame(2)
      .and.bind(
        new validator(q.peek).isSame(3),
      ),
  ).describe(
    "4. provide a getter method length which returns the current count of the elements in the queue.",
  )
  .test();
q.clean();

new validator(q.peek === q.rear && q.isEmpty && q.peek === null).isSame(true)
  .and.bind(
    new validator(q.enqueueMany(Queue.random(500).toArray()).peek).isInRange(
      0,
      1,
    ),
  ).describe(
    "5. provide a getter method peek which returns the value of the first element without removing it.",
  )
  .test();

q.clean();

q.enqueueMany([1, 2, 3, 4]);
new validator(q.rear).isSame(4)
  .describe(
    "6. provide a setter method rear which returns the value of the tail (last) element without adding another element.",
  ).test();

q.clean();
q.size = 1;
new validator(q.enqueue(.5).peek).isSame(.5)
  .and.bind(
    new validator(() => q.enqueue(Math.random()))
      .throwsErrorWith(),
  ).describe("7. provide a method enqueue, which adds an element to the queue.")
  .test();

q.clean();
q.size = 10;
new validator(q.enqueueMany(Queue.random(10).toArray()).length).isSame(10)
  .and.bind(
    new validator(() => q.enqueue(Math.random()))
      .throwsErrorWith(),
  ).describe(
    "8. provide a method enqueueMany, which adds multiple elements to the queue.",
  )
  .test();

q.clean();

new validator(
  (q.enqueueMany(Queue.random(2).toArray()).dequeue(), q.dequeue(), q).length,
)
  .isSame(0)
  .and.bind(
    new validator(() => q.dequeue())
      .throwsErrorWith(),
  ).describe(
    "9. provide a method dequeue which deletes the first element of the queue and throws underflow type error when the queue is empty.",
  ).test();
q.clean();

new validator(
  (q.enqueueMany(Queue.random(20).toArray()).dequeueMany(19), q).length,
).isSame(1)
  .and.bind(
    new validator(() => q.dequeueMany(2))
      .throwsErrorWith(),
  ).describe(
    "10. provide a method dequeueMany which deletes the first n elements of the queue and if the queue is empty then throws underflow error.",
  ).test();

q.clean();

q.enqueueMany(Queue.random(30).toArray());
let count = 0;
new validator(
  (q.traverse((node) => (node.data < 1 && node.data > 0) ? count++ : 0), count),
).isSame(30)
  .describe(
    "11. provide a method traverse which executes a function through all elements of the queue.",
  )
  .test();
q.clean();

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
q.enqueueMany(arr);
new validator(q.filter((node) => Boolean(node.data % 2)).length)
  .isSame(5)
  .describe(
    "12. provide a method filter, which returns a new queue with the elements which satisfy the callback condition of the method.",
  )
  .test();

new validator(q.contains(2)).isSame(true)
  .describe(
    "13. provide a method contains, which returns true if the element is met trough the traversing of the queue.",
  )
  .test();
new validator(q.reverse().toArray()).isSame([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  .describe(
    "14. provide a method reverse, which reverse the order of the elements of the queue.",
  )
  .test();

new validator(q.clean().length).isSame(0)
  .describe(
    "15. provide a method clean, which deletes all the elements of the queue.",
  )
  .test();

new validator(q.merge(Queue.random(5)).length).isSame(5)
  .describe("16. provide a method merge, which concatenates two queues.")
  .test();

new validator(q.toArray()).isNumberArray.and.forEvery((v) => v.isInRange(0, 1))
  .describe(
    "17. provides a method toArray, which transforms the queue instance to an array with the elements of the queue.",
  )
  .test();

new validator(q.copy().toArray()).isSame(q.toArray())
  .and.bind(new validator(q.copy() !== q).isSame(true))
  .describe(
    "18. provide a method copy, which copies the elements of the current queue instance in a new queue.",
  )
  .test();
