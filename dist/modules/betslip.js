"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

exports('betslip', function (params, done) {
  if (document.querySelector('.inBetslip') == null) {} else {
    var cln = document.querySelector('.inBetslip');
    cln.classList.add('inBetslip');
    cln.classList.remove('done');
    cln.dataset.status = 'not-done';
    cln.style.height = document.querySelector('#bsDiv').offsetHeight;
    cln.style.width = document.querySelector('#bsDiv').offsetWidth;
    cln.style.top = "calc(100vh - ".concat(document.querySelector('#bsDiv').offsetHeight, "px)");
  }

  var betslip = $('.betslipWrapper');
  var bsLink = $('.betslip-link');
  var blur = $("[data-id=blur]");
  var preloader = $('#page-preloader'); // preloader.removeClass('done').addClass('opaci');

  blur.removeClass('none');
  blur.addClass('block'); // betslip.slideDown('fast');

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

  if (typeof params.update !== 'undefined') {
    var _parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));

    var _keys2 = Object.keys(_parsedCookies);

    for (var _i2 = 0, _keys3 = _keys2; _i2 < _keys3.length; _i2++) {
      name = _keys3[_i2];

      if (name.substring(0, 3) == 'pa_') {
        var date = new Date();
        var timestamp = date.getTime();
        timestamp = Math.round(timestamp / 1000);
        var tsToHex = timestamp.toString(16);
        console.log(tsToHex);
        var old = /sa=(.*)#|FO/i.exec(_parsedCookies[name])[1].substring(0, 8);
        console.log('old:', old);
        Cookies.set(name, _parsedCookies[name].replace(old, tsToHex));
      }
    }
  }

  var ns = '',
      ms = '||';
  var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
  var keys = Object.keys(parsedCookies);

  for (var _i3 = 0, _keys4 = keys; _i3 < _keys4.length; _i3++) {
    name = _keys4[_i3];

    if (name.substring(0, 3) == 'pa_') {
      ns += parsedCookies[name];
    }

    if (name === 'ms') {
      ms = parsedCookies[name];
    }
  } //const prevns = JSON.parse(sessionStorage.getItem('ns') || '{}')
  //let ns = Object.values(prevns).join('')
  //const ms = sessionStorage.getItem('ms') || ''
  // Data to send on the server


  var data = "{\n      \"bt\": \"1\",\n      \"ns\": \"".concat(ns, "\",\n      \"mo\": \"1\",\n      \"ms\": \"").concat(ms, "\",\n      \"cs\": \"\"\n    }");
  var reqData = {
    ns: ns,
    ms: ms
  };
  var url = '';

  if (typeof params.update === 'undefined') {
    //url = 'https://www.bestline.bet/bs/?op=1';
    // url = 'https://www.bestline.bet/bs/?op=1';
    url = 'http://bestline.bet/betsapi2/refreshslip';
  } else {
    // url = 'https://www.bestline.bet/bs/?op=9';
    url = 'http://bestline.bet/betsapi2/refreshslip';
  }
  /* (async () => {
    console.log("REFRESH_BETSLIP");
    const rawResponse = await fetch('https://bestline.bet/betsapi2/refreshslip', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    });
    const content = await rawResponse.json();
    changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
    console.log(content);
  })(); */


  function loadBetslip(url, callback) {
    if (url.includes('refreshslip') || false) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(JSON.parse(xhr.responseText));
          callback(JSON.parse(xhr.responseText), true);
        }
      };

      xhr.open("POST", url, true);
      xhr.send(JSON.stringify(reqData)); // let response = JSON.parse(`{"bg":"8de704e2-3a86-4385-87c5-59b7edea127d","sr":14,"mr":false,"ir":true,"vr":"35","cs":1,"st":1,"mi":"selections_changed","mv":"","bt":[{"cl":1,"sa":"5e75f965-CD4145E6","tp":"BS87573810-683588356","oc":true,"mt":2,"mr":false,"bt":1,"pf":"N","od":"4/11","fi":87573810,"fd":"FC Vitebsk v FK Gorodeya","pt":[{"pi":683588356,"bd":"FC Vitebsk","md":"Fulltime Result"}],"sr":14},{"cl":1,"sa":"5e75f963-9557A3CC","tp":"BS87573840-683591101","mt":2,"mr":false,"bt":1,"pf":"N","od":"11/10","fi":87573840,"fd":"Bujumbura City v Kayanza Utd","pt":[{"pi":683591101,"bd":"Bujumbura City","md":"Fulltime Result"}],"sr":0},{"cl":1,"sa":"5e75f96a-5896A733","tp":"BS87574329-683622557","mt":2,"mr":false,"bt":1,"pf":"N","od":"1/20","fi":87574329,"fd":"Katrineholm v Halleforsnas IF","pt":[{"pi":683622557,"bd":"Katrineholm","md":"Fulltime Result"}],"sr":0}],"dm":{"bt":3,"od":"2/1","bd":"Trebles","bc":1,"ea":false,"cb":false},"mo":[{"bt":-1,"bd":"","bc":3,"ea":false,"cb":false},{"bt":2,"od":"","bd":"Doubles","bc":3,"ea":false,"cb":false},{"bt":14,"od":"","bd":"Trixie","bc":4,"ea":false,"cb":false}],"bs":[1,2]}`);
    } else {
      var _xhr = new XMLHttpRequest();

      _xhr.onreadystatechange = function () {
        if (_xhr.readyState === 4) {
          callback(_xhr.responseText);
        }
      };

      _xhr.open("POST", url, true);

      _xhr.send(JSON.stringify(JSON.parse(data)));
    }
  }

  loadBetslip(url, function (response) {
    var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!refresh) {
      if (response.length < 36) {
        var _parsedCookies2 = JSON.parse(JSON.stringify(Cookies.get()));

        var _keys5 = Object.keys(_parsedCookies2);

        for (var _i4 = 0, _keys6 = _keys5; _i4 < _keys6.length; _i4++) {
          name = _keys6[_i4];

          if (name.substring(0, 3) == 'pa_') {
            Cookies.remove(name);
          }

          if (name === 'ms') {
            Cookies.remove(name);
          }
        }

        betslip.slideUp('fast');
        $('button.coefficient.selected').removeClass('selected');
        blur.addClass('none');
        blur.removeClass('block');
        return;
      }
    } else {
      var _parsedCookies3 = JSON.parse(JSON.stringify(Cookies.get()));

      var _keys7 = Object.keys(_parsedCookies3);

      var counter = 0;

      for (var _i5 = 0, _keys8 = _keys7; _i5 < _keys8.length; _i5++) {
        name = _keys8[_i5];

        if (name.substring(0, 3) == 'pa_') {
          counter++;
          var check = response.bt.some(function (bet) {
            if (bet !== null) {
              return bet.pt[0].pi === Cookies.get(name).match(/#fp=(.*)#so=/gi)[0].slice(4, -4);
            }

            return false;
          });
          console.log("check ", name, check);

          if (!check) {
            console.log("remove", name.slice(2));
            $("[data-id=".concat(name.slice(3), "]")).removeClass('selected');
            Cookies.remove(name);
          }
        }
      }

      if (counter > response.bt.filter(function (bet) {
        return bet !== null;
      }).length) {
        setTimeout(loadJsModules({
          betslip: {
            update: true,
            loadCSS: false,
            loadLanguage: false
          }
        }), 200);
        return;
      }

      console.log(response); // TODO: cookies cleaning
    }

    var betslipRender = new Promise(function (resolve, reject) {
      if (!refresh) {
        /{bss}(.*?){bse}/i.exec(response)[1].split('&')[3].slice(3).split('||').map(function (item) {
          if (item) {
            Cookies.set("pa_".concat(/fp=(.*)#so/i.exec(item)[1]), item + '||');
          }
        });

        if (typeof /{bss}(.*?){bse}/i.exec(response)[1].split('&')[4] !== 'undefined') {
          Cookies.remove('ms');
          Cookies.set('ms', /{bss}(.*?){bse}/i.exec(response)[1].split('&')[4].slice(3));
        }

        response = response.replace(/betSlip/g, 'betSlipy'); // let newBetslip = $(response).find('.betSlipyCloseIcon').append(`<span class="close"></span>`);

        var newBetslip = $(response); // console.log(response);

        var newBetslipContent = newBetslip.children('#betslipContent');
        var newBetslipFooter = newBetslip.children('#betslipFooter');

        if (newBetslipContent.find('.bs-useFreeBetAmount').length > 0) {
          if (/{(.*)}/i.exec(newBetslipContent.find('.bs-useFreeBetAmount').text())[1] == 0) {
            newBetslipContent.find('.bs-useFreeBet').addClass('hidden');
          }
        }

        newBetslipContent.find('.removeColumn').empty().append($('<span class="close remove-bet"></span>'));
        newBetslipContent.find('.single-section.standardBet ul li').each(function (i, el) {
          el.classList.add('hasodds');
        });
        newBetslipContent.find('input').attr('readonly', 'readonly').attr('maxlength', '9'); // newBetslipContent.find('.bs-MultipleBets_HighestAccumulator').children('.stake').removeClass('stake');
        // newBetslipContent.find('.bs-MultipleBets_HighestAccumulator .bs-stakeContainer').addClass('stake');

        if ($('.betslipWrapper').length > 0) {
          $('.betslipWrapper').empty();
        }

        if ($('.preloader.inBetslip').length == 0) {
          var _cln = document.querySelector('#page-preloader').cloneNode(true);

          _cln.classList.add('inBetslip');

          _cln.classList.remove('done');

          _cln.dataset.status = 'not-done';
          document.querySelector('.betslipWrapper').insertAdjacentElement('beforebegin', _cln);
          ;
        }

        insertHtmlModules({
          ".betslipWrapper": ["betslip/betslip.html"]
        }, function () {
          $('.betSlipyCountText').text(betsCounter());
          $('#betslipContent').empty().append(newBetslipContent);
          $('#betslipFooter').empty().append(newBetslipFooter);
          $('.betslipWrapper').removeClass('locked');
          resolve();
        });
      } else {
        if ($('.betslipWrapper').length > 0) {
          $('.betslipWrapper').empty();
        }

        if ($('.preloader.inBetslip').length == 0) {
          var _cln2 = document.querySelector('#page-preloader').cloneNode(true);

          _cln2.classList.add('inBetslip');

          _cln2.classList.remove('done');

          _cln2.dataset.status = 'not-done';
          document.querySelector('.betslipWrapper').insertAdjacentElement('beforebegin', _cln2);
          ;
        }

        insertHtmlModules({
          ".betslipWrapper": ["betslip/betslip.html"]
        }, function () {
          var _response$mo;

          $('.betSlipyCountText').text(betsCounter());

          var _iterator = _createForOfIteratorHelper(response.bt),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              bet = _step.value;
              appendBet({
                'eventID': bet.pt[0].pi,
                'eventNA': bet.fd,
                'marketNA': bet.fd,
                'BS': 'BS',
                'FI': bet.fi,
                'HA': 'HA',
                'HD': 'HD',
                'ID': bet.pt[0].pi,
                'IT': 'IT',
                'NA': bet.fd,
                'OD': bet.od,
                'OR': 'OR',
                'SU': bet.su,
                'OC': bet.oc
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var dm = response.dm;

          if (dm) {
            appendDm({
              'ID': dm.bt,
              'NA': dm.bd,
              'OD': dm.od
            });
          }

          if (((_response$mo = response.mo) === null || _response$mo === void 0 ? void 0 : _response$mo.length) > 0) {
            var _iterator2 = _createForOfIteratorHelper(response.mo),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                bet = _step2.value;
                // let { eventID, eventNA, marketNA, BS, FI, HA, HD, ID, IT, NA, OD, OR, SU }
                appendMultiodds({
                  'ID': bet.bt,
                  'NA': bet.bd == '' ? 'Singles' : bet.bd,
                  'OD': bet.bc
                });
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } // append odds


          function appendBet(item) {
            var eventID = item.eventID,
                eventNA = item.eventNA,
                marketNA = item.marketNA,
                BS = item.BS,
                FI = item.FI,
                HA = item.HA,
                HD = item.HD,
                ID = item.ID,
                IT = item.IT,
                NA = item.NA,
                OD = item.OD,
                OR = item.OR,
                SU = item.SU,
                OC = item.OC;

            if ($('.single-section.standardBet').children('ul').length == 0) {
              $('.single-section.standardBet').append("<ul></ul>");
            }

            $('.single-section.standardBet').children('ul').append("\n            <li class= \"hasodds".concat(OC == true ? ' oddsChange' : '', "\" data-event=\"").concat(eventID, "\" data-BS=\"").concat(BS, "\" data-FI=\"").concat(FI, "\" data-HA=\"").concat(HA, "\" data-HD=\"").concat(HD, "\" data-ID=\"").concat(ID, "\" data-IT=\"").concat(IT, "\" data-NA=\"").concat(NA, "\" data-OD=\"").concat(OD, "\" data-OR=\"").concat(OR, "\" data-SU=\"").concat(SU, "\" >\n              <div class=\"bs-ItemOverlay\" ></div > <div class=\"selectionRow\">\n                <div class=\"restrictedMultiple\"></div>\n                <div class=\"removeColumn\"><span class=\"close remove-bet\"></span></div>\n                <div class=\"selection\">\n                  <div class=\"selectionDescription\">").concat(NA, "</div>\n                  <div class=\"fullSlipMode\">").concat(marketNA, "</div>\n                  <div class=\"fullSlipMode\">").concat(eventNA, "</div>\n                </div>\n                <div class=\"odds\">").concat(modifyBets(OD), "</div>\n                <div class=\"stake\">\n                  <input data-inp-type=\"sngstk\" type=\"text\" class=\"stk\" value=\"\" placeholder=\"Stake\" readonly=\"readonly\" maxlength=\"9\">\n                    <div class=\"stakeToReturn hidden  \">\n                      To return&nbsp;\n                      <span class=\"stakeToReturn_Value\">0.00</span>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"deleteItem\">Delete</div>\n              </li>"));
          } // appendDm


          function appendDm(item) {
            var ID = item.ID,
                NA = item.NA,
                OD = item.OD;

            if ($('.multiple-section.multipleBets').children('ul.multiplesWrapper').length == 0) {
              $('.multiple-section.multipleBets').append("<ul class=\"multiplesWrapper closed\"></ul>");
            }

            $('.multiple-section.multipleBets').children('ul.multiplesWrapper').append("\n              <li data-item-id=\"".concat(ID, "\" data-item-type=\"multiple\" class=\"mlt bs-MultipleBets_HighestAccumulator\" data-item-plbtid=\"0\" data-item-leaguecode=\"\" data-item-fpid=\"\">\n              <div class=\"stake\" data-1=\"1\">\n                <div class=\"multiplesLabel\">\n                  <div class=\"bs-BetNameNoBreakdown\">\n                    <div class=\"multiplesBetCount\"></div>\n                      ").concat(NA, "\n                    </div>\n                    <div class=\"mbHeader\">\n                      <div class=\"mlthd\" id=\"mlthdr\" data-stext=\"Show all multiples\" data-htext=\"Hide all multiples\">\n                        Hide all multiples\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"bs-multiple-default-odds\" style=\"display:none;\">\n                  </div>\n                  <div class=\"bs-multiple-default-odds\" style=\"\">").concat(modifyBets(OD), "</div>\n                  <div class=\"bs-stakeContainer toReturn\">\n                    <input data-inp-type=\"mltstk\" data-system=\"false\" type=\"text\" class=\"stk mltdftstk\" value=\"\" placeholder=\"Stake\" readonly=\"readonly\">\n                    <div class=\"bs-StandardMultipleStake_ToReturn hidden\">To Return<span class=\"bs-StandardMultipleStake_ToReturnValue\">&nbsp;0.00</span></div>\n                  </div>\n                </div>\n                \n                <div class=\"bs-BetCreditItem\">\n                  <div class=\"bs-BetCreditInfo\">\n                    Use 5.00 Bet Credits + 10.00 GBP\n                  </div>\n                </div>\n                <div>\n                </div>\n                </li>"));
          } // append multiodds


          function appendMultiodds(item) {
            var ID = item.ID,
                NA = item.NA,
                OD = item.OD;

            if ($('.multiple-section.multipleBets').children('ul.multiplesWrapper').length == 0) {
              return;
            }

            $('.multiple-section.multipleBets').children('ul.multiplesWrapper').append("\n            <li data-item-id=\"".concat(ID, "\" data-item-type=\"multiple\" class=\"bs-MultipleBets_Singles\">\n              <div class=\"stake\">\n              <div class=\"multiplesLabel\">").concat(NA, "</div>\n              <div class=\"multiplesBetCount\">").concat(OD, "x</div>\n                <input id=\"mltsngstk\" data-nbm=\"true\" class=\"stk\" type=\"text\" placeholder=\"Stake\" readonly=\"readonly\">\n              </div>\n            </li>"));
          }

          resolve();
        });
      }
    });
    betslipRender.then(function (response) {
      bsLink.slideUp('fast');
      betslip.slideDown('fast');
      $('.betSlipyLogin').replaceWith("\n        <div id=\"BetSlipBalance\">\n          <div class=\"balanceText\">Balance</div>\n          <div class=\"balance\">\n          ".concat(window.conf.CUSTOMER_CONFIG.CURRENCY_SYMBOL).concat(floatToCurrency(0.00), "\n          </div>\n        </div>")); // preloader done

      var cln = document.querySelector('.preloader.inBetslip');
      cln.classList.add('done');
      cln.dataset.status = 'done';
      $('.bs-ContentOverlay').css('display', 'none'); // preloader.addClass('done').removeClass('opaci');

      var content = $('li.single-section.standardBet');
      var count = $('span.betSlipyCountText');
      var item = $('.single-section.standardBet > ul > li');
      var input = $('input.stk');
      blur.on('click', function () {
        blur.removeClass('block');
        blur.addClass('none');
        betslip.slideUp('fast');

        if (betsCounter() > 0) {
          loadJsModules({
            betslip_link: {
              loadCSS: false,
              loadLanguage: false
            }
          }); // bsLink.slideDown('fast');
        }
      }); // Accept changes

      $('.acceptChanges').on('click', function (event) {
        event.preventDefault();
        var cln = document.querySelector('.preloader.inBetslip');
        cln.classList.add('inBetslip');
        cln.classList.remove('done');
        cln.dataset.status = 'not-done';
        console.log("#bsDiv!");
        console.log("Height: ", document.querySelector('#bsDiv').offsetHeight);
        console.log("Height: ", document.querySelector('#bsDiv').offsetWidth);
        cln.style.height = document.querySelector('#bsDiv').offsetHeight;
        cln.style.width = document.querySelector('#bsDiv').offsetWidth;

        _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var rawResponse, content;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch('https://bestline.bet/betsapi2/refreshslip', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqData)
                  });

                case 2:
                  rawResponse = _context.sent;
                  _context.next = 5;
                  return rawResponse.json();

                case 5:
                  content = _context.sent;
                  changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
                  /*if sr == 0 - place bet*/

                  /*if sr == 2 - */

                  console.log(content);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))(); // cln.style.bottom = 0;


        loadJsModules({
          betslip: {
            update: true,
            loadCSS: true,
            loadLanguage: false
          }
        });
      }); // Place bet

      $('#betslipFooter a.placeBet button').on('click', function (event) {
        var cur = $(event.target);
        event.preventDefault();

        if (document.getElementById('bstsx').innerText.length > 0) {
          if (Cookies.get('logon')) {
            blur.removeClass('block');
            blur.addClass('none');
            betslip.slideUp('fast'); // TODO: Placing a bet :)
          } else {
            blur.removeClass('block');
            blur.addClass('none');
            betslip.slideUp('fast');
            loadJsModules({
              login: {
                loadCSS: true,
                loadLanguage: false
              }
            });
          }
        } // Not entered bets
        else {
            var _inputs = document.querySelectorAll('input.stk');

            _inputs.forEach(function (el) {
              el.classList.add('animated', 'bounce');
              el.style.borderBottom = '1px solid red';
              el.addEventListener('animationend', function () {
                _inputs.forEach(function (el) {
                  el.classList.remove('animated', 'bounce');
                });

                setTimeout(function () {
                  el.style.borderBottom = 'none';
                }, 3000);
              });
            });
          }
      });
      $('#BetSlipEditButton').on('click', function (event) {
        $('#bsDiv').addClass('editMode').trigger('editMode');
        $(event.target).text('Done');
      }); // Show / hide multiples

      $('.mbHeader').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.multiplesWrapper').toggleClass('open');
        $('.multiplesWrapper').toggleClass('closed');

        if ($('.multiplesWrapper').is('.closed')) {
          $('.mbHeader .mlthd').text('Show multiples');
          $('.multiplesLabel').eq(0).slideUp('fast', function () {
            $('.multiplesLabel').eq(0).slideDown('fast');
          });
          $('.multiplesLabel').not(':eq(0)').slideUp('fast');
        } else {
          $('.multiplesLabel').not(':eq(0)').slideDown('fast');
          $('.multiplesLabel').eq(0).slideUp('fast', function () {
            $('.multiplesLabel').eq(0).slideDown('fast');
          });
          $('.mbHeader .mlthd').text('Hide multiples');
        }
      });
      var startX = 0;
      item.on('touchstart', function (event) {
        var cur = $(event.target);
        var li = cur.closest('li.hasodds')[0];
        li.classList.add('moving');
        var transformStyle = li.style.transform;
        var startTranslated = transformStyle.replace(/[^\d.]/g, '');
        startX = event.originalEvent.touches[0].pageX; // const width = setInterval(() => {
        //   if (distance < -100) {
        //     console.log('not +100');
        //     cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance}`);
        //   }
        //   else {
        //     console.log('+100');
        //     cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance + 100}`);
        //   }
        // }, 150);
        //console.log('startX:', startX);

        var distance = 0;
        cur.on('touchmove', function (event) {
          cur.parent('.single-section.standardBet > ul > li').addClass('mov');
          var curX = event.originalEvent.touches[0].pageX;
          distance = curX - startX;
          var drugEl = $(event.target).closest('.single-section.standardBet > ul > li');

          if (startTranslated == '') {
            if (distance < 0) {
              drugEl.css('transform', "translateX(".concat(distance, "px)"));
            }

            if (distance < -100) {
              cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', "".concat(-distance, "px"));
            }
          } else {
            if (distance < 0) {
              //   // d - 100
              //   drugEl.css('transform', `translateX(${distance}px)`);
              // }
              // if (distance < -100) {
              // -d + 100
              drugEl.css('transform', "translateX(".concat(distance - 100, "px)"));
              cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', "".concat(-distance + 100, "px"));
            }
          }
        });
        cur.on('touchend', function (event) {
          cur.parent('.single-section.standardBet > ul > li').removeClass('mov');
          $('.deleteItem').on('touchstart', function (event) {
            var cur = $(event.target).closest('li.hasodds');
            var eventID = cur.closest('li.hasodds').data('event');
            var ID = cur.closest('li.hasodds').data("id");
            var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
            var keys = Object.keys(parsedCookies);
            var counter = 0;

            for (var _i6 = 0, _keys9 = keys; _i6 < _keys9.length; _i6++) {
              name = _keys9[_i6];

              if (name.substring(0, 3) == 'pa_') {
                if (name.slice(3) == ID) {
                  Cookies.remove("pa_".concat(ID));
                  $("[data-id= ".concat(ID, "]")).removeClass('selected');
                  counter--;
                }

                counter++;
              }
            }

            $(".button.coefficient[data-id= ".concat(ID, "]")).removeClass('selected');
            $('.betSlipyCountText').text(betsCounter());
            $('.betslip-link p.betslip-link-count').attr('data', counter);
            cur.animate({
              "margin-right": '+=200',
              opacity: 0.25,
              height: "toggle"
            }, 250, function () {
              cur.remove();
              $('.betslip-link p.betslip-link-count').attr('data', counter);

              if ($('.betslip-link p.betslip-link-count').attr('data') == 0) {
                bsLink.slideUp('fast');
              }

              multiOdds();

              if (betsCounter() == 0) {
                blur.removeClass('block');
                blur.addClass('none');
                betslip.slideUp('fast');
              } else {
                $('.betslipWrapper').addClass('locked');
                loadJsModules({
                  betslip: {
                    loadCSS: false,
                    loadLanguage: false
                  }
                });
              }
            });
          });
          var transformStyleEnd = li.style.transform;
          var endTranslated = transformStyleEnd.replace(/[^\d.]/g, '');

          if (endTranslated > 200) {
            var eventID = cur.closest('li.hasodds').data('event');
            var ID = cur.closest('li.hasodds').data("id");

            var _parsedCookies4 = JSON.parse(JSON.stringify(Cookies.get()));

            var _keys10 = Object.keys(_parsedCookies4);

            var _counter = 0;

            for (var _i7 = 0, _keys11 = _keys10; _i7 < _keys11.length; _i7++) {
              name = _keys11[_i7];

              if (name.substring(0, 3) == 'pa_') {
                if (name.slice(3) == ID) {
                  Cookies.remove("pa_".concat(ID));
                  $("[data-id=".concat(ID, "]")).removeClass('selected');
                  _counter--;
                }

                _counter++;
              }
            }

            $(".button.coefficient[data-id= ".concat(ID, "]")).removeClass('selected');
            $('.betSlipyCountText').text(_counter);
            $('.betslip-link p.betslip-link-count').attr('data', _counter);
            cur.closest('li.hasodds').animate({
              "margin-right": '+=200',
              opacity: 0.25,
              height: "toggle"
            }, 250, function () {
              cur.closest('li.hasodds').remove();

              if (betsCounter() == 0) {
                bsLink.slideUp('fast');
                blur.removeClass('block');
                blur.addClass('none');
                betslip.slideUp('fast');
              } else {
                $('.betslipWrapper').addClass('locked');
                loadJsModules({
                  betslip: {
                    loadCSS: false,
                    loadLanguage: false
                  }
                });
              }
            });
          }

          if (distance < -70) {
            cur.closest('li.hasodds').css('transform', "translateX(-100px)");
            cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', "".concat(100, " "));
          } else {
            cur.closest('li.hasodds').css('transform', "");
            cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', "".concat(100, " "));
          }

          cur.parent('.single-section.standardBet > ul > li').removeClass('mov');
          event.stopPropagation();
        });
      });
      var nptChng = new Event('inputChange'); // stakepad

      var onStake = function onStake(event) {
        var cur = $(event.target); // if (cur.is('.stake')) {
        //   cur = cur.children('input.stk');
        // }
        // else {
        //   if (cur.is('.bs-stakeContainer')) {
        //     cur = cur.children('input.stk');
        //   }
        //   if (cur.is('.stakeToReturn')) {
        //     cur = cur.parent('.bs-stakeContainer').children('input.stk');
        //   }
        //   if (cur.is('.bs-StandardMultipleStake_ToReturn')) {
        //     cur = cur.parent('.bs-stakeContainer').children('input.stk');
        //   }
        // }
        // if (cur.is('.stakeToReturn') || cur.is('.stakeToReturn_Text') || cur.is('.stakeToReturn_Value')) {
        //   cur = cur.parent('.stake').children('input.stk');
        // }

        if (cur.is('.focus')) {
          $('.stk.focus').removeClass('focus');
          document.querySelectorAll('.selectionRow input.stk').forEach(function (el, i, arr) {
            if (el.parentNode.querySelector('span.stakeToReturn_Value').innerHTML == ' 0.00' || el.parentNode.querySelector('span.stakeToReturn_Value').innerHTML == "&nbsp;0.00") {
              el.parentNode.querySelector('.stakeToReturn').classList.add('hidden');
            }
          });

          if (document.querySelector('span.bs-StandardMultipleStake_ToReturnValue') !== null) {
            if (document.querySelector('span.bs-StandardMultipleStake_ToReturnValue').innerHTML == ' 0.00' || document.querySelector('span.bs-StandardMultipleStake_ToReturnValue').innerHTML == "&nbsp;0.00") {
              document.querySelector('.bs-StandardMultipleStake_ToReturn').classList.add('hidden');
            }
          }

          cur.closest('.hasodds').removeClass('keypad');
          cur.closest('.bs-stakeContainer').removeClass('keypad');
          $('.stakepad').slideUp(250, function () {
            $(this).remove();
          });
        } else {
          $('.stakepad').slideUp(250, function () {
            $(this).remove();
          });
          $('.stakepad').remove();
          input.removeClass('focus');

          if (cur.is('input')) {
            cur.addClass('focus');
          } else {
            cur.addClass('focus');
          }

          cur.siblings('.stakeToReturn').removeClass('hidden');
          cur.siblings('.bs-StandardMultipleStake_ToReturn').removeClass('hidden');
          (cur.closest('.hasodds').length == 0 ? cur.closest('.multiplesWrapper li') : cur.closest('.hasodds')).append($('<div class="stakepad">').load("./html/modules/betslip/keyboard.html", function () {
            cur.closest('.hasodds').addClass('keypad');
            cur.closest('.bs-stakeContainer').addClass('keypad');
            $('.stakepad').hide();
            $('.stakepad').slideDown('fast');
            $('.keyboard-button').on('touchstart', function (event) {
              var cur = $(event.target);
              var n = cur.html();

              if (n == 'Done') {
                if ($('.stk.focus').val().includes('.')) {
                  if ($('.stk.focus').val().split('.')[1].length < 1) {
                    $('.stk.focus').val($('.stk.focus').val().slice(0, -1));
                  }
                }

                cur.css('border-radius', '0');
                document.querySelectorAll('.selectionRow input.stk').forEach(function (el, i, arr) {
                  if (el.parentNode.querySelector('span.stakeToReturn_Value').innerHTML == ' 0.00' || el.parentNode.querySelector('span.stakeToReturn_Value').innerHTML == "&nbsp;0.00") {
                    el.parentNode.querySelector('.stakeToReturn').classList.add('hidden');
                  }
                });

                if (document.querySelector('.bs-StandardMultipleStake_ToReturnValue') !== null) {
                  if (document.querySelector('.bs-StandardMultipleStake_ToReturnValue').innerHTML == ' 0.00' || document.querySelector('.bs-StandardMultipleStake_ToReturnValue').innerHTML == "&nbsp;0.00") {
                    document.querySelector('.bs-StandardMultipleStake_ToReturn').classList.add('hidden');
                  }
                }

                $('.stk.focus').removeClass('focus');
                cur.closest('.hasodds').removeClass('keypad');
                cur.closest('.stakepad').slideUp(250, function () {
                  $(this).remove();
                });
              } else {
                if (n == '') {
                  cur.css('border-radius', '0');
                  $('.stk.focus').val($('.stk.focus').val().slice(0, -1));
                  document.querySelector('.stk.focus').dispatchEvent(nptChng);
                } else {
                  if (n == '.') {
                    cur.css('border-radius', '0');

                    if ($('.stk.focus').val().includes('.')) {} else {
                      $('.stk.focus').val($('.stk.focus').val() + n);
                      document.querySelector('.stk.focus').dispatchEvent(nptChng);
                    }
                  } else {
                    if ($('.stk.focus').val().includes('.')) {
                      if ($('.stk.focus').val().split('.')[1].length < 2) {
                        $('.stk.focus').val($('.stk.focus').val() + n);
                        document.querySelector('.stk.focus').dispatchEvent(nptChng);
                      }
                    } else {
                      $('.stk.focus').val($('.stk.focus').val() + n);
                      document.querySelector('.stk.focus').dispatchEvent(nptChng);
                    }
                  }
                }
              }

              cur.addClass('stakePadKeyDown');
              $('#stakePadToolTip').text(n);
            });
            $('.keyboard-button').on('touchend', function (event) {
              var cur = $(event.target);
              var n = cur.html();
              cur.removeClass('stakePadKeyDown');
              $('#stakePadToolTip').empty();
            });
            $('.keyboard-button').on('click', function (event) {
              event.preventDefault();
              var cur = $(event.target);
              var n = cur.html();
            });
          }));
        }
      };

      $('input.stk').on('click', onStake); // count to return, if is (at start)

      var inputs = document.querySelectorAll('.stk');

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value !== '' && inputs[i].parentNode.querySelector('.stakeToReturn')) {
          inputs[i].parentNode.querySelector('.stakeToReturn').classList.remove('hidden'); // count to return

          var cur = inputs[i];

          var tr = void 0,
              _trStr = void 0;

          var multiplyer = parseFloat(cur.parentNode.parentNode.querySelector('.odds').innerHTML);
          tr = parseFloat(cur.value) * multiplyer;

          if (!isNaN(tr)) {
            tr = tr.toFixed(2);
            _trStr = tr.toString();

            if (typeof _trStr.split('.')[1] == 'undefined') {
              _trStr += '.00';
            } else {
              if (_trStr.split('.')[1].length == 1) {
                _trStr += '0';
              }
            }
          }

          cur.parentNode.querySelector('.stakeToReturn span.stakeToReturn_Value').innerHTML = _trStr;
        }

        if (inputs[i].value !== '' && inputs[i].parentNode.querySelector('.bs-StandardMultipleStake_ToReturn')) {
          inputs[i].parentNode.querySelector('.bs-StandardMultipleStake_ToReturn').classList.remove('hidden'); // count to return

          var _cur = inputs[i];

          var _tr = void 0,
              _trStr2 = void 0;

          var _multiplyer = parseFloat(_cur.parentNode.parentNode.querySelector('.bs-multiple-default-odds').innerHTML);

          _tr = parseFloat(_cur.value) * _multiplyer;

          if (!isNaN(_tr)) {
            _tr = _tr.toFixed(2);
            _trStr2 = _tr.toString();

            if (typeof _trStr2.split('.')[1] == 'undefined') {
              _trStr2 += '.00';
            } else {
              if (_trStr2.split('.')[1].length == 1) {
                _trStr2 += '0';
              }
            }
          }

          _cur.parentNode.parentNode.querySelector('.bs-StandardMultipleStake_ToReturn span.bs-StandardMultipleStake_ToReturnValue').innerHTML = _trStr2;
        }
      } // on input change


      for (var _i8 = 0; _i8 < inputs.length; _i8++) {
        inputs[_i8].addEventListener('inputChange', function (event) {
          // For Cookies
          var curTR = 0,
              curST = 0,
              curUST = 0;
          var ID = 0,
              multiID = 0;
          var cur = $(event.target);
          var multiplyer = 0;

          if (cur.parent().siblings('.odds').length > 0) {
            if (document.querySelector('#mltsngstk') !== null) {
              document.querySelector('#mltsngstk').value = '';
            }

            multiplyer = parseFloat(cur.parent().siblings('.odds').text());
            ID = cur.closest('.standardBet li.hasodds').data("itemFpid");
          } else {
            if (cur.parent().siblings('.bs-multiple-default-odds').length > 0) {
              multiplyer = parseFloat(cur.parent().siblings('.bs-multiple-default-odds').text());
              multiID = cur.closest('.multipleBets li').data("itemId");
            } else {
              multiplyer = parseFloat(cur.siblings('.multiplesBetCount').text().split('x')[0]);
              multiID = cur.closest('.multipleBets li').data("itemId");
            }
          }

          curST = document.querySelector('input.stk.focus').value;
          curUST = curST;
          var tr, trStr;

          if (cur.is('#mltsngstk')) {
            tr = parseFloat($('.stk.focus').val());
          } else {
            tr = parseFloat($('.stk.focus').val()) * multiplyer;
          }

          if (!isNaN(tr) && $('.stk.focus').val().length > 0) {
            tr = tr.toFixed(2);
            $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').data("tr", tr).attr('data-tr', tr);
            $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('.bs-StandardMultipleStake_ToReturnValue').data("tr", tr).attr('data-tr', tr);
            trStr = floatToCurrency(tr);

            if (cur.is('#mltsngstk')) {
              $('li.hasodds input.stk').siblings('.stakeToReturn').children('.stakeToReturn_Value').data("tr", tr).attr('data-tr', tr);
              $('li.hasodds input.stk').val(trStr);
            }

            $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text(' ' + trStr);
            $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('span.bs-StandardMultipleStake_ToReturnValue').text(' ' + trStr);
          } else {
            if (cur.is('#mltsngstk')) {
              $('li.hasodds input').val('');
            }

            $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('.bs-StandardMultipleStake_ToReturnValue').data("tr", 0).attr('data-tr', 0);
            $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text(' 0.00');
            $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('span.bs-StandardMultipleStake_ToReturnValue').text(' 0.00');
          } // For Cookies


          var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
          var keys = Object.keys(parsedCookies);
          curTR = trStr;

          if (ID !== 0) {
            var _iterator3 = _createForOfIteratorHelper(keys),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                name = _step3.value;

                if (name.substring(0, 3) == 'pa_') {
                  if (name.slice(3) == ID) {
                    var newCookie = '';

                    if (/tr=/i.test(parsedCookies[name])) {
                      if (typeof tr !== 'undefined') {
                        newCookie = parsedCookies[name].replace(/st=(.*)#tr=/i, 'st=' + curST + '#tr=');
                        newCookie = newCookie.replace(/tr=(.*)#ust=/i, 'tr=' + curTR + '#ust=');
                        newCookie = newCookie.replace(/ust=(.*)#mt=/i, 'ust=' + curUST + '#mt=');
                      } else {
                        newCookie = parsedCookies[name].replace(/st=(.*)#tr=/i, 'st=' + '#tr=');
                        newCookie = newCookie.replace(/tr=(.*)#ust=/i, 'tr=' + '#ust=');
                        newCookie = newCookie.replace(/ust=(.*)#mt=/i, 'ust=' + '#mt=');
                      }
                    } else {
                      newCookie = parsedCookies[name].replace(/False(.*)#mt=/i, 'False#ust=' + curUST + '#mt=');
                      newCookie = newCookie.replace(/False(.*)#ust=/i, 'False#tr=' + curTR + '#ust=');
                      newCookie = newCookie.replace(/False(.*)#tr=/i, 'False#st=' + curST + '#tr=');
                    }

                    Cookies.set(name, newCookie);
                  }
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            console.log(ID + ' ' + curST + ' ' + curTR);
          } else {
            if (multiID !== 0) {
              if (multiID == -1) {
                // TODO: Singles
                var _iterator4 = _createForOfIteratorHelper(keys),
                    _step4;

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    name = _step4.value;

                    if (name.substring(0, 3) == 'pa_') {
                      var _ID = name.slice(3);

                      var _newCookie = '';
                      var _curST = document.querySelector(".standardBet li.hasodds[data-item-fpid=\"".concat(_ID, "\"] input.stk")).value;
                      var _curUST = _curST;

                      var _tr2 = void 0,
                          _trStr3 = void 0;

                      multiplyer = parseFloat(document.querySelector(".standardBet").querySelector("li.hasodds[data-item-fpid=\"".concat(_ID, "\"]")).querySelector(".odds").innerText);
                      _tr2 = parseFloat(_curST * multiplyer);
                      _tr2 = _tr2.toFixed(2);
                      _trStr3 = _tr2.toString();

                      if (typeof _trStr3.split('.')[1] == 'undefined') {
                        _trStr3 += '.00';
                      } else {
                        if (_trStr3.split('.')[1].length == 1) {
                          _trStr3 += '0';
                        }
                      }

                      var _curTR = _trStr3;
                      console.table([{
                        'curST': _curST
                      }, {
                        'curUST': _curUST
                      }, {
                        'curTR': _curTR
                      }]);

                      if (/tr=/i.test(parsedCookies[name])) {
                        if (typeof _tr2 !== 'undefined') {
                          _newCookie = parsedCookies[name].replace(/st=(.*)#tr=/i, 'st=' + _curST + '#tr=');
                          _newCookie = _newCookie.replace(/tr=(.*)#ust=/i, 'tr=' + _curTR + '#ust=');
                          _newCookie = _newCookie.replace(/ust=(.*)#mt=/i, 'ust=' + _curUST + '#mt=');
                        } else {
                          _newCookie = parsedCookies[name].replace(/st=(.*)#tr=/i, 'st=' + '#tr=');
                          _newCookie = _newCookie.replace(/tr=(.*)#ust=/i, 'tr=' + '#ust=');
                          _newCookie = _newCookie.replace(/ust=(.*)#mt=/i, 'ust=' + '#mt=');
                        }
                      } else {
                        _newCookie = parsedCookies[name].replace(/False(.*)#mt=/i, 'False#ust=' + _curUST + '#mt=');
                        _newCookie = _newCookie.replace(/False(.*)#ust=/i, 'False#tr=' + _curTR + '#ust=');
                        _newCookie = _newCookie.replace(/False(.*)#tr=/i, 'False#st=' + _curST + '#tr=');
                      }

                      Cookies.set(name, _newCookie);
                    }
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

                console.log(multiID, ' ', curST);
              } else {
                if (typeof curTR !== 'undefined') {
                  var _iterator5 = _createForOfIteratorHelper(keys),
                      _step5;

                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      name = _step5.value;

                      if (name == 'ms') {
                        var _old = parsedCookies[name];
                        var _newCookie2 = '';

                        var curMult = _old.split('||').filter(function (el) {
                          if (el.match('id=' + multiID)) {
                            return true;
                          }
                        });

                        if (/st=/i.test(curMult[0])) {
                          var newMult = '';
                          newMult = curMult[0].slice(0, curMult[0].search(/st=/gi));
                          newMult += 'st=' + curST + '#ust=' + curUST + '#tr=' + curTR;
                          _newCookie2 = _old.replace(curMult[0], newMult);
                        } else {
                          var _newMult = '';
                          _newMult = curMult[0] + 'st=' + curST + '#ust=' + curUST + '#tr=' + curTR;
                          _newCookie2 = _old.replace(curMult[0], _newMult);
                        }

                        Cookies.set(name, _newCookie2);
                      }
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }

                  console.log(multiID, ' ', curST, ' ', curTR);
                } else {
                  var _iterator6 = _createForOfIteratorHelper(keys),
                      _step6;

                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      name = _step6.value;

                      if (name == 'ms') {
                        var _old2 = parsedCookies[name];
                        var _newCookie3 = '';

                        var _curMult = _old2.split('||').filter(function (el) {
                          if (el.match('id=' + multiID)) {
                            return true;
                          }
                        });

                        if (/st=/i.test(_curMult[0])) {
                          var _newMult2 = '';
                          _newMult2 = _curMult[0].slice(0, _curMult[0].search(/st=/gi));
                          _newMult2 += 'st=' + curST + '#ust=' + curUST;
                          _newCookie3 = _old2.replace(_curMult[0], _newMult2);
                        } else {
                          var _newMult3 = '';
                          console.log(_curMult[0]);
                          _newMult3 = _curMult[0] + 'st=' + curST + '#ust=' + curUST;
                          _newCookie3 = _old2.replace(_curMult[0], _newMult3);
                        }

                        Cookies.set(name, _newCookie3);
                      }
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }

                  console.log(multiID, ' ', curST);
                }
              }
            }
          }

          var total = $('#bstsx');
          var sum = 0;
          $('.hasodds input.stk').each(function (index, el) {
            if (el.value !== '') {
              sum += parseFloat($(el).siblings('.stakeToReturn').find('.stakeToReturn_Value').data('tr'));
            }
          });

          if (typeof $('span.bs-StandardMultipleStake_ToReturnValue').data('tr') !== 'undefined') {
            console.log(parseFloat($('span.bs-StandardMultipleStake_ToReturnValue').data('tr')));
            sum += parseFloat($('span.bs-StandardMultipleStake_ToReturnValue').data('tr'));
          } // Count sum throw singels multiplyer
          // if (document.querySelector('.bs-MultipleBets_Singles .stake input.stk').value !== '') {
          //   sum += parseFloat(parseFloat(document.querySelector('.bs-MultipleBets_Singles .stake input.stk').value) * parseFloat(document.querySelector('.bs-MultipleBets_Singles .stake .multiplesBetCount').innerText.split('x')[0]));
          // }


          $('.mlt').each(function (index, el) {
            if (index > 0) {
              // console.log(el.querySelector('.mltbrk').innerText, ':');
              // console.log(el.querySelector('.stake .bs-stakeContainer input.stk').value);
              // console.log(el.querySelector('.multiplesBetCount').innerText.split('x')[0]);
              if (el.querySelector('.stake .bs-stakeContainer input.stk').value == '') return;
              sum += parseFloat(parseFloat(el.querySelector('.stake .bs-stakeContainer input.stk').value) * parseFloat(el.querySelector('.multiplesBetCount').innerText.split('x')[0]));
            }
          });
          var sumStr = floatToCurrency(sum);
          total.html(window.conf.CUSTOMER_CONFIG.CURRENCY_SYMBOL + sumStr);
        });
      } // Edit mode


      $('#bsDiv').on('editMode', function () {
        // Remove stakepad if is
        if ($('input.stk.focus').length > 0) {
          var _cur2 = $('input.stk.focus');

          _cur2.removeClass('focus');

          _cur2.siblings('.stakeToReturn').addClass('hidden');

          _cur2.closest('.hasodds').removeClass('keypad');

          item.children('.stakepad').slideUp(250, function () {
            $(this).remove();
          });
        }

        $('#BetSlipEditButton').off(); // remove all bets

        $('.removeAll').on('click', function (event) {
          $('.button.coefficient.selected').removeClass('selected');
          item.animate({
            "margin-right": '+=200'
          }, 150);
          var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
          var keys = Object.keys(parsedCookies);

          for (var _i9 = 0, _keys12 = keys; _i9 < _keys12.length; _i9++) {
            name = _keys12[_i9];

            if (name.substring(0, 3) == 'pa_') {
              Cookies.remove(name);
            }
          }

          _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var rawResponse, content;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    console.log("REMOVEALL");
                    _context2.next = 3;
                    return fetch('https://bestline.bet/betsapi2/removeall', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(reqData)
                    });

                  case 3:
                    rawResponse = _context2.sent;
                    _context2.next = 6;
                    return rawResponse.json();

                  case 6:
                    content = _context2.sent;
                    changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
                    /*if sr == 0 - place bet*/

                    /*if sr == 2 - */

                    console.log(content);

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }))();

          blur.removeClass('block');
          blur.addClass('none');
          betslip.slideUp('fast');
        }); // Remove bet

        $('.removeColumn').on('click', function (event) {
          var cur = $(event.target);
          var eventID = cur.closest('li.hasodds').data('event');
          var ID = cur.closest('li.hasodds').data("id");
          var counter = 0;
          var parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
          var keys = Object.keys(parsedCookies);

          for (var _i10 = 0, _keys13 = keys; _i10 < _keys13.length; _i10++) {
            name = _keys13[_i10];

            if (name.substring(0, 3) == 'pa_') {
              if (name.slice(3) == ID) {
                Cookies.remove("pa_".concat(ID));
                $("[data-id=".concat(ID, "]")).removeClass('selected');
                counter--;
              }

              counter++;
            }
          }

          window.BetslipList.map(function (item, index) {
            if (item.eventID == eventID) {
              window.BetslipList.splice(index, 1);
            }
          });

          _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var rawResponse, content;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log("REMOVE_BET");
                    _context3.next = 3;
                    return fetch('https://bestline.bet/betsapi2/removebet', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(reqData)
                    });

                  case 3:
                    rawResponse = _context3.sent;
                    _context3.next = 6;
                    return rawResponse.json();

                  case 6:
                    content = _context3.sent;
                    changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
                    /*if sr == 0 - place bet*/

                    /*if sr == 2 - */

                    console.log(content);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }))();

          $(".button.coefficient[data-id= ".concat(ID, "]")).removeClass('selected');
          $('.betSlipyCountText').text(betsCounter());
          $('.betslip-link p.betslip-link-count').attr('data', betsCounter());

          if (cur.is('span')) {
            cur = cur.parent();
          }

          cur.parent().parent().animate({
            "margin-right": '+=200',
            opacity: 0.25,
            height: "toggle"
          }, 250, function () {
            cur.parent().parent().remove();

            if (betsCounter() == 0) {
              bsLink.slideUp('fast');
              blur.removeClass('block');
              blur.addClass('none');
              betslip.slideUp('fast');
            } else {
              $('.betslipWrapper').addClass('locked');
              loadJsModules({
                betslip: {
                  loadCSS: false,
                  loadLanguage: false
                }
              });
            }
          });
        });
        $('.betslip-select').on('click', function (event) {
          var cur = $(event.target);

          if ($('.betslipTypeSelector.showing').length > 0) {
            $('#BetSlipTypeSelectorWrapper').removeClass('active');
            $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
            $('.BetSlipType').off();
          } else {
            $('#BetSlipTypeSelectorWrapper').addClass('active');
            $('ul.bs-BetSlip').after($('#BetSlipTypesWrapper'));
            $('#bsDiv > .betslipTypeSelector').addClass('showing').hide().slideDown('fast');
            $('.BetSlipType').on('click', function (event) {
              var cur = $(event.target);
              var type = cur.text();
              $('.betslip-select').data('text', type).attr('data-text', type);
              $('#BetSlipTypeSelectorWrapper').removeClass('active');
              $('.bet-slip-type option').each(function (index, item) {
                if ($(item).text() == type) {
                  $(item).attr('selected', 'selected');
                } else {
                  $(item).removeAttr('selected');
                }
              });
              $('.BetSlipType').off();
              $('.BetSlipType-selected').removeClass('BetSlipType-selected').addClass('BetSlipType');
              cur.removeClass('BetSlipType').addClass('BetSlipType-selected');
              $('#BetSlipTypeSelector').text($('.BetSlipType-selected').text());
              $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
            });
            $('.BetSlipType-selected').on('click', function (event) {
              $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
            });
          }
        });
        $('#BetSlipEditButton').on('click', function (event) {
          $('#bsDiv').removeClass('editMode');
          $(event.target).text('Edit');
          $('#BetSlipEditButton').on('click', function (event) {
            $('#bsDiv').addClass('editMode').trigger('editMode');
            $(event.target).text('Done');
          });
        });
      });

      if (Cookies.get('logon') == 'true') {// TODO: clear LOGIN button
      } else {
        $('.betSlipyLogin').on('click', function () {
          blur.removeClass('block');
          blur.addClass('none');
          betslip.slideUp('fast');
          loadJsModules({
            login: {
              loadCSS: true,
              loadLanguage: false
            }
          });
        });
      }

      $('#betslipFooter').on('click', function (event) {
        event.preventDefault();
      });
      $('.betSlipyCloseIcon').on('click', function () {
        blur.removeClass('block');
        blur.addClass('none');
        betslip.slideUp('fast');

        if (betsCounter() > 0) {
          loadJsModules({
            betslip_link: {
              loadCSS: false,
              loadLanguage: false
            }
          }); // bsLink.slideDown('fast');
        } else {
          bsLink.slideUp('fast');
        }
      });
    });
  }); // Convert odds

  var modifyBets = function modifyBets(bet) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2';
    bet = bet.toString();

    if (bet) {
      switch (type) {
        case '1':
          return transformBetAsDecimal(bet);

        case '2':
          return transformBetAsFraction(bet);

        case '3':
          return transformBetAsAmerican(bet);

        default:
          return transformBetAsDecimal(bet);
      }
    }

    return '';
  }; //.


  function transformBetAsFraction(bet) {
    if (bet.includes('/')) {
      var btArr = bet.split('/');
      var res = (btArr[0] / btArr[1] + 1).toFixed(2);
      return res;
    }

    if (bet.includes('+') || bet.includes('-')) {
      return bet.includes('+') ? positiveAmericanBets(bet) : negativeAmericanBets(bet);
    }

    return Number(bet).toFixed(2);
  } // --/--


  function transformBetAsDecimal(bet) {
    if (bet.includes('.')) {
      return decimalToFraction(bet);
    }

    if (bet.includes('+') || bet.includes('-')) {
      var fractionBet = bet.includes('+') ? positiveAmericanBets(bet) : negativeAmericanBets(bet);
      return decimalToFraction(fractionBet);
    }

    return bet;
  } //+-


  function transformBetAsAmerican(bet) {
    if (bet.includes('/')) {
      var fractionBet = transformBetAsFraction(bet);
      return fromFractionToAmerican(fractionBet);
    }

    if (bet.includes('.')) {
      return fromFractionToAmerican(bet);
    }

    return bet;
  }

  function fromFractionToAmerican(bet) {
    if (Number(bet) >= 2) {
      return "+".concat(((Number(bet) - 1) * 100).toFixed(0));
    } else {
      return "-".concat((100 / (Number(bet) - 1)).toFixed(0));
    }
  }

  function positiveAmericanBets(bet) {
    var newStr = bet.replace('+', '');
    return (Number(newStr) / 100 + 1).toFixed(2);
  }

  function negativeAmericanBets(bet) {
    var newStr = bet.replace('-', '');
    return (100 / Number(newStr) + 1).toFixed(2);
  }

  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  function decimalToFraction(_decimal) {
    var top = _decimal.toString().replace(/\d+[.]/, '');

    var bottom = Math.pow(10, top.length);

    if (_decimal > 1) {
      top = +top + Math.floor(_decimal) * bottom;
    }

    var x = gcd(top, bottom);
    return "".concat(top / x + '/' + bottom / x);
  } // Count multiplyer if avaliable


  function multiOdds() {
    if (BetslipList.uniquenes(window.BetslipList)) {
      var m = 1;

      var _parsedCookies5 = JSON.parse(JSON.stringify(Cookies.get()));

      var _keys14 = Object.keys(_parsedCookies5);

      for (var _i11 = 0, _keys15 = _keys14; _i11 < _keys15.length; _i11++) {
        name = _keys15[_i11];

        if (name.substring(0, 3) == 'pa_') {
          m *= modifyBets(/o=(.*)#f=/i.exec(_parsedCookies5[name])[1]);
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

      bsLink.children().children('.text-right').children('p.font').text('Multiply Odds');
      bsLink.children().children('.text-right').children('p.title').text(mStr);
    } else {
      bsLink.children().children('.text-right').children('p.font').text(' ');
      bsLink.children().children('.text-right').children('p.title').text(' ');
    }
  }
}); // String money value from float number

function floatToCurrency(number) {
  trStr = number.toString();

  if (typeof trStr.split('.')[1] == 'undefined') {
    trStr += "".concat(window.conf.CUSTOMER_CONFIG.CURRENCY_DECIMAL_SEPARATOR, "00");
  } else {
    if (trStr.split('.')[1].length == 1) {
      trStr += '0';
      trStr = trStr.replace('.', window.conf.CUSTOMER_CONFIG.CURRENCY_DECIMAL_SEPARATOR);
    } else {
      trStr = trStr.replace('.', window.conf.CUSTOMER_CONFIG.CURRENCY_DECIMAL_SEPARATOR);
    }
  } // Add currency group and decimal separators from the user's config


  var lg = trStr.length;
  var count = 0;

  for (var i = 0; i < lg && lg > 6; i++) {
    count++;
    var item = trStr.charAt(i);

    if (item == window.conf.CUSTOMER_CONFIG.CURRENCY_DECIMAL_SEPARATOR) {
      break;
    }

    if (count == 3) {
      count = 0;
      trStr = trStr.slice(0, -(i - 1) - 5) + window.conf.CUSTOMER_CONFIG.CURRENCY_GROUP_SEPARATOR + trStr.slice(-(i - 1) - 5, trStr.length);
      i++;
    }

    if (trStr.charAt(0) == window.conf.CUSTOMER_CONFIG.CURRENCY_GROUP_SEPARATOR) {
      trStr = trStr.slice(1);
    }
  }

  return trStr;
}