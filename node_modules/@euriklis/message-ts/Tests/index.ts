"use strict";
import message from "../src/message";

new message()
  // .setColor("rgb(0, 255, 0)")
  .setColorGreen
  .appendCheckMark
  .appendWhiteSpace()
  .setColorCyan
  .append("Successfully executed message library!!!")
  .reset.log();

new message()
  .setColor("rgb(200, 50, 30)")
  .setBgColor("rgb(90, 250, 250)")
  .underline
  .bold.italic
  .appendWarningSign
  .appendWhiteSpace()
  .append("Pseudo error message:")
  .appendWhiteSpace()
  .appendFaceWithTearsOfJoy
  .reset.log();

new message()
  .underline
  .setColorCyan
  .append("Hello")
  .appendWhiteSpace()
  .appendAmbulanceSymbol
  .reset.log();

new message()
  .bold.setColorYellow.setBgColor("rgb(45, 140, 200)")
  .appendLogicalForAllSymbol
  .append(" a, b : ")
  .append("a ")
  .appendLogicalElementOfSymbol
  .appendWhiteSpace()
  .appendMathNaturalNumbersSymbol
  .appendWhiteSpace()
  .appendLogicalConjunctionSymbol
  .appendWhiteSpace()
  .append("b")
  .appendWhiteSpace()
  .appendLogicalElementOfSymbol
  .appendWhiteSpace()
  .appendMathNaturalNumbersSymbol
  .appendWhiteSpace()
  .appendLogicalFollowsSymbol
  .appendWhiteSpace()
  .appendLogicalExistsSymbol
  .appendWhiteSpace()
  .append("c :")
  .appendWhiteSpace()
  .append("c ")
  .appendLogicalElementOfSymbol
  .appendWhiteSpace()
  .appendMathNaturalNumbersSymbol
  .appendWhiteSpace()
  .appendLogicalConjunctionSymbol
  .append(" c")
  .appendWhiteSpace()
  .appendLogicalIdentical
  .appendWhiteSpace()
  .append("a + b ").reset.log();

new message()
  .append("\n")
  .bold.setColor("rgb(20, 130, 180)")
  .appendMathCubeRootSymbol
  .append("x + ").appendMathPartialDifferential
  .append("y / ").appendMathPartialDifferential
  .append("x + ").append("w * y = 0").reset.log();

new message()
  .append("This is the ambulance symbol:")
  .appendAmbulanceSymbol
  .append("\n")
  .append("This is the corona virus symbol:")
  .appendCoronaVirusSymbol
  .append("\n")
  .append("This is the copyright symbol:")
  .appendCopyrightSymbol
  .append("\n")
  .append("This is the registered symbol:")
  .appendRegisteredSymbol
  .append("\n")
  .append("This is the masked face symbol:")
  .appendFaceWithMedicalMaskSymbol
  .append("\n")
  .append("This is the hourglass symbol:")
  .appendHourglassSymbol
  .append("\n")
  .append("This is the heart symbol:")
  .appendHeartSymbol
  .append("\n")
  .append("This is the keyboard symbol:")
  .appendKeyboardSymbol
  .append("\n")
  .append("This is a joyful face:")
  .appendFaceWithTearsOfJoy
  .append("\n")
  .append("This is the water symbol:")
  .appendPotableWaterSymbol
  .append("\n")
  .append("This is the Bitcoin symbol:")
  .appendBitcoinSymbol
  .append("\n")
  .append("This is the rose symbol:")
  .appendRoseSymbol
  .append("\n")
  .append("This is the euro symbol:")
  .appendEuroSymbol
  .append("\n")
  .append("This is the question mark symbol:")
  .appendQuestionMarkOrnament
  .append("\n")
  .reset.log();

const error = new Error();
error.name = new message()
  .bold
  .italic
  .underline
  .setColorYellow
  .append("Internal error message:\n").reset.text;

error.message = new message().setColorRed
  .appendWarningSign
  .appendWhiteSpace()
  .setColorCyan
  .append("The file name that was created already exists ")
  .append("so please select other name for your application.")
  .reset.text;
console.log(error.name);
console.log(error.message);

new message()
    .bold
    .italic
    .underline
    .setColorYellow
    .append('Euriklis information message:\n')
    .reset
    .setColorGreen
    .appendCheckMark
    .appendWhiteSpace()
    .setColorCyan
    .append('The message library of the euriklis package was successfully installed.')
    .reset.log()
// print an error message:
new message().bold.italic.underline
    .setBgColorYellow
    .setColorCyan
    .blink
    .append('Euriklis error message:')
    .reset
    .append("\n")
    .setColorRed
    .appendWarningSign
    .appendWhiteSpace()
    .setColorYellow
    .append('The message library of the euriklis package prints error message for you.')
    .reset.log()
