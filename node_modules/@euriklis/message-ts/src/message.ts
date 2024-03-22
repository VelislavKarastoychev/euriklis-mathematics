"use strict";
import { ColorsType, ColorType, Integer } from "./types";
const author: string = "Velislav S. Karastoychev";
const version: string = "1.0.0";
const regexTest: RegExp =
  /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|\d{1,2}),\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2}),\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\)$/;
const colors: ColorsType = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "violet",
  "cyan",
  "grey",
  "none",
];

/**
 * @class Message
 * @description this class is a tool for
 * printing text in the nodejs terminal
 * and for writing useful symbols like
 * warning and success symbols, underlying,
 * italic and bold text manipulation and
 * setting of the color or the background
 * of the text.
 * Every instance of this class has only one
 * property - i.e. the text property.
 */

export default class Message {
  text: string;
  styles: string;

  /**
   * The constructor of the
   * Message class creates the text property
   * of the instance and set it to the message.
   * The message has to be a string type argument.
   * If the message parameter is not defined,then
   * the text property of the constructor will be
   * an empty string.
   *
   * @param {string} message
   * the text that has to be printed.
   */
  constructor(message: string = "") {
    this.text = message;

    this.styles = "";
  }
  /**
   * Returns the default value of
   * the color and background color of the text.
   *
   * @returns {Message}
   * @description this method
   */
  get reset(): Message {
    this.styles = "\x1b[0m";

    return this;
  }

  /**
   * Makes the text message with bold style.
   *
   * @returns {Message}
   */
  get bold(): Message {
    this.styles += "\x1b[1m";

    return this;
  }

  /**
   * sets the text style to italic.
   *
   * @returns {Message}
   */
  get italic(): Message {
    this.styles += "\x1b[3m";

    return this;
  }

  /**
   * Generates a blink effect on the text.
   *
   * @returns {Message}
   */
  get blink(): Message {
    this.styles += "\x1b[5m";

    return this;
  }
  /**
   * @description this method makes the style
   * of the text machine - like (<tt> - tag).
   */
  get machine() {
    this.styles += "\x1b[2m";

    return this;
  }
  /**
   * Underlines the texts of a message.
   *
   * @returns {Message}
   */
  get underline(): Message {
    this.styles += "\x1b[4m";

    return this;
  }

  /**
   *
   * Sets the color of the text message
   * that has to be printed on the terminal.

   * @param {ColorsType | string} color a string value
   * that is a valid terminal color.The possible
   * values for the color argument are:
   * 'black', 'red', 'green', 'yellow', 'blue',
   * 'violet', 'cyan' and 'grey' or an rgb specified color.
   * @returns {Message}
   **/
  setColor(color: ColorType = "none"): Message {
    const colorError = new Error();
    let colorValue: string;
    colorError.name = "@euriklis/message package color error";
    colorError.message =
      `Incorrect color type or value. The color which may be used are ${
        colors.join(" ")
      } or some arbitrary rgb value`;
    if (color === "black") colorValue = "\x1b[30m";
    else if (color === "red") colorValue = "\x1b[31m";
    else if (color === "green") colorValue = "\x1b[32m";
    else if (color === "yellow") colorValue = "\x1b[33m";
    else if (color === "blue") colorValue = "\x1b[34m";
    else if (color === "violet") colorValue = "\x1b[35m";
    else if (color === "cyan") colorValue = "\x1b[36m";
    else if (color === "grey") colorValue = "\x1b[37m";
    else if (color === "none") colorValue = "\x1b[0m";
    else if (typeof color === "string") {
      if (regexTest.test(color)) {
        const [r, g, b] = color.match(/\d{1,3}/g) || ["", "", ""];
        colorValue = `\x1b[38;2;${r};${g};${b}m`;
      } else throw colorError;
    } else throw colorError;
    this.styles += colorValue;
    return this;
  }

  /**
   * Sets the color of the text to
   * cyan when the message will be
   * printed on the terminal.
   *
   * @returns {Message}
   */
  get setColorCyan(): Message {
    return this.setColor("cyan");
  }

  /**
   * Sets the color of the
   * text message to violet
   * that will be printed on the terminal.
   *
   * @returns {Message}
   */
  get setColorViolet(): Message {
    return this.setColor("violet");
  }

  /**
   * Sets the color of the
   * text message to yellow
   * when the message will be printed.
   *
   * @returns {Message}
   */
  get setColorYellow(): Message {
    return this.setColor("yellow");
  }

  /**
   * Sets the color of the text message
   * to green when the message will be printed.
   *
   * @returns {Message}
   */
  get setColorGreen(): Message {
    return this.setColor("green");
  }

