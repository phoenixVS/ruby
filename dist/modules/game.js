"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports('game', function (params, done) {
  insertHtmlModules({// ".game": [
    //   "game/game.html"
    // ]
  }, function () {
    // Shortening club name
    function shortize(name) {
      var str = name;

      if (screen.width < 400) {
        str = str.slice(0, 10);

        if (name.length > 10) {
          str += '...';
        }

        return str;
      } else {
        str = str.slice(0, 16);

        if (name.length > 16) {
          str += '...';
        }

        return str;
      }
    }

    $("[data-id=\"game\"]").empty();
    renderEvent(window.event); // rendering game data

    function renderEvent(data) {
      var ev = data[0];
      var eventRenderer = new Promise(function (resolve, reject) {
        if (data) {
          var gameWrapper = $("[data-id=game]");

          if (_typeof(data[0]) !== undefined && _typeof(data[0].TE[0]) !== undefined) {
            gameWrapper.empty().append("\n            <div class=\"[ video-title not-active ] flex-container align-center-middle\" >\n              <button class=\"button square [ video-title-button ] fa fa-angle-left\"></button>\n              <p class=\"font [ video-title-text ] bet-title\"><span class=\"team-name-1\">".concat(data[0].TE[0].NA + ' </span><span class="vs">&nbsp;VS&nbsp;</span><span class="team-name-2">' + data[0].TE[1].NA, "</span></p>\n            </div>\n            <div class=\"[ video-play ] flex-container align-middle align-justify\">\n              <p class=\"flex-container align-middle\">\n                <span class=\"[ video-play-square white ]\"></span>\n                <span class=\"font\">").concat(data[0].TE[0].NA, "</span>\n              </p>\n              <p class=\"font title [ video-play-count ]\">").concat(data[0].SS, "</p>\n              <p class=\"flex-container align-middle\">\n                <span class=\"font\">").concat(data[0].TE[1].NA, "</span>\n                <span class=\"[ video-play-square red ]\"></span>\n              </p>\n            </div>\n            <div class=\"[ video-body ]\"></div>\n            "));
          } else {
            gameWrapper.empty().append("<p class=\"font title [ video-play-count ]\">Sorry, game not found</p>");
          }

          resolve();
        } else {
          throw new Error("Error: Data not found");
        }
      });
      eventRenderer.then(function () {
        // Preloader finishes
        var preloader = $('#page-preloader');
        preloader.addClass('done');
        $('.video-play-square.white').css('background-color', data[0].TE[0].TC);
        $('.video-play-square.red').css('background-color', data[0].TE[1].TC); // Move back button

        $('.video-title-button').on('click', function (event) {
          event.stopPropagation();
          event.preventDefault();
          window.history.back();
        }); // Event switcher

        $('.video-title').on('click', eventSwitcherRenderer);

        function eventSwitcherRenderer(event) {
          if ($('.video-title').is('.not-active')) {
            var _eventSwitcherRenderer = new Promise(function (resolve, reject) {
              $('.video-title').removeClass('not-active');
              $('.video-title').addClass('active');
              var eventSwitcherWrapper = $("\n                <div class=\"ipe-EventSwitcher \">\n                  <div style=\"max-height: 647px;\" class=\"ipe-EventSwitcher_Container \">\n                    <div class=\"ipe-EventSwitcherFixtureList\">\n                    \n                    </div>\n                  </div>\n                </div>\n                <div class=\"ipe-EventViewTitle_Overlay \"></div>\n                ");
              window.scrollTo(0, 0);
              document.getElementsByTagName('body')[0].style.overflow = 'hidden';
              document.getElementsByTagName('html')[0].style.overflow = 'hidden';

              var _iterator = _createForOfIteratorHelper(window.inplay),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  cl = _step.value;

                  if (cl.ID == window.event[0].CL) {
                    var _iterator2 = _createForOfIteratorHelper(cl.CT),
                        _step2;

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        ct = _step2.value;

                        if (ct.EV.length > 0) {
                          var curCT = $("\n                        <div class=\"ipe-EventSwitcherCompetitionBase\">\n                          <div class=\"ipe-EventSwitcher_CompetitionName\">".concat(ct.NA, "</div>\n                          \n                        </div>\n                        "));

                          var _iterator3 = _createForOfIteratorHelper(ct.EV),
                              _step3;

                          try {
                            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                              var game = _step3.value;
                              var cur = '';

                              if (game.ID == data[0].ID) {
                                cur = 'ipe-EventSwitcherFixture_CurrentFixture';
                              }

                              curCT.append("\n                          <div class=\"ipe-EventSwitcherFixture ".concat(cur, "\">\n                            <div class=\"ipe-EventSwitcherFixture_GameDetail\" data-game-id=\"").concat(game.ID, "\">\n                              <div class=\"ipe-EventSwitcherFixture_MetaContainer Hidden\">\n                              </div>\n                              <div class=\"ipe-EventSwitcherFixture_GameItems\">\n                                <div class=\"ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable\">\n                                  <div class=\"ipe-EventSwitcherFixture_CompetitorName\">\n                                    <span class=\"ipe-EventSwitcherFixture_Truncator\">\n                                      ").concat(game.NA.split(' v ')[0] || ev.NA.split(' vs ')[0] || game.NA.split(' @ ')[0], "\n                                    </span>\n                                  </div>\n                                  <div class=\"ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets\">\n                                    <span class=\"ipe-EventSwitcher_PointNode\">").concat(game.SS.split('-')[0] || ' ', "</span>\n                                  </div>\n                                </div>\n                                <div class=\"ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active \">\n                                  <div class=\"ipe-EventSwitcherFixture_CompetitorName \">\n                                    <span class=\"ipe-EventSwitcherFixture_Truncator \">\n                                      ").concat(game.NA.split(' v ')[1] || game.NA.split(' vs ')[1] || game.NA.split(' @ ')[1], "\n                                    </span>\n                                  </div>\n                                  <div class=\"ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets \">\n                                    <span class=\"ipe-EventSwitcher_PointNode \">").concat(game.SS.split('-')[1] || ' ', "</span>\n                                  </div>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                            "));
                            }
                          } catch (err) {
                            _iterator3.e(err);
                          } finally {
                            _iterator3.f();
                          }

                          eventSwitcherWrapper.find(".ipe-EventSwitcherFixtureList").append(curCT);
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                } // $('.ipe-EventSwitcherFixtureList ').empty();
                // if (typeof XP !== 'undefined') {
                //   if (typeof XP.split(',')[1] !== 'undefined') {
                //     let counter = 0;
                //     ev.XP.split(',').map((item) => {
                //       counter++;
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //         <span class="point">${item.split('-')[0]}
                //       `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //         <span class="point">${item.split('-')[1]}
                //       `);
                //     });
                //   }
                //   else {
                //     let counter = 0;
                //     ev.SS.split(',').map((item) => {
                //       counter++;
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //         <span class="point">${item.split('-')[0]}
                //       `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //         <span class="point">${item.split('-')[1]}
                //       `);
                //     });
                //   }
                // }
                // else {
                //   let counter = 0;
                //   ev.SS.split(',').map((item) => {
                //     counter++;
                //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${item.split('-')[0]}
                //     `);
                //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //     <span class="point">${item.split('-')[1]}
                //   `);
                //   });
                // }
                // if (typeof XP !== 'undefined') {
                //   if (ev.PI.split(',')[0] == '1')
                //     $(`div[data-game-id="${ev.ID}"] .team.home p`).addClass('bowler');
                //   if (ev.PI.split(',')[1] == '1')
                //     $(`div[data-game-id="${ev.ID}"] .team.away p`).addClass('bowler');
                //   $(`div[data-game-id="${ev.ID}"] .timer-el`).remove();
                //   if (typeof XP.split(',')[1] !== 'undefined') {
                //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${ev.SS.split('-')[0]}
                //     `);
                //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //       <span class="point">${ev.SS.split('-')[1]}
                //     `);
                //   }
                //   else {
                //     if (XP !== '') {
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${XP.split('-')[0]}
                //     `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //       <span class="point">${XP.split('-')[1]}
                //     `);
                //     }
                //   }
                // }

              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              $("[data-id=game]").after(eventSwitcherWrapper); // document.querySelector(`body`).removeEventListener('click', removeEventSwitcher);
              // function removeEventSwitcher(event) {
              //   if (!($(event.target).parents('.ipe-EventSwitcherFixture_GameDetail').length > 0)) {
              //     console.log(`clickked on body:(`);
              //     $('.ipe-EventSwitcher').remove();
              //     $('.video-title').removeClass('active').addClass('not-active');
              //     document.querySelector(`body`).removeEventListener('click', removeEventSwitcher);
              //   }
              // }
              // setTimeout(() => {
              //   document.querySelector(`body`).addEventListener('click', removeEventSwitcher);
              // }, 50);

              resolve(data[0].ID);
            }).then(function (response) {
              $('.ipe-EventViewTitle_Overlay').on('click', function (event) {
                $('.video-title').removeClass('active').addClass('not-active');
                $('.ipe-EventSwitcher').remove();
                $('.ipe-EventViewTitle_Overlay').remove();
                document.getElementsByTagName('body')[0].style.removeProperty('overflow');
                document.getElementsByTagName('html')[0].style.removeProperty('overflow');
              });
              var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

              if (orientation === "landscape-primary") {
                console.log("That looks good.");
                $('.ipe-EventSwitcher_Container').css('max-height', '250px');
              } else if (orientation === "landscape-secondary") {
                $('.ipe-EventSwitcher_Container').css('max-height', '250px');
                console.log("Mmmh... the screen is upside down!");
              } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
                $('.ipe-EventSwitcher_Container').css('max-height', '647px');
                console.log("Mmmh... you should rotate your device to landscape");
              } else if (orientation === undefined) {
                $('.ipe-EventSwitcher_Container').css('max-height', '647px');
                console.log("The orientation API isn't supported in this browser :(");
              }

              $('.ipe-EventSwitcherFixture_GameDetail').on('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                console.log($(event.target).parents(".ipe-EventSwitcherFixture_GameDetail").data("gameId"));
                var curID = $(event.target).parents(".ipe-EventSwitcherFixture_GameDetail").data("gameId");
                console.log("event id : ", curID);

                if (curID == response) {} else {
                  window.location.hash = "/event/".concat(curID);
                }

                $('.video-title').removeClass('active').addClass('not-active');
                $('.ipe-EventSwitcher').remove();
              });
            });
          } else {
            $('.video-title').removeClass('active');
            $('.video-title').addClass('not-active');
            $('.ipe-EventSwitcher').remove();
          }
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }

    done();
  });
});