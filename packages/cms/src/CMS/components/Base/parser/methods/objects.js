import {
  assign as _assign,
  get as _get,
  keys as _keys,
  toPairs as _toPairs,
  values as _values,
} from 'lodash';

export const get = (originalValue, path) => _get(originalValue, path, undefined);

export const keys = originalValue => _keys(originalValue);

export const values = originalValue => _values(originalValue);

export const assign = (originalValue, object) => _assign({}, originalValue, object);

export const joinObject = (originalValue, string = ': ') => _toPairs(originalValue)
  .map(([pairKey, pairValue]) => `${pairKey}${string}${pairValue}`);

export const transformObject = (originalValue, tranformations, parser) => (
  _toPairs(originalValue).reduce((acc, [pairKey, pairValue]) => {
    const pairParsingOptions = tranformations || {};

    const pairKeyOptions = pairParsingOptions.keyParsing || [];
    const parsedKey = parser(pairKey, pairKeyOptions);

    const pairValueOptions = pairParsingOptions.valueParsing || [];
    const parsedValue = parser(pairValue, pairValueOptions);

    return {
      ...acc,
      [parsedKey]: parsedValue,
    };
  }, {})
);
