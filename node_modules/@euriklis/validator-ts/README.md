# @euriklis/validator-ts

A versatile TypeScript library for conditional analysis, testing, and validation of JavaScript/TypeScript types.

## Installation

You can install the `@euriklis/validator-ts` package using npm:

```sh
npm install @euriklis/validator-ts
```
Alternatively, you can install a specific version using the --save-exact flag:

```sh
npm install @euriklis/validator-ts@<version> --save-exact
```
This command will add the package to your node_modules folder.

# Usage

The **@euriklis/validator-ts** library is designed for conditional testing, allowing you to create complex compositions of checking criteria and obtain the logical results of these tests. For example, if you have a user, a registration protocol, and a database, you can use the validator to test if the registration criteria are fulfilled:

```ts
const user = {
    username: 'Harris',
    password: 'k12d87dc3A!43d',
    email: 'example@mail.com',
    age: 22
};

const users = DB.getUsers();
const has_payment = true;

new validator(user)
    .interface({
        username: usr => usr.isString.and.hasLengthEqualsOrGreaterThan(6),
        password: psw => psw.isString.and.hasLengthGreaterThan(6),
        email: mail => mail.isString.and.isEmail,
        age: age => age.isEqualOrGreaterThan(18)
    })
    .and.bind(new validator(user.not.isSameWithAny(users)))
    .and.bind(new validator(has_payment).isSame(true))
    .on(true, () => makeRegistration(user))
    .on(false, () => requireInfo(users, user, has_payment));

```


 You can use methods like isInteger, isArray, isNumber, isString, isObject, isUndefined, isEmpty, and more without parentheses. Additionally you may use the operators and, or, and not. For example:

```ts
import validator from '@euriklis/validator-ts';

const array: number[] = [1, 2, 3, 4, 5, 8, 12];

new validator(array)
    .isIntegerArray
    .or.isStringArray
    .on(true, () => console.log('The array contains only integers or strings.'));
```

Because of the fact that the package uses private methods, please note that private methods require Node.js version 12.0.0 or higher, Chrome version 74 or higher, and Firefox version 90 or higher. 

# Methods

The most of the methods of the **@euriklis/validator-ts** return a validator instance, allowing you to chain methods. The result of the comparison (the answer) and the condition fulfillment are recorded in the "answer" property. Here's an example:

```ts
import validator from '@euriklis/validator-ts';

let a:number = 5, b:number = 12, c:number | string[] = [11, 13];

let result = new validator(a)
    .isInteger
    .and.isLessThan(6).or.isInClosedRange(5, 6)
    .and.bind(
        new validator(b).isInteger.and
            .isGreaterThan(10)
    )
    .and.bind(
        new validator(c).isNumberArray
            .and.not.forAny(number => {
                return number.isFloat();
            })
    )
    .answer;

console.log(result); // true

```

# Bugs and Tips

If you encounter any issues or have tips to share, please feel free to contact us. You can reach us or to publish your suggestion in the issues section of the github repo of the package.

# License

The **@euriklis/validator-ts** package is released under the MIT License. It is provided for free for personal and non-commercial use. The author of the package is not liable for errors in third-party software, libraries, packages, or source code used in conjunction with this library.
