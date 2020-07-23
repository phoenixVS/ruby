"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function insertHtmlModules(srcs, onLoad) {
  var keys = Object.keys(srcs);

  (function processKey(keyIndex) {
    if (keyIndex < keys.length) {
      var root = $(keys[keyIndex]);
      var elements = srcs[keys[keyIndex]];

      (function processElement(index) {
        if (index < elements.length) {
          $.get("html/modules/" + elements[index], function (data) {
            $(data).appendTo(root);
            processElement(index + 1);
          });
        } else {
          processKey(keyIndex + 1);
        }
      })(0);
    } else {
      if (onLoad) onLoad();
    }
  })(0);
}

;

function loadJsModules(_x) {
  return _loadJsModules.apply(this, arguments);
} // Loading css dynamically


function _loadJsModules() {
  _loadJsModules = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
    var keys, asyncs, i, modulesLoaded, processKey, _processKey;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _processKey = function _processKey3() {
              _processKey = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
                var moduleName, moduleParams;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        moduleName = keys[index];
                        moduleParams = config[keys[index]]; // load css if it's needed

                        if (moduleParams.loadCSS) {
                          loadCSS(moduleParams, moduleName);
                        }

                        imports("dist/modules/" + moduleName + ".js", function (load) {
                          load(moduleParams, function () {
                            return Promise.resolve('imported');
                          });
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _processKey.apply(this, arguments);
            };

            processKey = function _processKey2(_x2) {
              return _processKey.apply(this, arguments);
            };

            keys = Object.keys(config);
            asyncs = [];

            for (i = 0; i < keys.length; i++) {
              asyncs.push(processKey(i));
            }

            console.log(asyncs);
            _context2.next = 8;
            return Promise.all(asyncs);

          case 8:
            modulesLoaded = _context2.sent;
            return _context2.abrupt("return", Promise.resolve(modulesLoaded));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadJsModules.apply(this, arguments);
}

function loadCSS(moduleParams, moduleName) {
  var fileref = document.createElement("link");
  var filename = "./css/modules/".concat(moduleName, ".css");

  if (document.querySelector("[href=".concat(CSS.escape(filename), "]"))) {} else {
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);

    if (typeof fileref != "undefined") {
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  }
} // Loading js libs


function loadJsLibs(config) {
  $(function () {
    var keys = Object.keys(config);

    (function processKey(index) {
      if (index === keys.length) return;
      var moduleName = keys[index];
      var moduleParams = config[keys[index]];
      imports("dist/libs/" + moduleName + ".js", function () {});
    })(0);
  });
}