  /**
   * Sets the color of the text message
   * to blue when the message will be
   * printed on the terminal.
   *
   * @returns {Message}
   */
  get setColorBlue(): Message {
    return this.setColor("blue");
  }

  /**
   * Sets the color of the text message
   * to red when the message will be
   * printed on the terminal.
   *
   * @returns {Message}
   */
  get setColorRed(): Message {
    return this.setColor("red");
  }

  /**
   * Sets the color of the text
   * message to black when the
   * message will be printed on
   * the terminal.
   *
   * @returns {Message}
   */
  get setColorBlack(): Message {
    return this.setColor("black");
  }

  /**
   * Sets the color of the text message
   * to grey when the message will be
   * printed on the terminal.
   *
   * @returns {Message}
   */
  get setColorGrey(): Message {
    return this.setColor("grey");
  }

  /**
   * Sets the background color of
   * the text message to the required
   * value from the user.
   *
   * @param {ColorType | string} bgColor a string
   * value that has to be a valid console
   * color. The valid colors that can be
   * used form the user are the following:
   * 'black', 'red', 'yellow', 'blue', 'violet',
   * 'cyan', 'green', 'grey'
   * @returns {Message}
   */
  setBgColor(bgColor: ColorType | string = "\x1b[0m"): Message {
    const bgColorError = new Error();
    bgColorError.name =
      "@euriklis/message library background color error message";
    bgColorError.message =
      `Incorrect color type in the setBgColor method. The parameter has to be equal to some of the values ${
        colors.join(" ")
      }`;
    if (bgColor === "black") bgColor = "\x1b[40m";
    else if (bgColor === "red") bgColor = "\x1b[41m";
    else if (bgColor === "green") bgColor = "\x1b[42m";
    else if (bgColor === "yellow") bgColor = "\x1b[43m";
    else if (bgColor === "blue") bgColor = "\x1b[44m";
    else if (bgColor === "violet") bgColor = "\x1b[45m";
    else if (bgColor === "cyan") bgColor = "\x1b[46m";
    else if (bgColor === "grey") bgColor = "\x1b[47m";
    else if (typeof bgColor === "string") {
      if (regexTest.test(bgColor)) {
        const [r, g, b] = bgColor.match(/\d{1,3}/g) || ["", "", ""];
        bgColor = `\x1b[48;2;${r};${g};${b}m`;
      } else bgColorError;
    } else throw bgColorError;
    this.styles += bgColor;

    return this;
  }

  /**
   * Sets the background color
   * of the text message to grey.
   *
   * @returns {Message}
   */
  get setBgColorGrey(): Message {
    return this.setBgColor("grey");
  }

  /**
   * Sets the background color
   * of the text message to cyan.
   *
   * @returns {Message}
   */
  get setBgColorCyan(): Message {
    return this.setBgColor("cyan");
  }

  /**
   * Sets the background of
   * the text message to violet.
   *
   * @returns {Message}
   */
  get setBgColorViolet(): Message {
    return this.setBgColor("violet");
  }

  /**
   * Sets the background of
   * the text message to blue.
   *
   * @returns {Message}
   */
  get setBgColorBlue(): Message {
    return this.setBgColor("blue");
  }

  /**
   * Sets the background color
   * of the text message to yellow.
   *
   * @returns {Message}
   */
  get setBgColorYellow(): Message {
    return this.setBgColor("yellow");
  }

  /**
   * Sets the background color
   * of the text message to green.
   *
   * @returns {Message}
   */
  get setBgColorGreen(): Message {
    return this.setBgColor("green");
  }

  /**
   * Sets the background color
   * of the text message to red.
   *
   * @returns {Message}
   */
  get setBgColorRed(): Message {
    return this.setBgColor("red");
  }

  /**
   * Sets the background color
   * of the text message to black.
   *
   * @returns {Message}
   */
  get setBgColorBlack(): Message {
    return this.setBgColor("black");
  }

  /**
   * Appends a text to the text
   * property of the Message instance.
   *
   * @param {string} text - The message that will be
   * printed on the terminal.
   * @returns {Message}
   */
  append(text: string = ""): Message {
    this.text += `${this.styles}${text}\x1b[0m`;

    return this;
  }

  /**
   * Puts a text before the existing
   * text parameter of the message instance.
   *
   * @param {string} text - The text message
   * which will be put in the beginning of
   * of the message.
   * @returns {Message}
   */
  prepend(text: string = ""): Message {
    this.text = `${this.styles}${text}${this.text}\x1b[0m`;

    return this;
  }

  /**
   * Puts the copyright symbol after the
   * current text content of the message instance.
   *
   * @returns {Message}
   */
  get appendCopyrightSymbol(): Message {
    this.text += "\u00A9";

    return this;
  }

