exports('play_table', (params, done) => {
  // Convert odds
  const modifyBets = (od) => {
    const ODDS_TYPE = window.conf.CUSTOMER_CONFIG.ODDS_TYPE;
    // fraction
    if (ODDS_TYPE == '1') {
      return od;
    }
    // decimal
    if (ODDS_TYPE == '2') {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2);
    }
    // American
    if (ODDS_TYPE == '3') {
      const nums = od.split('/');
      let bet = (nums[0] / nums[1] + 1).toFixed(2);
      if (Number(bet) >= 2) {
        return `+${((Number(bet) - 1) * 100).toFixed(0)}`;
      } else {
        return `-${((100) / (Number(bet) - 1)).toFixed(0)}`;
      }
    }
  };
  insertHtmlModules({}, () => {
    let curID = params.sportId;

    if (curID === undefined) {
      ID = parseInt(window.inplay[0].ID);
    }
    else {
      ID = curID;
    }
    renderTable(window.inplay, ID);

    function createTimerInplay(tm, ts) {
      let tm_, ts_;

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

    function startTimerInplay() {
      let timers = $('.timer-el');
      for (let i = 0; i < timers.length; i++) {
        let tmr = $(timers[i]);
        tmr.data("tmrmin", tElMin(tmr));
        tmr.data("tmrsec", tElsec(tmr));
      }
      let interval = setInterval(function () {
        for (let i = 0; i < timers.length; i++) {
          let tmr = $(timers[i]);
          if ($(timers[i]).data("dc") == 1) {

            if ($(timers[i]).data("tt") == 0) {
              //$(timers[i]).text("Break");
              //$(timers[i]).data("tm", $(timers[i]).data("tm") + 15);
              $(timers[i]).text($(timers[i]).data("tm") + ':' + $(timers[i]).data("ts"));
            } else {
              /*
              let tm_ = parseInt(tmr.data("tmrmin"));
              let ts_ = parseInt(tmr.data("tmrsec"));
              if (ts_ == 59) {
                tm_ = tm_ + 1;
                ts_ = 0;
              } else {
                ts_ = ts_ + 1;
              }

              $(timers[i]).text(createTimerInplay(tm_, ts_));
              tmr.data("tmrmin", tm_);
              tmr.data("tmrsec", ts_);
              */
              let etu = tmr.data("tu").toString();
              let etm = tmr.data("tm").toString();
              let ets = tmr.data("ts").toString();
              let years = etu.substring(0, 4);
              let month = etu.substring(4, 6);
              let day = etu.substring(6, 8);
              let hours = etu.substring(8, 10);
              let minute = etu.substring(10, 12);
              let second = etu.substring(12, 14);
              let date = years + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
              let ts = new Date(date).getTime() / 1000;
              let tn = new Date().getTime() / 1000;
              let offset = new Date().getTimezoneOffset();
              let dt = Math.floor(tn - ts + etm * 60 + ets - Math.abs(offset) * 60);
              let min = Math.floor(dt / 60);
              let sec = dt - min * 60;
              if (sec == 59) {
                min = min + 1;
                sec = 0;
              } else {
                sec = sec + 1;
              }
              if (min < 10) min = '0' + min;
              if (sec < 10) sec = '0' + sec;
              //let timer = min + ':' + sec;
              tmr.text(min + ":" + sec);
            }
          } else {
            $(timers[i]).text(" ");
          }
        }
      }, 1000);
      window.inplay_interval = interval;
    }

    function tElMin(t) {
      let tu_time = new Date(t.data("tu")).getTime();
      let now = new Date().getTime();
      let dat_diff = Math.round(now - tu_time);
      //let dat_diff = Math.ceil(Math.abs(tu_time.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

      let dat_tm = millisToMinutes(dat_diff);
      let dat_ts = millisToSeconds(dat_diff);

      let tm = parseInt(t.data("tm"));
      let ts = parseInt(t.data("ts"));

      return parseInt(dat_tm) + tm;
    }

    function tElsec(t) {
      let tu_time = new Date(t.data("tu")).getTime();
      let now = new Date().getTime();
      let dat_diff = Math.round(now - tu_time);

      let dat_tm = millisToMinutes(dat_diff);
      let dat_ts = millisToSeconds(dat_diff);

      let tm = parseInt(t.data("tm"));
      let ts = parseInt(t.data("ts"));

      return parseInt(dat_ts) + ts;
    }
    function millisToMinutes(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes /*+ ":" + (seconds < 10 ? '0' : '') + seconds;*/;
    }
    function millisToSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return (seconds < 10 ? '0' : '') + seconds;
    }
    function renderTable(data, ID) {
      // Clean coef_table
      if ($(`[data-id=coef_table]:not(.pb-child)`).html().length > 0) {
        $(`[data-id=coef_table]:not(.pb-child)`).empty();
      }
      // Clean play-table
      $(`[data-id="play-table"]`).empty();
      const tableRenderer = new Promise((resolve, reject) => {
        data.forEach(sport => {
          let type = false;
          if (parseInt(sport.ID) == ID) {
            for (let i = 0; i < sport.CT.length; i++) {
              if (sport.CT[i].EV[0].MA.length === 0) {
                drawCompet(sport.CT[i].NA, ID == 1 ? true : false);
              }
              else {
                if (typeof sport.CT[0].EV[0].MA[0] == 'undefined') {
                  continue;
                }
                if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                  drawCompet(sport.CT[i].NA, false);
                }
                else {
                  drawCompet(sport.CT[i].NA, true);
                }
              }
              for (let j = 0; j < sport.CT[i].EV.length; j++) {
                // Check if bets' coeficients exist
                if (sport.CT[i].EV[j].MA.length == 0 || typeof (sport.CT[i].EV[j].MA[0]) == 'undefined') {
                  drawEvents(sport.CT[i].EV[j], ID == 1 ? true : false, ID);
                  continue;
                }
                // Check if bets' coeficients for draw exist
                if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                  type = false;
                  drawEvents(sport.CT[i].EV[j], type, ID);
                }
                else {
                  type = true;
                  drawEvents(sport.CT[i].EV[j], type, ID);
                }
              }
            }
            resolve();
          }
        });
      });
      tableRenderer
        .then((response) => {
          // Handle opening of game section
          $(`[data-id=event]`).on('click', (event) => {
            let id = $(event.target).data('gameId');
            let curURL = window.location.href;
            // Start preloader
            const preloader = $('#page-preloader');
            preloader.removeClass('done').addClass('opaci');
            //if filter is active - remove it from hash
            if ((window.location.hash.split('/')[1] == 'sport') || (window.location.hash.split('/')[1] == 'inplay')) {
              window.location.hash = '';
              window.location.hash += `/event/${id}`;
            }
            else {
              if (curURL.includes('#')) {
                window.location.href += `/event/${id}`;
              }
              else {
                window.location.href += `#/event/${id}`;
              }
            }
          });
          // Preloader finishes
          const preloader = $('#page-preloader');
          preloader.children('img').remove();
          preloader.addClass('done');
          preloader.removeClass('opaci');
          preloader.data(`status`, 'done').attr('data-status', 'done');

          window.translate();

          loadJsModules({
            betslip_link: { loadCSS: true, loadLanguage: false }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      startTimerInplay();
    }

    function drawEvents(ev, type, ID) {
      let XP = ev.XP;
      $(`[data-id="play-table"]`).append(`
                    <div class="row">
                    <div class="cell" data-game-id="${ev.ID}" data-id="event">
                      <div data-game-id="${ev.ID}" data-class="play-link" data-game-id="${ev.ID}" class="[ play-link ]">
                          <div data-game-id="${ev.ID}" class="team home">
                            <p class="font m-white ellipsis" data-game-id="${ev.ID}">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[0] : ev.NA.split(' vs ')[0]}</p>
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.ID}"></div>`}
                          </div>
                          <div data-game-id="${ev.ID}" class="team away">
                           ${typeof ev.NA.split(' v ')[1] == 'undefined' && typeof ev.NA.split(' v ')[1] == 'undefined' && typeof ev.NA.split(' vs ')[1] == 'undefined' ? '' : `<p data-game-id="${ev.ID}" class="font m-white ellipsis">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[1] : ev.NA.split(' vs ')[1]}</p>`}
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.ID}"></div>`}
                          </div>
                          <div data-game-id="${ev.ID}" class="[ metadata-wrapper ] text-right">
                            ${ev.TU == '' ? `` : `<p data-find="timer" data-timer="${ev.FI}" data-game-id="${ev.ID}" data-tu="${ev.TU}" data-tm="${ev.TM}" data-ts="${ev.TS}" data-dc="${ev.DC}" class="font m-white timer-el"></p>`}
                            <div class="marketCount " data-game-id="${ev.ID}">${ev.LM}</div>
                            <!--<div class="sport-icon play" data-game-id="${ev.ID}"></div>-->
                          </div>
                        </div>
                      </div>
                    </div>`);
      // if (typeof XP !== 'undefined' && ev.ID != 1) {
      //   if (typeof XP.split(',')[1] !== 'undefined') {
      //     let counter = 0;
      //     ev.XP.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      //   else {
      //     let counter = 0;
      //     ev.SS.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      // }
      // else {
      //   let counter = 0;
      //   ev.SS.split(',').map((item) => {
      //     counter++;
      //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //     `);
      //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //     <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
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

      // if just 1 score:
      if (typeof XP !== 'undefined') {
        if (XP !== '') {
          ev.SS.split(',').map((item, idx, arr) => {
            if (idx == arr.length - 1) {
              $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
        <span class="point">${item.split('-')[0]}
      `);
              $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
        <span class="point">${item.split('-')[1]}
      `);
            }
          });
        }
      } else {
        if (typeof ev.SS.split('-')[1] !== 'undefined') {
          $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${ev.SS.split('-')[0]}
          `);
          $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
            <span class="point">${ev.SS.split('-')[1]}
          `);
        }
      }
      if (ev.MA.length > 0 && (typeof ev.MA !== 'undefined' && ev.MA[0].SU != '1')) {
        if (type) {
          if (ev.MA[0].NA != "Fulltime Result") {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="right-container" style="width: 100%; height: 100%">

            <div class="bets-container" style="width: 100%; height: 65%; display: flex;">
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
            </div>

            <div class="result-container" data-id="event" data-game-id="${ev.ID}" style="width: 100%; height: 35%; background-color: #343341; display: flex;
            justify-content: center;
            align-items: center; border-top: 1px solid rgb(51, 32, 43);">
            <p class="font m-white ellipsis" data-game-id="${ev.ID}" style="font-size: 13px;">${ev.MA[0].NA}</p>
            </div>

            </div>
          `);
          } else {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
          `);
          }
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div>
          `);
        }
      }
      else {
        if (type) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
          `);
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button>
            </div>
          `);
        }
      }
    }

    function drawCompet(ctName, type) {
      if (type) {
        $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
          <div class="cell"> <p class="font">${typeof ctName !== 'undefined' ? ctName : ''} </p> </div> 
          <div class="cell"> <p class="font">1</p> </div> 
          <div class="cell"> <p class="font">X</p> </div>
          <div class="cell"> <p class="font">2</p> </div></div>
        `);
      }
      else {
        $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
          <div class="cell"> <p class="font">${typeof ctName !== 'undefined' ? ctName : ''} </p> </div> 
          <div class="cell" style="min-width: 24%; max-width: 24%;"> <p class="font">1</p> </div>
          <div class="cell" style="min-width: 24%; max-width: 24%;"><p class="font">2</p> </div></div>
        `);
      }
    }
  });
});