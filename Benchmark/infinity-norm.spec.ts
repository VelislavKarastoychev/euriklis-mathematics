"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

const rand = Matrix.random(5000, 5000);
const randData = rand.M;

new validator(rand.infinityNorm);
