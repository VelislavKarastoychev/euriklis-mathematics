"use strict";
import validator from "../src/validator.js";
import { objectArray, print } from "./data.js";
new validator(objectArray).isObjectArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isObjectArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => item instanceof Object && !(item instanceof Array))
      : false
  );
  print("isObjectArray with 1000000 elements", t1, t2);
});
objectArray.push(() => Math.random());
new validator(objectArray).isObjectArray.on(false, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isObjectArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((el) => el instanceof Object && !(el instanceof Array))
      : false
  );
  print(`isObjectArray with ${v.value.length} elements`, t1, t2);
  objectArray.pop(); // finally the objArr will remain an objArr.
}).on(
  true,
  () => console.log("Something went wrong with isObjectArray method!"),
);


