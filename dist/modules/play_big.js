"use strict";

exports('play_big', function (params, done) {
  insertHtmlModules({// ".play-big": [
    //   "main/play-big.html"
    // ]
  }, function () {
    // Convert odds
    var modifyBets = function modifyBets(od) {
      var ODDS_TYPE = window.conf.CUSTOMER_CONFIG.ODDS_TYPE; // fraction

      if (ODDS_TYPE == '1') {
        return od;
      } // decimal


      if (ODDS_TYPE == '2') {
        var nums = od.split('/');
        return (nums[0] / nums[1] + 1).toFixed(2);
      } // American


      if (ODDS_TYPE == '3') {
        var _nums = od.split('/');

        var bet = (_nums[0] / _nums[1] + 1).toFixed(2);

        if (Number(bet) >= 2) {
          return "+".concat(((Number(bet) - 1) * 100).toFixed(0));
        } else {
          return "-".concat((100 / (Number(bet) - 1)).toFixed(0));
        }
      }
    };

    var curID = params.sportId;
    var ID;

    if (curID === undefined) {
      ID = parseInt(window.inplay[0].ID);
    } else {
      ID = curID;
    }

    fillPlayBig(window.inplay, ID);
    /*Timer for Play Big starts here*/

    function createTimer(tm, ts) {
      var tm_, ts_;

      if (tm < 10) {
        tm_ = '0' + tm;
      } else {
        tm_ = tm;
      }

      if (ts < 10) {
        ts_ = '0' + ts;
      } else {
        ts_ = ts;
      }

      return tm_ + ':' + ts_;
    }

    function calculateDiffMinutes(data, c_years, c_mounth, c_days, c_hr, c_tm, c_ts) {
      var now = new Date();
      var c_tu = new Date(c_years, c_mounth, c_days, c_hr, c_tm, c_ts);
      var delta = new Date(now - c_tu);
      return parseInt(delta.getMinutes()) + data.TM;
    }

    function calculateDiffSeconds(data, c_years, c_mounth, c_days, c_hr, c_tm, c_ts) {
      var now = new Date();
      var c_tu = new Date(c_years, c_mounth, c_days, c_hr, c_tm, c_ts);
      var delta = new Date(now - c_tu);
      var sec = parseInt(delta.getSeconds()) + data.TS;
      return parseInt(delta.getSeconds()) + data.TS;
    }
    /*function startTimerBig(data) {
      clearInterval(window.t_interval);
      if (data.DC == 1) {
        if (data.TT == 0) {
          $(`[data-id=timer-big]`).text("Break");
        } else {
          if (data.TM == 0) {
              let tu = $(`[data-id=timer-big]`).data("tu");
            let etu = tu.toString();
              let years = etu.substring(0, 4),
              month = etu.substring(4, 6),
              day = etu.substring(6, 8),
              hours = etu.substring(8, 10),
              minute = etu.substring(10, 12),
              second = etu.substring(12, 14);
              $(`[data-id=timer-big]`).data("tm", minute);
            $(`[data-id=timer-big]`).data("ts", second);
              let interval = setInterval(function () {
                let tm = parseInt($(`[data-id=timer-big]`).data("tm"));
              let ts = parseInt($(`[data-id=timer-big]`).data("ts"));
              let tt = parseInt($(`[data-id=timer-big]`).data("tt"));
                //Some function to check TT by socket
                if (tt != 0) {
                if (ts == 59) {
                  tm = tm + 1;
                  ts = 0;
                } else {
                  ts = ts + 1;
                }
                  $(`[data-id=timer-big]`).text(createTimer(tm, ts));
                  $(`[data-id=timer-big]`).data("tm", tm);
                $(`[data-id=timer-big]`).data("ts", ts);
              } else {
                $(`[data-id=timer-big]`).text("Break");
              }
            }, 1000);
            window.t_interval = interval;
          } else {
            let interval = setInterval(function () {
              let tm = parseInt($(`[data-id=timer-big]`).data("tm"));
              let ts = parseInt($(`[data-id=timer-big]`).data("ts"));
                if (ts == 59) {
                tm = tm + 1;
                ts = 0;
              } else {
                ts = ts + 1;
              }
                $(`[data-id=timer-big]`).text(createTimer(tm, ts));
                $(`[data-id=timer-big]`).data("tm", tm);
              $(`[data-id=timer-big]`).data("ts", ts);
            }, 1000);
            window.t_interval = interval;
          }
        }
      } else {
        $(`[data-id=timer-big]`).text(" ");
      }
    }
    */


    function startTimerBig() {
      var timers = $("[data-id=timer-big]");
      var interval = setInterval(function () {
        for (var i = 0; i < timers.length; i++) {
          if ($(timers[i]).data("dc") == 1) {
            if ($(timers[i]).data("tt") == 0) {
              $(timers[i]).text("Break");
            } else {
              if ($(timers[i]).data("tm") == 0) {
                var tu = $(timers[i]).data("tu");
                var etu = tu.toString();
                var years = etu.substring(0, 4),
                    month = etu.substring(4, 6),
                    day = etu.substring(6, 8),
                    hours = etu.substring(8, 10),
                    minute = etu.substring(10, 12),
                    second = etu.substring(12, 14);
                $(timers[i]).data("tm", minute);
                $(timers[i]).data("ts", second);
                var tm = parseInt($(timers[i]).data("tm"));
                var ts = parseInt($(timers[i]).data("ts"));

                if (ts == 59) {
                  tm = tm + 1;
                  ts = 0;
                } else {
                  ts = ts + 1;
                }

                $(timers[i]).text(createTimer(tm, ts));
                $(timers[i]).data("tm", tm);
                $(timers[i]).data("ts", ts);
              } else {
                var _tm = parseInt($(timers[i]).data("tm"));

                var _ts = parseInt($(timers[i]).data("ts"));

                if (_ts == 59) {
                  _tm = _tm + 1;
                  _ts = 0;
                } else {
                  _ts = _ts + 1;
                }

                $(timers[i]).text(createTimer(_tm, _ts));
                $(timers[i]).data("tm", _tm);
                $(timers[i]).data("ts", _ts);
              }
            }
          } else {
            $(timers[i]).text(" ");
          }
        }
      }, 1000);
      window.t_interval = interval;
    }
    /*End of Timer*/
    // Shortening club name


    function shortize(name) {
      var str = name;

      if (screen.width < 350) {
        str = str.slice(0, 14);

        if (name.length > 14) {
          str += '...';
        }

        return str;
      } else if (screen.width > 350) {
        str = str.slice(0, 19);

        if (name.length > 19) {
          str += '...';
        }

        return str;
      } else {
        return str;
      }
    }

    function fillPlayBig(data, ID) {
      var promise = new Promise(function (resolve, reject) {
        if (data != undefined) {
          var id = parseInt(ID);
          data.forEach(function (sport) {
            if (parseInt(sport.ID) == ID) {
              $("[data-id=play-big]").empty();
              var max_m = sport.CT.length;

              for (var i = 0; i < max_m; i++) {
                if (typeof sport.CT[i] !== "undefined" && typeof sport.CT[i].EV[0] !== "undefined" && typeof sport.CT[i].EV[0].MA[0] !== "undefined") {
                  $("[data-id=play-big]").append("\n                  <div class=\"ex-a\" style=\"margin-right: -3px; border-right: 1px solid #c8304d;\">\n                 <a data-id=\"play-big-wrapper\" data-play-big=\"".concat(sport.CT[i].EV[0].ID, "\" class=\"cell\">\n                        <div data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" class=\"flex-container align-justify [ play-big ]\">\n                        <div data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"block\" style=\"margin-bottom: 5px;\">\n                        <p data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"font m-white ellipsis\">").concat(shortize(sport.CT[i].NA), "</p>\n                        <p data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"font white\">").concat(shortize(sport.CT[i].EV[0].NA.split(' v ')[0]), "</p>\n                        <p data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"font white\">").concat(shortize(sport.CT[i].EV[0].NA.split(' v ')[1]), "</p>\n                        </div>\n                        <!--<div data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"sport-icon play\" style=\"margin-top: 7%; margin-right: 0;\"></div>-->\n                <div data-play-big=\"").concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"block\">\n                ").concat(sport.CT[i].EV[0].SS == '' ? '' : "<p data-play-big=\"".concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" class=\"font m-white text-right\">").concat(sport.CT[i].EV[0].SS, "</p>"), "\n                ").concat(sport.CT[i].EV[0].TU == '' ? '' : "<p data-play-big=\"".concat(sport.CT[i].EV[0].ID, "\" data-game-id=\"").concat(sport.CT[i].EV[0].FI, "\" data-id=\"timer-big\" data-dc=\"").concat(sport.CT[i].EV[0].DC, "\" data-tu=\"").concat(sport.CT[i].EV[0].TU, "\" data-tm=\"").concat(sport.CT[i].EV[0].TM, "\" data-ts=\"").concat(sport.CT[i].EV[0].TS, "\" class=\"font m-white ellipsis text-right\"></p>"), "\n                </div>\n                </div>\n                </a>\n                <div data-coef=\"1\" data-id=\"coef_table\" class=\"table [ coeficient-table pb-child ]\">\n                        <div data-coef=\"1\" class=\"row\">\n              <div data-coef=\"1\" class=\"cell w33\" >\n                <button data-coef=\"1\" class=\"button coefficient ").concat(sport.CT[i].EV[0].MA[0].PA[0].OD == '0/0' ? 'disabled' : '', "\" style=\"padding-left: 10px;\" data-eventNA=\"").concat(sport.CT[i].EV[0].NA, "\" data-cl=\"").concat(ID, "\" data-marketNA=\"").concat(sport.CT[i].EV[0].MA[0].NA, "\" data-BS=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].BS, "\" data-FI=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].FI, "\" data-HA=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].HA, "\" data-HD=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].HD, "\" data-ID=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].ID, "\" data-IT=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].IT, "\" data-NA=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].NA, "\" data-OD=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].OD, "\" data-OR=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].OR, "\" data-SU=\"").concat(sport.CT[i].EV[0].MA[0].PA[0].SU, "\">\n                  <span data-coef=\"1\" class=\"font m-white\">1</span>\n                  <span data-coef=\"1\" data-id=\"coef-one\" class=\"font\" class=\"button coefficient\" >").concat(sport.CT[i].EV[0].MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(sport.CT[i].EV[0].MA[0].PA[0].OD), "</span> \n                </button>\n              </div>\n              <div data-coef=\"1\" class=\"cell w33\">\n                <button data-coef=\"1\" class=\"button coefficient ").concat(sport.CT[i].EV[0].MA[0].PA[1].OD == '0/0' ? 'disabled' : '', "\" style=\"padding-left: 10px;\" data-eventNA=\"").concat(sport.CT[i].EV[0].NA, "\" data-cl=\"").concat(ID, "\" data-marketNA=\"").concat(sport.CT[i].EV[0].MA[0].NA, "\" data-BS=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].BS, "\" data-FI=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].FI, "\" data-HA=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].HA, "\" data-HD=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].HD, "\" data-ID=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].ID, "\" data-IT=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].IT, "\" data-NA=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].NA, "\" data-OD=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].OD, "\" data-OR=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].OR, "\" data-SU=\"").concat(sport.CT[i].EV[0].MA[0].PA[1].SU, "\">\n                  <span data-coef=\"1\" class=\"font m-white\">x</span>\n                  <span data-coef=\"1\" data-id=\"coef-two\" class=\"font\" class=\"button coefficient\" >").concat(sport.CT[i].EV[0].MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(sport.CT[i].EV[0].MA[0].PA[1].OD), "</span>\n                </button>\n              </div>\n              <div data-coef=\"1\" class=\"cell w33\">\n                <button data-coef=\"1\" class=\"button coefficient ").concat(sport.CT[i].EV[0].MA[0].PA[2].OD == '0/0' ? 'disabled' : '', "\" style=\"padding-left: 10px;\" data-eventNA=\"").concat(sport.CT[i].EV[0].NA, "\" data-cl=\"").concat(ID, "\" data-marketNA=\"").concat(sport.CT[i].EV[0].MA[0].NA, "\" data-BS=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].BS, "\" data-FI=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].FI, "\" data-HA=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].HA, "\" data-HD=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].HD, "\" data-ID=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].ID, "\" data-IT=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].IT, "\" data-NA=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].NA, "\" data-OD=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].OD, "\" data-OR=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].OR, "\" data-SU=\"").concat(sport.CT[i].EV[0].MA[0].PA[2].SU, "\">\n                  <span data-coef=\"1\" class=\"font m-white\">2</span>\n                  <span data-coef=\"1\" data-id=\"coef-three\" class=\"font\" class=\"button coefficient\" >").concat(sport.CT[i].EV[0].MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(sport.CT[i].EV[0].MA[0].PA[2].OD), "</span>\n                </button>\n              </div>\n            </div>\n              </div>\n              </div>\n                 "));
                } else {
                  console.log("Undefined CT");
                  continue;
                }
              }

              startTimerBig(sport.CT[0].EV[0]);
            }

            resolve();
          });
        } else {
          reject("Data 404");
        }
      });
      promise.then(function () {
        // Handle opening of game section
        $("[data-id=play-big-wrapper]").on('click', function (event) {
          if ($(event.target).data('coef') != '1') {
            var id = $(event.target).data('play-big');
            console.log(id);
            console.log($("[data-id=play-big-wrapper]").data('play-big'));
            var curURL = window.location.href; //if filter is active - remove it from hash

            if (window.location.hash.split('/')[1] == 'filter') {
              window.location.hash = '';
              window.location.href += "/event/".concat(id);
            } else {
              if (curURL.includes('#')) {
                window.location.href += "/event/".concat(id);
              } else {
                window.location.href += "#/event/".concat(id);
              }
            }
          } else {
            console.log('Epic fail!');
          }
        });
      });
    }

    done();
  });
});