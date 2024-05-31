"use strict";
import validator from "@euriklis/validator-ts";
import { DoublyLinkedList } from "../src";

const list = new DoublyLinkedList();

new validator(list.isEmpty)
  .isSame(true)
  .describe(
    "The DoublyLinkedList library of the @euriklis/mathematics package has to:",
  )
  .test({ title: true, success: "green", error: "red" })
  .describe("1. check if the list is empty.")
  .test();

list.addLast({ a: 12, b: 123, c: 1324 });

new validator(list.values()).isMap
  .describe(
    "2. create automatically id of the content if the parameter is not object which has key 'id'.",
  )
  .test();
list.removeFirst();

new validator(list.isEmpty)
  .isSame(true)
  .describe("3. remove the last element.")
  .test();

list.addLast({ id: "velislav", data: "Velislav Karastoychev" });
list.addLast({ id: "ani", data: "Ani Nencheva" });
list.addLast({ id: "vani", data: "Vanq Nencheva" });
new validator(list.length).isSame(3)
  .describe("4. provide a method addLast, which works correctly.")
  .test();
list.insertBefore("velislav", { id: "ibo", data: "Ibrahim Tatles" });
new validator(list.length).isSame(4)
  .describe("5. provide a method insertBefore, which works correctly.")
  .test();
list.insertAfter("ani", { id: "vasilis", data: "Vasilis Karas" });
new validator(list.length).isSame(5)
  .describe("6. provide a method insertBefore, which works correctly.")
  .test();
list.removeFirst();
list.removeLast();
new validator(list.length).isSame(3)
  .describe(
    "7. provide methods removeFirst and removeLast which work correctly.",
  )
  .test();

new validator(list.values()).isMap
  .describe("8. collect all the values as Map with the methods values.")
  .test();

new validator(list.has("vasilis")).isSame(true)
  .and.bind(
    new validator(list.has("vasilena")).isSame(false),
  ).describe(
    "9. provide a method has, which checks if an elements with given id exists in the DoublyLinkedList structure.",
  )
  .test();

const ids: string[] = [];
list.traverse((_, id, __) => {
  ids.push(id as string);
});
new validator(ids).isSame(["velislav", "ani", "vasilis"])
  .describe(
    "10. provide a method traverse, which traverses through the elements of the DoublyLinkedList structure.",
  )
  .test();

const filtered_list = list.filter((d, _, __) => d?.data === "Ani Nencheva");
new validator(filtered_list.length).isSame(1)
  .describe(
    "11. provide a method filter which returns a new DoublyLinkedList with elements that satisfies the callback condition.",
  ).test();

const copied = list.copy();
new validator(list.every((d, id) => {
  return d === copied.values().get(id as string);
})).isSame(true).describe(
  "12. provide a method copy which copies all the elements of a doubly linked list and returns another linked list.",
).test();

new validator(list.any((d) => d?.data === "Velislav Karastoychev"))
  .isSame(true)
  .describe(
    "13. provide a method any which checks if any element of the doubly linked list satrisfies the callback condition.",
  ).test();
new validator(copied.copy().clean().isEmpty)
  .isSame(true)
  .describe(
    "14. provides a method which deletes all the elements of the doubly linked list.",
  )
  .test();

const DLL = new DoublyLinkedList("Avgust");
DLL.merge(copied);
new validator(DLL.length).isSame(4)
  .and.bind(
    new validator(DLL.values().size).isSame(4),
  )
  .describe(
    "15. provide a method merge which concatenates to doubly linked list structures.",
  )
  .test();
new validator(DLL.every((d) => typeof d?.data === "string")).isSame(false)
  .describe(
    "16. provide a method every, which checks if all the elements satisfies a given callback condition.",
  )
  .test();
