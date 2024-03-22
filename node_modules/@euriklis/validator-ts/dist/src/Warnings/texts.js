'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningMessage = exports.IncorrectTypeInExecuteWith = exports.IncorrectValueInIsPositive = exports.IncorrectValueInIsNegative = exports.IncorrectStateInOnMethod = exports.IncorrectFunctionInOnMethod = void 0;
exports.IncorrectFunctionInOnMethod = 'Incorrect function argument in on method of the validator method.';
exports.IncorrectStateInOnMethod = 'Incorrect state argument in the on method in the validator method.';
exports.IncorrectValueInIsNegative = 'Incorrect value property of the current validator instance. Note that if the value is not number, the is_negative() / isNegative method is not usable. The method returns false, but the result may be incorrect.';
exports.IncorrectValueInIsPositive = 'Incorrect value property of the current validator instance. Note that if the value is not number, the is_positive() / isPositive method is not usable. The method returns false, but the result may be incorrect.';
exports.IncorrectTypeInExecuteWith = 'Incorrect type of the parameter of the execute_with method. The parameter has to be function or async function.';
exports.WarningMessage = 'Euriklis validator library warning message:';
