"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports('header', function (params, done) {
  if ($('.header .menu').length > 0) {
    $('.header .top').empty();
    $('.header .show-menu').empty();
    $('.header .menu').empty();
  }

  insertHtmlModules({
    ".header .top": ["header/top-menu.html"],
    ".header .show-menu": ["header/show-menu.html"],
    ".header .menu": ["header/menu.html"]
  }, function () {
    function setBtnClicked() {
      return _setBtnClicked.apply(this, arguments);
    }

    function _setBtnClicked() {
      _setBtnClicked = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var processing, user_menu;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                window.scrollTo(0, 0);
                document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                _context.next = 5;
                return loadJsModules({
                  user_menu: {
                    loadCSS: true,
                    loadLanguage: false
                  }
                });

              case 5:
                processing = _context.sent;
                $('div.UserMenu_Overlay').removeClass('hidden');
                $('div.UserMenu_Overlay').on('click', function (ev) {
                  setBtnNotClicked();
                });
                user_menu = $("[data-id=user-menu]");
                $('.log-button').prop("onclick", null).off();
                $('.login-font').hide();
                user_menu.show();
                $('.log-button').removeClass('not-clicked');
                $('.log-button').addClass('clicked');
                $('.log-button').on('click', function (el) {
                  setBtnNotClicked();
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _setBtnClicked.apply(this, arguments);
    }

    function setBtnNotClicked() {
      return _setBtnNotClicked.apply(this, arguments);
    } // Login and user menu handlers


    function _setBtnNotClicked() {
      _setBtnNotClicked = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var user_menu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                $('div.UserMenu_Overlay').addClass('hidden');
                $('.UserMenu_Overlay').off();
                document.getElementsByTagName('body')[0].style.removeProperty('overflow');
                document.getElementsByTagName('html')[0].style.removeProperty('overflow');
                user_menu = $("[data-id=user-menu]");
                $('.log-button').prop("onclick", null).off();
                $('.login-font').show();
                user_menu.hide();
                $('.log-button').removeClass('clicked');
                $('.log-button').addClass('not-clicked');
                $('.log-button').on('click', function (el) {
                  setBtnClicked();
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _setBtnNotClicked.apply(this, arguments);
    }

    if (window.conf.CUSTOMER_CONFIG.LOGGED_IN == true) {
      Cookies.set('logon', 'true'); //$(`[data-id=user-menu]`).hide();

      $("[data-id=mybets-button]").show();
      $("[data-id=registration-button]").hide();
    } else {
      Cookies.set('logon', 'false');
      $("[data-id=mybets-button]").hide();
      $("[data-id=registration-button]").show();
    }

    $("[data-id=login-button]").on('click', function () {
      console.log("Log-button onclick");

      if (Cookies.get('logon') == 'true') {
        setBtnClicked();
      } else {
        console.log('User is not logged in!');
        loadJsModules({
          login: {
            loadCSS: true,
            loadLanguage: false
          }
        });
      }
    });
    $("[data-id=calendar]").on('click', function () {
      console.log("Calendar");
      window.location.hash = "/calendar/";
    }); // clocks

    var time = $('#time');

    (function updateTime() {
      var date = new Date(),
          hh = date.getUTCHours(),
          mm = date.getUTCMinutes(),
          ss = date.getSeconds(),
          offset = window.conf.CUSTOMER_CONFIG.TZ; //date.getTimezoneOffset();
      //offset /= 60;

      /* if (offset > 0) {
          offset = 'GMT -' + offset.toString();
      } else { offset = 'GMT +' + (-(offset.toString())); } */

      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      time.html("".concat(hh, ":").concat(mm, ":").concat(ss, " ").concat(offset));
      setTimeout(updateTime, 1000);
    })(0); // end of time :_(
    // languages handler


    function navEncode(nav) {
      var la = nav.slice(0, 2);
      var lang;
      var dict = {
        'en': 'English',
        'ru': 'Russian'
      };

      for (key in Object.keys(dict)) {
        if (key == la) {
          lang = dict.key;
          return lang;
        }
      }

      if (typeof lang == 'undefined') {
        return 'English';
      }
    }

    if (typeof Cookies.get('lang') === 'undefined') {
      var lang = navEncode(navigator.language);
      Cookies.set('lang', lang);
    }

    $("[data-id=dropdown-langs]").text(Cookies.get('lang'));
    $("[data-lang-name]").removeClass('active');
    $("[data-lang-name=".concat(Cookies.get('lang'), "]")).addClass('active');
    var langsBtn = $("[data-id=lang-scroll]");
    var dropdown = $('a.top-menu-dropdown'); // Converting camel case to snake case

    function toSnakeCase(str) {
      var snk = str.replace(/([A-Z])/g, "-$1").toLowerCase();
      return snk;
    } // An jquery toggleClass analog for data attributes


    (function ($) {
      $.fn.toggleData = function (data_attr, val, alt) {
        return this.each(function () {
          var elem = $(this);

          if (elem.data(data_attr) == val) {
            elem.data(data_attr, alt).attr('data-' + toSnakeCase(data_attr), alt);
          } else {
            elem.data(data_attr, val).attr('data-' + toSnakeCase(data_attr), val);
          }
        });
      };
    })(jQuery); // Langs changer


    (function languageSwitcher() {
      dropdown.on('click', function () {
        $("[data-class=lang]").off();
        dropdown.toggleClass('not-active');
        dropdown.toggleClass('active');
        dropdown.toggleData("status", 'active', 'not-active');
        langsBtn.toggleClass('not-active');
        langsBtn.toggleClass('active'); // Escape key handler

        $(document).on('keydown', function (event) {
          if (event.keyCode === 27) {
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          }
        }); // Language click landler

        $("[data-class=lang]").on('click', function (event) {
          var cur = $(event.target);
          Cookies.set('lang', cur.data("langName"));
          window.translate();

          if (!cur.is('.active')) {
            $('.languages-link').removeClass('active');
            cur.addClass('active');
            dropdown.text(cur.text());
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          } else {
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          }
        });
      });
    })(0); // end of langs changer
    // Sticky navbar


    window.onscroll = function () {
      stick();
    }; // Get the navbar


    var navbar = document.querySelector("#navbar"); // Get the offset position of the navbar

    var sticky = navbar.offsetTop; // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

    function stick() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        document.querySelector('.slider').style.marginTop = '64px';

        if ($("[data-id=\"calendarContainer\"]").length) {
          document.querySelector("[data-id=\"calendarContainer\"]").style.marginTop = '64px';
        }

        if ($('.video-title').length) {
          document.querySelector('.video-title').style.marginTop = '64px';
        }

        if ($('#userRoom').length) {
          document.querySelector('.video-title').style.marginTop = '64px';
        }
      } else {
        navbar.classList.remove("sticky");
        document.querySelector('.slider').style.marginTop = '0';

        if ($("[data-id=\"calendarContainer\"]").length) {
          document.querySelector("[data-id=\"calendarContainer\"]").style.marginTop = '0';
        }

        if ($('.video-title').length) {
          document.querySelector('.video-title').style.marginTop = '0';
        }

        if ($('#userRoom').length) {
          document.querySelector('.video-title').style.marginTop = '0';
        }
      }
    } // Clear all cookies function


    window.cookieCleaner = function () {
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }; // Account profile redirect


    var username = 'vasya1999';
    $("[data-id=mybets-button]").prop('href', "#/mybets");
    $("[data-id=registration-button]").prop('href', "#/registration");
    done();
  });
});