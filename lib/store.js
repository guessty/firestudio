"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.StateContainer = exports.StoreDebugger = exports.Store = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/web.dom.iterable");

var React = _interopRequireWildcard(require("react"));

var Unstated = _interopRequireWildcard(require("unstated"));

var _deepObjectDiff = require("deep-object-diff");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
var Store = Unstated.Provider;
exports.Store = Store;
var FIRESTUDIO_STORE_DEBUGGER = {
  isEnabled: false
};

if (typeof window !== 'undefined') {
  window.FIRESTUDIO_STORE_DEBUGGER = FIRESTUDIO_STORE_DEBUGGER;
}

var StoreDebugger = FIRESTUDIO_STORE_DEBUGGER;
exports.StoreDebugger = StoreDebugger;

var StateContainer =
/*#__PURE__*/
function (_Unstated$Container) {
  _inherits(StateContainer, _Unstated$Container);

  function StateContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StateContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setState",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(updater, callback) {
        var name, prevState, newState, diff, hasChanges;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _this.constructor.name;
                prevState = _objectSpread({}, _this.state);
                _context.next = 4;
                return _get(_getPrototypeOf(StateContainer.prototype), "setState", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), updater, callback);

              case 4:
                newState = _objectSpread({}, _this.state);

                if (FIRESTUDIO_STORE_DEBUGGER.isEnabled) {
                  diff = (0, _deepObjectDiff.detailedDiff)(prevState, newState);
                  console.groupCollapsed(name);

                  hasChanges = function hasChanges(obj) {
                    return !!Object.keys(obj).length;
                  };

                  if (hasChanges(diff.added)) {
                    console.log('Added\n', diff.added);
                  }

                  if (hasChanges(diff.updated)) {
                    console.log('Updated\n', diff.updated);
                  }

                  if (hasChanges(diff.deleted)) {
                    console.log('Deleted\n', diff.deleted);
                  }

                  console.log('New state\n', newState);
                  console.log('Old state\n', prevState);
                  console.groupEnd();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    return _this;
  }

  return StateContainer;
}(Unstated.Container);

exports.StateContainer = StateContainer;

var connect = function connect(to) {
  return function (Component) {
    return function (props) {
      var containers = Object.keys(to).map(function (key) {
        return to[key];
      });
      return React.createElement(Unstated.Subscribe, {
        to: _toConsumableArray(containers)
      }, function () {
        for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          values[_key2] = arguments[_key2];
        }

        var mappedContainers = Object.keys(to).reduce(function (acc, key, i) {
          acc[key] = values[i];
          return acc;
        }, {});
        return React.createElement(Component, _extends({}, props, mappedContainers));
      });
    };
  };
};