  /**
   * Puts the copyright symbol before the text
   * content of the current message instance.
   *
   * @returns {Message}
   */
  get prependCopyrightSymbol(): Message {
    this.text = "\u00A9" + this.text;

    return this;
  }

  /**
   * Puts the registered symbol before the text
   * content of the current message instance.
   *
   * @returns {Message}
   */
  get prependRegisteredSymbol(): Message {
    return this.prepend("\u00AE");
  }

  /**
   * Puts the registered symbol after the text
   * content of the current message instance.
   *
   * @returns {Message}
   */
  get appendRegisteredSymbol(): Message {
    return this.append("\u00AE");
  }

  /**
   * Puts the logical not symbol to the text content
   * of the current message instance.
   *
   * @returns {Message}
   */
  get appendLogicalNotSymbol(): Message {
    return this.append("\u00AC");
  }

  /**
   * Puts the logical not symbol to the
   * text content of the current message instance.
   *
   * @returns {Message}
   */
  get prependLogicalNotSymbol(): Message {
    return this.prepend("\u00AC");
  }

  /**
   * Appends the universal logical operator.
   *
   * @returns {Message}
   */
  get appendLogicalForAllSymbol(): Message {
    return this.append("\u2200");
  }

  /**
   * Puts in the beginning of the
   * text content the universal
   * logical operator.
   *
   * @returns {Message}
   */
  get prependLogicalForAllSymbol(): Message {
    return this.prepend("\u2200");
  }

  /**
   * Puts at the end of the text
   * content the exists logical operator.
   *
   * @returns {Message}
   */
  get appendLogicalExistsSymbol(): Message {
    return this.append("\u2203");
  }

  /**
   * Puts in the beginning of the text
   * content the exists logical operator.
   *
   * @returns {Message}
   */
  get prependLogicalExistsSymbol(): Message {
    return this.prepend("\u2203");
  }

  /**
   * Puts the logical and operator
   * in the end of the text content of the
   * current message instance.
   *
   * @returns {Message}
   */
  get appendLogicalConjunctionSymbol(): Message {
    return this.append("\u22C0");
  }

  /**
   * Puts in the beginning of the text
   * content of the current message instance the
   * logical and operator.
   *
   * @returns {Message}
   */
  get prependLogicalConjunctionSymbol(): Message {
    return this.prepend("\u22C0");
  }

  /**
   * Puts in the end of the text content of
   * the current message instance the logical or
   * operator.
   *
   * @returns {Message}
   */
  get appendLogicalDisjunctionSymbol(): Message {
    return this.append("\u22C1");
  }

  /**
   * Puts in the beginning of the text content
   * of the current message instance the logical
   * or operator.
   *
   * @returns {Message}
   */
  get prependLogicalDisjunctionSymbol(): Message {
    return this.prepend("\u22C1");
  }

  /**
   * Puts in the end of the text content
   * of the current message instance
   * the logical element of operator.
   *
   * @returns {Message}
   */
  get appendLogicalElementOfSymbol(): Message {
    return this.append("\u2208");
  }

  /**
   * Puts in the beginning of the text content
   * of the current message instance
   * the logical element of operator.
   *
   * @returns {Message}
   */
  get prependLogicalElementOfSymbol(): Message {
    return this.prepend("\u2208");
  }

  /**
   *  Appends to the end of the text property
   *
   * @returns {Message}
   */
  get appendLogicalFollowsSymbol(): Message {
    return this.append("⇒");
  }

  /**
   * Puts in the beginning of the text
   * message the symbol follows.
   *
   * @returns {Message}
   */
  get prependLogicalFollowsSymbol(): Message {
    return this.prepend("⇒");
  }

  /**
   * Appends the logical inverse symbol in
   * the end of a text.
   *
   * @returns {Message}
   */
  get appendLogicalInverseFollowsSymbol(): Message {
    return this.append("⇐");
  }

  /**
   * Puts in the beginning of a text the logical
   * inverse symbol.
   *
   * @returns {Message}
   */
  get prependLogicalInverseFollowsSymbol(): Message {
    return this.prepend("⇐");
  }

  /**
   * Appends the logical equivalence symbol
   * in the text message.
   *
   * @returns {Message}
   */
  get appendLogicalEquivalenceSymbol(): Message {
    return this.append("⇔");
  }

  /**
   * Puts the logical equivalence symbol
   * in the beginning of a text message.
   *
   * @returns {Message}
   */
  get prependLogicalEquivalenceSymbol(): Message {
    return this.prepend("⇔");
  }

