exports('play_table', (params, done) => {
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
      let interval = setInterval(function () {
        for (let i = 0; i < timers.length; i++) {

          if ($(timers[i]).data("dc") == 1) {

            if ($(timers[i]).data("tt") == 0) {
              $(timers[i]).text("Break");
            } else {
              if ($(timers[i]).data("tm") == 0) {

                let tu = $(timers[i]).data("tu");
                let etu = tu.toString();

                let years = etu.substring(0, 4),
                  month = etu.substring(4, 6),
                  day = etu.substring(6, 8),
                  hours = etu.substring(8, 10),
                  minute = etu.substring(10, 12),
                  second = etu.substring(12, 14);

                $(timers[i]).data("tm", minute);
                $(timers[i]).data("ts", second);

                let tm = parseInt($(timers[i]).data("tm"));
                let ts = parseInt($(timers[i]).data("ts"));

                if (ts == 59) {
                  tm = tm + 1;
                  ts = 0;
                } else {
                  ts = ts + 1;
                }

                $(timers[i]).text(createTimerInplay(tm, ts));

                $(timers[i]).data("tm", tm);
                $(timers[i]).data("ts", ts);
              } else {
                let tm = parseInt($(timers[i]).data("tm"));
                let ts = parseInt($(timers[i]).data("ts"));

                if (ts == 59) {
                  tm = tm + 1;
                  ts = 0;
                } else {
                  ts = ts + 1;
                }

                $(timers[i]).text(createTimerInplay(tm, ts));

                $(timers[i]).data("tm", tm);
                $(timers[i]).data("ts", ts);
              }
            }
          } else {
            $(timers[i]).text(" ");
          }
        }
      }, 1000);
      window.inplay_interval = interval;
    }

    function renderTable(data, ID) {
      $(`[data-id="play-table"]`).empty();
      const tableRenderer = new Promise((resolve, reject) => {
        data.forEach(sport => {
          let type = false;
          if (parseInt(sport.ID) == ID) {
            for (let i = 0; i < sport.CT.length; i++) {
              if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                drawCompet(sport.CT[i].NA, false);
              }
              else {
                drawCompet(sport.CT[i].NA, true);
              }
              for (let j = 0; j < sport.CT[i].EV.length; j++) {
                // Check if bets' coeficients exist
                if (typeof (sport.CT[i].EV[j].MA) == 'undefined' || typeof (sport.CT[i].EV[j].MA[0]) == 'undefined') {
                  // throw new Error(String(sport.CT[i].EV[j].NA));
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
            //if filter is active - remove it from hash
            if (window.location.hash.split('/')[1] == 'filter') {
              window.location.hash = '';
              window.location.href += `/event/${id}`;
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
          if (preloader.data(`status`) != 'done') {
            preloader.addClass('done');
            preloader.data(`status`, 'done').attr('data-status', 'done');
          }
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
                          <div class="team home">
                            <p class="font m-white ellipsis">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[0] : ev.NA.split(' vs ')[0]}</p>
                            <div class="team-score"></div>
                          </div>
                          <div data-game-id="${ev.ID}" class="team away">
                            <p data-game-id="${ev.ID}" class="font m-white ellipsis">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[1] : ev.NA.split(' vs ')[1]}</p>
                            <div class="team-score"></div>
                          </div>
                          <div data-game-id="${ev.ID}" class="[ metadata-wrapper ] text-right">
                            <p data-find="timer" data-timer="${ev.FI}" data-game-id="${ev.ID}" data-tu="${ev.TU}" data-tm="${ev.TM}" data-ts="${ev.TS}" data-dc="${ev.DC}" class="font m-white timer-el"></p>
                            <div class="marketCount ">${ev.LM}</div>
                            <div class="sport-icon play"></div>
                          </div>
                        </div>
                      </div>
                    </div>`);
      if (typeof XP !== 'undefined') {
        if (typeof XP.split(',')[1] !== 'undefined') {
          let counter = 0;
          ev.XP.split(',').map((item) => {
            counter++;
            $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
              <span class="point">${item.split('-')[0]}
            `);
            $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
              <span class="point">${item.split('-')[1]}
            `);
          });
        }
        else {
          let counter = 0;
          ev.SS.split(',').map((item) => {
            counter++;
            $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
              <span class="point">${item.split('-')[0]}
            `);
            $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
              <span class="point">${item.split('-')[1]}
            `);
          });
        }
      }
      else {
        let counter = 0;
        ev.SS.split(',').map((item) => {
          counter++;
          $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${item.split('-')[0]}
          `);
          $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
          <span class="point">${item.split('-')[1]}
        `);
        });
      }
      if (typeof XP !== 'undefined') {
        if (ev.PI.split(',')[0] == '1')
          $(`div[data-game-id="${ev.ID}"] .team.home p`).addClass('bowler');
        if (ev.PI.split(',')[1] == '1')
          $(`div[data-game-id="${ev.ID}"] .team.away p`).addClass('bowler');
        $(`div[data-game-id="${ev.ID}"] .timer-el`).remove();
        if (typeof XP.split(',')[1] !== 'undefined') {
          $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${ev.SS.split('-')[0]}
          `);
          $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
            <span class="point">${ev.SS.split('-')[1]}
          `);
        }
        else {
          if (XP !== '') {
            $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${XP.split('-')[0]}
          `);
            $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
            <span class="point">${XP.split('-')[1]}
          `);
          }
        }
      }
      if (typeof ev.MA[0].PA !== 'undefined' && ev.MA[0].SU != '1') {
        if (type) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : ev.MA[0].PA[0].OD}</button> 
            </div> 
            <div class="cell"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : ev.MA[0].PA[1].OD}</button>
            </div> 
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : ev.MA[0].PA[2].OD}</button> 
            </div>
          `);
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : ev.MA[0].PA[0].OD}</button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : ev.MA[0].PA[1].OD}</button>
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
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient"><span class="fa fa-lock lock"></span></button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient"><span class="fa fa-lock lock"></span></button>
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