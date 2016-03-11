webpackJsonp([2],{

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = page;

	var _pageTemplate = __webpack_require__(3);

	var _pageTemplate2 = _interopRequireDefault(_pageTemplate);

	var _mustache = __webpack_require__(1);

	var _mustache2 = _interopRequireDefault(_mustache);

	__webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function page() {
	  return _mustache2.default.render(_pageTemplate2.default, {
	    meaning: 'none'
	  });
	}

/***/ }

});