  /**
   * Puts the logical identity symbol
   * in the end of a text message.
   *
   * @returns {Message}
   */
  get appendLogicalIdentical(): Message {
    return this.append("≡");
  }

  /**
   * Puts the logical identity symbol
   * in the beginning of a text message.
   *
   * @returns {Message}
   */
  get prependLogicalIdentical(): Message {
    return this.prepend("≡");
  }

  /**
   * Puts the logical not identical symbol
   * in the end of a text message.
   *
   * @returns {Message}
   */
  get appendLogicalNotIdentical(): Message {
    return this.append("≢");
  }

  /**
   * Puts the logical not identical symbol
   * in the beginning of a text message.
   *
   * @returns {Message}
   */
  get prependLogicalNotIdentical(): Message {
    return this.prepend("≢");
  }

  /**
   * Puts the mathematica natural numbers
   * symbol in the end of a text message.
   *
   * @returns {Message}
   */
  get appendMathNaturalNumbersSymbol(): Message {
    return this.append("ℕ");
  }

  /**
   * Puts the mathematical natural numbers
   * symbol in the beginning of a text message.
   *
   * @returns {Message}
   */
  get prependMathNaturalNumbersSymbol(): Message {
    return this.prepend("ℕ");
  }

  /**
   * Puts the partial differential symbol
   * in the end of a text message.
   *
   * @returns {Message}
   */
  get appendMathPartialDifferential(): Message {
    return this.append("∂");
  }

  /**
   * Returns a Message object with
   * the partial differential symbol
   * (∂) prepended.
   *
   * @returns {Message} The Message
   * object with the partial differential
   * symbol prepended.
   */
  get prependMathPartialDifferential(): Message {
    return this.prepend("∂");
  }

  /**
   * Returns a Message object with the
   * empty set symbol (∅) appended.
   *
   * @returns {Message} The Message object
   * with the empty set symbol appended.
   */
  get appendMathEmptySet(): Message {
    return this.append("∅");
  }

  /**
   * Returns a Message object with the
   * empty set symbol (∅) prepended.
   *
   * @returns {Message} The Message object
   * with the empty set symbol prepended.
   */
  get prependMathEmptySet(): Message {
    return this.prepend("∅");
  }

  /**
   * Returns a Message object with the
   * determinant symbol (∆) appended.
   *
   * @returns {Message} The Message object
   * with the determinant symbol appended.
   */
  get appendMathDeterminant(): Message {
    return this.append("∆");
  }

  /**
   * Returns a Message object with the
   * determinant symbol (∆) prepended.
   *
   * @returns {Message} The Message object
   * with the determinant symbol prepended.
   */
  get prependMathDeterminant(): Message {
    return this.prepend("∆");
  }

  /**
   * Returns a Message object with the
   * nabla symbol (∇) appended.
   *
   * @returns {Message} The Message object
   * with the nabla symbol appended.
   */
  get appendMathNabla(): Message {
    return this.append("∇");
  }

  /**
   * Returns a Message object with the
   * nabla symbol (∇) prepended.
   *
   * @returns {Message} The Message object
   * with the nabla symbol prepended.
   */
  get prependMathNabla(): Message {
    return this.prepend("∇");
  }

  /**
   * Returns a Message object with the
   * product symbol (∏) appended.
   *
   * @returns {Message} The Message object
   * with the product symbol appended.
   */
  get appendMathProductSymbol(): Message {
    return this.append("∏");
  }

  /**
   * Returns a Message object with the
   * product symbol (∏) prepended.
   *
   * @returns {Message} The Message object
   * with the product symbol prepended.
   */
  get prependMathProductSymbol(): Message {
    return this.prepend("∏");
  }

  /**
   * Returns a Message object with the
   * summation symbol (∑) appended.
   *
   * @returns {Message} The Message object
   * with the summation symbol appended.
   */
  get appendMathSummationSymbol(): Message {
    return this.append("∑");
  }

  /**
   * Returns a Message object with the
   * summation symbol (∑) prepended.
   *
   * @returns {Message} The Message object
   * with the summation symbol prepended.
   */
  get prependMathSummationSymbol(): Message {
    return this.prepend("∑");
  }

  /**
   * Returns a Message object with the
   * intersection symbol (∩) appended.
   *
   * @returns {Message} The Message object
   * with the intersection symbol appended.
   */
  get appendMathIntersectionSymbol(): Message {
    return this.append("∩");
  }

  /**
   * Returns a Message object with the
   * intersection symbol (∩) prepended.
   *
   * @returns {Message} A Message object
   * with the intersection symbol prepended.
   */
  get prependMathIntersectionSymbol(): Message {
    return this.prepend("∩");
  }

