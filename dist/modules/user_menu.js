"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports('user_menu', function (params, done) {
  // $(`[data-id=user-menu]`).empty();
  insertHtmlModules({}, function () {
    function renderUserMenu() {
      var renderPromise = new Promise(function (resolve, reject) {
        // $('.menu-wrapper').show();
        // $('.menu-wrapper').empty();
        $("[data-id=user-menu]").empty().append($('<div>').load("./html/modules/user/user-menu/user-menu.html", function () {
          // $(`[data-id=user-menu]`).slideDown("fast", () => {
          //   resolve();
          // });
          resolve();
        }));
      });
      renderPromise.then(function () {
        var rect = document.querySelector("[data-id=login-button]").getBoundingClientRect();
        var selfRect = document.querySelector(".user-menu").getBoundingClientRect();
        var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var scrollDown = document.querySelector('.menu-wrapper .scrollDown');

        if (document.querySelector('.menu-wrapper').scrollHeight < 0.7 * vh) {
          console.log("70vh: ", 0.7 * vh);
          console.log("scrollHeight: ", document.querySelector('.menu-wrapper').scrollHeight);
          console.log("Height fits in");
          scrollDown.parentNode.removeChild(scrollDown);
        } else {
          setTimeout(function () {
            if (scrollDown !== null) {
              scrollDown.parentNode.removeChild(scrollDown);
            }
          }, 1900);
          console.log("Height doesn't fits in");
        }

        var a = 0;

        if (selfRect.top > 30) {
          a = 60;
        }

        if (document.querySelector('.slider').style.display != 'none') {
          document.querySelector(".menu-wrapper").style.top = '-50px';
        } else {
          document.querySelector(".menu-wrapper").style.top = '0';
        }

        var orientationCalcHeight = function orientationCalcHeight(ev) {
          var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

          if (orientation === "landscape-primary") {
            $('.user-menu').css('max-height', '70vh');
          } else if (orientation === "landscape-secondary") {
            $('.user-menu').css('max-height', '70vh');
          } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
            $('.user-menu').css('max-height', '77vh');
          } else if (orientation === undefined) {
            $('.user-menu').css('max-height', '77vh');
          }

          $('.user-menu-email').text(window.conf.CUSTOMER_CONFIG.USER_NAME);
        };

        orientationCalcHeight();
        window.addEventListener("orientationchange", orientationCalcHeight); // $('.user-menu').css('top', `${rect.bottom - a}px`);
        // $('.menu-wrapper').css('top', `${rect.bottom - a}px`);

        $(".prefferences-tab-button").on('click', function (ev) {
          // switch menu button
          $('.prefferences-tab-button').toggleClass('to-settings').toggleClass('to-menu');
          $('.prefference-menu').toggleClass('hidden');
          $('.user-menu-links').toggleClass('hidden');
        }); // option selected changer

        /*  $(`[data-select=odds]`).children('option:not([selected])').on('click', (ev) => {
           console.log(`triggered`);
           let cur = $(ev.target);
           cur.siblings('[selected=selected]').attr('selected', '');
           cur.attr('selected', 'selected');
           let ID = cur.attr('id');
           console.table([`ID`, ID]);
           // window.conf.CUSTOMER_CONFIG.ODDS_TYPE = ID;
         }); */
        // Odds type switcher

        $("[data-select=odds]").on('change', function (ev) {
          var selectedIndex = document.querySelector("[data-select=odds]").options[document.querySelector("[data-select=odds]").selectedIndex].value;
          window.conf.CUSTOMER_CONFIG.ODDS_TYPE = selectedIndex;
          window.location.reload(true);
        }); //$(`[data-id=login-button]`).off('click', renderUserMenu);

        var user_menu = $("[data-id=user-menu]");
        /*$(`[data-id=login-button]`).on('click', () => {
          user_menu.slideUp("fast").remove("active");
        });
        */

        $("body").click(function (e) {
          if ($(e.target).closest("[data-id=login]").length != 0) return false; // disable trigger on first click to log in

          if ($(e.target).closest("[data-id=user-menu]").length != 0) return false; // disable trigger on login popup
          //user_menu.slideUp("fast").remove("active");
          //$(`[data-id=login]`).on('click', renderUserMenu);
        }); // Account profile redirect

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
                      console.log("overlay");
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
        }

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

        var username = 'username';
        $("[data-id=accountHistory]").prop('href', "#/user/".concat(username, "/transaction")).on('click', function () {
          window.location.hash = "/user/".concat(username, "/transaction");
          setBtnNotClicked();
          user_menu.slideUp("fast").removeClass("active").hide();
        });
        $("[data-id=accountSettings]").prop('href', "#/user/".concat(username, "/balance/account")).on('click', function () {
          setBtnNotClicked();
          window.location.hash = "/user/".concat(username, "/balance/account");
          user_menu.slideUp("fast").removeClass("active").hide();
        });
        $("[data-id=depositWithdraw]").prop('href', "#/user/".concat(username, "/balance/deposit")).on('click', function () {
          setBtnNotClicked();
          window.location.hash = "/user/".concat(username, "/balance/deposit");
          user_menu.slideUp("fast").removeClass("active").hide();
        });
        $("[data-id=promoBonuses]").prop('href', "#").on('click', function () {
          setBtnNotClicked();
          window.location.hash = "";
          user_menu.slideUp("fast").removeClass("active").hide();
        });
        $("[data-id=exitUser]").on('click', function (event) {
          user_menu.slideUp("fast").removeClass("active").hide();
          setBtnNotClicked();
          window.location.href = "";
          Cookies.set('logon', 'false');
        });
      });
    }

    renderUserMenu();
  });
  done();
});