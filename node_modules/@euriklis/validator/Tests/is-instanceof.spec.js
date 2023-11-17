"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

class Person {
  name;
  firstName;
  lastName;
  id;
}
const person = new Person();
new validator(person).isInstanceof(Person)
  .and.bind(new validator(Person).not.isInstanceof(Person))
  .and.bind(new validator(new validator()).isInstanceof(validator))
  .and.bind(new validator({}).isInstanceof("Object"))
  .and.bind(new validator([]).isInstanceof(Array))
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInstanceof(Person));
    const t2 = v.benchmark((n) => n instanceof Person);
    print("isInstanceof", t1, t2);
  }).on(false, () => console.log("Error in isInstanceof"));
