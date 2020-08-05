import {
  capitalize as _capitalize,
  divide as _divide,
  get as _get,
  isNil as _isNil,
  replace as _replace,
  round as _round,
  split as _split,
  startCase as _startCase,
  upperCase as _upperCase,
} from 'lodash';
import dayjs from 'dayjs';

export const metric = (originalValue) => {
  if (_isNil(originalValue) || originalValue === 0) {
    return null;
  }
  if (originalValue < 1) {
    return `${parseFloat(originalValue.toFixed(3))}`;
  }
  if (originalValue < 999) {
    return `${(originalValue)}`;
  }
  if (originalValue < 999999) {
    return `${originalValue / 1000} k`;
  }
  if (originalValue < 999999999) {
    return `${originalValue / 1000000} M`;
  }

  return `${originalValue / 1000000000} G`;
};

export const prefix = (originalValue, text) => `${text}${originalValue}`;

export const suffix = (originalValue, text) => `${originalValue}${text}`;

export const locale = (originalValue, format = 'en-GB') => (
  new Intl.NumberFormat(format).format(originalValue));

export const decimalPlaces = (originalValue, places = 2) => (
  _round(originalValue, places).toFixed(places));

export const divide = (numerator, demoninator) => _divide(numerator, demoninator);

export const startCase = originalValue => _startCase(originalValue);

export const capitalize = originalValue => _capitalize(originalValue);

export const uppercase = originalValue => _upperCase(originalValue);

export const split = (originalValue, character) => _split(originalValue, character);

export const date = (originalValue, formatting) => dayjs(originalValue).format(formatting);

export const replace = (originalValue, options) => (
  _replace(originalValue, new RegExp(options[0], 'g'), options[1]));

export const lookup = (originalValue, object) => _get(object, originalValue, undefined);
