webpackJsonp([2],{

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = page;

	var _canvas = __webpack_require__(2);

	var _schedulers = __webpack_require__(1);

	var _normal = __webpack_require__(3);

	var _normal2 = _interopRequireDefault(_normal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function page() {
	  var id = 'thesecond';
	  var distribution = (0, _normal2.default)(0, 1, id /* seed */, 0.5, 0.2);
	  var bounceDistribution = (0, _normal2.default)(0, 1000, id, 500, 200);
	  var data = [];
	  var numPoints = 120;
	  var horizontalSpeed = 50; // pixels/ms
	  var horizontalPosition = 0;
	  var bounceRate = bounceDistribution(); // ms
	  var bouncePercentage = 0;
	  var direction = 1;
	  for (var i = 0; i < numPoints + 2; i++) {
	    data.push(distribution());
	  }

	  (0, _schedulers.elapsed)((0, _canvas.canvasContext)(id, function (context, timeElapsed) {
	    var width = context.canvas.width;
	    var height = context.canvas.height;

	    var midline = height / 2;
	    var step = width / numPoints;

	    bouncePercentage += timeElapsed / bounceRate * direction;
	    if (bouncePercentage > 1 || bouncePercentage < -1) {
	      bouncePercentage = Math.max(-1, Math.min(1, bouncePercentage));
	      direction = direction * -1;
	      bounceRate = bounceDistribution();
	    }
	    var verticalScale = midline * 1.5 * easeIn(bouncePercentage);

	    if (timeElapsed > 0) {
	      horizontalPosition += horizontalSpeed / timeElapsed;
	    }
	    if (horizontalPosition > step) {
	      horizontalPosition -= step * 2;
	      data.unshift(distribution());
	      data.unshift(distribution());
	      data.pop();
	      data.pop();
	    }

	    context.fillStyle = 'rgb(30,30,30)';
	    context.fillRect(0, 0, width, height);
	    context.beginPath();
	    context.moveTo(horizontalPosition - step, midline);
	    data.forEach(function (datum, i) {
	      var x = (i - 1) * step + horizontalPosition;
	      var noise = verticalScale * (i % 2 === 0 ? datum : -datum);
	      var y = midline + noise;
	      context.quadraticCurveTo(x + step / 2, y, x + step, midline);
	    });
	    context.strokeStyle = 'rgb(91, 185, 95)';
	    context.stroke();
	  }));

	  return '' + (0, _canvas.fullScreenCanvas)(id);
	}

	function easeIn(value) {
	  return Math.pow(value, 3);
	}

/***/ }

});