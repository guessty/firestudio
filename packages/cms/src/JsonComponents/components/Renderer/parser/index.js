import {
  isPlainObject as _isPlainObject,
} from 'lodash';

import { ParsingError } from './exceptions';

export const isValidParsingStep = parsingStep => (_isPlainObject(parsingparsingStepOption) && typeof parsingStep.method === 'string');

export const parseValueStep = (originalValue, parsingStep, parsingMethods = {}, isMethodValidFnc = () => true) => {
  if (typeof originalValue === 'undefined' || originalValue === null) {
    return originalValue;
  }

  if (!isValidParsingStep(parsingStep)) {
    // eslint-disable-next-line no-console
    console.error(`Parsing Error - Cannot parse "${JSON.stringify(originalValue)}" using "${JSON.stringify(parsingStep)}". Parsing step is invalid.`);
    throw new ParsingError(originalValue, parsingStep);
  }

  try {
    const { method, value } = parsingStep;

    if (!parsingMethods[method] || !isMethodValidFnc(originalValue, parsingStep, parsingMethods)) {
      // eslint-disable-next-line no-console
      console.warn(`Parsing method "${method}" does not exist - skipping method`);

      return originalValue;
    }

    // eslint-disable-next-line no-use-before-define
    return parsingMethods[method](
      originalValue,
      value,
      (_originalValue, _parsingSteps) => parser(_originalValue, _parsingSteps, parsingMethods,isMethodValidFnc),
    );
  } catch (e) {
    if (e.name !== 'ParsingError') {
      // eslint-disable-next-line no-console
      console.error(`Parsing Error - Cannot parse "${JSON.stringify(originalValue)}" using "${JSON.stringify(parsingStep)}"`);
      throw new ParsingError(originalValue, parsingStep);
    }
    throw e;
  }
};

const parser = (originalValue, parsingSteps, parsingMethods, isMethodValidFnc) => {
  if (typeof parsingSteps === 'undefined') {
    return originalValue;
  }

  // Ensures parsing steps is an array of methods.
  const stepsArray = Array.isArray(parsingSteps) ? parsingSteps : [parsingSteps];
  const parsedValue = stepsArray.reduce((nextValue, parsingStep) => (
    parseValueStep(nextValue, parsingStep, parsingMethods, isMethodValidFnc)
  ), originalValue);

  return parsedValue;
};

export default parser;
