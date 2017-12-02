define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var test = require("tape-compat");
var nextTick = require('process-nextick-args');

test('should work', function (t) {
  t.plan(5);
  nextTick(function (a) {
    t.ok(a);
    nextTick(function (thing) {
      t.equals(thing, 7);
    }, 7);
  }, true);
  nextTick(function (a, b, c) {
    t.equals(a, 'step');
    t.equals(b, 3);
    t.equals(c, 'profit');
  }, 'step', 3,  'profit');
});

test('correct number of arguments', function (t) {
  t.plan(1);
  nextTick(function () {
    t.equals(2, arguments.length, 'correct number');
  }, 1, 2);
});

require = requireOrig;});
