"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports('betslip_link', function (params, done) {
  if (document.querySelector('.betslip-link').innerHTML.length > 0) {// $('.betslip-link').empty();ы
  } else {
    insertHtmlModules({
      ".betslip-link": ["betslip/betslip-link.html"]
    }, function () {
      $('.betslip-link .mini-loader').addClass('done');
      rerenderLink(betsCounter());
    });
  }

  var bsLink = $('.betslip-link');
  var betslip = $('.betslipWrapper');
  var coefBtn = $('button.button.coefficient');
  bsLink.off();
  coefBtn.off();

  function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  } // Evaluate number of bets in cookies


  function betsCounter() {
    var counter = 0;
    var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
    var keys = Object.keys(parsedCookies);

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      name = _keys[_i];

      if (name.substring(0, 3) == 'pa_') {
        counter++;
      }
    }

    return counter;
  }

  window.BetslipList = []; // array of selected odds

  BetslipList.uniquenes = function (betsList) {
    var ids = [];
    betsList.map(function (item) {
      ids.push(item.eventID);
    });

    if (window.BetslipList.length > uniq(ids).length) {
      return false;
    }

    return true;
  };

  var counter = 0;
  var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
  var keys = Object.keys(parsedCookies);

  for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
    name = _keys2[_i2];

    if (name.substring(0, 3) == 'pa_') {
      $("[data-id=".concat(name.slice(3), "]:not(.disabled)")).addClass('selected');
      counter++;
    }
  }

  PAs = {
    activeInternal: 10,
    activeListener: function activeListener(val) {},

    set active(val) {
      this.activeInternal = val;
      this.activeListener(val);
    },

    get active() {
      return this.activeInternal;
    },

    changeListener: function changeListener(listener) {
      this.activeListener = listener;
    }
  };
  PAs.changeListener(function (val) {
    if (betsCounter() == 0) {
      bsLink.slideUp('fast');
    } else {
      rerenderLink(betsCounter());
    }
  });

  if (betsCounter() != 0) {
    PAs.active = betsCounter; // bsLink.slideDown('fast');

    rerenderLink(betsCounter());
  } else {
    bsLink.slideUp('fast');
  }

  function multiOdds() {
    if (BetslipList.uniquenes(window.BetslipList)) {
      var m = 1;

      var _parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));

      var _keys3 = Object.keys(_parsedCookies);

      for (var _i3 = 0, _keys4 = _keys3; _i3 < _keys4.length; _i3++) {
        name = _keys4[_i3];

        if (name.substring(0, 3) == 'pa_') {
          m *= /o=(.*)#f=/i.exec(_parsedCookies[name])[1].includes('/') ? modifyBets(/o=(.*)#f=/i.exec(_parsedCookies[name])[1]) : /o=(.*)#f=/i.exec(_parsedCookies[name])[1];
        }
      }

      m = m.toFixed(2);
      var mStr = m.toString();

      if (typeof mStr.split('.')[1] == 'undefined') {
        mStr += '.00';
      } else {
        if (mStr.split('.')[1].length == 1) {
          mStr += '0';
        }
      }

      $('.betslip-link .mini-loader').css({
        '-webkit-transform': 'translateZ(0) translateX(0vw)',
        '-ms-transform': 'translateZ(0) translateX(0w)',
        'transform': 'translateZ(0) translateX(0vw)'
      });
      $('.betslip-link .text-right').show();
      bsLink.children().children('.text-right').children('p.font').text(window.dict.multiodds);
      bsLink.children().children('.text-right').children('p.title').text(mStr);
    } else {
      $('.betslip-link .text-right').hide();
      bsLink.children().children('.text-right').children('p.font').html('&nbsp;');
      bsLink.children().children('.text-right').children('p.title').html('&nbsp;');
    }
  }

  (function () {
    if (window.innerHeight > window.innerWidth) {
      bsLink.css({
        'min-width': "".concat(screen.width, "px"),
        'max-width': "".concat(screen.width, "px")
      });
    } else {
      bsLink.css({
        'min-width': "60vw",
        'max-width': "60vw"
      });
    }
  })(0);

  function addBet() {
    return _addBet.apply(this, arguments);
  }

  function _addBet() {
    _addBet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var ns, ms, parsedCookies, keys, _i4, _keys5, reqData, rawResponse, content;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ns = '', ms = '||';
              parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
              keys = Object.keys(parsedCookies);

              for (_i4 = 0, _keys5 = keys; _i4 < _keys5.length; _i4++) {
                name = _keys5[_i4];

                if (name.substring(0, 3) == 'pa_') {
                  ns += parsedCookies[name];
                }

                if (name === 'ms') {
                  ms = parsedCookies[name];
                }
              }

              reqData = {
                ns: ns,
                ms: ms
              };
              console.log("ADD_BET");
              _context.next = 8;
              return fetch('https://bestline.bet/betsapi2/addbet', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
              });

            case 8:
              rawResponse = _context.sent;
              _context.next = 11;
              return rawResponse.json();

            case 11:
              content = _context.sent;
              changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
              /*if sr == 0 - place bet*/

              /*if sr == 2 - */

              console.log(content);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _addBet.apply(this, arguments);
  }

  coefBtn.on('click', function (event) {
    var cur = $(event.target).closest('.button.coefficient');

    if (cur.hasClass('selected')) {
      Cookies.remove('pa_' + cur[0].dataset.id);
      cur.removeClass('selected');
      multiOdds();
      BetslipList.map(function (item, index) {
        if (item.eventID == cur.parent().siblings("[data-id=event]").data('gameId') && item.type == cur.data('type')) {
          BetslipList.splice(index, 1);
        }
      });
      PAs.active = betsCounter();
    } else {
      var BetslipItem = {};
      BetslipItem.eventID = cur.parent().siblings("[data-id=event]").data('gameId');
      BetslipItem.eventNA = cur.data("eventna");
      BetslipItem.CL = cur.data("cl");
      BetslipItem.marketNA = cur.data("marketna");
      BetslipItem.BS = cur.data("bs");
      BetslipItem.FI = cur.data("fi");
      BetslipItem.HA = cur.data("ha");
      BetslipItem.HD = cur.data("hd");
      BetslipItem.ID = cur.data("id");
      BetslipItem.IT = cur.data("it");
      BetslipItem.NA = cur.data("na");
      BetslipItem.OD = cur.data("od");
      BetslipItem.OR = cur.data("or");
      BetslipItem.SU = cur.data("su");
      BetslipList.push(BetslipItem);
      var date = new Date();
      var timestamp = date.getTime();
      timestamp = Math.round(timestamp / 1000);
      var tsToHex = timestamp.toString(16);
      console.log(tsToHex);
      Cookies.set('pa_' + cur[0].dataset.id, 'pt=N#' + 'o=' + BetslipItem.OD + '#' + 'f=' + BetslipItem.FI + '#' + 'fp=' + BetslipItem.ID + '#' + 'so=' + '#' + 'c=' + BetslipItem.CL + '#' + 'id=' + BetslipItem.FI + '-' + BetslipItem.ID + 'Y' + '#' + 'sa=' + tsToHex + '-' + '60D0DCE9' + '#' + '|FO=' + 'False' + '#' + 'mt=' + '2' + '#' + 'st=' + '#' + 'tr=' + '#' + 'es=' + '1' + '#' + 'ust=' + '#' + 'TP=' + 'BS' + BetslipItem.FI + '-' + BetslipItem.ID + '#' // + 'pbc=' + '0' + '#'
      + '||'); // console.log(Cookies.get('pa_' + cur[0].dataset.id));

      cur.addClass('selected');
      bsLink.slideDown('fast');
      rerenderLink(betsCounter());
      PAs.active = betsCounter();
      addBet();
    }
  });
  $('.button.coefficient.disabled').off('click'); // Convert fractial to decimal

  function modifyBets(od) {
    var nums = od.split('/');
    return (nums[0] / nums[1] + 1).toFixed(2);
  }

  ; // rerenderLink(PAs.active);

  function rerenderLink(val) {
    if (val == 0) {
      bsLink.slideUp('fast');
    }

    if (val >= 1) {
      bsLink.slideDown('fast');
    }

    $('.betslip-link p.betslip-link-count').attr('data', betsCounter());

    if (val > 1) {
      multiOdds();
    } else {
      $('.betslip-link .mini-loader').css({
        '-webkit-transform': 'translateZ(0) translateX(-7vw)',
        '-ms-transform': 'translateZ(0) translateX(-7vw)',
        'transform': 'translateZ(0) translateX(-7vw)'
      });
      $('.betslip-link .text-right').hide();
      bsLink.children().children('.text-right').children('p.font').html('&nbsp;');
      bsLink.children().children('.text-right').children('p.title').html('&nbsp;');
    }

    window.translate();
  }

  $('.betslip-link .mini-loader').addClass('done');
  bsLink.on('click', function (event) {
    bsLink.off(); // bsLink.slideUp('fast');

    $('.betslip-link .mini-loader').removeClass('done');
    loadJsModules({
      betslip: {
        loadCSS: true,
        loadLanguage: false
      }
    });
  });
});