exports('play_big', (params, done) => {
  insertHtmlModules({
    // ".play-big": [
    //   "main/play-big.html"
    // ]
  }, () => {
    const playBigOne = $(`[data-id=play-big-1]`),
      playBigTwo = $(`[data-id=play-big-2]`),
      playBigThree = $(`[data-id=play-big-3]`),
      playBigFour = $(`[data-id=play-big-4]`);


    let curID = params.sportId;
    let ID;
    if (curID === undefined) {
      ID = parseInt(window.inplay[0].ID);
    }
    else {
      ID = curID;
    }
    fillPlayBig(window.inplay, ID);

    /*Timer for Play Big starts here*/
    function createTimer(tm, ts) {
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

    function calculateDiffMinutes(data, c_years, c_mounth, c_days, c_hr, c_tm, c_ts) {
      let now = new Date();
      let c_tu = new Date(c_years, c_mounth, c_days, c_hr, c_tm, c_ts);

      let delta = new Date(now - c_tu);

      return parseInt(delta.getMinutes()) + data.TM;
    }

    function calculateDiffSeconds(data, c_years, c_mounth, c_days, c_hr, c_tm, c_ts) {
      let now = new Date();
      let c_tu = new Date(c_years, c_mounth, c_days, c_hr, c_tm, c_ts);

      let delta = new Date(now - c_tu);
      let sec = parseInt(delta.getSeconds()) + data.TS;

      return parseInt(delta.getSeconds()) + data.TS;
    }

    function startTimerBig(data) {
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
    /*End of Timer*/

    // Shortening club name
    function shortize(name) {
      let str = name;
      if (screen.width < 400) {
        str = str.slice(0, 11);
        if (name.length > 11) {
          str += '...';
        }
        return str;
      }
      else {
        str = str.slice(0, 16);
        if (name.length > 16) {
          str += '...';
        }
        return str;
      }
    }

    function fillPlayBig(data, ID) {
      let promise = new Promise((resolve, reject) => {
        if (data != undefined) {

          let id = parseInt(ID);
          data.forEach(sport => {
            if (parseInt(sport.ID) == ID) {
              $(`[data-id=play-big]`).empty();
              let max_m = sport.CT.length;
              
              for (let i = 0; i < max_m; i++) {

                 $(`[data-id=play-big]`).append(`
                 <a data-id="play-big-wrapper" data-play-big="${sport.CT[i].EV[0].ID}" class="cell">
                        <div data-play-big="${sport.CT[i].EV[0].ID}" class="flex-container align-justify [ play-big ]">
                        <div data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="block" style="margin-bottom: 5px;">
                        <p data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="font white ">${shortize(sport.CT[i].NA)}</p>
                        <p data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="font m-white ellipsis">${shortize(sport.CT[i].EV[0].NA.split('v')[0])}</p>
                        <p data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="font m-white ellipsis">${shortize(sport.CT[i].EV[0].NA.split('v')[1])}</p>
                        </div>
                        <div data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="sport-icon play" style="margin-top: 7%; margin-right: 0;"></div>
                <div data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="block">
                <p data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" class="font m-white text-right">${sport.CT[i].EV[0].SS}</p>
                <p data-play-big="${sport.CT[i].EV[0].ID}" data-game-id="${sport.CT[i].EV[0].FI}" data-id="timer-big" data-tu="${sport.CT[i].EV[0].TU}" data-tm="${sport.CT[i].EV[0].TM}" data-ts="${sport.CT[i].EV[0].TS}" class="font m-white ellipsis text-right"></p>
                </div>
                </div>
                        <div data-id="coef_table" class="table [ coeficient-table ]">
                        <div class="row">
              <div class="cell w33" >
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font">${sport.CT[i].EV[0].MA[0].PA[0].OD}</span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font">${sport.CT[i].EV[0].MA[0].PA[1].OD}</span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">2</span>
                  <span data-id="coef-three" class="font">${sport.CT[0].EV[0].MA[0].PA[2].OD}</span>
                </button>
              </div>
            </div>
              </div>
            </a>
                 `);

              }
              startTimerBig(sport.CT[3].EV[0]);
            }
            resolve();
          });
        } else {
          reject(`Data 404`);
        }
      });
      promise
        .then(() => {
          // Handle opening of game section
          $(`[data-id=play-big-wrapper]`).on('click', (event) => {
            let id = $(event.target).data('play-big');
            console.log(id);
            console.log($(`[data-id=play-big-wrapper]`).data('play-big'));
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
        });
    }
    done();
  });
});