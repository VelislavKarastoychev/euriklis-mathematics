"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author = "Velislav S. Karastoychev";
const version = "1.0.0";
const regexTest = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|\d{1,2}),\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2}),\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\)$/;
const colors = [
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
class Message {
    text;
    styles;
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
    constructor(message = "") {
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
    get reset() {
        this.styles = "\x1b[0m";
        return this;
    }
    /**
     * Makes the text message with bold style.
     *
     * @returns {Message}
     */
    get bold() {
        this.styles += "\x1b[1m";
        return this;
    }
    /**
     * sets the text style to italic.
     *
     * @returns {Message}
     */
    get italic() {
        this.styles += "\x1b[3m";
        return this;
    }
    /**
     * Generates a blink effect on the text.
     *
     * @returns {Message}
     */
    get blink() {
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
    get underline() {
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
    setColor(color = "none") {
        const colorError = new Error();
        let colorValue;
        colorError.name = "@euriklis/message package color error";
        colorError.message =
            `Incorrect color type or value. The color which may be used are ${colors.join(" ")} or some arbitrary rgb value`;
        if (color === "black")
            colorValue = "\x1b[30m";
        else if (color === "red")
            colorValue = "\x1b[31m";
        else if (color === "green")
            colorValue = "\x1b[32m";
        else if (color === "yellow")
            colorValue = "\x1b[33m";
        else if (color === "blue")
            colorValue = "\x1b[34m";
        else if (color === "violet")
            colorValue = "\x1b[35m";
        else if (color === "cyan")
            colorValue = "\x1b[36m";
        else if (color === "grey")
            colorValue = "\x1b[37m";
        else if (color === "none")
            colorValue = "\x1b[0m";
        else if (typeof color === "string") {
            if (regexTest.test(color)) {
                const [r, g, b] = color.match(/\d{1,3}/g) || ["", "", ""];
                colorValue = `\x1b[38;2;${r};${g};${b}m`;
            }
            else
                throw colorError;
        }
        else
            throw colorError;
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
    get setColorCyan() {
        return this.setColor("cyan");
    }
    /**
     * Sets the color of the
     * text message to violet
     * that will be printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorViolet() {
        return this.setColor("violet");
    }
    /**
     * Sets the color of the
     * text message to yellow
     * when the message will be printed.
     *
     * @returns {Message}
     */
    get setColorYellow() {
        return this.setColor("yellow");
    }
    /**
     * Sets the color of the text message
     * to green when the message will be printed.
     *
     * @returns {Message}
     */
    get setColorGreen() {
        return this.setColor("green");
    }
    /**
     * Sets the color of the text message
     * to blue when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorBlue() {
        return this.setColor("blue");
    }
    /**
     * Sets the color of the text message
     * to red when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorRed() {
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
    get setColorBlack() {
        return this.setColor("black");
    }
    /**
     * Sets the color of the text message
     * to grey when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorGrey() {
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
    setBgColor(bgColor = "\x1b[0m") {
        const bgColorError = new Error();
        bgColorError.name =
            "@euriklis/message library background color error message";
        bgColorError.message =
            `Incorrect color type in the setBgColor method. The parameter has to be equal to some of the values ${colors.join(" ")}`;
        if (bgColor === "black")
            bgColor = "\x1b[40m";
        else if (bgColor === "red")
            bgColor = "\x1b[41m";
        else if (bgColor === "green")
            bgColor = "\x1b[42m";
        else if (bgColor === "yellow")
            bgColor = "\x1b[43m";
        else if (bgColor === "blue")
            bgColor = "\x1b[44m";
        else if (bgColor === "violet")
            bgColor = "\x1b[45m";
        else if (bgColor === "cyan")
            bgColor = "\x1b[46m";
        else if (bgColor === "grey")
            bgColor = "\x1b[47m";
        else if (typeof bgColor === "string") {
            if (regexTest.test(bgColor)) {
                const [r, g, b] = bgColor.match(/\d{1,3}/g) || ["", "", ""];
                bgColor = `\x1b[48;2;${r};${g};${b}m`;
            }
            else
                bgColorError;
        }
        else
            throw bgColorError;
        this.styles += bgColor;
        return this;
    }
    /**
     * Sets the background color
     * of the text message to grey.
     *
     * @returns {Message}
     */
    get setBgColorGrey() {
        return this.setBgColor("grey");
    }
    /**
     * Sets the background color
     * of the text message to cyan.
     *
     * @returns {Message}
     */
    get setBgColorCyan() {
        return this.setBgColor("cyan");
    }
    /**
     * Sets the background of
     * the text message to violet.
     *
     * @returns {Message}
     */
    get setBgColorViolet() {
        return this.setBgColor("violet");
    }
    /**
     * Sets the background of
     * the text message to blue.
     *
     * @returns {Message}
     */
    get setBgColorBlue() {
        return this.setBgColor("blue");
    }
    /**
     * Sets the background color
     * of the text message to yellow.
     *
     * @returns {Message}
     */
    get setBgColorYellow() {
        return this.setBgColor("yellow");
    }
    /**
     * Sets the background color
     * of the text message to green.
     *
     * @returns {Message}
     */
    get setBgColorGreen() {
        return this.setBgColor("green");
    }
    /**
     * Sets the background color
     * of the text message to red.
     *
     * @returns {Message}
     */
    get setBgColorRed() {
        return this.setBgColor("red");
    }
    /**
     * Sets the background color
     * of the text message to black.
     *
     * @returns {Message}
     */
    get setBgColorBlack() {
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
    append(text = "") {
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
    prepend(text = "") {
        this.text = `${this.styles}${text}${this.text}\x1b[0m`;
        return this;
    }
    /**
     * Puts the copyright symbol after the
     * current text content of the message instance.
     *
     * @returns {Message}
     */
    get appendCopyrightSymbol() {
        this.text += "\u00A9";
        return this;
    }
    /**
     * Puts the copyright symbol before the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get prependCopyrightSymbol() {
        this.text = "\u00A9" + this.text;
        return this;
    }
    /**
     * Puts the registered symbol before the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get prependRegisteredSymbol() {
        return this.prepend("\u00AE");
    }
    /**
     * Puts the registered symbol after the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get appendRegisteredSymbol() {
        return this.append("\u00AE");
    }
    /**
     * Puts the logical not symbol to the text content
     * of the current message instance.
     *
     * @returns {Message}
     */
    get appendLogicalNotSymbol() {
        return this.append("\u00AC");
    }
    /**
     * Puts the logical not symbol to the
     * text content of the current message instance.
     *
     * @returns {Message}
     */
    get prependLogicalNotSymbol() {
        return this.prepend("\u00AC");
    }
    /**
     * Appends the universal logical operator.
     *
     * @returns {Message}
     */
    get appendLogicalForAllSymbol() {
        return this.append("\u2200");
    }
    /**
     * Puts in the beginning of the
     * text content the universal
     * logical operator.
     *
     * @returns {Message}
     */
    get prependLogicalForAllSymbol() {
        return this.prepend("\u2200");
    }
    /**
     * Puts at the end of the text
     * content the exists logical operator.
     *
     * @returns {Message}
     */
    get appendLogicalExistsSymbol() {
        return this.append("\u2203");
    }
    /**
     * Puts in the beginning of the text
     * content the exists logical operator.
     *
     * @returns {Message}
     */
    get prependLogicalExistsSymbol() {
        return this.prepend("\u2203");
    }
    /**
     * Puts the logical and operator
     * in the end of the text content of the
     * current message instance.
     *
     * @returns {Message}
     */
    get appendLogicalConjunctionSymbol() {
        return this.append("\u22C0");
    }
    /**
     * Puts in the beginning of the text
     * content of the current message instance the
     * logical and operator.
     *
     * @returns {Message}
     */
    get prependLogicalConjunctionSymbol() {
        return this.prepend("\u22C0");
    }
    /**
     * Puts in the end of the text content of
     * the current message instance the logical or
     * operator.
     *
     * @returns {Message}
     */
    get appendLogicalDisjunctionSymbol() {
        return this.append("\u22C1");
    }
    /**
     * Puts in the beginning of the text content
     * of the current message instance the logical
     * or operator.
     *
     * @returns {Message}
     */
    get prependLogicalDisjunctionSymbol() {
        return this.prepend("\u22C1");
    }
    /**
     * Puts in the end of the text content
     * of the current message instance
     * the logical element of operator.
     *
     * @returns {Message}
     */
    get appendLogicalElementOfSymbol() {
        return this.append("\u2208");
    }
    /**
     * Puts in the beginning of the text content
     * of the current message instance
     * the logical element of operator.
     *
     * @returns {Message}
     */
    get prependLogicalElementOfSymbol() {
        return this.prepend("\u2208");
    }
    /**
     *  Appends to the end of the text property
     *
     * @returns {Message}
     */
    get appendLogicalFollowsSymbol() {
        return this.append("⇒");
    }
    /**
     * Puts in the beginning of the text
     * message the symbol follows.
     *
     * @returns {Message}
     */
    get prependLogicalFollowsSymbol() {
        return this.prepend("⇒");
    }
    /**
     * Appends the logical inverse symbol in
     * the end of a text.
     *
     * @returns {Message}
     */
    get appendLogicalInverseFollowsSymbol() {
        return this.append("⇐");
    }
    /**
     * Puts in the beginning of a text the logical
     * inverse symbol.
     *
     * @returns {Message}
     */
    get prependLogicalInverseFollowsSymbol() {
        return this.prepend("⇐");
    }
    /**
     * Appends the logical equivalence symbol
     * in the text message.
     *
     * @returns {Message}
     */
    get appendLogicalEquivalenceSymbol() {
        return this.append("⇔");
    }
    /**
     * Puts the logical equivalence symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalEquivalenceSymbol() {
        return this.prepend("⇔");
    }
    /**
     * Puts the logical identity symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendLogicalIdentical() {
        return this.append("≡");
    }
    /**
     * Puts the logical identity symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalIdentical() {
        return this.prepend("≡");
    }
    /**
     * Puts the logical not identical symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendLogicalNotIdentical() {
        return this.append("≢");
    }
    /**
     * Puts the logical not identical symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalNotIdentical() {
        return this.prepend("≢");
    }
    /**
     * Puts the mathematica natural numbers
     * symbol in the end of a text message.
     *
     * @returns {Message}
     */
    get appendMathNaturalNumbersSymbol() {
        return this.append("ℕ");
    }
    /**
     * Puts the mathematical natural numbers
     * symbol in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependMathNaturalNumbersSymbol() {
        return this.prepend("ℕ");
    }
    /**
     * Puts the partial differential symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendMathPartialDifferential() {
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
    get prependMathPartialDifferential() {
        return this.prepend("∂");
    }
    /**
     * Returns a Message object with the
     * empty set symbol (∅) appended.
     *
     * @returns {Message} The Message object
     * with the empty set symbol appended.
     */
    get appendMathEmptySet() {
        return this.append("∅");
    }
    /**
     * Returns a Message object with the
     * empty set symbol (∅) prepended.
     *
     * @returns {Message} The Message object
     * with the empty set symbol prepended.
     */
    get prependMathEmptySet() {
        return this.prepend("∅");
    }
    /**
     * Returns a Message object with the
     * determinant symbol (∆) appended.
     *
     * @returns {Message} The Message object
     * with the determinant symbol appended.
     */
    get appendMathDeterminant() {
        return this.append("∆");
    }
    /**
     * Returns a Message object with the
     * determinant symbol (∆) prepended.
     *
     * @returns {Message} The Message object
     * with the determinant symbol prepended.
     */
    get prependMathDeterminant() {
        return this.prepend("∆");
    }
    /**
     * Returns a Message object with the
     * nabla symbol (∇) appended.
     *
     * @returns {Message} The Message object
     * with the nabla symbol appended.
     */
    get appendMathNabla() {
        return this.append("∇");
    }
    /**
     * Returns a Message object with the
     * nabla symbol (∇) prepended.
     *
     * @returns {Message} The Message object
     * with the nabla symbol prepended.
     */
    get prependMathNabla() {
        return this.prepend("∇");
    }
    /**
     * Returns a Message object with the
     * product symbol (∏) appended.
     *
     * @returns {Message} The Message object
     * with the product symbol appended.
     */
    get appendMathProductSymbol() {
        return this.append("∏");
    }
    /**
     * Returns a Message object with the
     * product symbol (∏) prepended.
     *
     * @returns {Message} The Message object
     * with the product symbol prepended.
     */
    get prependMathProductSymbol() {
        return this.prepend("∏");
    }
    /**
     * Returns a Message object with the
     * summation symbol (∑) appended.
     *
     * @returns {Message} The Message object
     * with the summation symbol appended.
     */
    get appendMathSummationSymbol() {
        return this.append("∑");
    }
    /**
     * Returns a Message object with the
     * summation symbol (∑) prepended.
     *
     * @returns {Message} The Message object
     * with the summation symbol prepended.
     */
    get prependMathSummationSymbol() {
        return this.prepend("∑");
    }
    /**
     * Returns a Message object with the
     * intersection symbol (∩) appended.
     *
     * @returns {Message} The Message object
     * with the intersection symbol appended.
     */
    get appendMathIntersectionSymbol() {
        return this.append("∩");
    }
    /**
     * Returns a Message object with the
     * intersection symbol (∩) prepended.
     *
     * @returns {Message} A Message object
     * with the intersection symbol prepended.
     */
    get prependMathIntersectionSymbol() {
        return this.prepend("∩");
    }
    /**
     * Returns a Message object with the
     * union symbol (∪) appended.
     *
     * @returns {Message} A Message object
     * with the union symbol appended.
     */
    get appendMathUnionSymbol() {
        return this.append("∪");
    }
    /**
     * Returns a Message object with the
     * union symbol (∪) prepended.
     *
     * @returns {Message} A Message object
     * with the union symbol prepended.
     */
    get prependMathUnionSymbol() {
        return this.prepend("∪");
    }
    /**
     * Returns a Message object with the
     * integral symbol (∫) appended.
     * @returns {Message} A Message object
     * with the integral symbol appended.
     */
    get appendMathIntegralSymbol() {
        return this.append("∫");
    }
    /**
     * Returns a Message object with the
     * integral symbol (∫) prepended.
     * @returns {Message} A Message object
     * with the integral symbol prepended.
     */
    get prependMathIntegralSymbol() {
        return this.prepend("∫");
    }
    /**
     * Returns a Message object with the
     * double integral symbol (∬) appended.
     * @returns {Message} A Message object
     * with the double integral symbol appended.
     */
    get appendMathDoubleIntegralSymbol() {
        return this.append("∬");
    }
    /**
     * Returns a Message object with the
     * double integral symbol (∬) prepended.
     * @returns {Message} A Message object
     * with the double integral symbol prepended.
     */
    get prependMathDoubleIntegralSymbol() {
        return this.prepend("∬");
    }
    /**
     * Returns a Message object with the
     * triple integral symbol (∭) appended.
     * @returns {Message} A Message object
     * with the triple integral symbol appended.
     */
    get appendMathTripleIntegralSymbol() {
        return this.append("∭");
    }
    /**
     * Returns a Message object with the
     * triple integral symbol (∭) prepended.
     * @returns {Message} A Message object
     * with the triple integral symbol prepended.
     */
    get prependMathTripleIntegralSymbol() {
        return this.prepend("∭");
    }
    /**
     * Returns a Message object with the
     * proportional symbol (∝) appended.
     * @returns {Message} A Message object
     * with the proportional symbol appended.
     */
    get appendMathProportionalSymbol() {
        return this.append("∝");
    }
    /**
     * Returns a Message object with the
     * proportional symbol (∝) prepended.
     * @returns {Message} A Message object
     * with the proportional symbol prepended.
     */
    get prependMathProportionalSymbol() {
        return this.prepend("∝");
    }
    /**
     * Returns a Message object with the
     * infinity symbol (∞) appended.
     * @returns {Message} A Message object
     * with the infinity symbol appended.
     */
    get appendMathInfinitySymbol() {
        return this.append("∞");
    }
    /**
     * Returns a Message object with the
     * infinity symbol (∞) prepended.
     * @returns {Message} A Message object
     * with the infinity symbol prepended.
     */
    get prependMathInfinitySymbol() {
        return this.prepend("∞");
    }
    /**
     * Returns a Message object with the
     * contour integral symbol (∮) appended.
     * @returns {Message} A Message object
     * with the contour integral symbol appended.
     */
    get appendMathContourIntegral() {
        return this.append("∮");
    }
    /**
     * Returns a Message object with the
     * contour integral symbol (∮) prepended.
     * @returns {Message} A Message object with
     * the contour integral symbol prepended.
     */
    get prependMathContourIntegral() {
        return this.prepend("∮");
    }
    /**
     * Returns a Message object with the volume
     * integral symbol (∰) appended.
     * @returns {Message} A Message object with
     * the volume integral symbol appended.
     */
    get appendMathVolumeIntegral() {
        return this.append("∰");
    }
    /**
     * Returns a Message object with the volume
     * integral symbol (∰) prepended.
     * @returns {Message} A Message object with
     * the volume integral symbol prepended.
     */
    get prependMathVolumeIntegral() {
        return this.prepend("∰");
    }
    /**
     * Returns a Message object with the almost
     * equal symbol (≈) appended.
     * @returns {Message} A Message object with
     * the almost equal symbol appended.
     */
    get appendMathAlmostEqual() {
        return this.append("≈");
    }
    /**
     * Returns a Message object with the almost
     * equal symbol (≈) prepended.
     * @returns {Message} A Message object with
     * the almost equal symbol prepended.
     */
    get prependMathAlmostEqual() {
        return this.prepend("≈");
    }
    /**
     * Returns a Message object with the almost
     * equal or equal symbol (≊) appended.
     * @returns {Message} A Message object with
     * the almost equal or equal symbol appended.
     */
    get appendMathAlmostEqualOrEqual() {
        return this.append("≊");
    }
    /**
     * Returns a Message object with the almost
     * equal or equal symbol (≊) prepended.
     * @returns {Message} A Message object with
     * the almost equal or equal symbol prepended.
     */
    get prependMathAlmostEqualOrEqual() {
        return this.prepend("≊");
    }
    /**
     * Returns a Message object with the estimates
     * symbol (≙) appended.
     * @returns {Message} A Message object with
     * the estimates symbol appended.
     */
    get appendMathEstimates() {
        return this.append("≙");
    }
    /**
     * Returns a Message object with the estimates
     * symbol (≙) prepended.
     * @returns {Message} A Message object with
     * the estimates symbol prepended.
     */
    get prependMathEstimates() {
        return this.prepend("≙");
    }
    /**
     * Returns a Message object with the equal
     * by definition symbol (≝) appended.
     * @returns {Message} A Message object with
     * the equal by definition symbol appended.
     */
    get appendMathEqualByDefinition() {
        return this.append("≝");
    }
    /**
     * Returns a Message object with the equal by
     * definition symbol (≝) prepended.
     * @returns {Message} A Message object with
     * the equal by definition symbol prepended.
     */
    get prependMathEqualByDefinition() {
        return this.prepend("≝");
    }
    /**
     * Returns a Message object with the square
     * root symbol (√) appended.
     * @returns {Message} A Message object with
     * the square root symbol appended.
     */
    get appendMathSqrtSymbol() {
        return this.append("√");
    }
    /**
     * Returns a Message object with the square
     * root symbol (√) prepended.
     * @returns {Message} A Message object with
     * the square root symbol prepended.
     */
    get prependMathSqrtSymbol() {
        return this.prepend("√");
    }
    /**
     * Returns a Message object with the cube
     * root symbol (∛) appended.
     * @returns {Message} A Message object with
     * the cube root symbol appended.
     */
    get appendMathCubeRootSymbol() {
        return this.append("∛");
    }
    /**
     * Returns a Message object with the cube
     * root symbol (∛) prepended.
     * @returns {Message} A Message object with
     * the cube root symbol prepended.
     */
    get prependMathCubeRootSymbol() {
        return this.prepend("∛");
    }
    /**
     * Returns a Message object with the forth
     * root symbol (∜) appended.
     * @returns {Message} A Message object with
     * the forth root symbol appended.
     */
    get appendMathForthRootSymbol() {
        return this.append("∜");
    }
    /**
     * Returns a Message object with the forth
     * root symbol (∜) prepended.
     * @returns {Message} A Message object with
     * the forth root symbol prepended.
     */
    get prependMathForthRootSymbol() {
        return this.prepend("∜");
    }
    /**
     * Returns a Message object with the subset
     * of symbol (⊂) appended.
     * @returns {Message} A Message object with
     * the subset of symbol appended.
     */
    get appendMathSubsetOfSymbol() {
        return this.append("⊂");
    }
    /**
     * Returns a Message object with the subset
     * of symbol (⊂) prepended.
     * @returns {Message} A Message object with
     * the subset of symbol prepended.
     */
    get prependMathSubsetOfSymbol() {
        return this.prepend("⊂");
    }
    /**
     * Returns a Message object with the superset
     * of symbol (⊃) appended.
     * @returns {Message} A Message object with the
     * superset of symbol appended.
     */
    get appendMathSupersetOfSymbol() {
        return this.append("⊃");
    }
    /**
     * Returns a Message object with the superset
     * of symbol (⊃) prepended.
     * @returns {Message} A Message object with
     * the superset of symbol prepended.
     */
    get prependMathSupersetOfSymbol() {
        return this.prepend("⊃");
    }
    /**
     * Returns a Message object with the hourglass
     * symbol (⌛) appended.
     * @returns {Message} A Message object with the
     * hourglass symbol appended.
     */
    get appendHourglassSymbol() {
        return this.append("⌛");
    }
    /**
     * Returns a Message object with the hourglass
     * symbol (⌛) prepended.
     * @returns {Message} A Message object with the
     * hourglass symbol prepended.
     */
    get prependHourglassSymbol() {
        return this.prepend("⌛");
    }
    /**
     * Returns a Message object with the keyboard
     * symbol (⌨) appended.
     * @returns {Message} A Message object with
     * the keyboard symbol appended.
     */
    get appendKeyboardSymbol() {
        return this.append("⌨");
    }
    /**
     * Returns a Message object with the keyboard
     * symbol (⌨) prepended.
     * @returns {Message} A Message object with
     * the keyboard symbol prepended.
     */
    get prependKeyboardSymbol() {
        return this.prepend("⌨");
    }
    /**
     * Returns a Message object with the question
     * mark ornament symbol (❓) appended.
     * @returns {Message} A Message object with
     * the question mark ornament symbol appended.
     */
    get appendQuestionMarkOrnament() {
        return this.append("❓");
    }
    /**
     * Returns a Message object with the question
     * mark ornament symbol (❓) prepended.
     * @returns {Message} A Message object with
     * the question mark ornament symbol prepended.
     */
    get prependQuestionMarkOrnament() {
        return this.prepend("❓");
    }
    /**
     * Returns a Message object with the Bitcoin
     * symbol (₿) appended.
     * @returns {Message} A Message object with
     * the Bitcoin symbol appended.
     */
    get appendBitcoinSymbol() {
        return this.append("₿");
    }
    /**
     * Returns a Message object with the Bitcoin
     * symbol (₿) prepended.
     * @returns {Message} A Message object with
     * the Bitcoin symbol prepended.
     */
    get prependBitcoinSymbol() {
        return this.prepend("₿");
    }
    /**
     * Returns a Message object with the Euro
     * symbol (€) appended.
     * @returns {Message} A Message object with
     * the Euro symbol appended.
     */
    get appendEuroSymbol() {
        return this.append("€");
    }
    /**
     * Returns a Message object with the Euro
     * symbol (€) prepended.
     * @returns {Message} A Message object with
     * the Euro symbol prepended.
     */
    get prependEuroSymbol() {
        return this.prepend("€");
    }
    /**
     * Returns a Message object with the face
     * with tears of joy emoji (😂) appended.
     * @returns {Message} A Message object
     * with the face with tears of joy emoji appended.
     */
    get appendFaceWithTearsOfJoy() {
        return this.append("😂");
    }
    /**
     * Returns a Message object with the face
     * with tears of joy emoji (😂) prepended.
     * @returns {Message} A Message object with
     * the face with tears of joy emoji prepended.
     */
    get prependFaceWithTearsOfJoy() {
        return this.prepend("😂");
    }
    /**
     * Returns a Message object with the heart
     * symbol (❤) appended.
     * @returns {Message} A Message object with
     * the heart symbol appended.
     */
    get appendHeartSymbol() {
        return this.append("❤");
    }
    /**
     * Returns a Message object with the heart
     * symbol (❤) prepended.
     * @returns {Message} A Message object with
     * the heart symbol prepended.
     */
    get prependHeartSymbol() {
        return this.prepend("❤");
    }
    /**
     * Returns a Message object with the coronavirus
     * symbol (🦠) appended.
     * @returns {Message} A Message object with the
     * coronavirus symbol appended.
     */
    get appendCoronaVirusSymbol() {
        return this.append("🦠");
    }
    /**
     * Returns a Message object with the coronavirus
     * symbol (🦠) prepended.
     * @returns {Message} A Message object with the
     * coronavirus symbol prepended.
     */
    get prependCoronaVirusSymbol() {
        return this.prepend("🦠");
    }
    /**
     * Returns a Message object with the ambulance
     * symbol (🚑) appended.
     * @returns {Message} A Message object with
     * the ambulance symbol appended.
     */
    get appendAmbulanceSymbol() {
        return this.append("🚑");
    }
    /**
     * Returns a Message object with the ambulance
     * symbol (🚑) prepended.
     * @returns {Message} A Message object with the
     * ambulance symbol prepended.
     */
    get prependAmbulanceSymbol() {
        return this.prepend("🚑");
    }
    /**
     * Returns a Message object with the potable
     * water symbol (🚰) appended.
     * @returns {Message} A Message object with
     * the potable water symbol appended.
     */
    get appendPotableWaterSymbol() {
        return this.append("🚰");
    }
    /**
     * Returns a Message object with the potable
     * water symbol (🚰) prepended.
     * @returns {Message} A Message object with
     * the potable water symbol prepended.
     */
    get prependPotableWaterSymbol() {
        return this.prepend("🚰");
    }
    /**
     * Returns a Message object with the face with
     * medical mask symbol (😷) appended.
     * @returns {Message} A Message object with the
     * face with medical mask symbol appended.
     */
    get appendFaceWithMedicalMaskSymbol() {
        return this.append("😷");
    }
    /**
     * Returns a Message object with the face with
     * medical mask symbol (😷) prepended.
     * @returns {Message} A Message object with the
     * face with medical mask symbol prepended.
     */
    get prependFaceWithMedicalMaskSymbol() {
        return this.prepend("😷");
    }
    /**
     * Returns a Message object with the rose
     * symbol (🌹) appended.
     * @returns {Message} A Message object with
     * the rose symbol appended.
     */
    get appendRoseSymbol() {
        return this.append("🌹");
    }
    /**
     * Returns a Message object with the
     * rose symbol (🌹) prepended.
     * @returns {Message} A Message object
     * with the rose symbol prepended.
     */
    get prependRoseSymbol() {
        return this.prepend("🌹");
    }
    /**
     * Appends a not check mark symbol
     * to the text property of the Message
     * instance.
     *
     * @returns {Message}
     */
    get appendNotCheckMark() {
        return this.append("\u237B");
    }
    /**
     * Puts a not check mark symbol to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependNotCheckMark() {
        return this.prepend("\u237B");
    }
    /**
     * Appends a check mark symbol to
     * the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get appendCheckMark() {
        return this.append("\u2713");
    }
    /**
     * Puts a check mark symbol to
     * the text property to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependCheckMark() {
        return this.prepend("\u2713");
    }
    /**
     * Appends a check mark in a box
     * symbol to the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get appendBallotBoxWithCheckMark() {
        return this.append("\u2611");
    }
    /**
     * Puts a check mark in a box symbol
     * before the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get prependBallotBoxWithCheckMark() {
        return this.prepend("\u2611");
    }
    /**
     * Appends check mark to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get appendWhiteHeavyCheckMark() {
        return this.append("\u2705");
    }
    /**
     * Puts a check mark before the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependWhiteHeavyCheckMark() {
        return this.prepend("\u2705");
    }
    /**
     * Appends a check mark to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get appendHeavyCheckMark() {
        return this.append("\u2714");
    }
    /**
     * Puts a check mark to the
     * text property of the Message instance.
     * @returns {Message}
     */
    get prependHeavyCheckMark() {
        return this.prepend("\u2714");
    }
    /**
     * Appends a warning sign symbol to the
     * text property of the Message instance.
     * @returns {Message}
     */
    get appendWarningSign() {
        return this.append("\u26A0");
    }
    /**
     * Puts a warning sign symbol before
     * the text property of the Message instance.
     *
     * @returns {Message}
     */
    get prependWarningSign() {
        return this.prepend("\u26A0");
    }
    /**
     * appends n white spaces to the text
     * property of the Message instance.
     *
     * @param {Integer} n
     * @returns {Message}
     */
    appendWhiteSpace(n = 1) {
        let text = "";
        if (!Number.isInteger(n))
            n = 1;
        for (let i = 0; i < n; i++)
            text += " ";
        return this.append(text);
    }
    /**
     * Puts n white spaces before the text property
     * of the Message instance.
     *
     * @param {Integer} n
     * @return {Message}
     */
    prependWhiteSpace(n = 1) {
        let text = "";
        if (!Number.isInteger(n))
            n = 1;
        for (let i = 0; i < n; i++)
            text += " ";
        return this.prepend(text);
    }
    /**
     * Prints the final text message
     * or the text property.
     *
     * @return {Message}
     */
    log() {
        console.log(this.text);
        return this;
    }
    /**
     * Prints the text property of the Message instance
     * like information message.
     *
     * @return {Message}
     */
    info() {
        console.info(this.text);
        return this;
    }
    /**
     * Prints the text property of the Message instance
     * like warning message.
     *
     * @return {Message}
     */
    warn() {
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
    error() {
        console.error(this.text);
        return this;
    }
    static author = author;
    static version = version;
}
exports.default = Message;
//# sourceMappingURL=message.js.map