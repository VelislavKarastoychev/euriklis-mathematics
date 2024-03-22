#!/usr/bin/env ts-node

import message from "@euriklis/message-ts"
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const dirname = args[0] || "Tests";

const testsFolder = path.join(process.cwd(), dirname);
// Check if the "Tests" folder exists, otherwise try "tests"
if (!fs.existsSync(testsFolder)) {
  new message()
    .bold
    .underline
    .setBgColor("red")
    .setColor("black")
    .append(`No tests files in the folder ${testsFolder}.`)
    .reset
    .log();
  process.exit(1);
} else console.log(testsFolder);

// Find all test files ending with "spec.js" and run them using Node.js
fs.readdirSync(testsFolder).forEach((file) => {
  if (file.endsWith("spec.ts")) {
    import(path.join(testsFolder, file))
      .catch((err) => {
        new message()
          .bold
          .italic
          .setColor("red")
          .appendWarningSign
          .append(`Error in testing of the ${testsFolder}/${file}`)
          .append("\n")
          .reset.log();
      });
  }
});