  /**
   * Returns a Message object with the
   * union symbol (∪) appended.
   *
   * @returns {Message} A Message object
   * with the union symbol appended.
   */
  get appendMathUnionSymbol(): Message {
    return this.append("∪");
  }

  /**
   * Returns a Message object with the
   * union symbol (∪) prepended.
   *
   * @returns {Message} A Message object
   * with the union symbol prepended.
   */
  get prependMathUnionSymbol(): Message {
    return this.prepend("∪");
  }

  /**
   * Returns a Message object with the
   * integral symbol (∫) appended.
   * @returns {Message} A Message object
   * with the integral symbol appended.
   */
  get appendMathIntegralSymbol(): Message {
    return this.append("∫");
  }

  /**
   * Returns a Message object with the
   * integral symbol (∫) prepended.
   * @returns {Message} A Message object
   * with the integral symbol prepended.
   */
  get prependMathIntegralSymbol(): Message {
    return this.prepend("∫");
  }

  /**
   * Returns a Message object with the
   * double integral symbol (∬) appended.
   * @returns {Message} A Message object
   * with the double integral symbol appended.
   */
  get appendMathDoubleIntegralSymbol(): Message {
    return this.append("∬");
  }

  /**
   * Returns a Message object with the
   * double integral symbol (∬) prepended.
   * @returns {Message} A Message object
   * with the double integral symbol prepended.
   */
  get prependMathDoubleIntegralSymbol(): Message {
    return this.prepend("∬");
  }

  /**
   * Returns a Message object with the
   * triple integral symbol (∭) appended.
   * @returns {Message} A Message object
   * with the triple integral symbol appended.
   */
  get appendMathTripleIntegralSymbol(): Message {
    return this.append("∭");
  }

  /**
   * Returns a Message object with the
   * triple integral symbol (∭) prepended.
   * @returns {Message} A Message object
   * with the triple integral symbol prepended.
   */
  get prependMathTripleIntegralSymbol(): Message {
    return this.prepend("∭");
  }

  /**
   * Returns a Message object with the
   * proportional symbol (∝) appended.
   * @returns {Message} A Message object
   * with the proportional symbol appended.
   */
  get appendMathProportionalSymbol(): Message {
    return this.append("∝");
  }

  /**
   * Returns a Message object with the
   * proportional symbol (∝) prepended.
   * @returns {Message} A Message object
   * with the proportional symbol prepended.
   */
  get prependMathProportionalSymbol(): Message {
    return this.prepend("∝");
  }

  /**
   * Returns a Message object with the
   * infinity symbol (∞) appended.
   * @returns {Message} A Message object
   * with the infinity symbol appended.
   */
  get appendMathInfinitySymbol(): Message {
    return this.append("∞");
  }

  /**
   * Returns a Message object with the
   * infinity symbol (∞) prepended.
   * @returns {Message} A Message object
   * with the infinity symbol prepended.
   */
  get prependMathInfinitySymbol(): Message {
    return this.prepend("∞");
  }

  /**
   * Returns a Message object with the
   * contour integral symbol (∮) appended.
   * @returns {Message} A Message object
   * with the contour integral symbol appended.
   */
  get appendMathContourIntegral(): Message {
    return this.append("∮");
  }

  /**
   * Returns a Message object with the
   * contour integral symbol (∮) prepended.
   * @returns {Message} A Message object with
   * the contour integral symbol prepended.
   */
  get prependMathContourIntegral(): Message {
    return this.prepend("∮");
  }

  /**
   * Returns a Message object with the volume
   * integral symbol (∰) appended.
   * @returns {Message} A Message object with
   * the volume integral symbol appended.
   */
  get appendMathVolumeIntegral(): Message {
    return this.append("∰");
  }

  /**
   * Returns a Message object with the volume
   * integral symbol (∰) prepended.
   * @returns {Message} A Message object with
   * the volume integral symbol prepended.
   */
  get prependMathVolumeIntegral(): Message {
    return this.prepend("∰");
  }

  /**
   * Returns a Message object with the almost
   * equal symbol (≈) appended.
   * @returns {Message} A Message object with
   * the almost equal symbol appended.
   */
  get appendMathAlmostEqual(): Message {
    return this.append("≈");
  }

  /**
   * Returns a Message object with the almost
   * equal symbol (≈) prepended.
   * @returns {Message} A Message object with
   * the almost equal symbol prepended.
   */
  get prependMathAlmostEqual(): Message {
    return this.prepend("≈");
  }

  /**
   * Returns a Message object with the almost
   * equal or equal symbol (≊) appended.
   * @returns {Message} A Message object with
   * the almost equal or equal symbol appended.
   */
  get appendMathAlmostEqualOrEqual(): Message {
    return this.append("≊");
  }

