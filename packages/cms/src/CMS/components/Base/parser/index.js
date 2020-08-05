import {
  isPlainObject as _isPlainObject,
} from 'lodash';

import { primitiveMethods, arrayMethods, objectMethods } from './methods';
import { ParsingError } from './exceptions';

export const isPrimitiveMethod = method => Object.keys(primitiveMethods).includes(method);

export const isObjectMethod = method => Object.keys(objectMethods).includes(method);

export const isArrayMethod = method => Object.keys(arrayMethods).includes(method);

// Ensures value is a primative ie string or number - it doesn't include booleans though
export const isValidPrimitive = originalValue => (
  typeof originalValue === 'string' || typeof originalValue === 'number');

export const isValidObject = originalValue => _isPlainObject(originalValue);

export const isValidArray = originalValue => Array.isArray(originalValue);

export const isValidParsingOption = parsingOption => (
  _isPlainObject(parsingOption) && typeof parsingOption.method === 'string');

const logError = (originalValue, parsingOption, messagePartial) => {
  // eslint-disable-next-line no-console
  console.error(`Parsing Type Error - Value is not ${messagePartial}. Cannot parse "${JSON.stringify(originalValue)}" using "${JSON.stringify(parsingOption)}"`);
};

export const parseValueWithOption = (originalValue, parsingOption) => {
  if (typeof originalValue === 'undefined' || originalValue === null) {
    return originalValue;
  }

  if (!isValidParsingOption(parsingOption)) {
    // eslint-disable-next-line no-console
    console.error(`Parsing Error - Cannot parse "${JSON.stringify(originalValue)}" using "${JSON.stringify(parsingOption)}". Parsing option is invalid.`);
    throw new ParsingError(originalValue, parsingOption);
  }

  try {
    const { method, value } = parsingOption;

    if (isPrimitiveMethod(method)) {
      if (!isValidPrimitive(originalValue)) {
        logError(originalValue, parsingOption, 'a "String" or "Number"');
        throw new ParsingError(originalValue, parsingOption);
      }

      // eslint-disable-next-line no-use-before-define
      return primitiveMethods[method](originalValue, value, parser);
    }

    if (isArrayMethod(method)) {
      if (!isValidArray(originalValue)) {
        logError(originalValue, parsingOption, 'an "Array"');
        throw new ParsingError(originalValue, parsingOption);
      }

      // eslint-disable-next-line no-use-before-define
      return arrayMethods[method](originalValue, value, parser);
    }

    if (isObjectMethod(method)) {
      if (!isValidObject(originalValue)) {
        logError(originalValue, parsingOption, 'an "Object"');
        throw new ParsingError(originalValue, parsingOption);
      }

      // eslint-disable-next-line no-use-before-define
      return objectMethods[method](originalValue, value, parser);
    }

    // eslint-disable-next-line no-console
    console.warn(`Parsing method "${method}" does not exist - skipping method`);

    return originalValue;
  } catch (e) {
    if (e.name !== 'ParsingError') {
      // eslint-disable-next-line no-console
      console.error(`Parsing Error - Cannot parse "${JSON.stringify(originalValue)}" using "${JSON.stringify(parsingOption)}"`);
      throw new ParsingError(originalValue, parsingOption);
    }
    throw e;
  }
};

const parser = (originalValue, parsingOptions) => {
  if (typeof parsingOptions === 'undefined') {
    return originalValue;
  }

  // Ensures parsing options is an array of methods.
  const optionsArray = Array.isArray(parsingOptions) ? parsingOptions : [parsingOptions];
  const parsedValue = optionsArray.reduce((nextValue, parsingOption) => (
    parseValueWithOption(nextValue, parsingOption)
  ), originalValue);

  return parsedValue;
};

export default parser;
