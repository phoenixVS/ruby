"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

exports("handlebar", function () {
  $(document.body).ready(function () {
    window.onhashchange = locationHashChanged;
    locationHashChanged();
  });
});

function unloadCSS(moduleName) {
  moduleName = './css/modules/' + moduleName + '.css';
  var styles = document.querySelectorAll("link");
  styles.forEach(function (el) {
    if (el && el.getAttribute('href') != null && el.getAttribute('href').indexOf(moduleName) != -1) {
      el.parentNode.removeChild(el);
    }
  });
}

function lurking(lurks, unlurks) {
  var _iterator = _createForOfIteratorHelper(lurks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      element.data('display', 'none').attr('data-display', 'none');
      element.css('display', 'none');
      ;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(unlurks),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _element = _step2.value;

      if (_element.is('.play-big')) {
        _element.data('display', 'true').attr('data-display', 'true');

        _element.css('display', 'flex');
      } else {
        _element.data('display', 'true').attr('data-display', 'true');

        _element.css('display', 'block');
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

var defaultHandler = /*#__PURE__*/function () {
  function defaultHandler(moduleLoader, contentHandler) {
    _classCallCheck(this, defaultHandler);

    this.defaultLoading(moduleLoader, contentHandler);
  }

  _createClass(defaultHandler, [{
    key: "defaultLoading",
    value: function defaultLoading(moduleLoader, contentHandler) {
      // Loading user config
      var configPromise = new Promise(function (res, rej) {
        loadJsModules({
          config: {
            loadCSS: false,
            loadLanguage: false,
            async: false
          }
        }).then(function (response) {
          res();
        });
      });
      configPromise.then( // loading prematch sports, inplay and language
      function (response) {
        return new Promise(function (res, rej) {
          loadJsModules({
            fetch: {
              loadCSS: false,
              loadLanguage: false,
              async: false
            },
            langs: {
              loadCSS: false,
              loadLanguage: false,
              async: false
            }
          }).then(function (response) {
            var counter = 2;

            function decrement(ev) {
              console.log(ev.target, ' loaded');
              counter--;
              ev.target.removeEventListenter('load', decrement);
            } // document.querySelector('script[src="js/modules/fetch.js"]').onload(decrement);
            // document.querySelector('script[src="js/modules/langs.js"]').onload(decrement);
            // document.querySelector('script[src="js/modules/fetch.js"]').addEventListener('load', decrement);
            // document.querySelector('script[src="js/modules/langs.js"]').addEventListener('load', decrement);
            // waitForScriptsLoading();


            res();
          });
        });
      }).then(function (response) {
        return new Promise(function (res, rej) {
          function waitForScriptsLoading() {
            if (typeof window.tableLoad == 'function' && typeof window.sportsLoad == 'function') {
              setTimeout(function () {
                waitForScriptsLoading();
              }, 20);
            } else {
              var waitForData = function waitForData() {
                if (!(typeof window.inplay !== 'undefined' && typeof window.sports !== 'undefined')) {
                  setTimeout(function () {
                    waitForData();
                  }, 20);
                } else {
                  res();
                  return;
                }
              };

              window.tableLoad();
              window.sportsLoad();
            }
          }
        });
      }).then(function (response) {
        console.dir(window.inplay);
        console.dir(window.dict);
        return new Promise(function (res, rej) {
          // loading renderer modules
          moduleLoader().then(function (response) {
            res();
          });
        });
      }).then(function (response) {
        return new Promise(function (res, rej) {
          // showing and hiding content
          contentHandler().then(function (response) {
            res();
          });
        });
      });
    }
  }]);

  return defaultHandler;
}();
/* function mainHandler() {
	async function moduleLoader() {
		return new Promise((res, rej) => {
			if ($('script[src="js/modules/header.js"]').length > 0) {
				loadJsModules({
					// wsocket: { loadCSS: false, loadLanguage: false },
slider: { loadCSS: true, loadLanguage: false },
play_big: { loadCSS: true, loadLanguage: false },
play_table: { loadCSS: true, loadLanguage: false },
coef_table: { loadCSS: true, loadLanguage: false },
				});
res();
			}
			else {
	loadJsModules({
		header: { loadCSS: true, loadLanguage: false },
		aside: { loadCSS: true, loadLanguage: false },
		slider: { loadCSS: true, loadLanguage: false },
		coef_table: { loadCSS: true, loadLanguage: false },
		live: { loadCSS: false, loadLanguage: false },
		// wsocket: { loadCSS: false, loadLanguage: false },
		play_big: { loadCSS: true, loadLanguage: false },
		play_table: { loadCSS: true, loadLanguage: false },
	});
	res();
}
		});
	}

async function contentHandler() {
	return new Promise((res, rej) => {
		const user_menu = $(`[data-id=user-menu]`);
		const mybets = $(`[data-id=mybets]`);
		const slider = $(`[data-id=slider]`);
		const formWrapper = $(`[data-id=registrationWrapper]`);
		const play_big = $(`[data-id=play-big]`);
		const coef_table = $(`[data-id=coef_table]`);
		const play_table = $(`[data-id=play-table]`);
		const live = $(`[data-id=live]`);
		const game = $(`[data-id=game]`);
		const betslip = $(`[data-id=betslip]`);
		const betslip_link = $(`[data-id=betslip-link]`);
		const betslip_small = $(`[data-id=betslip-small]`);
		const calendar = $('[data-id=calendarContainer]');
		const prematch = $('.prematch');
		const lurks = [
			mybets,
			formWrapper,
			game,
			betslip,
			betslip_link,
			betslip_small,
			user_menu,
			calendar,
			prematch,
		];
		const unlurks = [
			play_big,
			coef_table,
			play_table,
			live,
			slider,
		];
		lurking(lurks, unlurks);
		mybets.empty();
		user_menu.empty();
		game.empty();
		unloadCSS('regist');
		unloadCSS('mybets');
		unloadCSS('user');
		res();
	});
}

const module = new defaultHandler(moduleLoader, contentHandler);
} */


function mainHandler() {
  var fetchData = new Promise(function (resolve, reject) {
    loadJsModules({
      config: {
        loadCSS: false,
        loadLanguage: false
      },
      fetch: {
        loadCSS: false,
        loadLanguage: false
      },
      langs: {
        loadCSS: false,
        loadLanguage: false
      }
    }); // wait until there will be an tableLoad module

    function wait() {
      if (typeof window.tableLoad === 'undefined') {
        setTimeout(wait, 10);
        return;
      } else {
        resolve();
      }
    }

    wait();
  });
  fetchData.then(function (response) {
    var fetchPromise = new Promise(function (resolve, reject) {
      window.tableLoad();
      window.sportsLoad();
      var wait = setInterval(function () {
        if (window.inplay == undefined) {} else {
          clearInterval(wait);
          resolve();
        }
      }, 10);
    });
    fetchPromise.then(function (response) {
      // loading modules for main view
      var onModulesLoad = new Promise(function (resolve, reject) {
        // if inplay empty go to soccer prematch
        if (window.inplay.length == 0) {
          window.location.hash = '#/sport/1';
          return;
        }

        if ($('script[src="js/modules/header.js"]').length > 0 && $('.live-title').length != 0) {
          loadJsModules({
            wsocket: {
              loadCSS: false,
              loadLanguage: false
            },
            slider: {
              loadCSS: true,
              loadLanguage: false
            },
            play_big: {
              loadCSS: true,
              loadLanguage: false
            },
            play_table: {
              loadCSS: true,
              loadLanguage: false
            },
            coef_table: {
              loadCSS: true,
              loadLanguage: false
            }
          });
          resolve();
        } else {
          loadJsModules({
            header: {
              loadCSS: true,
              loadLanguage: false
            },
            aside: {
              loadCSS: true,
              loadLanguage: false
            },
            slider: {
              loadCSS: true,
              loadLanguage: false
            },
            coef_table: {
              loadCSS: true,
              loadLanguage: false
            },
            live: {
              loadCSS: false,
              loadLanguage: false
            },
            wsocket: {
              loadCSS: false,
              loadLanguage: false
            },
            play_big: {
              loadCSS: true,
              loadLanguage: false
            },
            play_table: {
              loadCSS: true,
              loadLanguage: false
            },
            footer: {
              loadCSS: true,
              loadLanguage: false
            }
          }); // if ($('script[src="js/modules/betslip_link.js"]').length == 0) {
          //     loadJsModules({
          //         betslip_link: { loadCSS: false, loadLanguage: false },
          //     });
          // }

          resolve();
        }
      });
      onModulesLoad.then(function (result) {
        var user_menu = $("[data-id=user-menu]");
        var mybets = $("[data-id=mybets]");
        var slider = $("[data-id=slider]");
        var formWrapper = $("[data-id=registrationWrapper]");
        var play_big = $("[data-id=play-big]");
        var coef_table = $("[data-id=coef_table]");
        var play_table = $("[data-id=play-table]");
        var live = $("[data-id=live]");
        var game = $("[data-id=game]");
        var betslip = $("[data-id=betslip]");
        var betslip_link = $("[data-id=betslip-link]");
        var betslip_small = $("[data-id=betslip-small]");
        var calendar = $('[data-id=calendarContainer]');
        var prematch = $('.prematch');
        var footer = $('.footer');
        var lurks = [mybets, formWrapper, game, betslip, betslip_link, betslip_small, user_menu, calendar, prematch];
        var unlurks = [play_big, coef_table, play_table, live, slider, footer];
        lurking(lurks, unlurks);
        mybets.empty();
        user_menu.empty();
        game.empty();
        unloadCSS('regist');
        unloadCSS('mybets');
        unloadCSS('user');
      }, function (error) {
        console.log("modules haven't been loaded :_( \n\n                    and everthing because of: ".concat(error));
      });
    });
  });
} // on filter active


function filterHandler(ID) {
  $("[data-id=\"play-table\"]").empty();
  $("[data-id=\"play-big\"]").empty();

  if (performance.navigation.type == 1) {
    var fetchData = new Promise(function (resolve, reject) {
      loadJsModules({
        config: {
          loadCSS: false,
          loadLanguage: false
        },
        fetch: {
          loadCSS: false,
          loadLanguage: false
        },
        langs: {
          loadCSS: false,
          loadLanguage: false
        },
        user_menu: {
          loadCSS: true,
          loadLanguage: false
        }
      }); // wait until there will be an tableLoad module

      function wait() {
        if (typeof window.tableLoad === 'undefined') {
          setTimeout(wait, 10);
          return;
        } else {
          resolve();
        }
      }

      wait();
    });
    fetchData.then(function (response) {
      go();
    });
  } else {
    go();
  }

  function go() {
    var fetchPromise = new Promise(function (resolve, reject) {
      window.tableLoad();
      var wait = setInterval(function () {
        if (window.inplay == undefined) {} else {
          clearInterval(wait);
          resolve();
        }
      }, 10);
    });
    fetchPromise.then(function (response) {
      // if fileter valid
      var valid = false;

      var _iterator3 = _createForOfIteratorHelper(window.inplay),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var sport = _step3.value;

          if (sport.id == ID) {
            valid = true;
            break;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (valid) {
        // if (performance.navigation.type == 1) {
        if (performance.navigation.type == 1) {
          clearInterval(window.t_interval);
          clearInterval(window.inplay_interval);
          /*for (let i = 0; i < window.intervals.length; i++) {
          		clearInterval(window.intervals[i]);
          }*/

          loadJsModules({
            header: {
              loadCSS: true,
              loadLanguage: false
            },
            aside: {
              loadCSS: false,
              loadLanguage: false
            },
            live: {
              sportId: ID,
              loadCSS: false,
              loadLanguage: false
            }
          });

          if ($('.slider-wrapper').length == 0) {
            loadJsModules({
              slider: {
                loadCSS: true,
                loadLanguage: false
              }
            });
          }

          if ($('script[src="js/modules/betslip_link.js"]').length == 0) {
            loadJsModules({
              betslip_link: {
                loadCSS: false,
                loadLanguage: false
              }
            });
          }
        } else {
          clearInterval(window.t_interval);
          clearInterval(window.inplay_interval);
          /*for (let i = 0; i < window.intervals.length; i++) {
          		clearInterval(window.intervals[i]);
          }*/
        }

        var onModulesLoad = new Promise(function (resolve, reject) {
          loadJsModules({
            live: {
              sportId: ID,
              loadCSS: false,
              loadLanguage: false
            },
            slider: {
              loadCSS: true,
              loadLanguage: false
            },
            coef_table: {
              filtered: true,
              sportId: ID,
              loadCSS: false,
              loadLanguage: false
            },
            play_big: {
              sportId: ID,
              loadCSS: true,
              loadLanguage: false
            },
            play_table: {
              sportId: ID,
              loadCSS: true,
              loadLanguage: false
            },
            footer: {
              loadCSS: true,
              loadLanguage: false
            }
          });
          resolve();
        });
        onModulesLoad.then(function (result) {
          var user_menu = $("[data-id=user-menu]");
          var mybets = $("[data-id=mybets]");
          var slider = $("[data-id=slider]");
          var formWrapper = $("[data-id=registrationWrapper]");
          var play_big = $("[data-id=play-big]");
          var coef_table = $("[data-id=coef_table]");
          var play_table = $("[data-id=play-table]");
          var live = $("[data-id=live]");
          var game = $("[data-id=game]");
          var betslip = $("[data-id=betslip]");
          var betslip_link = $("[data-id=betslip-link]");
          var betslip_small = $("[data-id=betslip-small]");
          var calendar = $('[data-id=calendarContainer]');
          var prematch = $('.prematch');
          var footer = $('.footer');
          var lurks = [user_menu, mybets, formWrapper, game, betslip, betslip_link, betslip_small, calendar, prematch];
          var unlurks = [play_big, coef_table, play_table, live, slider, footer];
          lurking(lurks, unlurks);
          user_menu.empty();
          mybets.empty();
          game.empty();
        }, function (error) {
          console.log("modules haven't been loaded :_( \n\n                    and everthing because of: ".concat(error));
        });
      } else {
        window.location.hash = '';
      }
    });
  }
} // game + game player page load


function gameHandler(ID) {
  var gameWrapper = $('[data-id=game]');

  if (performance.navigation.type == 1) {
    var fetchData = new Promise(function (resolve, reject) {
      loadJsModules({
        config: {
          loadCSS: false,
          loadLanguage: false
        },
        fetch: {
          loadCSS: false,
          loadLanguage: false
        },
        langs: {
          loadCSS: false,
          loadLanguage: false
        }
      }); // wait until there will be an tableLoad module

      function wait() {
        if (typeof window.eventLoad === 'undefined') {
          setTimeout(wait, 10);
          return;
        } else {
          resolve();
        }
      }

      wait();
    });
    fetchData.then(function (response) {
      go();
    });
  } else {
    go();
  }

  function go() {
    var fetchPromise = new Promise(function (resolve, reject) {
      window.eventLoad(ID);
      window.tableLoad();
      var wait = setInterval(function () {
        if (window.event == undefined) {} else {
          if (window.event[0].ID !== ID) {} else {
            clearInterval(wait);
            resolve();
          }
        }
      }, 10);
    });
    fetchPromise.then(function (response) {
      if (performance.navigation.type == 1) {
        loadJsModules({
          header: {
            loadCSS: true,
            loadLanguage: false
          },
          aside: {
            loadCSS: true,
            loadLanguage: false
          },
          betslip_link: {
            loadCSS: true,
            loadLanguage: false
          }
        });
      }

      var onModulesLoad = new Promise(function (resolve, reject) {
        loadJsModules({
          coef_table: {
            expand: true,
            loadCSS: true,
            loadLanguage: false
          },
          game: {
            gameId: ID,
            loadCSS: true,
            loadLanguage: false
          } // betslip_link: { loadCSS: true, loadLanguage: false },

        });
        resolve();
      });
      onModulesLoad.then(function (result) {
        var user_menu = $("[data-id=user-menu]");
        var mybets = $("[data-id=mybets]");
        var slider = $("[data-id=slider]");
        var formWrapper = $("[data-id=registrationWrapper]");
        var play_big = $("[data-id=play-big]");
        var coef_table = $("[data-id=coef_table]");
        var play_table = $("[data-id=play-table]");
        var live = $("[data-id=live]");
        var game = $("[data-id=game]");
        var betslip = $("[data-id=betslip]");
        var betslip_link = $("[data-id=betslip-link]");
        var betslip_small = $("[data-id=betslip-small]");
        var calendar = $('[data-id=calendarContainer]');
        var lurks = [user_menu, mybets, live, formWrapper, slider, play_big, play_table, betslip, betslip_link, betslip_small, calendar];
        var unlurks = [game, coef_table];
        lurking(lurks, unlurks);
        user_menu.empty();
        mybets.empty();
      }, function (error) {
        console.log("modules haven't been loaded :_( \n\n                and everthing because of: ".concat(error));
      });
    });
  }
}

function prematchHandler(ID, legueID, eventID) {
  if (performance.navigation.type == 1) {
    var fetchData = new Promise(function (resolve, reject) {
      loadJsModules({
        config: {},
        fetch: {
          loadCSS: false,
          loadLanguage: false
        },
        langs: {
          loadCSS: false,
          loadLanguage: false
        }
      }); // wait until there will be an tableLoad module

      function wait() {
        if (typeof window.eventLoad === 'undefined') {
          setTimeout(wait, 10);
          return;
        } else {
          resolve();
        }
      }

      wait();
    });
    fetchData.then(function (response) {
      go();
    });
  } else {
    go();
  }

  function go() {
    var fetchPromise = new Promise(function (resolve, reject) {
      window.sportsLoad();
      window.tableLoad();
      var wait = setInterval(function () {
        if (window.prematch == undefined) {} else {
          clearInterval(wait);
          resolve();
        }
      }, 10);
    });
    fetchPromise.then(function (response) {
      return new Promise(function (resolve, reject) {
        if (performance.navigation.type == 1 || $('.show-menu .show-menu-item').length == 0) {
          loadJsModules({
            header: {
              loadCSS: true,
              loadLanguage: false
            },
            aside: {
              loadCSS: true,
              loadLanguage: false
            },
            betslip_link: {
              loadCSS: true,
              loadLanguage: false
            }
          });
        }

        if (ID == true && typeof legueID === 'undefined' && typeof eventID === 'undefined') {
          console.log('Loading prematch');
          loadJsModules({
            prematch: {
              ID: ID,
              loadCSS: true,
              loadLanguage: false
            }
          });
        } else if (ID == true && typeof legueID !== 'undefined' && typeof eventID === 'undefined') {
          console.log('Loading legue');
          loadJsModules({
            prematch_coupon: {
              ligID: legueID,
              loadCSS: true,
              loadLanguage: false
            }
          });
        } else if (ID == true && typeof legueID !== 'undefined' && typeof eventID !== 'undefined') {
          console.log('Loading event');
          loadJsModules({
            prematch_event: {
              ligID: legueID,
              matchID: eventID,
              loadCSS: true,
              loadLanguage: false
            }
          });
        }
        /*if (typeof optID === 'undefined') {
        	loadJsModules({
        		prematch: { ID: ID, loadCSS: true, loadLanguage: false },
        	});
        }
        else {
        	if (typeof eventID === 'undefined') {
        		loadJsModules({
        			prematch_coupon: { PD: optID, loadCSS: true, loadLanguage: false },
        		});
        	}
        	else {
        		loadJsModules({
        			prematch_event: { PD: eventID, CT: optID, loadCSS: true, loadLanguage: false },
        		});
        	}
        }*/


        resolve();
      });
    }).then(function (result) {
      var mybets = $("[data-id=mybets]");
      var user_menu = $("[data-id=user-menu]");
      var slider = $("[data-id=slider]");
      var formWrapper = $("[data-id=registrationWrapper]");
      var play_big = $("[data-id=play-big]");
      var coef_table = $("[data-id=coef_table]");
      var play_table = $("[data-id=play-table]");
      var live = $("[data-id=live]");
      var game = $("[data-id=game]");
      var betslip = $("[data-id=betslip]");
      var betslip_link = $("[data-id=betslip-link]");
      var betslip_small = $("[data-id=betslip-small]");
      var regist = $('[data-id=regist]');
      var calendar = $('.calendarContainer');
      var prematch = $('.prematch');
      var lurks = [mybets, game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, user_menu, regist];
      var unlurks = [prematch, calendar, formWrapper];
      lurking(lurks, unlurks);
      mybets.empty();
      user_menu.empty();
      game.empty();
      regist.empty();
    }, function (error) {
      console.log("modules haven't been loaded :_( \n\n    and everthing because of: ".concat(error));
    });
  }
}

function calendarHandler() {
  $("[data-id=calendarContainer]").empty();
  var onModulesLoad = new Promise(function (resolve, reject) {
    if (performance.navigation.type == 1) {
      var fetchPromise = new Promise(function (resolve, reject) {
        loadJsModules({
          config: {
            loadCSS: false,
            loadLanguage: false
          },
          fetch: {
            loadCSS: false,
            loadLanguage: false
          }
        });
        setTimeout(function () {
          resolve();
        }, 500);
      });
      fetchPromise.then(function (response) {
        return new Promise(function (resolve, reject) {
          window.sportsLoad();
          window.tableLoad();
          resolve();
        });
      }).then(function (response) {
        loadJsModules({
          header: {
            loadCSS: true,
            loadLanguage: false
          },
          aside: {
            loadCSS: true,
            loadLanguage: false
          },
          langs: {
            loadCSS: false,
            loadLanguage: false
          }
        });
        resolve();
      });
    } else {
      resolve();
    }
  });
  onModulesLoad.then(function (result) {
    return new Promise(function (resolve, reject) {
      loadJsModules({
        calendar: {
          loadCSS: true,
          loadLanguage: false
        }
      });
      resolve();
    });
  }).then(function (result) {
    var mybets = $("[data-id=mybets]");
    var user_menu = $("[data-id=user-menu]");
    var slider = $("[data-id=slider]");
    var formWrapper = $("[data-id=registrationWrapper]");
    var play_big = $("[data-id=play-big]");
    var coef_table = $("[data-id=coef_table]");
    var play_table = $("[data-id=play-table]");
    var live = $("[data-id=live]");
    var game = $("[data-id=game]");
    var betslip = $("[data-id=betslip]");
    var betslip_link = $("[data-id=betslip-link]");
    var betslip_small = $("[data-id=betslip-small]");
    var regist = $('[data-id=regist]');
    var calendar = $('.calendarContainer');
    var prematch = $('.prematch');
    var lurks = [mybets, game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, user_menu, regist, prematch, formWrapper];
    var unlurks = [calendar];
    lurking(lurks, unlurks);
    mybets.empty();
    user_menu.empty();
    game.empty();
    regist.empty();
  }, function (error) {
    console.log("modules haven't been loaded :_( \n\n        and everthing because of: ".concat(error));
  });
} // registration page load


function registrationHandler(fast) {
  $("[data-id=registrationWrapper]").empty();

  if (performance.navigation.type == 1) {
    loadJsModules({
      config: {
        loadCSS: false,
        loadLanguage: false
      },
      header: {
        loadCSS: true,
        loadLanguage: false
      },
      aside: {
        loadCSS: false,
        loadLanguage: false
      },
      langs: {
        loadCSS: false,
        loadLanguage: false
      }
    });
  }

  var onModulesLoad = new Promise(function (resolve, reject) {
    loadJsModules({
      regist: {
        fast: fast,
        loadCSS: true,
        loadLanguage: false
      }
    });
    resolve();
  });
  onModulesLoad.then(function (result) {
    var mybets = $("[data-id=mybets]");
    var user_menu = $("[data-id=user-menu]");
    var slider = $("[data-id=slider]");
    var formWrapper = $("[data-id=registrationWrapper]");
    var play_big = $("[data-id=play-big]");
    var coef_table = $("[data-id=coef_table]");
    var play_table = $("[data-id=play-table]");
    var live = $("[data-id=live]");
    var game = $("[data-id=game]");
    var betslip = $("[data-id=betslip]");
    var betslip_link = $("[data-id=betslip-link]");
    var betslip_small = $("[data-id=betslip-small]");
    var calendar = $('[data-id=calendarContainer]');
    var prematch = $('.prematch');
    var lurks = [mybets, game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, user_menu, calendar, prematch];
    var unlurks = [formWrapper];
    lurking(lurks, unlurks);
    mybets.empty();
    user_menu.empty();
    game.empty();
    calendar.empty();
  }, function (error) {
    console.log("modules haven't been loaded :_( \n\n        and everthing because of: ".concat(error));
  });
} // Handler of user's personal room


function userHandler(username, nav_link, nav_link_small) {
  var reload_status = 0;

  if (performance.navigation.type == 1) {
    reload_status = 1;
    loadJsModules({
      config: {
        loadCSS: false,
        loadLanguage: false
      },
      header: {
        loadCSS: true,
        loadLanguage: false
      },
      aside: {
        loadCSS: true,
        loadLanguage: false
      },
      langs: {
        loadCSS: false,
        loadLanguage: false
      }
    });
  }

  var onModulesLoad = new Promise(function (resolve, reject) {
    loadJsModules({
      user: {
        username: username,
        nav_link: nav_link,
        nav_link_small: nav_link_small,
        loadCSS: true,
        loadLanguage: false
      },
      footer: {
        loadCSS: true,
        loadLanguage: false
      }
    });
    resolve();
  });
  onModulesLoad.then(function (result) {
    var mybets = $("[data-id=mybets]");
    var slider = $("[data-id=slider]");
    var formWrapper = $("[data-id=registrationWrapper]");
    var play_big = $("[data-id=play-big]");
    var coef_table = $("[data-id=coef_table]");
    var play_table = $("[data-id=play-table]");
    var live = $("[data-id=live]");
    var game = $("[data-id=game]");
    var betslip = $("[data-id=betslip]");
    var betslip_link = $("[data-id=betslip-link]");
    var betslip_small = $("[data-id=betslip-small]");
    var prematch = $('.prematch');
    var lurks = [mybets, game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, formWrapper, prematch];
    var unlurks = [];
    lurking(lurks, unlurks);
    mybets.empty();
  }, function (error) {
    console.log("modules haven't been loaded :_( \n\n        and everthing because of: ".concat(error));
  });
} // My bets page


function mybetsHandler() {
  var onModulesLoad = new Promise(function (resolve, reject) {
    if ($('script[src="js/modules/header.js"]').length > 0) {
      loadJsModules({
        mybets: {
          loadCSS: true,
          loadLanguage: false
        }
      });
      resolve();
    } else {
      loadJsModules({
        config: {
          loadCSS: false,
          loadLanguage: false
        },
        header: {
          loadCSS: true,
          loadLanguage: false
        },
        langs: {
          loadCSS: false,
          loadLanguage: false
        },
        aside: {
          loadCSS: true,
          loadLanguage: false
        },
        mybets: {
          loadCSS: true,
          loadLanguage: false
        }
      });
      resolve();
    }
  });
  onModulesLoad.then(function () {
    var mybets = $("[data-id=mybets]");
    var slider = $("[data-id=slider]");
    var formWrapper = $("[data-id=registrationWrapper]");
    var user_menu = $("[data-id=user_menu]");
    var play_big = $("[data-id=play-big]");
    var coef_table = $("[data-id=coef_table]");
    var play_table = $("[data-id=play-table]");
    var live = $("[data-id=live]");
    var game = $("[data-id=game]");
    var betslip = $("[data-id=betslip]");
    var betslip_link = $("[data-id=betslip-link]");
    var betslip_small = $("[data-id=betslip-small]");
    var calendar = $('[data-id=calendarContainer]');
    var prematch = $('.prematch');
    var lurks = [game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, formWrapper, calendar, prematch];
    var unlurks = [mybets];
    lurking(lurks, unlurks);
    user_menu.empty();
    mybets.empty();
    calendar.empty();
  });
} // 404 Page not found


function emptyHandler() {
  var onModulesLoad = new Promise(function (resolve, reject) {
    if ($('script[src="js/modules/header.js"]').length > 0) {
      loadJsModules({
        p404: {
          loadCSS: false,
          loadLanguage: false
        }
      });
      resolve();
    } else {
      loadJsModules({
        config: {
          loadCSS: false,
          loadLanguage: false
        },
        langs: {
          loadCSS: false,
          loadLanguage: false
        },
        header: {
          loadCSS: true,
          loadLanguage: false
        },
        aside: {
          loadCSS: true,
          loadLanguage: false
        },
        p404: {
          loadCSS: false,
          loadLanguage: false
        }
      });
      resolve();
    }
  });
  onModulesLoad.then(function () {
    var mybets = $("[data-id=mybets]");
    var slider = $("[data-id=slider]");
    var formWrapper = $("[data-id=registrationWrapper]");
    var play_big = $("[data-id=play-big]");
    var coef_table = $("[data-id=coef_table]");
    var play_table = $("[data-id=play-table]");
    var live = $("[data-id=live]");
    var game = $("[data-id=game]");
    var betslip = $("[data-id=betslip]");
    var betslip_link = $("[data-id=betslip-link]");
    var betslip_small = $("[data-id=betslip-small]");
    var calendar = $('[data-id=calendarContainer]');
    var prematch = $('.prematch');
    var lurks = [game, betslip, betslip_link, betslip_small, play_big, coef_table, play_table, live, slider, formWrapper, mybets, calendar, prematch];
    var unlurks = [];
    lurking(lurks, unlurks);
    mybets.empty();
    game.empty();
  });
}

function locationHashChanged() {
  var hash = window.location.href.split('/')[4];

  if (window.location.hash.includes('undefined')) {
    window.location.hash = '';
  } else {
    if (hash == '') {
      mainHandler();
    } else {
      switch (window.location.href.split('/')[5]) {
        case '':
        case undefined:
          mainHandler();
          break;

        case 'sport':
          prematchHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]);
          break;

        case 'inplay':
          filterHandler(window.location.href.split('/')[6]);
          break;

        case 'event':
          gameHandler(window.location.href.split('/')[6]);
          break;

        case 'betslip':
          betslipHandler();
          break;

        case 'betslip-small':
          betslip_smallHandler();
          break;

        case 'registration':
          registrationHandler(typeof window.location.href.split('/')[6] !== 'undefined' ? window.location.href.split('/')[6] : null);
          break;

        case 'user':
          userHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]);
          break;

        case 'mybets':
          mybetsHandler();
          break;

        case 'calendar':
          calendarHandler();
          break;

        default:
          emptyHandler();
      }
    }
  }
}