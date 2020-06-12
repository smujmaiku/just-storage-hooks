"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useStorage;
exports.useStorageState = useStorageState;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useStorage(key) {
  var state = (0, _react.useMemo)(function () {
    try {
      var item = localStorage.getItem(key);
      if (item === null) return undefined;
      return JSON.parse(item);
    } catch (err) {
      return undefined;
    }
  }, [key]);
  var storeState = (0, _react.useCallback)(function (data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }, [key]);
  return [state, storeState];
}

function useStorageState(key, defaultState) {
  var _useStorage = useStorage(key),
      _useStorage2 = _slicedToArray(_useStorage, 2),
      init = _useStorage2[0],
      storeState = _useStorage2[1];

  var _useState = (0, _react.useState)(init !== undefined ? init : defaultState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var saveState = (0, _react.useCallback)(function (data) {
    setState(data);
    storeState(data);
  }, [storeState]);
  return [state, saveState];
}