  /**
   * Returns a Message object with the almost
   * equal or equal symbol (≊) prepended.
   * @returns {Message} A Message object with
   * the almost equal or equal symbol prepended.
   */
  get prependMathAlmostEqualOrEqual(): Message {
    return this.prepend("≊");
  }

  /**
   * Returns a Message object with the estimates
   * symbol (≙) appended.
   * @returns {Message} A Message object with
   * the estimates symbol appended.
   */
  get appendMathEstimates(): Message {
    return this.append("≙");
  }

  /**
   * Returns a Message object with the estimates
   * symbol (≙) prepended.
   * @returns {Message} A Message object with
   * the estimates symbol prepended.
   */
  get prependMathEstimates(): Message {
    return this.prepend("≙");
  }

  /**
   * Returns a Message object with the equal
   * by definition symbol (≝) appended.
   * @returns {Message} A Message object with
   * the equal by definition symbol appended.
   */
  get appendMathEqualByDefinition(): Message {
    return this.append("≝");
  }

  /**
   * Returns a Message object with the equal by
   * definition symbol (≝) prepended.
   * @returns {Message} A Message object with
   * the equal by definition symbol prepended.
   */
  get prependMathEqualByDefinition(): Message {
    return this.prepend("≝");
  }

  /**
   * Returns a Message object with the square
   * root symbol (√) appended.
   * @returns {Message} A Message object with
   * the square root symbol appended.
   */
  get appendMathSqrtSymbol(): Message {
    return this.append("√");
  }

  /**
   * Returns a Message object with the square
   * root symbol (√) prepended.
   * @returns {Message} A Message object with
   * the square root symbol prepended.
   */
  get prependMathSqrtSymbol(): Message {
    return this.prepend("√");
  }

  /**
   * Returns a Message object with the cube
   * root symbol (∛) appended.
   * @returns {Message} A Message object with
   * the cube root symbol appended.
   */
  get appendMathCubeRootSymbol(): Message {
    return this.append("∛");
  }

  /**
   * Returns a Message object with the cube
   * root symbol (∛) prepended.
   * @returns {Message} A Message object with
   * the cube root symbol prepended.
   */
  get prependMathCubeRootSymbol(): Message {
    return this.prepend("∛");
  }

  /**
   * Returns a Message object with the forth
   * root symbol (∜) appended.
   * @returns {Message} A Message object with
   * the forth root symbol appended.
   */
  get appendMathForthRootSymbol(): Message {
    return this.append("∜");
  }

  /**
   * Returns a Message object with the forth
   * root symbol (∜) prepended.
   * @returns {Message} A Message object with
   * the forth root symbol prepended.
   */
  get prependMathForthRootSymbol(): Message {
    return this.prepend("∜");
  }

  /**
   * Returns a Message object with the subset
   * of symbol (⊂) appended.
   * @returns {Message} A Message object with
   * the subset of symbol appended.
   */
  get appendMathSubsetOfSymbol(): Message {
    return this.append("⊂");
  }

  /**
   * Returns a Message object with the subset
   * of symbol (⊂) prepended.
   * @returns {Message} A Message object with
   * the subset of symbol prepended.
   */
  get prependMathSubsetOfSymbol(): Message {
    return this.prepend("⊂");
  }

  /**
   * Returns a Message object with the superset
   * of symbol (⊃) appended.
   * @returns {Message} A Message object with the
   * superset of symbol appended.
   */
  get appendMathSupersetOfSymbol(): Message {
    return this.append("⊃");
  }

  /**
   * Returns a Message object with the superset
   * of symbol (⊃) prepended.
   * @returns {Message} A Message object with
   * the superset of symbol prepended.
   */
  get prependMathSupersetOfSymbol(): Message {
    return this.prepend("⊃");
  }

  /**
   * Returns a Message object with the hourglass
   * symbol (⌛) appended.
   * @returns {Message} A Message object with the
   * hourglass symbol appended.
   */
  get appendHourglassSymbol(): Message {
    return this.append("⌛");
  }

  /**
   * Returns a Message object with the hourglass
   * symbol (⌛) prepended.
   * @returns {Message} A Message object with the
   * hourglass symbol prepended.
   */
  get prependHourglassSymbol(): Message {
    return this.prepend("⌛");
  }

  /**
   * Returns a Message object with the keyboard
   * symbol (⌨) appended.
   * @returns {Message} A Message object with
   * the keyboard symbol appended.
   */
  get appendKeyboardSymbol(): Message {
    return this.append("⌨");
  }

