#!/usr/bin/env ts-node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_ts_1 = __importDefault(require("@euriklis/message-ts"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const args = process.argv.slice(2);
const dirname = args[0] || "dist/Tests";
const testsFolder = path_1.default.join(process.cwd(), dirname);
// Check if the "Tests" folder exists, otherwise try "tests"
if (!fs_1.default.existsSync(testsFolder)) {
    new message_ts_1.default()
        .bold
        .underline
        .setBgColor("red")
        .setColor("black")
        .append(`No tests files in the folder ${testsFolder}.`)
        .reset
        .log();
    process.exit(1);
}
else
    console.log(testsFolder);
// Find all test files ending with "spec.js" and run them using Node.js
fs_1.default.readdirSync(testsFolder).forEach((file) => {
    if (file.endsWith("spec.js")) {
        Promise.resolve(`${path_1.default.join(testsFolder, file)}`).then(s => __importStar(require(s))).catch((err) => {
            new message_ts_1.default()
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
