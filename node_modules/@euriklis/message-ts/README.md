# Euriklis - message package.

## About the package:

The ***@euriklis/message-ts*** package is a typescript tool that provides an utility library for colored console printing of messages with some additional properties like warning symbol, information symbol, check symbol etc. 

# Installation

To install the @euriklis/message package just run the following command in the terminal.

`npm install @euriklis/message-ts --save`

or 

`npm install @euriklis/message-ts --save-exact`

This command will add the package to your node_modules folder.


# Usage:

To use the message library you have to import it to your file:

```ts
import message from '@euriklis/message-ts';
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
```
# Methods:

## message methods

All the methods of the message class return message object, but make changes to the text parameter of the instance. So the architecture of the library allows you to chain the methods of the @euriklis/message-ts library.
Every message instance has a text property, that is the result of the applied methods.

- method bold:
```ts 
new message().bold
``` 
makes the text which will be shown in the terminal after this method to appear in bold style. For example:

```ts
new message().bold.append('This text will be bold...')
    .reset.log()
```
- method italic:
```ts
new message().italic
``` 
makes the text which will be shown in the terminal in italic style. In the example which was shown above we can apply the italic method as well as the bold method.
```ts
new message().bold.italic
    .append('This text will be bold and italic...')
    .reset.log()
```
- method underline:
```ts
 new message().underline 
 ``` 
  this method makes the style of the text that will be shown in the terminal to be underlined.
```js
new message().underline
    .append('Underlined text')
    .reset.log()
```

- method blink:
```ts
new message().blink
``` 
the text that will be shown in the terminal will blink.

- method family setColor:
```ts
/**
 * @param {string}color
 **/
new message().setColor(color)
```
sets the color of the text which will be shown in the terminal. The possible values of the color are 'black', 'red', 'green', 'blue', 'grey', 'violet', 'cyan', 'yellow' and any arbitrary rgb color (typed as string). We recommend you to use the more user-friendly methods setColorRed, setColorCyan and etc...
For example, let us say that we want to write an info message to the terminal with underlined yellow bold style and the content of the information message to be in cyan color, then we have to write:
```ts
import message from '@euriklis/message-ts';
new message().bold.italic.underline
    .setColorYellow // or setColor('yellow')
    .append('Information message:\n')
    .reset // to unset the bold, italic and underline
    .setColorCyan
    .append('The file was successfully updated...')
    .reset.log()
```
- method family setBgColor:
```ts
new message().setBgColor(color)
```
 sets the background color of the text message that will be shown in the terminal. The possible color values of the method are the same with the setColor() method. 

- method reset: 
 ```ts
 new message().reset
 ```
 reset, restart the color/background color and style properties of the text to the default.This method has to be used to unset previous properties like bold, italic, underline. When we want to change the color, it is not necessary to use this method because the setColor... will change the color automatically. For more details, see the example for the underline and bold method above.
 - method family append/prepend:
 ```ts
 /**
  * @param {string} text_message
  **/
 new message().append(text_message)
 ```
 appends a text to the current text property of the message instance. To see the message you have to use the log() method.
 ```ts
 import message from '@euriklis/message-ts'
 new message().append('We appended a text').log()
 ```
 ```ts
appendCheckMark()
```
 appends check mark symbol to the text.
 For example:
 ```ts
 import message '@euriklis/message-ts'
 import validator '@euriklis/validator-ts'
 let buffer = null
 // Here we combine the message library with the
 // @euriklis/validator package to show a more complicated
 // way for the using of the message methods.
 new validator(buffer).isArray.and.isEmpty
     .or.isSame(null).or.isUndefined
     .on(true, () => {
         new message().bold.italic.underline
             .setColorYellow
             .append('Information message:\n').reset
             .setColorGreen
             .appendCheckMark
             .appendWhiteSpace
             .setColorCyan
             .append('The buffer is empty and the program will ')
             .append('start to compute the required values...')
             .reset.log()
     })
 ```