  /**
   * Returns a Message object with the keyboard
   * symbol (⌨) prepended.
   * @returns {Message} A Message object with
   * the keyboard symbol prepended.
   */
  get prependKeyboardSymbol(): Message {
    return this.prepend("⌨");
  }

  /**
   * Returns a Message object with the question
   * mark ornament symbol (❓) appended.
   * @returns {Message} A Message object with
   * the question mark ornament symbol appended.
   */
  get appendQuestionMarkOrnament(): Message {
    return this.append("❓");
  }

  /**
   * Returns a Message object with the question
   * mark ornament symbol (❓) prepended.
   * @returns {Message} A Message object with
   * the question mark ornament symbol prepended.
   */
  get prependQuestionMarkOrnament(): Message {
    return this.prepend("❓");
  }

  /**
   * Returns a Message object with the Bitcoin
   * symbol (₿) appended.
   * @returns {Message} A Message object with
   * the Bitcoin symbol appended.
   */
  get appendBitcoinSymbol(): Message {
    return this.append("₿");
  }

  /**
   * Returns a Message object with the Bitcoin
   * symbol (₿) prepended.
   * @returns {Message} A Message object with
   * the Bitcoin symbol prepended.
   */
  get prependBitcoinSymbol(): Message {
    return this.prepend("₿");
  }

  /**
   * Returns a Message object with the Euro
   * symbol (€) appended.
   * @returns {Message} A Message object with
   * the Euro symbol appended.
   */
  get appendEuroSymbol(): Message {
    return this.append("€");
  }

  /**
   * Returns a Message object with the Euro
   * symbol (€) prepended.
   * @returns {Message} A Message object with
   * the Euro symbol prepended.
   */
  get prependEuroSymbol(): Message {
    return this.prepend("€");
  }

  /**
   * Returns a Message object with the face
   * with tears of joy emoji (😂) appended.
   * @returns {Message} A Message object
   * with the face with tears of joy emoji appended.
   */
  get appendFaceWithTearsOfJoy(): Message {
    return this.append("😂");
  }

  /**
   * Returns a Message object with the face
   * with tears of joy emoji (😂) prepended.
   * @returns {Message} A Message object with
   * the face with tears of joy emoji prepended.
   */
  get prependFaceWithTearsOfJoy(): Message {
    return this.prepend("😂");
  }

  /**
   * Returns a Message object with the heart
   * symbol (❤) appended.
   * @returns {Message} A Message object with
   * the heart symbol appended.
   */
  get appendHeartSymbol(): Message {
    return this.append("❤");
  }

  /**
   * Returns a Message object with the heart
   * symbol (❤) prepended.
   * @returns {Message} A Message object with
   * the heart symbol prepended.
   */
  get prependHeartSymbol(): Message {
    return this.prepend("❤");
  }

  /**
   * Returns a Message object with the coronavirus
   * symbol (🦠) appended.
   * @returns {Message} A Message object with the
   * coronavirus symbol appended.
   */
  get appendCoronaVirusSymbol(): Message {
    return this.append("🦠");
  }

  /**
   * Returns a Message object with the coronavirus
   * symbol (🦠) prepended.
   * @returns {Message} A Message object with the
   * coronavirus symbol prepended.
   */
  get prependCoronaVirusSymbol(): Message {
    return this.prepend("🦠");
  }

  /**
   * Returns a Message object with the ambulance
   * symbol (🚑) appended.
   * @returns {Message} A Message object with
   * the ambulance symbol appended.
   */
  get appendAmbulanceSymbol(): Message {
    return this.append("🚑");
  }

  /**
   * Returns a Message object with the ambulance
   * symbol (🚑) prepended.
   * @returns {Message} A Message object with the
   * ambulance symbol prepended.
   */
  get prependAmbulanceSymbol(): Message {
    return this.prepend("🚑");
  }

  /**
   * Returns a Message object with the potable
   * water symbol (🚰) appended.
   * @returns {Message} A Message object with
   * the potable water symbol appended.
   */
  get appendPotableWaterSymbol(): Message {
    return this.append("🚰");
  }

  /**
   * Returns a Message object with the potable
   * water symbol (🚰) prepended.
   * @returns {Message} A Message object with
   * the potable water symbol prepended.
   */
  get prependPotableWaterSymbol(): Message {
    return this.prepend("🚰");
  }

  /**
   * Returns a Message object with the face with
   * medical mask symbol (😷) appended.
   * @returns {Message} A Message object with the
   * face with medical mask symbol appended.
   */
  get appendFaceWithMedicalMaskSymbol(): Message {
    return this.append("😷");
  }

