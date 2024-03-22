"use strict";
import validator from "../src/validator";

const randArray = Array.from({ length: 100 }).map(Math.random);
new validator(randArray)
  .describe("The forEvery method has to:")
  .test({ title: true, background: "yellow" })
  .forEvery((el) => el.isInRange(0, 1))
  .on(true, (v) => {
    const t1 = v.benchmark((m) =>
      new validator(m).forEvery((item) => item.isInRange(0, 1))
    );
    const t2 = v.benchmark((m) =>
      m.every((item: number) =>
        typeof item === "number" ? item > 0 && item < 1 : false
      )
    );
    console.table({ validator: t1, conventionalJS: t2 });
  })
  .describe("1.test if the forEvery method works correct.")
  .test()
  .and.bind(
    new validator(new Set(randArray))
      .forEvery((item) => item.isNumber.and.isLessThan(Math.E).and.isFloat),
  ).describe("2. works with sets.")
  .test();
