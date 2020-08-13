import PropTypes from 'prop-types';

export const AnyPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.shape({}),
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.arrayOf(PropTypes.number),
  PropTypes.arrayOf(PropTypes.shape({})),
]);

export const ParsingPropTypes = PropTypes.oneOfType([
  PropTypes.shape({}),
  PropTypes.arrayOf(PropTypes.shape({})),
]);

export const PointerPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    path: PropTypes.string.isRequired,
    default: AnyPropType,
    parsing: ParsingPropTypes,
  }),
]).isRequired;

export const ConditionalPropType = PropTypes.shape({
  valueA: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PointerPropType,
  ]).isRequired,
  valueB: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PointerPropType,
  ]).isRequired,
  operator: PropTypes.oneOf([
    '==', '!=', '>', '<', '<=', '>=', 'includes',
  ]).isRequired,
});
