"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

exports('calendar', function (params, done) {
  insertHtmlModules({}, function () {
    function showCalendar() {
      var url = 'http://bestline.bet/schedule/'; // Shortening club name

      function shortize(name) {
        var str = name;

        if (screen.width < 350) {
          str = str.slice(0, 15);

          if (name.length > 15) {
            str += '...';
          }

          return str;
        } else if (screen.width > 350 && screen.width < 420) {
          str = str.slice(0, 19);

          if (name.length > 19) {
            str += '...';
          }

          return str;
        } else {
          return str;
        }
      } // Fetch API request


      function httpGet(url, name) {
        fetch(url).then(function (res) {
          return res.json();
        }).then(function (data) {
          if (name == 'schedule') {
            var _growTree = growTree(data),
                _growTree2 = _slicedToArray(_growTree, 2),
                tree = _growTree2[0],
                events = _growTree2[1];

            renderSchedule(tree, events);
          } else {
            throw new Error('Uncorrect handler name.');
          }
        })["catch"](function (err) {
          console.log(err);
        });
      } // buidling tree from parsed json
      // parse input object massive into a tree 


      function growTree(data) {
        var curCL = '';
        var curEV = '';
        var curDD = '';
        var tree = [];
        var events = [];
        tree.CL = [];
        tree.DD = [];
        data.map(function (item, index) {
          if (item.type === 'CL' && typeof item.DD == 'undefined') {
            tree.CL.push(item);
            curCL = item;
            curCL.EV = [];
          }

          if (item.type === 'CL' && typeof item.DD !== 'undefined') {
            tree.DD.push(item);
            curDD = item;
            curDD.EV = [];
          }

          if (item.type === 'EV') {
            var _iterator = _createForOfIteratorHelper(tree.CL),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                cl = _step.value;

                if (cl.ID == item.CI) {
                  cl.EV.push(item);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            curDD.EV.push(item);
          }
        });
        data.map(function (item) {
          if (item.type === 'EV') {
            events.push(item);
          }
        });
        return [tree, events];
      }

      httpGet(url, 'schedule');

      function renderSchedule(tree, events) {
        console.log(tree);
        var renderLayout = new Promise(function (resolve, reject) {
          $('[data-id=slider]').show();
          $('[data-id=calendarContainer]').show();
          $("<div class=\"game-list\">\n                <ul class=\"game-list-ul\">\n                </ul>\n                <div class=\"filter-blur\"></div>\n              </div>\n              <div class=\"calendarContent\" style=\"display: inline-table\">\n                <div class=\"selectors\">\n                  <dl class=\"dropdown-days\">\n                    <dt>\n                      <a><span>Today</span></a>\n                    </dt>\n                    <dd>\n                      <ul id=\"days-list\">\n                      \n                      </ul>\n                    </dd>\n                  </dl>\n\n                  <dl class=\"dropdown\">\n                    <dt><a><span>All sports</span></a></dt>\n                    <dd>\n                      <ul id=\"sports-list\">\n                      \n                      </ul>\n                    </dd>\n                  </dl>\n                  \n              </div>\n          ").prependTo('[data-id="calendarContainer"]').fadeIn('middle');
          resolve();
        });
        renderLayout.then(function () {
          var renderData = new Promise(function (resolve, reject) {
            var slider = $("[data-id=slider]");
            slider.css('display', 'none'); // Days

            var skip = 2;

            var _iterator2 = _createForOfIteratorHelper(tree.DD),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                day = _step2.value;

                if (skip > 0) {
                  if (skip == 2) {
                    $("#days-list").append("\n                  <li><a data-day=\"".concat(day.DD, "\" class=\"default selected\">Today</a></li>\n                  "));
                  } else {
                    $("#days-list").append("\n                  <li><a data-day=\"".concat(day.DD, "\">Tomorrow</a></li>\n                  "));
                  }

                  skip--;
                  continue;
                }

                $("#days-list").append("\n                <li><a data-day=\"".concat(day.DD, "\">").concat(day.NA, "</a></li>\n              "));
              } // Sports

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            var def = 1;

            var _iterator3 = _createForOfIteratorHelper(tree.CL),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                sport = _step3.value;

                if (def > 0) {
                  def--;
                  $('#sports-list').append("\n                <li><a data-sport-id=\"".concat(sport.ID, "\" class=\"default selected\">").concat(sport.NA, "</a></li>\n                "));
                  continue;
                }

                $('#sports-list').append("\n                <li><a data-sport-id=\"".concat(sport.ID, "\">").concat(sport.NA, "</a></li>\n                "));
              } // Default events

            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            var _iterator4 = _createForOfIteratorHelper(tree.DD[0].EV),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                ev = _step4.value;
                $('.game-list-ul').append("\n              <li>\n                <a class=\"calendar-list-time\">".concat(ev.SM, "</a><a class=\"calendar-list-font\">\n                  ").concat(typeof ev.NA.split(' v ')[1] !== 'undefined' ? shortize(ev.NA.split(' v ')[0]) + ' vs ' + shortize(ev.NA.split(' v ')[1] || '') : shortize(ev.NA.split(' vs ')[0]) + ' vs ' + shortize(ev.NA.split(' vs ')[1] || ''), "\n                </a>\n              </li>\n              "));
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          });
          renderLayout.then(function () {
            console.log($('[data-id="calendarContainer"]'));
            $('select[data-menu]').each(function () {
              var select = $(this),
                  type = select.data('menu'),
                  menu = $('<div />').addClass('select-menu ' + type),
                  button = $('<button />'),
                  buttonDiv = $('<div />'),
                  current = $('<span />').text(select.find('option:selected').text()).appendTo(buttonDiv),
                  arrow = $('<em />').prependTo(button);
              button.css({
                '--h': select.outerHeight(),
                '--w': select.outerWidth()
              });
              select.wrap(menu);
              button.append(buttonDiv).insertAfter(select);
            }); // Date swapping using hammer.js and animate.css

            /* let hammer = new Hammer(document.querySelector('.select-menu'));
              hammer.on('swiperight', function (ev) {
              const menu = $('.select-menu'),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');
              current.addClass('animated');
              current.addClass('slideOutRight');
              current.addClass('faster');
              // buttonDiv.addClass('delay-1s');
                console.log('active index', active.index());
              let nextOption = options.eq(active.index() == 0 ? options.length - 1 : active.index() - 1);
              let next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);
                options.attr('selected', false);
              nextOption.attr('selected', true);
                current[0].addEventListener('animationend', () => {
                current.remove();
                next.addClass('animated');
                next.addClass('faster');
                next.addClass('slideInLeft');
                  next[0].addEventListener('animationend', () => {
                  next.removeClass('next');
                  next.removeClass('animated');
                  next.removeClass('faster');
                  next.removeClass('slideInLeft');
                });
              });
                $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            });
            hammer.on('swipeleft', function (ev) {
              const menu = $('.select-menu'),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');
                current.addClass('animated');
              current.addClass('faster');
              current.addClass('slideOutLeft');
              console.log('active index', active.index());
              // buttonDiv.addClass('delay-1s');
              let nextOption = options.eq(active.index() == options.length - 1 ? 1 : active.index() + 1);
              let next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);
                  options.attr('selected', false);
              nextOption.attr('selected', true);
                current[0].addEventListener('animationend', () => {
                current.remove();
                next.addClass('animated');
                next.addClass('faster');
                next.addClass('slideInRight');
                  next[0].addEventListener('animationend', () => {
                  next.removeClass('next');
                  next.removeClass('animated');
                  next.removeClass('faster');
                  next.removeClass('slideInRight');
                });
              });
                  $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            }); */

            /* $('.select-menu').on('click', function (e) {
              let menu = $(this),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');
                  if (!menu.hasClass('change')) {
                    let nextOption = options.eq(active.index() == options.length - 1 ? 0 : active.index() + 1),
                  next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);
                    options.attr('selected', false);
                nextOption.attr('selected', true);
                    menu.addClass('change');
                    setTimeout(() => {
                      next.removeClass('next');
                  menu.removeClass('change');
                  current.remove();
                    }, 650);
                  }
                  $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              console.log(sportName);
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            }); */

            /*$("body").click(function (e) {
              
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on first click to log in
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on login popup
              $('.calendarContainer').fadeOut().remove("active");
              $('.blur').removeClass('block').addClass('none');
              
            });*/

            var dropdowns = $(".dropdown");
            var days = $('.dropdown-days');
            $('<em />').prependTo(dropdowns.children('dt').children('a').children('span'));
            $('<em />').prependTo(days.children('dt').children('a').children('span'));
            dropdowns.find("dt").click(function () {
              dropdowns.find("dd ul").hide();
              $(this).next().children().toggle();
            });
            days.find("dt").click(function () {
              days.find("dd ul").hide();
              $(this).next().children().toggle();
            }); // Click handler for dropdown-days

            days.find("dd ul li a").click(function () {
              var leSpan = $(this).parents(".dropdown-days").find("dt a span");
              var sportId = $(this).data("sportId");
              var setDate = $('.dropdown-days dd ul li a.selected').data("day");
              console.log(setDate); // Remove selected class

              $(this).parents(".dropdown-days").find('dd a').each(function () {
                $(this).removeClass('selected');
              });
              $('.game-list-ul').empty(); // Update selected value

              leSpan.html($(this).html());
              leSpan.data("day", setDate).attr('data-day', setDate);
              setTimeout(function () {
                var sportName = '';
                tree.CL.map(function (sport) {
                  if (sport.ID == $('.dropdown span').data("sportId")) {
                    sportName = sport.NA;
                  }
                });

                if (sportName.length == 0) {
                  sportName = 'All sports';
                }

                console.log(sportName.length);

                if (sportName !== 'All sports') {
                  tree.DD.map(function (day) {
                    if (day.DD == setDate) {
                      var _iterator5 = _createForOfIteratorHelper(day.EV),
                          _step5;

                      try {
                        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                          ev = _step5.value;

                          if (ev.CL == sportName) {
                            $('.game-list-ul').append("\n                          <li><a class=\"calendar-list-time\">".concat(ev.SM, "</a><a class=\"calendar-list-font\">").concat(ev.NA, "</a></li>\n                        "));
                          }
                        }
                      } catch (err) {
                        _iterator5.e(err);
                      } finally {
                        _iterator5.f();
                      }
                    }
                  });
                } else {
                  tree.DD.map(function (day) {
                    if (day.DD == setDate) {
                      var _iterator6 = _createForOfIteratorHelper(day.EV),
                          _step6;

                      try {
                        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                          ev = _step6.value;
                          $('.game-list-ul').append("\n                          <li><a class=\"calendar-list-time\">".concat(ev.SM, "</a><a class=\"calendar-list-font\">").concat(ev.NA, "</a></li>\n                        "));
                        }
                      } catch (err) {
                        _iterator6.e(err);
                      } finally {
                        _iterator6.f();
                      }
                    }
                  });
                }
              }, 300); // If back to default, remove selected class else addclass on right element

              if ($(this).hasClass('default')) {
                leSpan.removeClass('selected');
              } else {
                leSpan.addClass('selected');
                $(this).addClass('selected');
              } // Close dropdown


              $(this).parents("ul").hide();
            }); // Click handler for dropdown

            dropdowns.find("dd ul li a").click(function () {
              var leSpan = $(this).parents(".dropdown").find("dt a span");
              var sportId = $(this).data("sportId");
              var setDate = $('.dropdown-days dd ul li a.selected').data("day"); // Remove selected class

              $(this).parents(".dropdown").find('dd a').each(function () {
                $(this).removeClass('selected');
              });
              $('.game-list-ul').empty(); // Update selected value

              leSpan.html($(this).html());
              leSpan.data("sportId", sportId).attr('data-sport-id', sportId);
              setTimeout(function () {
                var sportName = '';
                tree.CL.map(function (sport) {
                  if (sport.ID == $('.dropdown span').data("sportId")) {
                    sportName = sport.NA;
                  }
                });
                tree.DD.map(function (day) {
                  if (day.DD == setDate) {
                    var _iterator7 = _createForOfIteratorHelper(day.EV),
                        _step7;

                    try {
                      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                        ev = _step7.value;

                        if (ev.CL == sportName) {
                          $('.game-list-ul').append("\n                        <li><a class=\"calendar-list-time\">".concat(ev.SM, "</a><a class=\"calendar-list-font\">").concat(ev.NA, "</a></li>\n                      "));
                        }
                      }
                    } catch (err) {
                      _iterator7.e(err);
                    } finally {
                      _iterator7.f();
                    }
                  }
                });
              }, 300); // If back to default, remove selected class else addclass on right element

              if ($(this).hasClass('default')) {
                leSpan.removeClass('selected');
              } else {
                leSpan.addClass('selected');
                $(this).addClass('selected');
              } // Close dropdown


              $(this).parents("ul").hide();
            }); // Close all dropdown onclick on another element

            $(document).bind('click', function (e) {
              if (!$(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
            }); // Preloader finishes

            var preloader = $('#page-preloader');

            if (preloader.data("status") != 'done') {
              preloader.addClass('done');
              preloader.removeClass('opaci');
              preloader.data("status", 'done').attr('data-status', 'done');
            }

            window.translate();
          });
        });
      }
    }

    showCalendar();
  });
  done();
});