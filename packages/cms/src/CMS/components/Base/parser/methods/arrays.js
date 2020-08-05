import {
  concat as _concat,
  join as _join,
  map as _map,
  nth as _nth,
  reverse as _reverse,
  size as _size,
} from 'lodash';

export const index = (originalValue, value) => _nth(originalValue, value);

export const join = (originalValue, string = ', ') => _join(originalValue, string);

export const length = originalValue => _size(originalValue);

export const concat = (originalValue, array) => _concat(originalValue, array);

export const reverse = originalValue => _reverse(originalValue);

export const map = (originalValue, parsingOptions, parser) => (
  _map(originalValue, item => parser(item, parsingOptions)));