exports.connect = connect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvc3RvcmUudHN4Il0sIm5hbWVzIjpbIlN0b3JlIiwiVW5zdGF0ZWQiLCJQcm92aWRlciIsIkZJUkVTVFVESU9fU1RPUkVfREVCVUdHRVIiLCJpc0VuYWJsZWQiLCJ3aW5kb3ciLCJTdG9yZURlYnVnZ2VyIiwiU3RhdGVDb250YWluZXIiLCJ1cGRhdGVyIiwiY2FsbGJhY2siLCJuYW1lIiwiY29uc3RydWN0b3IiLCJwcmV2U3RhdGUiLCJzdGF0ZSIsIm5ld1N0YXRlIiwiZGlmZiIsImNvbnNvbGUiLCJncm91cENvbGxhcHNlZCIsImhhc0NoYW5nZXMiLCJvYmoiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYWRkZWQiLCJsb2ciLCJ1cGRhdGVkIiwiZGVsZXRlZCIsImdyb3VwRW5kIiwiQ29udGFpbmVyIiwiY29ubmVjdCIsInRvIiwiQ29tcG9uZW50IiwicHJvcHMiLCJjb250YWluZXJzIiwibWFwIiwia2V5IiwidmFsdWVzIiwibWFwcGVkQ29udGFpbmVycyIsInJlZHVjZSIsImFjYyIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxRQUFRLENBQUNDLFFBQXZCOztBQUVBLElBQU1DLHlCQUF5QixHQUFHO0FBQ2hDQyxFQUFBQSxTQUFTLEVBQUU7QUFEcUIsQ0FBbEM7O0FBSUEsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDQSxFQUFBQSxNQUFELENBQWdCRix5QkFBaEIsR0FBNENBLHlCQUE1QztBQUNBOztBQUVELElBQU1HLGFBQWEsR0FBR0gseUJBQXRCOzs7SUFFTUksYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29GQUNJLEU7Ozs7Ozs7Z0NBQ0csaUJBQ1RDLE9BRFMsRUFFVEMsUUFGUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJSEMsZ0JBQUFBLElBSkcsR0FJSSxNQUFLQyxXQUFMLENBQWlCRCxJQUpyQjtBQUtIRSxnQkFBQUEsU0FMRyxxQkFLYyxNQUFLQyxLQUxuQjtBQUFBO0FBQUEsc0pBTVlMLE9BTlosRUFNcUJDLFFBTnJCOztBQUFBO0FBT0hLLGdCQUFBQSxRQVBHLHFCQU9hLE1BQUtELEtBUGxCOztBQVNULG9CQUFJVix5QkFBeUIsQ0FBQ0MsU0FBOUIsRUFBeUM7QUFDakNXLGtCQUFBQSxJQURpQyxHQUtuQyxrQ0FBYUgsU0FBYixFQUF3QkUsUUFBeEIsQ0FMbUM7QUFPdkNFLGtCQUFBQSxPQUFPLENBQUNDLGNBQVIsQ0FBdUJQLElBQXZCOztBQUNNUSxrQkFBQUEsVUFSaUMsR0FRcEIsU0FBYkEsVUFBYSxDQUFDQyxHQUFEO0FBQUEsMkJBQWMsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQVAsQ0FBWUYsR0FBWixFQUFpQkcsTUFBakM7QUFBQSxtQkFSb0I7O0FBVXZDLHNCQUFJSixVQUFVLENBQUNILElBQUksQ0FBQ1EsS0FBTixDQUFkLEVBQTRCO0FBQzFCUCxvQkFBQUEsT0FBTyxDQUFDUSxHQUFSLENBQVksU0FBWixFQUF1QlQsSUFBSSxDQUFDUSxLQUE1QjtBQUNEOztBQUVELHNCQUFJTCxVQUFVLENBQUNILElBQUksQ0FBQ1UsT0FBTixDQUFkLEVBQThCO0FBQzVCVCxvQkFBQUEsT0FBTyxDQUFDUSxHQUFSLENBQVksV0FBWixFQUF5QlQsSUFBSSxDQUFDVSxPQUE5QjtBQUNEOztBQUVELHNCQUFJUCxVQUFVLENBQUNILElBQUksQ0FBQ1csT0FBTixDQUFkLEVBQThCO0FBQzVCVixvQkFBQUEsT0FBTyxDQUFDUSxHQUFSLENBQVksV0FBWixFQUF5QlQsSUFBSSxDQUFDVyxPQUE5QjtBQUNEOztBQUVEVixrQkFBQUEsT0FBTyxDQUFDUSxHQUFSLENBQVksYUFBWixFQUEyQlYsUUFBM0I7QUFDQUUsa0JBQUFBLE9BQU8sQ0FBQ1EsR0FBUixDQUFZLGFBQVosRUFBMkJaLFNBQTNCO0FBQ0FJLGtCQUFBQSxPQUFPLENBQUNXLFFBQVI7QUFDRDs7QUFsQ1E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7RUFGZ0IxQixRQUFRLENBQUMyQixTOzs7O0FBOEMvQixJQUFNQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxFQUFEO0FBQUEsU0FBYSxVQUFDQyxTQUFEO0FBQUEsV0FBb0IsVUFBQ0MsS0FBRCxFQUFnQjtBQUN0RSxVQUFNQyxVQUFVLEdBQUdiLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUyxFQUFaLEVBQWdCSSxHQUFoQixDQUFvQixVQUFBQyxHQUFHO0FBQUEsZUFBSUwsRUFBRSxDQUFDSyxHQUFELENBQU47QUFBQSxPQUF2QixDQUFuQjtBQUNBLGFBQ0Usb0JBQUMsUUFBRCxDQUFVLFNBQVY7QUFBb0IsUUFBQSxFQUFFLHFCQUFNRixVQUFOO0FBQXRCLFNBQ0csWUFBZTtBQUFBLDJDQUFYRyxNQUFXO0FBQVhBLFVBQUFBLE1BQVc7QUFBQTs7QUFDZCxZQUFNQyxnQkFBZ0IsR0FBR2pCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUyxFQUFaLEVBQWdCUSxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQVVKLEdBQVYsRUFBZUssQ0FBZixFQUFxQjtBQUNuRUQsVUFBQUEsR0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0MsTUFBTSxDQUFDSSxDQUFELENBQWpCO0FBQ0EsaUJBQU9ELEdBQVA7QUFDRCxTQUh3QixFQUd0QixFQUhzQixDQUF6QjtBQUlBLGVBQU8sb0JBQUMsU0FBRCxlQUFlUCxLQUFmLEVBQTBCSyxnQkFBMUIsRUFBUDtBQUNELE9BUEgsQ0FERjtBQVdELEtBYm1DO0FBQUEsR0FBYjtBQUFBLENBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgKiBhcyBVbnN0YXRlZCBmcm9tICd1bnN0YXRlZCdcbmltcG9ydCB7IGRldGFpbGVkRGlmZiB9IGZyb20gJ2RlZXAtb2JqZWN0LWRpZmYnXG4vL1xuXG5jb25zdCBTdG9yZSA9IFVuc3RhdGVkLlByb3ZpZGVyXG5cbmNvbnN0IEZJUkVTVFVESU9fU1RPUkVfREVCVUdHRVIgPSB7XG4gIGlzRW5hYmxlZDogZmFsc2UsXG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHQod2luZG93IGFzIGFueSkuRklSRVNUVURJT19TVE9SRV9ERUJVR0dFUiA9IEZJUkVTVFVESU9fU1RPUkVfREVCVUdHRVI7XG59XG5cbmNvbnN0IFN0b3JlRGVidWdnZXIgPSBGSVJFU1RVRElPX1NUT1JFX0RFQlVHR0VSXG5cbmNsYXNzIFN0YXRlQ29udGFpbmVyIGV4dGVuZHMgVW5zdGF0ZWQuQ29udGFpbmVyPGFueT4ge1xuICBzdGF0ZSA9IHt9XG4gIHNldFN0YXRlID0gYXN5bmMgKFxuICAgIHVwZGF0ZXI6IG9iamVjdCB8ICgocHJldlN0YXRlOiBvYmplY3QpID0+IG9iamVjdCksXG4gICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICBjb25zdCBwcmV2U3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUgfVxuICAgIGF3YWl0IHN1cGVyLnNldFN0YXRlKHVwZGF0ZXIsIGNhbGxiYWNrKVxuICAgIGNvbnN0IG5ld1N0YXRlID0geyAuLi50aGlzLnN0YXRlIH1cblxuICAgIGlmIChGSVJFU1RVRElPX1NUT1JFX0RFQlVHR0VSLmlzRW5hYmxlZCkge1xuICAgICAgY29uc3QgZGlmZjoge1xuICAgICAgICBhZGRlZD86IHN0cmluZyxcbiAgICAgICAgdXBkYXRlZD86IHN0cmluZyxcbiAgICAgICAgZGVsZXRlZD86IHN0cmluZyxcbiAgICAgIH0gPSBkZXRhaWxlZERpZmYocHJldlN0YXRlLCBuZXdTdGF0ZSlcbiAgXG4gICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKG5hbWUpXG4gICAgICBjb25zdCBoYXNDaGFuZ2VzID0gKG9iajogYW55KSA9PiAhIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoXG4gIFxuICAgICAgaWYgKGhhc0NoYW5nZXMoZGlmZi5hZGRlZCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGVkXFxuJywgZGlmZi5hZGRlZCk7XG4gICAgICB9XG4gIFxuICAgICAgaWYgKGhhc0NoYW5nZXMoZGlmZi51cGRhdGVkKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRlZFxcbicsIGRpZmYudXBkYXRlZCk7XG4gICAgICB9XG4gIFxuICAgICAgaWYgKGhhc0NoYW5nZXMoZGlmZi5kZWxldGVkKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlZFxcbicsIGRpZmYuZGVsZXRlZCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdOZXcgc3RhdGVcXG4nLCBuZXdTdGF0ZSk7XG4gICAgICBjb25zb2xlLmxvZygnT2xkIHN0YXRlXFxuJywgcHJldlN0YXRlKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBTdG9yZSxcbiAgU3RvcmVEZWJ1Z2dlcixcbiAgU3RhdGVDb250YWluZXIsXG59XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0ID0gKHRvOiBhbnkpID0+IChDb21wb25lbnQ6IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcbiAgY29uc3QgY29udGFpbmVycyA9IE9iamVjdC5rZXlzKHRvKS5tYXAoa2V5ID0+IHRvW2tleV0pXG4gIHJldHVybiAoXG4gICAgPFVuc3RhdGVkLlN1YnNjcmliZSB0bz17Wy4uLmNvbnRhaW5lcnNdfT5cbiAgICAgIHsoLi4udmFsdWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBlZENvbnRhaW5lcnMgPSBPYmplY3Qua2V5cyh0bykucmVkdWNlKChhY2M6YW55LCBrZXksIGkpID0+IHtcbiAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlc1tpXTtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gey4uLm1hcHBlZENvbnRhaW5lcnN9IC8+O1xuICAgICAgfX1cbiAgICA8L1Vuc3RhdGVkLlN1YnNjcmliZT5cbiAgKVxufVxuIl19