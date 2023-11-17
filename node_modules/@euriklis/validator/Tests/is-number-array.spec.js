import validator from '../src/validator.js';
import { print, numericArray } from './data.js';
new validator(numericArray).isNumberArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isNumberArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item))
      : false
  );
  print("isNumberArray for 1000000 elements", t1, t2);
});

