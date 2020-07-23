"use strict";

exports('prematch_coupon', function (params, done) {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }

  var preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');
  preloader.children('img').remove();
  $('.prematch').empty(); // load styles and unload event styles

  if (document.querySelector("[href=\"./css/modules/prematch_event.css\"]") !== null) {
    document.querySelector("[href=\"./css/modules/prematch_event.css\"]").parentNode.removeChild(document.querySelector("[href=\"./css/modules/prematch_event.css\"]"));
  }

  var fileref = document.createElement("link");
  var filename = "./css/modules/prematch_coupon.css";
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  insertHtmlModules({
    '.prematch': ['prematch/prematch_coupon.html']
  }, function () {
    var leagueID = params.ligID;
    console.log(leagueID);
    /*function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }*/
    // Convert fractial to decimal

    modifyBets = function modifyBets(od) {
      var nums = od.split('/');

      if (typeof nums[1] === 'undefined') {
        return od
        /* + '.00' */
        ;
      }

      return (nums[0] / nums[1] + 1).toFixed(2);
    };
    /*let url = 'http://bestline.bet/sports/?PD=';
    url += PD;*/


    var url = 'https://bestline.bet/api2/?key=league&leagueId=' + leagueID;
    httpGet(url, 'prematch'); // Fetch API request

    function httpGet(url, name) {
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (name == 'prematch') {
          //const tree = growTree(data);
          console.log(data.events);
          renderPrematch(data.events);
        } else {
          throw new Error('Uncorrect handler name.');
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }

    function growTree(data) {
      var curMA = '';
      var tree = [];
      tree.MG = [];
      tree.MA = [];
      data.map(function (item, index) {
        if (item.type === 'CL') {
          tree.push(item);
        } else {
          if (item.type === 'EV') {
            tree.push(item);
          } else {
            if (item.type === 'MG') {
              tree.MG.push(item); // curMG = item;
              // curMG.MA = [];
            } else {
              if (item.type === 'MA') {
                tree.MA.push(item);
                curMA = item;
                curMA.PA = [];
              } else {
                if (item.type === 'PA') {
                  curMA.PA.push(item);
                }
              }
            }
          }
        }
      });
      return tree;
    }

    function transformDay(str) {
      if (str) {
        var year = str.substring(0, 4);
        var month = parseInt(str.substring(4, 6));
        month--;
        var day = str.substring(6, 8);
        var time = str.substring(8, 12);
        var ls2lt = time.substring(0, 2);
        time = time.replace(ls2lt, "".concat(ls2lt, ": "));
        /* const date = ${time} ${month}/${day};*/

        var date = "".concat(time);
        var dt = new Date(year, month, day).getTime();
        return [date, dt];
      } else {
        return '';
      }
    }

    ;

    function renderPrematch(data) {
      var render = new Promise(function (resolve, reject) {
        console.dir(data);
        $('.prematch-title .sport-name').text(sessionStorage.getItem('prematchSport') + ' / ');
        $('.prematch-title .league').text(sessionStorage.getItem('prematchLeague'));
        $('.prematch-table-title').append("\n        <div class=\"item selected\" data-id=\"undefined\">Matches</div>\n            \n        <div class=\"item\" data-id=\"undefined\">Teams</div>\n      \n        <div class=\"item\" data-id=\"undefined\">Outrights</div>\n      \n        <div class=\"item\" data-id=\"undefined\">Table</div>\n        ");
        $('.prematch-table-title .item:first-child').addClass('selected');
        $('.prematch-table-filter').hide();
        /*
                let mg_idx = 0;
                data.MA.forEach((item) => {
                  if (typeof item.PD === 'undefined' && item.PA.length == 0) {
                    $('.prematch-table-filter').append(`
                      <div class="item" data-idx="${mg_idx}" data-id="${item.ID}" data-it="${item.IT}">${item.NA}</div>
                    `);
                    mg_idx++;
                  }
                });
                $('.prematch-table-filter .item:first-child').addClass('selected');
                console.log(mg_idx);
                if ($('.prematch-table-filter .item:first-child').text() == 'undefined') {
                  $('.prematch-table-filter').css('display', 'none');
                }
                if ($('.prematch-table-filter .item').length == 0) {
                  $('.prematch-table-filter').css('display', 'none');
                }
        */

        if (1 == 2
        /*sessionStorage.getItem('prematchSport') !== 'Soccer' || sessionStorage.getItem('prematchSport') !== 'Tennis'*/
        ) {
            // Basketball, ice hockey etc.
            console.log("Fuk u asshole");
            /* let events = 0, bets = 0, tables = 0;
            data.MA.forEach((ma) => {
              if (ma.SY == 'ccl' || ma.SY == 'ccd') {
                tables++;
              }
            });
            let table = document.querySelector('.tableWrapper').cloneNode(true);
            document.querySelector('.tableWrapper').parentNode.removeChild(document.querySelector('.tableWrapper'));
            for (let i = 0; i < tables; i++) {
              table.dataset.index = i;
              if (i == 0) {
                table.classList.add('active');
              }
              else {
                table.classList.remove('active');
                table.classList.add('hidden');
              }
              let new_node = table.cloneNode(true);
              document.querySelector('.prematch-table').appendChild(new_node);
              // document.querySelector('.prematch-table-filter').insertAdjacentElement('afterend', table);
            }
            let curTable = 0;
            let prevSY = '';
            data.MA.forEach((item, i) => {
              bets = 0;
              if (typeof item.PD === 'undefined' && item.PA.length > 0) {
                // teams
                let col_name = item.NA;
                if ((item.PY == 'di' || item.PY == 'do') && item.SY == 'ccl' && item.NA == ' ' && $('.tableWrapper .table-col').length == 0) {
                  $('.tableWrapper').append(`
                    <div class="table-col Teams">
                      <div class="col-label flex-container align-center ${item.NA}">
                        ${new Date(transformDay(item.PA[0].BC)[1]).toDateString()}
                      </div>
                    </div>
                  `);
                  for (item of item.PA) {
                    if (typeof item.NA !== 'undefined') {
                      events++;
                      $(`.table-col.Teams`).append(`
                      <div class="col-item flex-container" data-event-id="${item.PD}" data-pd="${item.PD}">
                        <div class="col-info">
                          <div class="item-time">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</div>
                          <div class="item-markets">${item.MR}</div>
                          <div class="item-video">
                            <div class="sport-icon play"></div>
                          </div>
                        </div>
                        <div class="col-item-name">
                          <div class="team home">
                            <span>${typeof item.D1 !== 'undefined' ? item.D1.split(',')[0] + '&nbsp;' : ''}</span>${item.NA}
                          </div>
                          <div class="team away">
                            <span>${typeof item.D1 !== 'undefined' ? item.D1.split(',')[1] + '&nbsp;' : ''}</span>${item.N2}
                          </div>
                          ${item.TM == 'Tie' ? `
                            <div class="team away">
                              <span></span> Tie
                            </div>
                          ` : ''}
                        </div>
                      </div>
                    `);
                    }
                  }
                }
                else {
                  // Spread && Total | Money line | etc
                  if (item.SY == 'cci' || item.SY == 'ccj' || item.SY == 'cce') {
                    let curSY = item.SY;
                    if (prevSY == '') {
                      prevSY = curSY;
                    }
                    if (curSY != prevSY) {
                      curTable++;
                    }
                    let col_name = item.NA !== ' ' ? item.NA : `moneyline${item.SY}`;
                    col_name = col_name.replace(/\s+/g, '');
                    $(`.tableWrapper[data-index="${curTable}"]`).append(`
                      <div class="table-col ${col_name}" data-id="${item.ID}" data-it="${item.IT}">
                        <div class="col-label flex-container align-center">
                          ${item.NA}
                        </div>
                      </div>
                    `);
                    item.PA.map((item) => {
                      curTable == 0 ? bets++ : null;
                      if (modifyBets(item.OD) == 'NaN' || item.OD == '') {
                        $(`.table-col${'.' + col_name}`).append(`
                        <div class="col-item flex-container">
                          <button class="button coefficient disabled">
                            <span class="ha">
                              OTB
                            </span>
                          </button>
                        </div>
                      `);
                      }
                      else {
                        curTable == 0 ? bets++ : null;
                        $(`.table-col${'.' + col_name}`).append(`
                        <div class="col-item flex-container">
                          <button class="button coefficient" data-id="${item.ID}" data-fi="${item.FI}">
                            ${item.HA !== '' ?
                            `<span class="ha">
                              ${item.HA}
                            </span>` : ``
                          }
                            <span class="od">
                              ${modifyBets(item.OD)}
                            </span>
                          </button>
                        </div>
                      `);
                      }
                    });
                    prevSY = curSY;
                  }
                  // else {
                  //   if (item.SY == 'ccj') {
                  //     let col_name = item.NA !== ' ' ? item.NA : `moneyline${item.SY}`;
                  //     col_name = col_name.replace(/\s+/g, '');
                  //     $('.tableWrapper[data-index="1"]').append(`
                  //       <div class="table-col ${col_name}" data-id="${item.ID}" data-it="${item.IT}">
                  //         <div class="col-label flex-container align-center">
                  //           ${item.NA}
                  //         </div>
                  //       </div>
                  //     `);
                  //     item.PA.map((item) => {
                  //       // bets++;
                  //       if (modifyBets(item.OD) == 'NaN' || item.OD == '') {
                  //         $(`.table-col${'.' + col_name}`).append(`
                  //           <div class="col-item flex-container">
                  //             <button class="button coefficient disabled">
                  //               <span class="ha">
                  //                 OTB
                  //               </span>
                  //             </button>
                  //           </div>
                  //         `);
                  //       }
                  //       else {
                  //         // bets++;
                  //         $(`.table-col${'.' + col_name}`).append(`
                  //           <div class="col-item flex-container">
                  //             <button class="button coefficient" data-id="${item.ID}" data-fi="${item.FI}">
                  //             ${item.HA !== '' ?
                  //               `<span class="ha">
                  //                 ${item.HA}
                  //               </span>` : ``
                  //               }
                  //               <span class="od">
                  //                 ${modifyBets(item.OD)}
                  //               </span>
                  //             </button>
                  //           </div>
                  //         `);
                  //       }
                  //     });
                  //   }
                  // }
                }
              }
            });
            console.log('bets', bets);
            console.log(`events`, events);
            if (bets / events > 2.5) {
              $('.table-col.Teams').addClass('three');
            }
            */
          } else {
          // Soccer && Tennis
          console.log('Rendering matches');
          var prevDate = 0;
          var play_table = $("<div class=\"play-table table\"></div>");
          data.forEach(function (match) {
            //console.log(match.odds[0].name)
            if (match.odds[0].name == "3 Way") {
              play_table.append("\n            <div class=\"row [ info ]\"> \n            <div class=\"cell\"> \n              <p class=\"font\">".concat(match.startDate.slice(0, 10).replace("-", " ").replace("-", " "), "</p> \n            </div> \n            <div class=\"cell\"> \n              <p class=\"font\">1</p> \n            </div> \n            <div class=\"cell\"> \n              <p class=\"font\">X</p> \n            </div>\n            <div class=\"cell\"> \n              <p class=\"font\">2</p> \n            </div>\n          </div>\n            "));
              play_table.append("\n            <div class=\"row\">\n            <div class=\"cell\" ".concat(">\n              <div id=\"prematch-event\" data-class=\"play-link\" data-eventid=\"", match.id, "\" data-eventtitle=\"").concat(match.competitors[0].name + ' v ' + match.competitors[1].name, "\" class=\"[ play-link ]\">\n                  <div class=\"team home\">\n                    <p class=\"font m-white ellipsis\">").concat(match.competitors[0].name, "</p>\n                    <div class=\"team-score\"></div>\n                  </div>\n                  <div class=\"team away\">\n                    <p class=\"font m-white ellipsis\">").concat(match.competitors[1].name, "</p>\n                    <div class=\"team-score\"></div>\n                  </div>\n                  <div class=\"[ metadata-wrapper ] text-right\">\n                    <p class=\"font m-white timer-el\">").concat(match.startDate.slice(11, 16), "</p>\n                    <div class=\"marketCount\">").concat(match.oddsCount, "</div>\n                    <div class=\"sport-icon play\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            "));
              play_table.children('.row:last-child').append("\n                  <div class=\"cell\" style=\"display: table-cell;\">\n            <button class=\"button coefficient ".concat("\" data-id=\"", "\" data-fi=\"", "\">", match.odds[0].outcomes[0].oddValue
              /*home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(home.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD))*/
              , "</button> \n                  </div> \n                  <div class=\"cell\" style=\"display: table-cell;\">\n            <button class=\"button coefficient ", "\" data-id=\"", "\" data-fi=\"", "\">").concat(match.odds[0].outcomes[1].oddValue
              /*home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(home.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD))*/
              , "</button> \n                  </div> \n                  <div class=\"cell\" style=\"display: table-cell;\">\n            <button class=\"button coefficient ", "\" data-id=\"", "\" data-fi=\"", "\">").concat(match.odds[0].outcomes[2].oddValue
              /*home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(home.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD))*/
              , "</button> \n                  </div> \n                "));
            }
          });
          /*data.MA.forEach((item, i) => {
            if (item.NA == ' ' && item.SY == 'ccd') {
              data.MA[i].PA.forEach((item, i) => {
                if (prevDate == item.BC) { }
                else {
                  // append date group
                  if (data[0].ID != '1') {
                    play_table.append(`
                  <div class="row [ info ]"> 
                    <div class="cell"> 
                      <p class="font">${new Date(transformDay(item.BC)[1]).toDateString()}</p> 
                    </div> 
                    <div class="cell" style="width: 50%; max-width: 50%"> 
                      <p class="font">1</p> 
                    </div> 
                    <div class="cell" style="width: 50%; max-width: 50%"> 
                      <p class="font">2</p> 
                    </div>
                  </div>
                  `);
                  }
                  else {
                    play_table.append(`
                    <div class="row [ info ]"> 
                      <div class="cell"> 
                        <p class="font">${new Date(transformDay(item.BC)[1]).toDateString()}</p> 
                      </div> 
                      <div class="cell"> 
                        <p class="font">1</p> 
                      </div> 
                      <div class="cell"> 
                        <p class="font">X</p> 
                      </div>
                      <div class="cell"> 
                        <p class="font">2</p> 
                      </div>
                    </div>
                    `);
                  }
                  prevDate = item.BC;
                }
                // append event
                play_table.append(`
                <div class="row">
                <div class="cell" ${
                  item.SU == '1' ?
                    'data-event-su="1"' :
                    (typeof item.PD !== 'undefined' ? ` data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`)}>
                  <div data-class="play-link" class="[ play-link ]">
                      <div class="team home">
                        <p class="font m-white ellipsis">${item.NA}</p>
                        <div class="team-score"></div>
                      </div>
                      <div class="team away">
                        <p class="font m-white ellipsis">${item.N2}</p>
                        <div class="team-score"></div>
                      </div>
                      <div class="[ metadata-wrapper ] text-right">
                        <p class="font m-white timer-el">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</p>
                        <div class="marketCount ${item.SU == '1' ? ' none' : ''}"> ${item.SU == '1' ? '' : (typeof item.PD !== 'undefined' ? `${item.MR}` : `INPLAY`)}</div>
                        <div class="sport-icon play ${item.SU == '1' ? ' none' : ''}"></div>
                      </div>
                    </div>
                  </div>
                </div>
                `);
                // append bet
                if (data[0].ID != '1') {
                  // tennis
                  let home = 0, away = 0;
                  data.MA.forEach((ma) => {
                    if (ma.IT === 'C41-83-1') {
                      home = ma.PA[i];
                    }
                    if (ma.IT === 'C41-83-2') {
                      away = ma.PA[i];
                    }
                  });
                  play_table.children('.row:last-child').append(`
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;">
                      <button class="button coefficient ${home.OD == '0/0' || home.OD == '1' ? 'disabled' : ''}" data-id="${home.ID}" data-fi="${home.FI}">${home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(home.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD))}</button> 
                    </div> 
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;"> 
                      <button class="button coefficient ${away.OD == '0/0' || away.OD == '1' ? 'disabled' : ''}" data-id="${away.ID}" data-fi="${away.FI}">${away.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(away.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(away.OD))}</button>
                    </div>
                  `);
                }
                else {
                  // soccer
                  let home = 0, draw = 0, away = 0;
                  data.MA.forEach((ma) => {
                    if (ma.IT === 'C41-40-1') {
                      home = ma.PA[i];
                    }
                    if (ma.IT === 'C41-40-2') {
                      draw = ma.PA[i];
                    }
                    if (ma.IT === 'C41-40-3') {
                      away = ma.PA[i];
                    }
                  });
                  play_table.children('.row:last-child').append(`
                  <div class="cell" style="display: table-cell;">
                    <button class="button coefficient ${home.OD == '0/0' || home.OD == '1' ? 'disabled' : ''}" data-id="${home.ID}" data-fi="${home.FI}">${home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(home.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD))}</button> 
                  </div> 
                  <div class="cell" style="display: table-cell;"> 
                  <button class="button coefficient ${draw.OD == '0/0' || draw.OD == '1' ? 'disabled' : ''}" data-id="${draw.ID}" data-fi="${draw.FI}">${draw.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(draw.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(draw.OD))}</button>
                  </div> 
                  <div class="cell" style="display: table-cell;">
                  <button class="button coefficient ${away.OD == '0/0' || away.OD == '1' ? 'disabled' : ''}" data-id="${away.ID}" data-fi="${away.FI}">${away.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : (modifyBets(away.OD) == '1' ? '<span class="fa fa-lock lock"></span>' : modifyBets(away.OD))}</button> 
                  </div>
                `);
                }
              });
            }
          });*/

          $('.tableWrapper').append(play_table);
        }
        /*if (data.MA.length == 0) {
          $('.tableWrapper .play-table').append($(`<div class="no-events">Sorry, there are no events sheduled coming soon.</div>`));
        }*/
        // preloader done


        preloader.addClass('done').removeClass('opaci');
        resolve();
      });
      render.then(function (response) {
        document.querySelector('body').scrollTop; // go back to sport

        $('.round-b').on('click', function (event) {
          window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
        });
        document.querySelector('.sport-name').addEventListener('click', function (event) {
          window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
        });
        document.querySelectorAll("[data-eventid]").forEach(function (item) {
          item.addEventListener('click', function (event) {
            var cur = $(event.target).closest('.play-link');
            var matchID = cur.data("eventid");
            var matchTitle = cur.data("eventtitle");
            console.log(matchTitle);
            sessionStorage.setItem('prematchEvent', matchTitle);
            window.location.hash += '/' + matchID;
          });
        }); // load prematch event

        document.querySelectorAll("[data-event-id]").forEach(function (item) {
          item.addEventListener('click', function (event) {
            var cur = $(event.target);

            if (cur.is('.col-item')) {
              if (typeof cur.data("pd") !== 'undefined') {
                window.location.hash += '/' + encodeURL(cur.data("pd"));
              } else {
                window.location.hash += '/' + encodeURL(cur.data("pd"));
              }
            } else {
              if (typeof cur.parents(".cell").data("pd") !== 'undefined') {
                window.location.hash += '/' + encodeURL(cur.parents(".cell").data("pd"));
              } else {
                window.location.hash += '/' + encodeURL(cur.parents(".col-item").data("pd"));
              }
            }
          });
        }); // load inplay event

        document.querySelectorAll("[data-inplay-id]").forEach(function (item) {
          item.addEventListener('click', function (event) {
            event.preventDefault();
            var cur = $(event.target);

            if (cur.is('.col-item')) {
              if (typeof cur.data("pd") !== 'undefined') {
                window.location.hash = '';
                window.location.hash += '/' + 'event/' + encodeURL(cur.data("inplayId"));
              } else {
                window.location.hash = '';
                window.location.hash += '/' + 'event/' + encodeURL(cur.data("inplayId"));
              }
            } else {
              if (typeof cur.parents(".cell").data("pd") !== 'undefined') {
                window.location.hash = '';
                window.location.hash += '/' + 'event/' + encodeURL(cur.parents(".cell").data("inplayId"));
              } else {
                window.location.hash = '';
                window.location.hash += '/' + 'event/' + encodeURL(cur.parents(".col-item").data("inplayId"));
              }
            }
          });
        });
        $('.prematch-table-title .item').on('click', function (event) {
          var cur = $(event.target);

          if (cur.is('.selected')) {} else {
            $('.prematch-table-title .item').removeClass('selected');
            cur.addClass('selected');
          }
        });
        $('.prematch-table-filter .item').on('click', function (event) {
          var cur = $(event.target);

          if (cur.is('.selected')) {} else {
            $('.tableWrapper').removeClass('active').addClass('hidden');
            var idx = cur.data('idx');
            console.log(idx);
            console.log('length: ', $(".tableWrapper[data-index=\"".concat(idx, "\"]")).length);
            $(".tableWrapper[data-index=\"".concat(idx, "\"]")).removeClass('hidden').addClass('active');
            $('.prematch-table-filter .item').removeClass('selected');
            cur.addClass('selected');
          }
        });
        loadJsModules({
          betslip_link: {
            loadCSS: true,
            loadLanguage: false
          }
        });
      });
    }

    done();
  });
});