```ts
new message().appendNotCheckMark
```
appends the not check mark symbol (&#x237B;) to the text property of the message instance. (prependNotCheckMark also exists).

```ts
new message().appendWarningSign
```
appends a warning sign (&#x26A0;) to the text property of current the message instance.
 
```ts
new message().appendWhiteSpace 
```
appends an empty interval to the text property.
- method log: 
```ts
new message().log() 
```
prints the message on the terminal. 
- method warn:
```ts
new message().warn()
```
execute console.warn method to the text.
- method error:
```ts
new message().error()
```
execute console.error() method to the text property.
- method info:
```ts
new message().info()
```
execute console.info() method to the text property.

Note that the color, background color and style method are valid only in the node terminal environment.

# More useful examples:

Let say that we want to print a mathematical expression in formal logic. We can use the append_math_... and append_logic_... methods of the library.
```ts
new message()
  .bold.setColorYellow.setBgColor('rgb(45, 140, 200)')
    .appendLogicalForAllSymbol
    .append(' a, b : ')
    .append('a ')
    .appendLogicalElementOfSymbol
    .appendWhiteSpace()
    .appendMathNaturalNumbersSymbol
    .appendWhiteSpace()
    .appendLogicalConjunctionSymbol
    .appendWhiteSpace()
    .append('b')
    .appendWhiteSpace()
    .appendLogicalElementOfSymbol
    .appendWhiteSpace()
    .appendMathNaturalNumbersSymbol
    .appendWhiteSpace()
    .appendLogicalFollowsSymbol
    .appendWhiteSpace()
    .appendLogicalExistsSymbol
    .appendWhiteSpace()
    .append('c :')
    .appendWhiteSpace()
    .append('c ')
    .appendLogicalElementOfSymbol
    .appendWhiteSpace()
    .appendMathNaturalNumbersSymbol
    .appendWhiteSpace()
    .appendLogicalConjunctionSymbol
    .append(' c')
    .appendWhiteSpace()
    .appendLogicalIdentical
    .appendWhiteSpace()
    .append('a + b ').reset.log();
```
and we have to take the following result in the terminal:


<p>
   <div style = "color:yellow;background-color:red;">
   <em>
   ∀ a, b : a ∈ ℕ ⋀ b ∈ ℕ ⇒ ∃ c : c ∈ ℕ ⋀ c ≡ a + b
   </em>
   </div>
</p>

The message library is constructed especially for the needs of writing and printing of mathematical expressions into the terminal, so the methods family 
```ts 
new message().appendMath<some symbol> and
new message().appendLogical<some symbol> 
```
provides a rich assortment of functionalities and methods that ensure the supporting of expressions relevant to the logical programming, mathematical formulas, integrals, differential equations and partial differentials and set theory.

For example we can write a differential equation:

```ts
new message()
    .appendMathCubeRootSymbol
    .append('x + ').appendMathPartialDifferential
    .append('y / ').appendMathPartialDifferential
    .append('x + ').append('w * y = 0').reset.log()
```
and will obtain as result in the terminal:

```
∛x + ∂y / ∂x + w * y = 0
```
Some other new symbols and functionalities that are not mathematical and logic are presenting in the following code:
```ts
new message()
    .append('This is the ambulance symbol:')
    .appendAmbulanceSymbol
    .append('\n')
    .append('This is the corona virus symbol:')
    .appendCoronaVirusSymbol
    .append('\n')
    .append('This is the copyright symbol:')
    .appendCopyrightSymbol
    .append('\n')
    .append('This is the registered symbol:')
    .appendRegisteredSymbol
    .append('\n')
    .append('This is the masked face symbol:')
    .appendFaceWithMedicalMaskSymbol
    .append('\n')
    .append('This is the hourglass symbol:')
    .appendHourglassSymbol
    .append('\n')
    .append('This is the heart symbol:')
    .appendHeartSymbol
    .append('\n')
    .append('This is the keyboard symbol:')
    .appendKeyboardSymbol
    .append('\n')
    .append('This is a joyful face:')
    .appendFaceWithTearsOfJoy
    .append('\n')
    .append('This is the water symbol:')
    .appendPotableWaterSymbol
    .append('\n')
    .append('This is the Bitcoin symbol:')
    .appendBitcoinSymbol
    .append('\n')
    .append('This is the rose symbol:')
    .appendRoseSymbol
    .append('\n')
    .append('This is the euro symbol:')
    .appendEuroSymbol
    .append('\n')
    .append('This is the question mark symbol:')
    .appendQuestionMarkOrnament
    .append('\n')
    .reset.log()
```
The expected output in the terminal has to be:

```
This is the ambulance symbol:🚑
This is the corona virus symbol:🦠
This is the copyright symbol:©
This is the registered symbol:®
This is the masked face symbol:😷
This is the hourglass symbol:⌛
This is the heart symbol:❤
This is the keyboard symbol:⌨
This is a joyful face:😂
This is the water symbol:🚰
This is the Bitcoin symbol:₿
This is the rose symbol:🌹
This is the euro symbol:€
This is the question mark symbol:❓
```

Note for the non console messages. The symbols that are supported of the message library can be used also in the html files or in the site text content. The only exception in this case is that the method family setColor(...) , setBgColor(...), error(), warn(), reset(), italic(), bold(), underline/underscore() and log() can not be used. If you want to put the obtained text content just get the text property of the message instance. The same issue is valid for the Error throwing , where for the throwing of error we simply have to get the text property. For example:
```ts
import message from '@euriklis/message-ts';
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
``` 


# Bugs and tips

If you want to inform me for some mistakes or errors which exist in the library, use the issues section of the repository.

# License

This project has MIT license. Everyone who uses it must know that the author may not be held liable for any third party software and hardware caused damages.
