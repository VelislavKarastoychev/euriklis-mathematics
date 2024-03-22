import { ColorType, Integer } from "./types.js";
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
    constructor(message?: string);
    /**
     * Returns the default value of
     * the color and background color of the text.
     *
     * @returns {Message}
     * @description this method
     */
    get reset(): Message;
    /**
     * Makes the text message with bold style.
     *
     * @returns {Message}
     */
    get bold(): Message;
    /**
     * sets the text style to italic.
     *
     * @returns {Message}
     */
    get italic(): Message;
    /**
     * Generates a blink effect on the text.
     *
     * @returns {Message}
     */
    get blink(): Message;
    /**
     * @description this method makes the style
     * of the text machine - like (<tt> - tag).
     */
    get machine(): this;
    /**
     * Underlines the texts of a message.
     *
     * @returns {Message}
     */
    get underline(): Message;
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
    setColor(color?: ColorType): Message;
    /**
     * Sets the color of the text to
     * cyan when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorCyan(): Message;
    /**
     * Sets the color of the
     * text message to violet
     * that will be printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorViolet(): Message;
    /**
     * Sets the color of the
     * text message to yellow
     * when the message will be printed.
     *
     * @returns {Message}
     */
    get setColorYellow(): Message;
    /**
     * Sets the color of the text message
     * to green when the message will be printed.
     *
     * @returns {Message}
     */
    get setColorGreen(): Message;
    /**
     * Sets the color of the text message
     * to blue when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorBlue(): Message;
    /**
     * Sets the color of the text message
     * to red when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorRed(): Message;
    /**
     * Sets the color of the text
     * message to black when the
     * message will be printed on
     * the terminal.
     *
     * @returns {Message}
     */
    get setColorBlack(): Message;
    /**
     * Sets the color of the text message
     * to grey when the message will be
     * printed on the terminal.
     *
     * @returns {Message}
     */
    get setColorGrey(): Message;
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
    setBgColor(bgColor?: ColorType | string): Message;
    /**
     * Sets the background color
     * of the text message to grey.
     *
     * @returns {Message}
     */
    get setBgColorGrey(): Message;
    /**
     * Sets the background color
     * of the text message to cyan.
     *
     * @returns {Message}
     */
    get setBgColorCyan(): Message;
    /**
     * Sets the background of
     * the text message to violet.
     *
     * @returns {Message}
     */
    get setBgColorViolet(): Message;
    /**
     * Sets the background of
     * the text message to blue.
     *
     * @returns {Message}
     */
    get setBgColorBlue(): Message;
    /**
     * Sets the background color
     * of the text message to yellow.
     *
     * @returns {Message}
     */
    get setBgColorYellow(): Message;
    /**
     * Sets the background color
     * of the text message to green.
     *
     * @returns {Message}
     */
    get setBgColorGreen(): Message;
    /**
     * Sets the background color
     * of the text message to red.
     *
     * @returns {Message}
     */
    get setBgColorRed(): Message;
    /**
     * Sets the background color
     * of the text message to black.
     *
     * @returns {Message}
     */
    get setBgColorBlack(): Message;
    /**
     * Appends a text to the text
     * property of the Message instance.
     *
     * @param {string} text - The message that will be
     * printed on the terminal.
     * @returns {Message}
     */
    append(text?: string): Message;
    /**
     * Puts a text before the existing
     * text parameter of the message instance.
     *
     * @param {string} text - The text message
     * which will be put in the beginning of
     * of the message.
     * @returns {Message}
     */
    prepend(text?: string): Message;
    /**
     * Puts the copyright symbol after the
     * current text content of the message instance.
     *
     * @returns {Message}
     */
    get appendCopyrightSymbol(): Message;
    /**
     * Puts the copyright symbol before the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get prependCopyrightSymbol(): Message;
    /**
     * Puts the registered symbol before the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get prependRegisteredSymbol(): Message;
    /**
     * Puts the registered symbol after the text
     * content of the current message instance.
     *
     * @returns {Message}
     */
    get appendRegisteredSymbol(): Message;
    /**
     * Puts the logical not symbol to the text content
     * of the current message instance.
     *
     * @returns {Message}
     */
    get appendLogicalNotSymbol(): Message;
    /**
     * Puts the logical not symbol to the
     * text content of the current message instance.
     *
     * @returns {Message}
     */
    get prependLogicalNotSymbol(): Message;
    /**
     * Appends the universal logical operator.
     *
     * @returns {Message}
     */
    get appendLogicalForAllSymbol(): Message;
    /**
     * Puts in the beginning of the
     * text content the universal
     * logical operator.
     *
     * @returns {Message}
     */
    get prependLogicalForAllSymbol(): Message;
    /**
     * Puts at the end of the text
     * content the exists logical operator.
     *
     * @returns {Message}
     */
    get appendLogicalExistsSymbol(): Message;
    /**
     * Puts in the beginning of the text
     * content the exists logical operator.
     *
     * @returns {Message}
     */
    get prependLogicalExistsSymbol(): Message;
    /**
     * Puts the logical and operator
     * in the end of the text content of the
     * current message instance.
     *
     * @returns {Message}
     */
    get appendLogicalConjunctionSymbol(): Message;
    /**
     * Puts in the beginning of the text
     * content of the current message instance the
     * logical and operator.
     *
     * @returns {Message}
     */
    get prependLogicalConjunctionSymbol(): Message;
    /**
     * Puts in the end of the text content of
     * the current message instance the logical or
     * operator.
     *
     * @returns {Message}
     */
    get appendLogicalDisjunctionSymbol(): Message;
    /**
     * Puts in the beginning of the text content
     * of the current message instance the logical
     * or operator.
     *
     * @returns {Message}
     */
    get prependLogicalDisjunctionSymbol(): Message;
    /**
     * Puts in the end of the text content
     * of the current message instance
     * the logical element of operator.
     *
     * @returns {Message}
     */
    get appendLogicalElementOfSymbol(): Message;
    /**
     * Puts in the beginning of the text content
     * of the current message instance
     * the logical element of operator.
     *
     * @returns {Message}
     */
    get prependLogicalElementOfSymbol(): Message;
    /**
     *  Appends to the end of the text property
     *
     * @returns {Message}
     */
    get appendLogicalFollowsSymbol(): Message;
    /**
     * Puts in the beginning of the text
     * message the symbol follows.
     *
     * @returns {Message}
     */
    get prependLogicalFollowsSymbol(): Message;
    /**
     * Appends the logical inverse symbol in
     * the end of a text.
     *
     * @returns {Message}
     */
    get appendLogicalInverseFollowsSymbol(): Message;
    /**
     * Puts in the beginning of a text the logical
     * inverse symbol.
     *
     * @returns {Message}
     */
    get prependLogicalInverseFollowsSymbol(): Message;
    /**
     * Appends the logical equivalence symbol
     * in the text message.
     *
     * @returns {Message}
     */
    get appendLogicalEquivalenceSymbol(): Message;
    /**
     * Puts the logical equivalence symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalEquivalenceSymbol(): Message;
    /**
     * Puts the logical identity symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendLogicalIdentical(): Message;
    /**
     * Puts the logical identity symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalIdentical(): Message;
    /**
     * Puts the logical not identical symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendLogicalNotIdentical(): Message;
    /**
     * Puts the logical not identical symbol
     * in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependLogicalNotIdentical(): Message;
    /**
     * Puts the mathematica natural numbers
     * symbol in the end of a text message.
     *
     * @returns {Message}
     */
    get appendMathNaturalNumbersSymbol(): Message;
    /**
     * Puts the mathematical natural numbers
     * symbol in the beginning of a text message.
     *
     * @returns {Message}
     */
    get prependMathNaturalNumbersSymbol(): Message;
    /**
     * Puts the partial differential symbol
     * in the end of a text message.
     *
     * @returns {Message}
     */
    get appendMathPartialDifferential(): Message;
    /**
     * Returns a Message object with
     * the partial differential symbol
     * (∂) prepended.
     *
     * @returns {Message} The Message
     * object with the partial differential
     * symbol prepended.
     */
    get prependMathPartialDifferential(): Message;
    /**
     * Returns a Message object with the
     * empty set symbol (∅) appended.
     *
     * @returns {Message} The Message object
     * with the empty set symbol appended.
     */
    get appendMathEmptySet(): Message;
    /**
     * Returns a Message object with the
     * empty set symbol (∅) prepended.
     *
     * @returns {Message} The Message object
     * with the empty set symbol prepended.
     */
    get prependMathEmptySet(): Message;
    /**
     * Returns a Message object with the
     * determinant symbol (∆) appended.
     *
     * @returns {Message} The Message object
     * with the determinant symbol appended.
     */
    get appendMathDeterminant(): Message;
    /**
     * Returns a Message object with the
     * determinant symbol (∆) prepended.
     *
     * @returns {Message} The Message object
     * with the determinant symbol prepended.
     */
    get prependMathDeterminant(): Message;
    /**
     * Returns a Message object with the
     * nabla symbol (∇) appended.
     *
     * @returns {Message} The Message object
     * with the nabla symbol appended.
     */
    get appendMathNabla(): Message;
    /**
     * Returns a Message object with the
     * nabla symbol (∇) prepended.
     *
     * @returns {Message} The Message object
     * with the nabla symbol prepended.
     */
    get prependMathNabla(): Message;
    /**
     * Returns a Message object with the
     * product symbol (∏) appended.
     *
     * @returns {Message} The Message object
     * with the product symbol appended.
     */
    get appendMathProductSymbol(): Message;
    /**
     * Returns a Message object with the
     * product symbol (∏) prepended.
     *
     * @returns {Message} The Message object
     * with the product symbol prepended.
     */
    get prependMathProductSymbol(): Message;
    /**
     * Returns a Message object with the
     * summation symbol (∑) appended.
     *
     * @returns {Message} The Message object
     * with the summation symbol appended.
     */
    get appendMathSummationSymbol(): Message;
    /**
     * Returns a Message object with the
     * summation symbol (∑) prepended.
     *
     * @returns {Message} The Message object
     * with the summation symbol prepended.
     */
    get prependMathSummationSymbol(): Message;
    /**
     * Returns a Message object with the
     * intersection symbol (∩) appended.
     *
     * @returns {Message} The Message object
     * with the intersection symbol appended.
     */
    get appendMathIntersectionSymbol(): Message;
    /**
     * Returns a Message object with the
     * intersection symbol (∩) prepended.
     *
     * @returns {Message} A Message object
     * with the intersection symbol prepended.
     */
    get prependMathIntersectionSymbol(): Message;
    /**
     * Returns a Message object with the
     * union symbol (∪) appended.
     *
     * @returns {Message} A Message object
     * with the union symbol appended.
     */
    get appendMathUnionSymbol(): Message;
    /**
     * Returns a Message object with the
     * union symbol (∪) prepended.
     *
     * @returns {Message} A Message object
     * with the union symbol prepended.
     */
    get prependMathUnionSymbol(): Message;
    /**
     * Returns a Message object with the
     * integral symbol (∫) appended.
     * @returns {Message} A Message object
     * with the integral symbol appended.
     */
    get appendMathIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * integral symbol (∫) prepended.
     * @returns {Message} A Message object
     * with the integral symbol prepended.
     */
    get prependMathIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * double integral symbol (∬) appended.
     * @returns {Message} A Message object
     * with the double integral symbol appended.
     */
    get appendMathDoubleIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * double integral symbol (∬) prepended.
     * @returns {Message} A Message object
     * with the double integral symbol prepended.
     */
    get prependMathDoubleIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * triple integral symbol (∭) appended.
     * @returns {Message} A Message object
     * with the triple integral symbol appended.
     */
    get appendMathTripleIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * triple integral symbol (∭) prepended.
     * @returns {Message} A Message object
     * with the triple integral symbol prepended.
     */
    get prependMathTripleIntegralSymbol(): Message;
    /**
     * Returns a Message object with the
     * proportional symbol (∝) appended.
     * @returns {Message} A Message object
     * with the proportional symbol appended.
     */
    get appendMathProportionalSymbol(): Message;
    /**
     * Returns a Message object with the
     * proportional symbol (∝) prepended.
     * @returns {Message} A Message object
     * with the proportional symbol prepended.
     */
    get prependMathProportionalSymbol(): Message;
    /**
     * Returns a Message object with the
     * infinity symbol (∞) appended.
     * @returns {Message} A Message object
     * with the infinity symbol appended.
     */
    get appendMathInfinitySymbol(): Message;
    /**
     * Returns a Message object with the
     * infinity symbol (∞) prepended.
     * @returns {Message} A Message object
     * with the infinity symbol prepended.
     */
    get prependMathInfinitySymbol(): Message;
    /**
     * Returns a Message object with the
     * contour integral symbol (∮) appended.
     * @returns {Message} A Message object
     * with the contour integral symbol appended.
     */
    get appendMathContourIntegral(): Message;
    /**
     * Returns a Message object with the
     * contour integral symbol (∮) prepended.
     * @returns {Message} A Message object with
     * the contour integral symbol prepended.
     */
    get prependMathContourIntegral(): Message;
    /**
     * Returns a Message object with the volume
     * integral symbol (∰) appended.
     * @returns {Message} A Message object with
     * the volume integral symbol appended.
     */
    get appendMathVolumeIntegral(): Message;
    /**
     * Returns a Message object with the volume
     * integral symbol (∰) prepended.
     * @returns {Message} A Message object with
     * the volume integral symbol prepended.
     */
    get prependMathVolumeIntegral(): Message;
    /**
     * Returns a Message object with the almost
     * equal symbol (≈) appended.
     * @returns {Message} A Message object with
     * the almost equal symbol appended.
     */
    get appendMathAlmostEqual(): Message;
    /**
     * Returns a Message object with the almost
     * equal symbol (≈) prepended.
     * @returns {Message} A Message object with
     * the almost equal symbol prepended.
     */
    get prependMathAlmostEqual(): Message;
    /**
     * Returns a Message object with the almost
     * equal or equal symbol (≊) appended.
     * @returns {Message} A Message object with
     * the almost equal or equal symbol appended.
     */
    get appendMathAlmostEqualOrEqual(): Message;
    /**
     * Returns a Message object with the almost
     * equal or equal symbol (≊) prepended.
     * @returns {Message} A Message object with
     * the almost equal or equal symbol prepended.
     */
    get prependMathAlmostEqualOrEqual(): Message;
    /**
     * Returns a Message object with the estimates
     * symbol (≙) appended.
     * @returns {Message} A Message object with
     * the estimates symbol appended.
     */
    get appendMathEstimates(): Message;
    /**
     * Returns a Message object with the estimates
     * symbol (≙) prepended.
     * @returns {Message} A Message object with
     * the estimates symbol prepended.
     */
    get prependMathEstimates(): Message;
    /**
     * Returns a Message object with the equal
     * by definition symbol (≝) appended.
     * @returns {Message} A Message object with
     * the equal by definition symbol appended.
     */
    get appendMathEqualByDefinition(): Message;
    /**
     * Returns a Message object with the equal by
     * definition symbol (≝) prepended.
     * @returns {Message} A Message object with
     * the equal by definition symbol prepended.
     */
    get prependMathEqualByDefinition(): Message;
    /**
     * Returns a Message object with the square
     * root symbol (√) appended.
     * @returns {Message} A Message object with
     * the square root symbol appended.
     */
    get appendMathSqrtSymbol(): Message;
    /**
     * Returns a Message object with the square
     * root symbol (√) prepended.
     * @returns {Message} A Message object with
     * the square root symbol prepended.
     */
    get prependMathSqrtSymbol(): Message;
    /**
     * Returns a Message object with the cube
     * root symbol (∛) appended.
     * @returns {Message} A Message object with
     * the cube root symbol appended.
     */
    get appendMathCubeRootSymbol(): Message;
    /**
     * Returns a Message object with the cube
     * root symbol (∛) prepended.
     * @returns {Message} A Message object with
     * the cube root symbol prepended.
     */
    get prependMathCubeRootSymbol(): Message;
    /**
     * Returns a Message object with the forth
     * root symbol (∜) appended.
     * @returns {Message} A Message object with
     * the forth root symbol appended.
     */
    get appendMathForthRootSymbol(): Message;
    /**
     * Returns a Message object with the forth
     * root symbol (∜) prepended.
     * @returns {Message} A Message object with
     * the forth root symbol prepended.
     */
    get prependMathForthRootSymbol(): Message;
    /**
     * Returns a Message object with the subset
     * of symbol (⊂) appended.
     * @returns {Message} A Message object with
     * the subset of symbol appended.
     */
    get appendMathSubsetOfSymbol(): Message;
    /**
     * Returns a Message object with the subset
     * of symbol (⊂) prepended.
     * @returns {Message} A Message object with
     * the subset of symbol prepended.
     */
    get prependMathSubsetOfSymbol(): Message;
    /**
     * Returns a Message object with the superset
     * of symbol (⊃) appended.
     * @returns {Message} A Message object with the
     * superset of symbol appended.
     */
    get appendMathSupersetOfSymbol(): Message;
    /**
     * Returns a Message object with the superset
     * of symbol (⊃) prepended.
     * @returns {Message} A Message object with
     * the superset of symbol prepended.
     */
    get prependMathSupersetOfSymbol(): Message;
    /**
     * Returns a Message object with the hourglass
     * symbol (⌛) appended.
     * @returns {Message} A Message object with the
     * hourglass symbol appended.
     */
    get appendHourglassSymbol(): Message;
    /**
     * Returns a Message object with the hourglass
     * symbol (⌛) prepended.
     * @returns {Message} A Message object with the
     * hourglass symbol prepended.
     */
    get prependHourglassSymbol(): Message;
    /**
     * Returns a Message object with the keyboard
     * symbol (⌨) appended.
     * @returns {Message} A Message object with
     * the keyboard symbol appended.
     */
    get appendKeyboardSymbol(): Message;
    /**
     * Returns a Message object with the keyboard
     * symbol (⌨) prepended.
     * @returns {Message} A Message object with
     * the keyboard symbol prepended.
     */
    get prependKeyboardSymbol(): Message;
    /**
     * Returns a Message object with the question
     * mark ornament symbol (❓) appended.
     * @returns {Message} A Message object with
     * the question mark ornament symbol appended.
     */
    get appendQuestionMarkOrnament(): Message;
    /**
     * Returns a Message object with the question
     * mark ornament symbol (❓) prepended.
     * @returns {Message} A Message object with
     * the question mark ornament symbol prepended.
     */
    get prependQuestionMarkOrnament(): Message;
    /**
     * Returns a Message object with the Bitcoin
     * symbol (₿) appended.
     * @returns {Message} A Message object with
     * the Bitcoin symbol appended.
     */
    get appendBitcoinSymbol(): Message;
    /**
     * Returns a Message object with the Bitcoin
     * symbol (₿) prepended.
     * @returns {Message} A Message object with
     * the Bitcoin symbol prepended.
     */
    get prependBitcoinSymbol(): Message;
    /**
     * Returns a Message object with the Euro
     * symbol (€) appended.
     * @returns {Message} A Message object with
     * the Euro symbol appended.
     */
    get appendEuroSymbol(): Message;
    /**
     * Returns a Message object with the Euro
     * symbol (€) prepended.
     * @returns {Message} A Message object with
     * the Euro symbol prepended.
     */
    get prependEuroSymbol(): Message;
    /**
     * Returns a Message object with the face
     * with tears of joy emoji (😂) appended.
     * @returns {Message} A Message object
     * with the face with tears of joy emoji appended.
     */
    get appendFaceWithTearsOfJoy(): Message;
    /**
     * Returns a Message object with the face
     * with tears of joy emoji (😂) prepended.
     * @returns {Message} A Message object with
     * the face with tears of joy emoji prepended.
     */
    get prependFaceWithTearsOfJoy(): Message;
    /**
     * Returns a Message object with the heart
     * symbol (❤) appended.
     * @returns {Message} A Message object with
     * the heart symbol appended.
     */
    get appendHeartSymbol(): Message;
    /**
     * Returns a Message object with the heart
     * symbol (❤) prepended.
     * @returns {Message} A Message object with
     * the heart symbol prepended.
     */
    get prependHeartSymbol(): Message;
    /**
     * Returns a Message object with the coronavirus
     * symbol (🦠) appended.
     * @returns {Message} A Message object with the
     * coronavirus symbol appended.
     */
    get appendCoronaVirusSymbol(): Message;
    /**
     * Returns a Message object with the coronavirus
     * symbol (🦠) prepended.
     * @returns {Message} A Message object with the
     * coronavirus symbol prepended.
     */
    get prependCoronaVirusSymbol(): Message;
    /**
     * Returns a Message object with the ambulance
     * symbol (🚑) appended.
     * @returns {Message} A Message object with
     * the ambulance symbol appended.
     */
    get appendAmbulanceSymbol(): Message;
    /**
     * Returns a Message object with the ambulance
     * symbol (🚑) prepended.
     * @returns {Message} A Message object with the
     * ambulance symbol prepended.
     */
    get prependAmbulanceSymbol(): Message;
    /**
     * Returns a Message object with the potable
     * water symbol (🚰) appended.
     * @returns {Message} A Message object with
     * the potable water symbol appended.
     */
    get appendPotableWaterSymbol(): Message;
    /**
     * Returns a Message object with the potable
     * water symbol (🚰) prepended.
     * @returns {Message} A Message object with
     * the potable water symbol prepended.
     */
    get prependPotableWaterSymbol(): Message;
    /**
     * Returns a Message object with the face with
     * medical mask symbol (😷) appended.
     * @returns {Message} A Message object with the
     * face with medical mask symbol appended.
     */
    get appendFaceWithMedicalMaskSymbol(): Message;
    /**
     * Returns a Message object with the face with
     * medical mask symbol (😷) prepended.
     * @returns {Message} A Message object with the
     * face with medical mask symbol prepended.
     */
    get prependFaceWithMedicalMaskSymbol(): Message;
    /**
     * Returns a Message object with the rose
     * symbol (🌹) appended.
     * @returns {Message} A Message object with
     * the rose symbol appended.
     */
    get appendRoseSymbol(): Message;
    /**
     * Returns a Message object with the
     * rose symbol (🌹) prepended.
     * @returns {Message} A Message object
     * with the rose symbol prepended.
     */
    get prependRoseSymbol(): Message;
    /**
     * Appends a not check mark symbol
     * to the text property of the Message
     * instance.
     *
     * @returns {Message}
     */
    get appendNotCheckMark(): Message;
    /**
     * Puts a not check mark symbol to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependNotCheckMark(): Message;
    /**
     * Appends a check mark symbol to
     * the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get appendCheckMark(): Message;
    /**
     * Puts a check mark symbol to
     * the text property to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependCheckMark(): Message;
    /**
     * Appends a check mark in a box
     * symbol to the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get appendBallotBoxWithCheckMark(): Message;
    /**
     * Puts a check mark in a box symbol
     * before the text property of the
     * Message instance.
     *
     * @returns {Message}
     */
    get prependBallotBoxWithCheckMark(): Message;
    /**
     * Appends check mark to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get appendWhiteHeavyCheckMark(): Message;
    /**
     * Puts a check mark before the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get prependWhiteHeavyCheckMark(): Message;
    /**
     * Appends a check mark to the text
     * property of the Message instance.
     *
     * @returns {Message}
     */
    get appendHeavyCheckMark(): Message;
    /**
     * Puts a check mark to the
     * text property of the Message instance.
     * @returns {Message}
     */
    get prependHeavyCheckMark(): Message;
    /**
     * Appends a warning sign symbol to the
     * text property of the Message instance.
     * @returns {Message}
     */
    get appendWarningSign(): Message;
    /**
     * Puts a warning sign symbol before
     * the text property of the Message instance.
     *
     * @returns {Message}
     */
    get prependWarningSign(): Message;
    /**
     * appends n white spaces to the text
     * property of the Message instance.
     *
     * @param {Integer} n
     * @returns {Message}
     */
    appendWhiteSpace(n?: Integer): Message;
    /**
     * Puts n white spaces before the text property
     * of the Message instance.
     *
     * @param {Integer} n
     * @return {Message}
     */
    prependWhiteSpace(n?: Integer): Message;
    /**
     * Prints the final text message
     * or the text property.
     *
     * @return {Message}
     */
    log(): Message;
    /**
     * Prints the text property of the Message instance
     * like information message.
     *
     * @return {Message}
     */
    info(): Message;
    /**
     * Prints the text property of the Message instance
     * like warning message.
     *
     * @return {Message}
     */
    warn(): Message;
    /**
     * Prints the text property
     * of the Message instance like
     * error message. This method
     * throws an error.
     *
     * @return {Message}
     */
    error(): Message;
    static author: string;
    static version: string;
}
