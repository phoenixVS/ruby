"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

exports('live', function (params, done) {
  $('.live').empty();
  insertHtmlModules({
    ".live": ["main/live.html"]
  }, function () {
    var _window$currentView;

    var ID = params.sportId;
    var eventsCount = 0;
    var index = 0;

    if (typeof ID !== 'undefined') {
      var _iterator = _createForOfIteratorHelper(window.inplay),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          sport = _step.value;

          if (sport.id == ID) {
            break;
          }

          index++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    (_window$currentView = window.currentView) === null || _window$currentView === void 0 ? void 0 : _window$currentView.categories.forEach(function (category) {
      category.leagues.forEach(function (league) {
        var _league$events;

        (_league$events = league.events) === null || _league$events === void 0 ? void 0 : _league$events.forEach(function (event) {
          eventsCount++;
        }, 0);
      }, 0);
    }, 0);
    $('.live-title span.font.mr').text("".concat(eventsCount, " EVENTS"));
    setTimeout(function () {
      console.log("live-title length: ", $('.live-title').length);

      if ($('.live-title').length > 1) {
        $("[data-id=live] .live-title:last-child").remove();
      }
    }, 10);
    done();
  });
});