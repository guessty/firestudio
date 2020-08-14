import {
  difference as _difference,
  every as _every,
  get as _get,
  includes as _includes,
  isEmpty as _isEmpty,
  isPlainObject as _isPlainObject,
  some as _some,
} from 'lodash';

// Prop Parsing Helpers
export const isPointer = (pointer) => {
  if (!_isPlainObject(pointer)) return false;

  const validPointerKeys = ['path', 'parsing', 'type', 'default'];
  const pointerKeys = Object.keys(pointer);

  // TODO: Add help logging for pointer-like objects

  return !((typeof pointer.path === 'undefined')
    || (_difference(pointerKeys, validPointerKeys).length > 0));
};

export const getValueFromProps = (props, potentialPointer, valueParser = value => value) => {
  if (!props || !potentialPointer) return undefined;

  if (!isPointer(potentialPointer)) return potentialPointer;

  const TYPE_DEFAULTS = {
    primitive: '-',
    object: {},
    array: [],
  };

  const POINTER_DEFAULTS = {
    type: 'primitive',
    parsing: undefined,
  };

  const basePointer = {
    ...POINTER_DEFAULTS,
    ...potentialPointer,
  };

  const pointer = {
    ...basePointer,
    default: basePointer.default || TYPE_DEFAULTS[basePointer.type],
  };

  let value = _get(props, pointer.path, pointer.default);

  if (value === pointer.default) return value;

  if (pointer.parsing !== 'undefined' && !_isEmpty(pointer.parsing)) {
    try {
      value = valueParser(value, pointer.parsing);
    } catch {
      value = pointer.type === 'primitive' ? '[Parsing Error]' : pointer.default;
    }
  }

  if (value === null || typeof value === 'undefined' || value === '') {
    value = pointer.default;
  }

  if (pointer.type === 'primitive' && (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')) {
    // eslint-disable-next-line no-console
    console.warn(`Type Warning - The returned value for pointer: "${JSON.stringify(potentialPointer)}" is not a "String", "Number" or "Boolean".`);

    return JSON.stringify(value);
  }

  if (pointer.type === 'array' && !Array.isArray(value)) {
    // eslint-disable-next-line no-console
    console.warn(`Type Warning - The returned value for pointer: "${JSON.stringify(potentialPointer)}" is not an "Array".`);

    return value;
  }

  if (pointer.type === 'object' && !_isPlainObject(value)) {
    // eslint-disable-next-line no-console
    console.warn(`Type Warning - The returned value for pointer: "${JSON.stringify(potentialPointer)}" is not an "Object".`);

    return value;
  }

  return value;
};

export const parseProps = (propsValue, connectedProps, valueParser) => {
  if (isPointer(propsValue)) {
    const pointer = propsValue;
    const parsing = parseProps(pointer.parsing, connectedProps, valueParser);

    return getValueFromProps(connectedProps, {
      ...pointer,
      parsing,
    }, valueParser);
  }

  if (Array.isArray(propsValue)) {
    return propsValue.map(item => parseProps(item, connectedProps, valueParser));
  }

  if (_isPlainObject(propsValue)) {
    return Object.entries(propsValue).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: parseProps(value, connectedProps, valueParser),
    }), {});
  }

  return propsValue;
};

export const OPERATOR_FUNCTIONS = {
  '==': (valueA, valueB) => valueA === valueB,
  '!=': (valueA, valueB) => valueA !== valueB,
  '>': (valueA, valueB) => valueA > valueB,
  '<': (valueA, valueB) => valueA < valueB,
  '>=': (valueA, valueB) => valueA >= valueB,
  '<=': (valueA, valueB) => valueA <= valueB,
  includes: (valueA, valueB) => _includes(valueA, valueB),
};

export const isValidConditional = (conditional) => {
  if (!_isPlainObject(conditional)) return false;

  const validConditionalKeys = ['valueA', 'operator', 'valueB'];
  const conditionalKeys = Object.keys(conditional);
  const { valueA, operator, valueB } = conditional;

  return (
    typeof valueA !== 'undefined' && typeof operator === 'string' && typeof valueB !== 'undefined'
    && _difference(conditionalKeys, validConditionalKeys).length === 0
  );
};

export const evaluateConditional = (conditional) => {
  if (!isValidConditional(conditional)) {
    // eslint-disable-next-line no-console
    console.warn(`Conditional statement "${JSON.stringify(conditional)}" is invalid. Skipping conditional.`);

    return true;
  }

  const { valueA, valueB, operator } = conditional;
  const operatorFnc = OPERATOR_FUNCTIONS[operator];

  if (!operatorFnc) {
    // eslint-disable-next-line no-console
    console.warn(`Conditional statement "${JSON.stringify(conditional)}" is invalid. Operator function not found. Skipping conditional.`);

    return true;
  }

  return operatorFnc(valueA, valueB);
};

export const canComponentRender = (renderCondition) => {
  if (!(_isPlainObject(renderCondition) || Array.isArray(renderCondition))) return true;

  if (_isEmpty(renderCondition)) return true;

  // Is a single conditional
  if (_isPlainObject(renderCondition)) return evaluateConditional(renderCondition);

  // Enables AND behaviour
  return _every(renderCondition, (conditional) => {
    // Enables nested OR behavour
    if (Array.isArray(conditional)) {
      return _some(conditional, nestedConditional => evaluateConditional(nestedConditional));
    }

    return evaluateConditional(conditional);
  });
};
