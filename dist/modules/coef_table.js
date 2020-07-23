"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

exports('coef_table', function (params, done) {
  insertHtmlModules({// ".coeficient-table": [
    //   "main/coeficient-table.html"
    // ]
  }, function () {
    var filtered = params.filtered; // is filter active

    var expand = params.expand; // is event expanded

    var ID = params.gameId; // id of sport to handle

    if (expand) {
      renderCoefTable(window.event, null, false);
    } else {
      if (filtered) {
        var _ID = params.sportId;
        renderCoefTable(window.inplay, _ID, true);
      } else {
        var _ID2 = parseInt(window.inplay[0].ID);

        renderCoefTable(window.inplay, _ID2, true);
      }
    } // Shortening club name


    function shortize(name, gameName) {
      var str = name;
      var team1 = gameName.split(' v ')[0] || gameName.split(' vs ')[0] || gameName.split(' @ ')[0],
          team2 = gameName.split(' v ')[1] || gameName.split(' vs ')[1] || gameName.split(' @ ')[1]; // console.table([['team1', team1], ['team2', team2]]);

      if (str.includes(team1) || str.includes(team2)) {
        var info = '';
        info = str.replace(str.includes(team1) ? str = team1 : str = team2, '');
        str.includes(team1) ? str = team1 : str = team2;

        if (screen.width < 350) {
          str = str.slice(0, 9);

          if (name.length > 9) {
            str += '...';
          }

          return str + info;
        } else {
          if (screen.width > 350 && screen.width < 450) {
            str = str.slice(0, 12);

            if (name.length > 12) {
              str += '...';
            }

            return str + info;
          } else {
            str = str.slice(0, 18);

            if (name.length > 18) {
              str += '...';
            }

            return str + info;
          }
        }
      } else {
        if (screen.width < 350) {
          str = str.slice(0, 11);

          if (name.length > 11) {
            str += '...';
          }

          return str;
        } else if (screen.width > 350 && screen.width < 450) {
          str = str.slice(0, 14);

          if (name.length > 14) {
            str += '...';
          }

          return str;
        } else {
          str = str.slice(0, 18);

          if (name.length > 18) {
            str += '...';
          }

          return str;
        }
      }
    }

    function renderCoefTable(data, ID, small) {
      var promise = new Promise(function (resolve, reject) {
        if (small) {
          /*
          $(`[data-id=coef_table]`).append(`
              <div class="row">
              <div class="cell w33" >
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font"></span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font"></span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">2</span>
                  <span data-id="coef-three" class="font"></span>
                </button>
              </div>
            </div>
            `);
          resolve();
          */
        } else {
          resolve();
        }
      });
      promise.then(function () {
        if (small) {
          if (data != undefined) {
            data.forEach(function (sport) {
              if (parseInt(sport.ID) == ID) {
                if (ID == 1) {
                  $("[data-id=coef-one]").text(modifyBets(sport.CT[0].EV[0].MA[0].PA[0].OD)).data('BS', "".concat(CT[0].EV[0].MA[0].PA[0].BS)).attr('data-BS', "".concat(CT[0].EV[0].MA[0].PA[0].BS));
                  $("[data-id=coef-two]").text(modifyBets(sport.CT[0].EV[0].MA[0].PA[1].OD)).data('BS', "".concat(CT[0].EV[0].MA[0].PA[1].BS)).attr('data-BS', "".concat(CT[0].EV[0].MA[0].PA[1].BS));
                  $("[data-id=coef-three]").text(modifyBets(sport.CT[0].EV[0].MA[0].PA[2].OD)).data('BS', "".concat(CT[0].EV[0].MA[0].PA[2].BS)).attr('data-BS', "".concat(CT[0].EV[0].MA[0].PA[2].BS));
                } else {
                  $("[data-id=coef-one]").text(modifyBets(sport.CT[0].EV[0].MA[0].PA[0].OD)).data('BS', "".concat(CT[0].EV[0].MA[0].PA[0].BS)).attr('data-BS', "".concat(CT[0].EV[0].MA[0].PA[0].BS));
                  ;
                  $("[data-id=coef-three]").text(modifyBets(sport.CT[0].EV[0].MA[0].PA[1].OD)).data('BS', "".concat(CT[0].EV[0].MA[0].PA[1].BS)).attr('data-BS', "".concat(CT[0].EV[0].MA[0].PA[1].BS));
                  ;
                  $("[data-id=coef-two]").remove();
                }
              }
            });
          } else {
            console.log("ERROR: Data is undefined");
          }
        } else {
          var sport = data[0].TG[0].CT;
          var rowsPromise = new Promise(function (resolve, reject) {
            $("[data-id=coef_table]").empty();
            $("[data-id=coef_table]").addClass('event');
            data[0].MA.forEach(function (ma) {
              $("[data-id=coef_table]").append("\n                <div data-id=\"row_info\" data-row-status=\"not_active\" data-coef-id=\"".concat(ma.ID, "\" class=\"row info det\" style=\"height: 50px; max-height:50px; border-bottom: 0.5px solid black;\">\n                  <div class=\"cell\">\n                    <p class=\"font\">").concat(ma.NA, "</p>\n                  </div>\n                </div>\n                "));
            });
            resolve();
          });
          rowsPromise.then(function (response) {
            return new Promise(function (resolve, reject) {
              console.log(data[0]);
              data[0].MA.map(function (ma) {
                if (ma.DO == 1) {
                  var _$$css;

                  var cur = $("[data-coef-id=\"".concat(ma.ID, "\"]"));
                  cur.addClass('active');
                  cur.removeClass('not-active');
                  data[0].MA.forEach(function (ma) {
                    if (ma.ID == cur.data('coefId')) {
                      var new_item = $("<div data-id=\"coef_row\" data-bet=\"".concat(ma.ID, "\" class=\"row\" style=\"\">\n                          </div>")).hide();
                      cur.after(new_item);

                      if (ma.CO.length > 1) {
                        var maxColLength = 0;

                        var _iterator = _createForOfIteratorHelper(ma.CO),
                            _step;

                        try {
                          for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            item = _step.value;
                            console.log(item, 'length', item.PA.length);

                            if (item.PA.length > maxColLength) {
                              maxColLength = item.PA.length;
                            }
                          }
                        } catch (err) {
                          _iterator.e(err);
                        } finally {
                          _iterator.f();
                        }

                        ma.CO.map(function (co) {
                          var div = document.createElement('div');
                          div.className = 'bets_column';
                          div.appendChild(titleTemplateForBets(co));

                          for (var i = 0; i < maxColLength; i++) {
                            var pa = typeof co.PA[i] == 'undefined' ? undefined : co.PA[i];
                            div.appendChild(forEventDataColumnTemplate(pa, co.SY, data[0].NA, ma.NA, data[0].CL));
                          }

                          new_item.append(div);
                        });
                      } else {
                        ma.CO[0].PA.forEach(function (pa) {
                          $("[data-bet=".concat(ma.ID, "]")).append("\n                          <div style=\"margin: auto;flex: 1 1 ".concat(ma.ID == '1778' || ma.ID == '10560' || ma.ID == '10564' ? '100%' : 'auto', ";margin-left: 1px;\" class=\"cell\">\n                            <button style=\"padding-left: 10px;\" class=\"button coefficient\" data-eventNA=\"").concat(data[0].NA, "\" data-cl=\"").concat(data[0].CL, "\" data-marketNA=\"").concat(ma.NA, "\" data-BS=\"").concat(pa.BS, "\" data-FI=\"").concat(pa.FI, "\" data-HA=\"").concat(pa.HA, "\" data-HD=\"").concat(pa.HD, "\" data-ID=\"").concat(pa.ID, "\" data-IT=\"").concat(pa.IT, "\" data-NA=\"").concat(pa.NA, "\" data-OD=\"").concat(pa.OD, "\" data-OR=\"").concat(pa.OR, "\" data-SU=\"").concat(pa.SU, "\" class=\"button coefficient\" >\n                              <span data-id=\"bet_name_").concat(cur.data('coefId'), "\" class=\"font m-white\">").concat(pa.N2 ? pa.N2 : pa.NA, "</span>\n                              <span class=\"font coeff\">").concat(pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD), "</span>\n                            </button>\n                          </div>"));
                        });

                        if (ma.CO[0].CN < ma.CO[0].PA.length) {
                          $("[data-bet=".concat(ma.ID, "]")).children('.cell').addClass('half-w');
                        }
                      }

                      new_item.slideDown('fast'); //RenderRows(cur.data('coefId'), ma);
                    }
                  });
                  $('[data-id=row_info]').css('position', 'relative');
                  $("[data-bet=".concat(cur.data('coefId'), "]")).css((_$$css = {
                    position: 'relative',
                    display: 'flex'
                  }, _defineProperty(_$$css, "display", '-ms-flexbox'), _defineProperty(_$$css, "display", '-webkit-box'), _defineProperty(_$$css, "display", '-webkit-flex'), _defineProperty(_$$css, "flexWrap", 'wrap'), _defineProperty(_$$css, "justifyContent", 'space-between'), _defineProperty(_$$css, "alignItems", 'flex-start'), _$$css));
                  $('[data-id=row_info]').children().css('position', 'relative');
                  cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                }
              });
              resolve();
            });
          }).then(function (resolve) {
            var slideBetsRenderer = new Promise(function (resolve, reject) {
              $("[data-id=row_info]").on('click', function (elem) {
                var waitForBS = new Promise(function (resolve, reject) {
                  var cur = $(elem.target);

                  if (cur.is('p')) {
                    cur = cur.parent().parent();
                  }

                  if (cur.data('rowStatus') == 'not_active') {
                    var _$$css2;

                    cur.addClass('active');
                    cur.removeClass('not-active');
                    data[0].MA.forEach(function (ma) {
                      if (ma.ID == cur.data('coefId')) {
                        var new_item = $("<div data-id=\"coef_row\" data-bet=\"".concat(ma.ID, "\" class=\"row\" style=\"\">\n                      </div>")).hide();
                        cur.after(new_item);

                        if (ma.CO.length > 1) {
                          var maxColLength = 0;

                          var _iterator2 = _createForOfIteratorHelper(ma.CO),
                              _step2;

                          try {
                            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                              item = _step2.value;
                              console.log(item, 'length', item.PA.length);

                              if (item.PA.length > maxColLength) {
                                maxColLength = item.PA.length;
                              }
                            }
                          } catch (err) {
                            _iterator2.e(err);
                          } finally {
                            _iterator2.f();
                          }

                          ma.CO.map(function (co) {
                            var div = document.createElement('div');
                            div.className = 'bets_column';
                            div.appendChild(titleTemplateForBets(co));

                            for (var i = 0; i < maxColLength; i++) {
                              var pa = typeof co.PA[i] == 'undefined' ? undefined : co.PA[i];
                              div.appendChild(forEventDataColumnTemplate(pa, co.SY, data[0].NA, ma.NA, data[0].CL));
                            }

                            new_item.append(div);
                          });
                        } else {
                          ma.CO[0].PA.forEach(function (pa) {
                            $("[data-bet=".concat(ma.ID, "]")).append("\n                          <div style=\"margin: auto;flex: 1 1 ".concat(ma.ID == '1778' || ma.ID == '10560' || ma.ID == '10564' ? '100%' : 'auto', ";margin-left: 1px;\" class=\"cell\">\n                            <button style=\"padding-left: 10px;\" class=\"button coefficient\" data-eventNA=\"").concat(data[0].NA, "\" data-cl=\"").concat(data[0].CL, "\" data-marketNA=\"").concat(ma.NA, "\" data-BS=\"").concat(pa.BS, "\" data-FI=\"").concat(pa.FI, "\" data-HA=\"").concat(pa.HA, "\" data-HD=\"").concat(pa.HD, "\" data-ID=\"").concat(pa.ID, "\" data-IT=\"").concat(pa.IT, "\" data-NA=\"").concat(pa.NA, "\" data-OD=\"").concat(pa.OD, "\" data-OR=\"").concat(pa.OR, "\" data-SU=\"").concat(pa.SU, "\" class=\"button coefficient\" >\n                              <span data-id=\"bet_name_").concat(cur.data('coefId'), "\" class=\"font m-white\">").concat(pa.N2 ? pa.N2 : pa.NA, "</span>\n                              <span class=\"font coeff\">").concat(pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD), "</span>\n                            </button>\n                          </div>"));
                          });

                          if (ma.CO[0].CN < ma.CO[0].PA.length) {
                            $("[data-bet=".concat(ma.ID, "]")).children('.cell').addClass('half-w');
                          }
                        }

                        new_item.slideDown('fast'); //RenderRows(cur.data('coefId'), ma);
                      }
                    });
                    $('[data-id=row_info]').css('position', 'relative');
                    $("[data-bet=".concat(cur.data('coefId'), "]")).css((_$$css2 = {
                      position: 'relative',
                      display: 'flex'
                    }, _defineProperty(_$$css2, "display", '-ms-flexbox'), _defineProperty(_$$css2, "display", '-webkit-box'), _defineProperty(_$$css2, "display", '-webkit-flex'), _defineProperty(_$$css2, "flexWrap", 'wrap'), _defineProperty(_$$css2, "justifyContent", 'space-between'), _defineProperty(_$$css2, "alignItems", 'flex-start'), _$$css2));
                    $('[data-id=row_info]').children().css('position', 'relative');
                    cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  } else {
                    cur.removeClass('active');
                    cur.addClass('not-active');
                    coID = cur.data('coefId');
                    $("[data-bet=".concat(coID, "]")).slideUp(250, function () {
                      $("[data-bet=".concat(coID, "]")).remove();
                    });
                    cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
                  }

                  resolve();
                });
                waitForBS.then(function (response) {
                  // $('.betslip-link').empty();
                  loadJsModules({
                    betslip_link: {
                      loadCSS: false,
                      loadLanguage: false
                    }
                  });
                });
              });
              resolve();
            });
            slideBetsRenderer.then(function (response) {
              return new Promise(function (resolve, reject) {
                // data[0].MA.map((ma) => {
                //   if (ma.DO == 1) {
                //     console.log(ma.ID);
                //     $(`div.coeficient-table.event div[data-coef-id="${ma.ID}"`).trigger('click');
                //   }
                // });
                resolve();
              });
            }).then(function (response) {
              // Preloader finishes
              var preloader = $('#page-preloader');

              if (preloader.data("status") != 'done' || preloader.is(".opaci")) {
                preloader.children('img').remove();
                preloader.addClass('done');
                preloader.removeClass('opaci');
                preloader.data("status", 'done').attr('data-status', 'done');
              }

              loadJsModules({
                betslip_link: {
                  loadCSS: false,
                  loadLanguage: false
                }
              });
              window.scrollTo(0, 0);
            });
          });
        }
      });
    } // Convert fractial to decimal


    modifyBets = function modifyBets(od) {
      var nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2);
    }; // Render title of the column


    titleTemplateForBets = function titleTemplateForBets(CO) {
      var div = document.createElement('div');
      div.className = 'bets_title';
      div.innerHTML = "\n        ".concat(shortize(CO.NA ? CO.NA == ' ' ? '&nbsp;' : CO.NA : '&nbsp;', CO.NA), "\n      "); //${CO.NA && !CO.NA.includes('Count') ? CO.NA : '&nbsp;'}

      return div;
    }; // Render column for bet coef_row


    forEventDataColumnTemplate = function forEventDataColumnTemplate(pa, SY, eventNA, marketNA, sport) {
      var NA, SU, IT, OD;

      if (typeof pa !== 'undefined') {
        NA = pa.NA;
        SU = pa.SU;
        IT = pa.IT;
        OD = pa.OD;
      } else {
        var _NA = '';
        var _SU = '';
        var _IT = '';
        var _OD = '';
      } // if (typeof SU == 'undefined') {
      //   SU = '';
      // }


      var SU2 = SU == 1 ? 'disabled' : '';
      var div = document.createElement('div');

      var bet = function bet() {
        if (SU == 9) {
          return ' ';
        } else {
          if (SU == 1) {
            if (OD) {
              return "<span class=\"fa fa-lock lock\"></span>";
            } else {
              return ' ';
            }
          } else {
            return "<p class=\"font down blick\">".concat(modifyBets(OD), "</p>");
          }
        }
      };

      div.className = "maTable__cell";

      if (typeof pa == 'undefined') {
        div.innerHTML = "\n        <button class=\"button coefficient disabled\">\n          <p class=\"font ellipsis mra\"></p>\n        </button>";
      } else {
        div.innerHTML = "\n        <button class=\"button coefficient ".concat(SU2, "\" data-it=\"").concat(IT, "\" data-eventNA=\"").concat(eventNA, "\" data-cl=\"").concat(sport, "\" data-marketNA=\"").concat(marketNA, "\" data-BS=\"").concat(pa.BS, "\" data-FI=\"").concat(pa.FI, "\" data-HA=\"").concat(pa.HA, "\" data-HD=\"").concat(pa.HD, "\" data-ID=\"").concat(pa.ID, "\" data-IT=\"").concat(pa.IT, "\" data-NA=\"").concat(pa.NA, "\" data-OD=\"").concat(pa.OD, "\" data-OR=\"").concat(pa.OR, "\" data-SU=\"").concat(pa.SU, "\">\n          <p class=\"font ellipsis mra\"> ").concat(shortize(NA ? NA : '', NA), "</p>\n          ").concat(bet(), "\n        </button >\n          ");
      }

      return div;
    };

    done();
  });
});