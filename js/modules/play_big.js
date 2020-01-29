exports('play_big', (params, done) => {
  insertHtmlModules({
    // ".play-big": [
    //   "main/play-big.html"
    // ]
  }, () => {
    const playBig = $(`[data-id=play-big]`);


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
        str = str.slice(0, 9);
        if (name.length > 9) {
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
              playBig.data(`[gameId]`, `${sport.CT[0].EV[0].ID}`).attr('data-game-id', `${sport.CT[0].EV[0].ID}`);
              playBig.empty().append(`<div data-game-id="${sport.CT[0].EV[0].FI}" class="block">
                <p data-game-id="${sport.CT[0].EV[0].ID}" class="font m-white ellipsis">${sport.CT[0].NA}</p>
                <p data-game-id="${sport.CT[0].EV[0].ID}" class="font white title ellipsis">${shortize(sport.CT[0].EV[0].NA.split(' v ')[0]) + ' vs ' + shortize(sport.CT[0].EV[0].NA.split(' v ')[1])}</p>
                </div>
                <div data-game-id="${sport.CT[0].EV[0].ID}" class="block">
                <p data-game-id="${sport.CT[0].EV[0].ID}" data-id="timer-big" data-tu="${sport.CT[0].EV[0].TU}" data-tm="${sport.CT[0].EV[0].TM}" data-ts="${sport.CT[0].EV[0].TS}" class="font m-white ellipsis text-right"></p>
                <p data-game-id="${sport.CT[0].EV[0].ID}" class="font white title ellipsis text-right">${sport.CT[0].EV[0].SS}</p>
                </div>`);
              startTimerBig(sport.CT[0].EV[0]);
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
          $(`[data-id=play-big]`).on('click', (event) => {
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
        });
    }
    playBig.css('overflow', 'scroll');
    done();
  });
});