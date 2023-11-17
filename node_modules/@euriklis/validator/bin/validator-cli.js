#!/usr/bin/env node

import message from "@euriklis/message";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const __dirname = args[0] || "Tests";

const testsFolder = path.join(process.cwd(), __dirname);
// Check if the "Tests" folder exists, otherwise try "tests"
if (!fs.existsSync(testsFolder)) {
  new message()
    .bold()
    .underline()
    .setBgColor("red")
    .setColor("black")
    .append(`No tests files in the folder ${testsFolder}.`)
    .reset()
    .log();
  process.exit(1);
}

// Find all test files ending with "spec.js" and run them using Node.js
fs.readdirSync(testsFolder).forEach((file) => {
  if (file.endsWith("spec.js")) {
    import(path.join(testsFolder, file))
      .catch((err) => {
        new message()
          .bold()
          .italic()
          .setColor("red")
          .append_warning_sign()
          .append(`Error in testing of the ${testsFolder}/${file}:`, err)
          .append("\n")
          .reset().log();
      });
  }
});
