"use strict";

exports('search', function (params, done) {
  insertHtmlModules({}, function () {
    var betslipIsLoaded = false;

    function GET(squery) {
      var URL = "http://bestline.bet/search/?query=" + squery;
      fetch(URL).then(function (res) {
        return res.json();
      }).then(function (data) {
        window.searchDATA = Tree(data);
        console.log(window.searchDATA);
        RenderSearchResult(data);
      });
    }

    function getPAforMG(teamName, data) {
      var PAarr = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].type == 'PA') {
          var paNA = data[i].NA;

          if (typeof paNA !== 'undefined') {
            if (paNA.includes(teamName)) {
              PAarr.push(paNA);
            }
          }
        }
      }

      return PAarr;
    }

    function getCoefsCompet(data, compet_name, machName) {
      var coefsArr = [];
      var order;
      var time;

      for (var i = 0; i < data.CL[0].EV[1].MG.length; i++) {
        if (data.CL[0].EV[1].MG[i].NA == compet_name) {
          for (var j = 0; j < data.CL[0].EV[1].MG[i].MA[0].PA.length; j++) {
            if (data.CL[0].EV[1].MG[i].MA[0].PA[j].NA == machName) {
              time = data.CL[0].EV[1].MG[i].MA[0].PA[j].BC;
              order = j += 1;
            }
          }

          var one = data.CL[0].EV[1].MG[i].MA[order].PA[0].OD;
          order = order += 1;
          var X = data.CL[0].EV[1].MG[i].MA[order].PA[0].OD;
          order = order += 1;
          var two = data.CL[0].EV[1].MG[i].MA[order].PA[0].OD;
          coefsArr.push(one);
          coefsArr.push(X);
          coefsArr.push(two);
          coefsArr.push(time);
        }
      }

      return coefsArr;
    }

    function getPAforCompets(data, compet_name) {
      var PACompArr = [];

      for (var i = 0; i < data.CL[0].EV[1].MG.length; i++) {
        if (data.CL[0].EV[1].MG[i].NA == compet_name) {
          for (var j = 0; j < data.CL[0].EV[1].MG[i].MA[0].PA.length; j++) {
            PACompArr.push(data.CL[0].EV[1].MG[i].MA[0].PA[j].NA);
          }

          break;
        }
      }

      return PACompArr;
    }

    function getCoefsSoccer(data, teamName, machName) {
      var coefsArr = [];

      for (var i = 0; i < data.CL[0].EV[0].MG.length; i++) {
        if (data.CL[0].EV[0].MG[i].NA == teamName) {
          var order = void 0;
          var time_millis = void 0;

          for (var j = 0; j < data.CL[0].EV[0].MG[i].MA[0].PA.length; j++) {
            if (data.CL[0].EV[0].MG[i].MA[0].PA[j].NA == machName) {
              order = j;
              time_millis = data.CL[0].EV[0].MG[i].MA[0].PA[j].BC;
              break;
            }
          }

          var one = void 0,
              X = void 0,
              two = void 0;

          if (typeof data.CL[0].EV[0].MG[i].MA[1].PA[order] === 'undefined') {
            one = 'null';
          } else {
            one = data.CL[0].EV[0].MG[i].MA[1].PA[order].OD;
          }

          if (typeof data.CL[0].EV[0].MG[i].MA[2].PA[order] === 'undefined') {
            X = 'null';
          } else {
            X = data.CL[0].EV[0].MG[i].MA[2].PA[order].OD;
          }

          if (typeof data.CL[0].EV[0].MG[i].MA[3] === 'undefined') {
            two = 'null';
          } else {
            if (typeof data.CL[0].EV[0].MG[i].MA[3].PA[order] === 'undefined') {
              two = 'null';
            } else {
              two = data.CL[0].EV[0].MG[i].MA[3].PA[order].OD;
            }
          }

          coefsArr.push(one);
          coefsArr.push(X);
          coefsArr.push(two);
          coefsArr.push(time_millis);
        }
      }

      return coefsArr;
    }

    function convertToDate(millis) {
      var x = millis;

      if (x.charAt(x.length - 1) == "L") {
        x = x.slice(0, -1);
      } else if (x == 'undefined') {
        return "";
      }

      var checkedOffset = new Number(x); //var convertUrl='https://currentmillis.com/?'+checkedOffset;
      //convertLink.setAttribute('href',convertUrl);

      var date = new Date(checkedOffset);
      var local = date.toDateString() + ' ' + date.toTimeString();
      var lastColonIndex = local.lastIndexOf(':');
      local = local.substring(0, lastColonIndex + 3); //document.getElementById('leftDate').value = local;

      var utc = date.toUTCString();
      var timezoneIndex = utc.lastIndexOf('GMT');

      if (timezoneIndex < 0) {
        timezoneIndex = utc.lastIndexOf('UTC');
      }

      utc = utc.substring(0, timezoneIndex - 1);
      var firstCommaIndex = utc.indexOf(',');
      utc = utc.substring(0, firstCommaIndex) + utc.substring(firstCommaIndex + 1);
      utc = utc.split(' ');
      return utc[0] + ' ' + utc[2] + ' ' + utc[1] + ' ' + utc[4];
    }

    function Tree(data) {
      var _this = this;

      this.data = {};
      this.data.CL = [];
      var CL;
      var EV;
      var MG;
      var MA;
      data.forEach(function (item) {
        if (item.type === 'CL') {
          CL = item;
          CL.EV = [];

          _this.data.CL.push(item);
        }

        if (item.type === 'EV') {
          EV = item;
          EV.MG = [];
          CL.EV.push(item);
        }

        if (item.type === 'MG') {
          MG = item;
          MG.MA = [];
          EV.MG.push(MG);
        }

        if (item.type === 'MA') {
          MA = item;
          MA.PA = [];
          MG.MA.push(MA);
        }

        if (item.type === 'PA') {
          MA.PA.push(item);
        }
      });
      return this.data;
    }

    function RenderSearchResultSport(data, id) {
      new Promise(function (resolve, reject) {
        var ID = id;

        for (var i = 0; i < data.CL.length; i++) {
          if (data.CL[i].ID == ID) {
            var res_content = $('.search-result');
            res_content.empty();
            res_content.append("\n              <div class=\"search-scroll\">\n              </div>\n            ");
            var search_scroll = $('.search-scroll');

            for (var k = 0; k < data.CL.length; k++) {
              if (data.CL[k].ID == ID) {
                search_scroll.append("\n                    <div class=\"search-scroll-item choosen\" data-id=\"".concat(data.CL[k].ID, "\">\n                      <p class=\"font\">").concat(data.CL[k].NA, "</p>\n                    </div>\n                    "));
              } else {
                search_scroll.append("\n                    <div class=\"search-scroll-item\" data-id=\"".concat(data.CL[k].ID, "\">\n                      <p class=\"font\">").concat(data.CL[k].NA, "</p>\n                    </div>\n                    "));
              }
            }

            for (var j = 0; j < data.CL[i].EV.length; j++) {
              if (data.CL[i].EV[j].NA != "") {
                var style = void 0;

                if (data.CL[i].EV[j].NA != 'COMPETITIONS') {
                  style = 't-clicked';
                } else {
                  style = 't-not-clicked';
                }

                res_content.append("\n                <div class=\"search-ev\">\n                  <p class=\"font m-white\">".concat(data.CL[i].EV[j].NA, "</p>\n                </div>\n                "));

                for (var n = 0; n < data.CL[i].EV[j].MG.length; n++) {
                  if (data.CL[i].EV[j].NA != 'COMPETITIONS') {
                    var trimmedNA = data.CL[i].EV[j].MG[n].NA.replace(/\s/g, '');
                    res_content.append("\n                      <div data-id=\"sevlinks".concat(n, "\" class=\"search-ev-links-0\" style=\"\n                      width: 100%;\n                      height: auto;\n                      min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                      <p class=\"font white ").concat(style, "\">").concat(data.CL[i].EV[j].MG[n].NA, "</p>\n                      <div class=\"t-market-group active\">\n                      <div data-id=\"").concat(trimmedNA, "\" class=\"market-pa\">\n\n                      </div>\n                      </div>\n                      </div>\n                      </div>\n                    "));

                    if (ID == 13) {
                      var millis = data.CL[i].EV[j].MG[n].MA[0].PA[0].BC; //console.log(millis);

                      $("[data-id=".concat(trimmedNA, "]")).append("\n                        <div class=\"market-pa-item\">\n                          <div class=\"pa-item-names\">\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">".concat(data.CL[i].EV[j].MG[n].MA[0].PA[0].NA, "</span>\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">").concat(convertToDate(millis), "</span>\n                          </div>\n                        </div>\n                      "));
                    }
                  } else {
                    res_content.append("\n                      <div data-id=\"sevlinks".concat(n, "\" class=\"search-ev-links-0\" style=\"\n                      width: 100%;\n                      height: auto;\n                      min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                      <p data-id=\"competpd\"data-pd=\"").concat(data.CL[i].EV[j].MG[n].PD, "\"class=\"font white ").concat(style, "\">").concat(data.CL[i].EV[j].MG[n].NA, "</p>\n                      </div>\n                      </div>\n                    "));
                  }
                }
              } else {
                console.log("Prematch link");
              }
            }
          }
        }

        resolve();
      }).then(function () {
        $("[data-id=competpd]").on('click', function (el) {
          var pd_url = encodeURL($(el.target).data('pd'));
          window.location.hash = "/sport/" + ID + "//" + encodeURL($(el.target).data('pd'));
          $('.main-search-container').removeClass('active');
          $('.main-search-container').addClass('not-active');
        });
        $('.search-scroll-item').on('click', function (el) {
          $('.search-scroll').children('.choosen').removeClass('choosen');

          if ($(el.target).hasClass('.search-scroll-item')) {
            $(el.target).addClass('choosen');
            var sport_id = $(el.target).data('id');
            console.log(sport_id);
            renderResult(sport_id);
          } else {
            $(el.target).parent().addClass('choosen');

            var _sport_id = $(el.target).parent().data('id');

            console.log(_sport_id);
            renderResult(_sport_id);
          }
        });

        function eSetClicked(el) {
          $(el.target).removeClass('t-not-clicked');
          $(el.target).addClass('t-clicked');
          $(el.target).prop("onclick", null).off("click");
          var marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('not-active');
          marketDIV.addClass('active');
          $(el.target).on('click', function (item) {
            eSetNotClicked(item);
          });
        }

        function eSetNotClicked(el) {
          $(el.target).removeClass('t-clicked');
          $(el.target).addClass('t-not-clicked');
          $(el.target).prop("onclick", null).off("click");
          var marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('active');
          marketDIV.addClass('not-active');
          $(el.target).on('click', function (item) {
            eSetClicked(item);
          });
        }

        $('.s-ev-link p.t-clicked').on('click', function (el) {
          eSetNotClicked(el);
        });
        console.log('promise then done');
      });
    }

    function RenderSearchResult(data) {
      new Promise(function (resolve, reject) {
        var lastEV = '';
        var res_content = $('.search-result');
        res_content.empty();
        res_content.append("\n        <div class=\"search-scroll\">\n        </div>\n        ");
        var scroll = $('.search-scroll');
        var cl_counter = 0;

        for (var i = 0; i < data.length; i++) {
          if (data[i].type == 'CL') {
            cl_counter++;

            if (cl_counter > 1) {
              for (var g = 0; g < data.length; g++) {
                if (data[g].type == 'CL' && data[g].NA != choosen_NA) {
                  scroll.append("\n                    <div class=\"search-scroll-item\" data-id=\"".concat(data[g].ID, "\">\n                      <p class=\"font\">").concat(data[g].NA, "</p>\n                    </div>\n                    "));
                } else {
                  continue;
                }
              }

              break;
            } else {
              choosen = true;
              choosen_NA = data[i].NA;
              scroll.append("\n              <div class=\"search-scroll-item choosen\" data-id=\"".concat(data[i].ID, "\">\n                <p class=\"font\">").concat(data[i].NA, "</p>\n              </div>\n              "));
            }
          } else if (data[i].type == 'EV') {
            lastEV = data[i].NA;
            res_content.append("\n                <div class=\"search-ev\">\n                  <p class=\"font m-white\">".concat(data[i].NA, "</p>\n                </div>\n                "));
          } else if (data[i].type == 'MG') {
            if ($(res_content.children(".search-ev-links-".concat(i))).length) {
              if (lastEV == 'Teams') {
                var PAarray = getPAforMG(data[i].NA, data);
                var trimmedNA = data[i].NA.replace(/\s/g, '');
                $(".search-ev-links-".concat(i)).append("\n                    <div class=\"s-ev-link\">\n                      <p class=\"font white t-clicked\">".concat(data[i].NA, "</p>\n                      <div class=\"t-market-group active\">\n\n                        <div data-id=\"").concat(trimmedNA, "\" class=\"market-pa\">\n\n                          <div class=\"market-pa-item\">\n                            <div>\n                              <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                              <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                            </div>                        \n                           </div>\n\n                          <div class=\"market-pa-item\">\n                            <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                            <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                          </div>\n\n                        </div>\n\n                      </div>\n                    </div>\n                  "));
                $("[data-id=".concat(trimmedNA, "]")).empty();

                for (var m = 0; m < PAarray.length; m++) {
                  var coefs = getCoefsSoccer(window.searchDATA, data[i].NA, PAarray[m]);

                  if (coefs[0] == 'null' || coefs[0] == 'undefined' || coefs[1] == 'null' || coefs[1] == 'undefined' || coefs[2] == 'null' || coefs[2] == 'undefined') {
                    continue;
                  } else {
                    $("[data-id=".concat(trimmedNA, "]")).append("\n                    <div class=\"market-pa-item\">\n                    <div class=\"pa-item-names\">\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">".concat(PAarray[m], "</span>\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">").concat(convertToDate(coefs[3]), "</span>\n                    </div>\n                    <div class=\"pa-item-bets\">\n                    <div class=\"bet-cell\">\n                    <button class=\"s button coefficient\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                    align-items: flex-start; padding-bottom: 22px\">\n                    1<br>").concat(coefs[0], "\n                    </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"s button coefficient\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  x<br>").concat(coefs[1], "\n                  </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"s button coefficient\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  2<br>").concat(coefs[2], "\n                  </button>\n                  </div>   \n                    </div>\n                    </div>\n                    "));
                  }
                }
              } else if (lastEV == 'COMPETITIONS') {
                var _trimmedNA = data[i].NA.replace(/\s/g, '').replace(/\W/g, '');

                res_content.append("\n                    <div class=\"search-ev-links-".concat(0, "\" style=\"display: block;\n                    width: 100%;\n                    height: auto;\n                    min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                        <p class=\"font white t-clicked\">", data[i].NA, "</p>\n                        <div class=\"t-market-group active\">\n\n                        <div data-id=\"").concat(_trimmedNA, "\" class=\"market-pa\">\n\n                          <div class=\"market-pa-item\">\n                            <div>\n                              <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                              <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                            </div>                        \n                           </div>\n\n                          <div class=\"market-pa-item\">\n                            <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                            <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                          </div>\n\n                        </div>\n\n                      </div>\n                      </div>\n                    </div>\n                  "));
                var compets = getPAforCompets(window.searchDATA, data[i].NA); //console.log(data[i].NA + ': ' + comp_coefs);

                var marketPA = $("[data-id=".concat(_trimmedNA, "]"));
                marketPA.empty();

                for (var b = 0; b < compets.length; b++) {
                  var comp_coefs = getCoefsCompet(window.searchDATA, data[i].NA, compets[b]);
                  marketPA.append("\n                    <div class=\"market-pa-item\">\n                    <div class=\"pa-item-names\">\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">".concat(compets[b], "</span>\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">").concat(convertToDate(comp_coefs[3]), "</span>\n                    </div>\n                    <div class=\"pa-item-bets\">\n                    <div class=\"bet-cell\">\n                    <button class=\"s button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                    align-items: flex-start; padding-bottom: 22px\">\n                    1<br>").concat(comp_coefs[0], "\n                    </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  x<br>").concat(comp_coefs[1], "\n                  </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  2<br>").concat(comp_coefs[2], "\n                  </button>\n                  </div>   \n                    </div>                        \n                   </div>\n                    "));
                }
              } else {
                res_content.append("\n                    <div class=\"search-ev-links-".concat(0, "\" style=\"display: block;\n                    width: 100%;\n                    height: auto;\n                    min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                        <p class=\"font white\">", data[i].NA, "</p>\n                      </div>\n                    </div>\n                  "));
              }
            } else {
              if (lastEV == 'Teams') {
                var _PAarray = getPAforMG(data[i].NA, data);

                var _trimmedNA2 = data[i].NA.replace(/\s/g, '');

                res_content.append("\n                    <div class=\"search-ev-links-".concat(0, "\" style=\"\n                    width: 100%;\n                    height: auto;\n                    min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                        <p class=\"font white t-clicked\">", data[i].NA, "</p>\n                        <div class=\"t-market-group active\">\n                        <div data-id=\"").concat(_trimmedNA2, "\"class=\"market-pa\">\n                          <div class=\"market-pa-item\">\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                          </div>\n\n                          <div class=\"market-pa-item\">\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                          <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                          </div>\n                        </div>\n                      </div>\n                      </div>\n                    </div>\n                  "));
                $("[data-id=".concat(_trimmedNA2, "]")).empty();

                for (var _m = 0; _m < _PAarray.length; _m++) {
                  var _coefs = getCoefsSoccer(window.searchDATA, data[i].NA, _PAarray[_m]);

                  if (_coefs[0] == 'null' || _coefs[0] == 'undefined' || _coefs[1] == 'null' || _coefs[1] == 'undefined' || _coefs[2] == 'null' || _coefs[2] == 'undefined') {
                    continue;
                  } else {
                    $("[data-id=".concat(_trimmedNA2, "]")).append("\n                    <div class=\"market-pa-item\">\n                      <div class=\"pa-item-names\">\n                        <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">".concat(_PAarray[_m], "</span>\n                        <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">").concat(convertToDate(_coefs[3]), "</span>\n                      </div>\n                      <div class=\"pa-item-bets\">\n                      <div class=\"bet-cell\">\n                        <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                        align-items: flex-start; padding-bottom: 22px\">\n                        1<br>").concat(_coefs[0], "\n                        </button>\n                      </div>  \n                      <div class=\"bet-cell\">\n                      <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                      align-items: flex-start; padding-bottom: 22px\">\n                      x<br>").concat(_coefs[1], "\n                      </button>\n                      </div>  \n                      <div class=\"bet-cell\">\n                      <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                      align-items: flex-start; padding-bottom: 22px\">\n                      2<br>").concat(_coefs[2], "\n                      </button>\n                      </div>  \n                      </div>\n                    </div>\n                    "));
                  }
                }
              } else if (lastEV == 'COMPETITIONS') {
                var _trimmedNA3 = data[i].NA.replace(/\s/g, '').replace(/\W/g, '');

                res_content.append("\n                <div class=\"search-ev-links-".concat(0, "\" style=\"\n                width: 100%;\n                height: auto;\n                min-height: 44px;\">\n                  <div class=\"s-ev-link\">\n                    <p class=\"font white t-clicked\">", data[i].NA, "</p>\n                    <div class=\"t-market-group active\">\n                    <div data-id=\"").concat(_trimmedNA3, "\"class=\"market-pa\">\n                      <div class=\"market-pa-item\">\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                      </div>\n\n                      <div class=\"market-pa-item\">\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">Team vs Team</span>\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">Dd Mm Tt</span>\n                      </div>\n                    </div>\n                  </div>\n                  </div>\n                </div>\n                  "));

                var _compets = getPAforCompets(window.searchDATA, data[i].NA); //console.log(data[i].NA + ': ' + comp_coefs);


                var _marketPA = $("[data-id=".concat(_trimmedNA3, "]"));

                _marketPA.empty();

                for (var _b = 0; _b < _compets.length; _b++) {
                  var _comp_coefs = getCoefsCompet(window.searchDATA, data[i].NA, _compets[_b]);

                  _marketPA.append("\n                    <div class=\"market-pa-item\">\n                    <div class=\"pa-item-names\">\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 15px;\">".concat(_compets[_b], "</span>\n                      <span class=\"font m-white ellipsis\" style=\"font-size: 12px;\">").concat(convertToDate(_comp_coefs[3]), "</span>\n                    </div>\n                    <div class=\"pa-item-bets\">\n                    <div class=\"bet-cell\">\n                    <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                    align-items: flex-start; padding-bottom: 22px\">\n                    1<br>").concat(_comp_coefs[0], "\n                    </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  x<br>").concat(_comp_coefs[1], "\n                  </button>\n                  </div>  \n                  <div class=\"bet-cell\">\n                  <button class=\"button coefficient s\" style=\"padding: 0; display: inline-flex; /* keep the inline nature of buttons */\n                  align-items: flex-start; padding-bottom: 22px\">\n                  2<br>").concat(_comp_coefs[2], "\n                  </button>\n                  </div>   \n                    </div>                        \n                   </div>\n                    "));
                }
              } else {
                res_content.append("\n                    <div class=\"search-ev-links-".concat(0, "\" style=\"display: block;\n                    width: 100%;\n                    height: auto;\n                    min-height: 44px;\">\n                      <div class=\"s-ev-link\">\n                        <p class=\"font white ev-pd\" data-sportid=\"\" data-lastev=\"", lastEV, "\" data-pd=\"").concat(data[i].PD, "\">").concat(data[i].NA, "</p>\n                      </div>\n                    </div>\n                  "));
              }
            }
          }
        }

        resolve();
      }).then(function () {
        function eSetClicked(el) {
          $(el.target).removeClass('t-not-clicked');
          $(el.target).addClass('t-clicked');
          $(el.target).prop("onclick", null).off("click");
          var marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('not-active');
          marketDIV.addClass('active');
          $(el.target).on('click', function (item) {
            eSetNotClicked(item);
          });
        }

        function eSetNotClicked(el) {
          $(el.target).removeClass('t-clicked');
          $(el.target).addClass('t-not-clicked');
          $(el.target).prop("onclick", null).off("click");
          var marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('active');
          marketDIV.addClass('not-active');
          $(el.target).on('click', function (item) {
            eSetClicked(item);
          });
        }

        $('.s-ev-link p.t-clicked').on('click', function (el) {
          eSetNotClicked(el);
        });
        $('.ev-pd').on('click', function (el) {
          if ($(el.target).data('lastev') == 'EVENTS') {
            window.location.hash = "/sport/1//" + encodeURL($(el.target).data('pd'));
            $('.main-search-container').removeClass('active');
            $('.main-search-container').addClass('not-active');
          }
        });
        $('.search-scroll-item').on('click', function (el) {
          $('.search-scroll').children('.choosen').removeClass('choosen');

          if ($(el.target).hasClass('.search-scroll-item')) {
            $(el.target).addClass('choosen');
            var sport_id = $(el.target).data('id');
            console.log(sport_id);
            renderResult(sport_id);
          } else {
            $(el.target).parent().addClass('choosen');

            var _sport_id2 = $(el.target).parent().data('id');

            console.log(_sport_id2);
            renderResult(_sport_id2);
          }
        });
        loadJsModules({
          betslip_link: {
            loadCSS: true,
            loadLanguage: false
          },
          betslip: {
            loadCSS: true,
            loadLanguage: false
          }
        }); //console.log('Betslip ststus: ' + betslipIsLoaded);

        /*if (betslipIsLoaded == false) {
          loadJsModules({
            betslip_link: { loadCSS: true, loadLanguage: false },
            betslip: {loadCSS: true, loadLanguage: false },
          });
          betslipIsLoaded = true;
        }*/
      });
    }

    function encodeURL(pd) {
      var url = encodeURIComponent(pd);
      return url;
    }

    function renderResult(id) {
      if (id == 1) {
        GET($("[data-id=search-field]").val());
      } else {
        RenderSearchResultSport(window.searchDATA, id);
      }
    }

    function renderSearch() {
      var renderPromise = new Promise(function (resolve, reject) {
        if ($('.main-search-container').hasClass('not-active')) {
          $('.main-search-container').addClass('active');
          $('.main-search-container').removeClass('not-active');
          resolve();
        } else {
          $("<div style=\"display: none;\" data-id=\"main-search-container\" class=\"main-search-container\">\n\n            <div data-id=\"main-search-container\"class=\"searchContent\" style=\"display: inline-table\">\n              <div data-id=\"main-search-container\"class=\"search-container\" data-id=\"search\">\n                <div data-id=\"main-search-container\"id=\"search\" data-id=\"search\">\n\n                  <i data-id=\"main-search-container\"class=\"fa fa-search\" aria-hidden=\"true\" id=\"search-icon\" style=\"font-size: 20px; color: #fff\" data-id=\"search\"></i>\n                  <form data-id=\"search-field\"class=\"search-form\" data-id=\"search\">\n                    <input type=\"text\" id=\"search-input\" placeholder=\"Search...\" data-id=\"search\">\n                  </form>\n                  <div data-id=\"search-mic\" class=\"search-mic\">\n                  <i class=\"fas fa fa-microphone\"></i>\n                  </div>\n                  <div data-id=\"main-search-container\"class=\"search-close\">\n                    <p class=\"font white\">Close</p>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n\n            <div class=\"search-body active\">\n              <div class=\"search-example\">\n                <p class=\"font m-white\" data-id=\"search-example\">Search examples:</p>\n              </div>\n              <div class=\"search-links\">\n                <div class=\"s-link\">\n                  <p class=\"font white\" data-id=\"search-example\">AFC Champions League</p>\n                </div>\n                <div class=\"s-link\">\n                  <p class=\"font white\" data-id=\"search-example\">Algeria Youth League</p>\n                </div>\n                <div class=\"s-link\">\n                  <p class=\"font white\" data-id=\"search-example\">Argentina Reserve League</p>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"search-result not-active\">\n              <div class=\"search-scroll\">\n                <div class=\"search-scroll-item choosen\">\n                  <p class=\"font\">Soccer</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Tennis</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Basketball</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Cricket</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Handball</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Ice Hokey</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Soccer</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Soccer</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Soccer</p>\n                </div>\n                <div class=\"search-scroll-item\">\n                  <p class=\"font\">Soccer</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        ").prependTo('#content').fadeIn('middle');
          resolve();
        }
      });
      renderPromise.then(function () {
        var vh = window.innerHeight * 0.01;
        document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(vh, "px"));
        window.addEventListener('resize', function () {
          var vh = window.innerHeight * 0.01;
          console.log(vh);
          document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(vh, "px"));
        });
        console.log('search then done');
        $('.search-close').on('click', function (el) {
          console.log('Exit');
          $('.main-search-container').removeClass('active');
          $('.main-search-container').addClass('not-active');
        });
        $("[data-id=search-example]").on('click', function (el) {
          var ex_text = $(el.target).text();
          console.log(ex_text);
          $("[data-id=search]").val(ex_text);
        });
        $("[data-id=search-field]").on('input', function (el) {
          var input_val = $(el.target).val();

          if (input_val.length >= 1) {
            $('.search-mic').empty().append('<i class="fas fa fa-times"></i>');
            $('.search-mic').on('click', function () {
              $(el.target).val('');
              $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');
              $('.search-result').removeClass('active');
              $('.search-result').addClass('not-active');
              $('.search-body').removeClass('not-active');
              $('.search-body').addClass('active');
            });
          } else {
            $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');
            $('.search-mic').prop("onclick", null).off("click");
          }

          if (input_val.length >= 2) {
            GET(input_val);
            $('.search-body').removeClass('active');
            $('.search-body').addClass('not-active');
            $('.search-result').removeClass('not-active');
            $('.search-result').addClass('active');
          } else {
            $('.search-result').removeClass('active');
            $('.search-result').addClass('not-active');
            $('.search-body').removeClass('not-active');
            $('.search-body').addClass('active');
          }
        });
      });
    }

    renderSearch();
    done();
  });
});