  /**
   * Returns a Message object with the face with
   * medical mask symbol (😷) prepended.
   * @returns {Message} A Message object with the
   * face with medical mask symbol prepended.
   */
  get prependFaceWithMedicalMaskSymbol(): Message {
    return this.prepend("😷");
  }

  /**
   * Returns a Message object with the rose
   * symbol (🌹) appended.
   * @returns {Message} A Message object with
   * the rose symbol appended.
   */
  get appendRoseSymbol(): Message {
    return this.append("🌹");
  }

  /**
   * Returns a Message object with the
   * rose symbol (🌹) prepended.
   * @returns {Message} A Message object
   * with the rose symbol prepended.
   */
  get prependRoseSymbol(): Message {
    return this.prepend("🌹");
  }

  /**
   * Appends a not check mark symbol
   * to the text property of the Message
   * instance.
   *
   * @returns {Message}
   */
  get appendNotCheckMark(): Message {
    return this.append("\u237B");
  }

  /**
   * Puts a not check mark symbol to the text
   * property of the Message instance.
   *
   * @returns {Message}
   */
  get prependNotCheckMark(): Message {
    return this.prepend("\u237B");
  }

  /**
   * Appends a check mark symbol to
   * the text property of the
   * Message instance.
   *
   * @returns {Message}
   */
  get appendCheckMark(): Message {
    return this.append("\u2713");
  }

  /**
   * Puts a check mark symbol to
   * the text property to the text
   * property of the Message instance.
   *
   * @returns {Message}
   */
  get prependCheckMark(): Message {
    return this.prepend("\u2713");
  }

  /**
   * Appends a check mark in a box
   * symbol to the text property of the
   * Message instance.
   *
   * @returns {Message}
   */
  get appendBallotBoxWithCheckMark(): Message {
    return this.append("\u2611");
  }

  /**
   * Puts a check mark in a box symbol
   * before the text property of the
   * Message instance.
   *
   * @returns {Message}
   */
  get prependBallotBoxWithCheckMark(): Message {
    return this.prepend("\u2611");
  }

  /**
   * Appends check mark to the text
   * property of the Message instance.
   *
   * @returns {Message}
   */
  get appendWhiteHeavyCheckMark(): Message {
    return this.append("\u2705");
  }

  /**
   * Puts a check mark before the text
   * property of the Message instance.
   *
   * @returns {Message}
   */
  get prependWhiteHeavyCheckMark(): Message {
    return this.prepend("\u2705");
  }

  /**
   * Appends a check mark to the text
   * property of the Message instance.
   *
   * @returns {Message}
   */
  get appendHeavyCheckMark(): Message {
    return this.append("\u2714");
  }

  /**
   * Puts a check mark to the
   * text property of the Message instance.
   * @returns {Message}
   */
  get prependHeavyCheckMark(): Message {
    return this.prepend("\u2714");
  }

  /**
   * Appends a warning sign symbol to the
   * text property of the Message instance.
   * @returns {Message}
   */
  get appendWarningSign(): Message {
    return this.append("\u26A0");
  }

  /**
   * Puts a warning sign symbol before
   * the text property of the Message instance.
   *
   * @returns {Message}
   */
  get prependWarningSign(): Message {
    return this.prepend("\u26A0");
  }

  /**
   * appends n white spaces to the text
   * property of the Message instance.
   *
   * @param {Integer} n
   * @returns {Message}
   */
  appendWhiteSpace(n: Integer = 1): Message {
    let text = "";
    if (!Number.isInteger(n)) n = 1;
    for (let i = 0; i < n; i++) text += " ";

    return this.append(text);
  }

  /**
   * Puts n white spaces before the text property
   * of the Message instance.
   *
   * @param {Integer} n
   * @return {Message}
   */
  prependWhiteSpace(n: Integer = 1): Message {
    let text = "";
    if (!Number.isInteger(n)) n = 1;
    for (let i = 0; i < n; i++) text += " ";

    return this.prepend(text);
  }

  /**
   * Prints the final text message
   * or the text property.
   *
   * @return {Message}
   */
  log(): Message {
    console.log(this.text);

    return this;
  }

  /**
   * Prints the text property of the Message instance
   * like information message.
   *
   * @return {Message}
   */
  info(): Message {
    console.info(this.text);

    return this;
  }

  /**
   * Prints the text property of the Message instance
   * like warning message.
   *
   * @return {Message}
   */
  warn(): Message {
    console.warn(this.text);

    return this;
  }

  /**
   * Prints the text property
   * of the Message instance like
   * error message. This method
   * throws an error.
   *
   * @return {Message}
   */
  error(): Message {
    console.error(this.text);

    return this;
  }

  public static author = author;
  public static version = version;
}
