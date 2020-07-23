"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports('langs', function (params, done) {
  function loadLanguage() {
    return _loadLanguage.apply(this, arguments);
  }

  function _loadLanguage() {
    _loadLanguage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _Cookies$get2;

      var language, scr, dic;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              language = (_Cookies$get2 = Cookies.get('lang')) !== null && _Cookies$get2 !== void 0 ? _Cookies$get2 : 'English';
              console.log("cookies get lang", language);
              scr = document.createElement("script");
              dic = {
                'English': 'eng-l.js',
                'Russian': 'rus-l.js'
              };
              scr.src = 'js/langs/' + dic[language];
              scr.setAttribute('data-langname', language);
              document.head.appendChild(scr);
              return _context.abrupt("return");

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _loadLanguage.apply(this, arguments);
  }

  ;
  loadLanguage();

  window.translate = function () {
    var _Cookies$get;

    var language = (_Cookies$get = Cookies.get('lang')) !== null && _Cookies$get !== void 0 ? _Cookies$get : 'English';

    if ($("script#lang[data-langname=".concat(language, "]")).length == 0) {
      loadLanguage().then(function () {
        setTimeout(function () {
          if (typeof window.dict !== 'undefined') {
            $("[data-lang]").each(function (i, el) {
              if ($(el).is('input')) {
                $(el).attr('placeholder', window.dict[$(el).data("lang")]);
              }

              $(el).text(window.dict[$(el).data("lang")]);
            });
          }
        }, 500);
      });
    } else {
      if (typeof window.dict !== 'undefined') {
        $("[data-lang]").each(function (i, el) {
          if ($(el).is('input')) {
            $(el).attr('placeholder', window.dict[$(el).data("lang")]);
          }

          $(el).text(window.dict[$(el).data("lang")]);
        });
      }
    }
  };
});