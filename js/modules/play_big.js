exports('play_big', (params, done) => {
  insertHtmlModules({
    // ".play-big": [
    //   "main/play-big.html"
    // ]
  }, () => {
    const playBig = $(`[data-id=play-big]`);


    let curID = params.sportId;

    let urlInplay = 'http://bestline.bet/inplay/',
      urlGames = 'http://212.8.249.162:81/inplay.php',
      urlBets = 'http://bestline.bet/event/?FI=';
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            if (curID === undefined) {
              ID = parseInt(data.DATA[0].ID);
            }
            else {
              ID = curID;
            }
            fillPlayBig(data, ID);
          }
          else if (name == 'games') {
            console.log(data);
          }
          else if (name == 'bets') {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    httpGet(urlInplay, 'inplay');

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



    function fillPlayBig(data, ID) {
      let promise = new Promise((resolve, reject) => {
        if (data != undefined) {
          let id = parseInt(ID);
          data.DATA.forEach(sport => {
            if (parseInt(sport.ID) == ID) {
              playBig.data(`[gameId]`, `${sport.CT[0].EV[0].FI}`).attr('data-game-id', `${sport.CT[0].EV[0].FI}`);
              playBig.empty().append(`<div data-game-id="${sport.CT[0].EV[0].FI}" class="block">
                <p data-game-id="${sport.CT[0].EV[0].FI}" class="font m-white ellipsis">${sport.CT[0].NA}</p>
                <p data-game-id="${sport.CT[0].EV[0].FI}" class="font white title ellipsis">${sport.CT[0].EV[0].NA}</p>
                </div>
                <div data-game-id="${sport.CT[0].EV[0].FI}" class="block">
                <p data-game-id="${sport.CT[0].EV[0].FI}" data-id="timer-big" data-tu="${sport.CT[0].EV[0].TU}" data-tm="${sport.CT[0].EV[0].TM}" data-ts="${sport.CT[0].EV[0].TS}" class="font m-white ellipsis text-right"></p>
                <p data-game-id="${sport.CT[0].EV[0].FI}" class="font white title ellipsis text-right">${sport.CT[0].EV[0].SS}</p>
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
            let sport = ID;
            let curURL = window.location.href;
            //if filter is active - remove it from hash
            if (window.location.hash.split('/')[1] == 'filter') {
              window.location.hash = '';
              window.location.href += `/event/${sport}/${id}`;
            }
            else {
              if (curURL.includes('#')) {
                window.location.href += `/event/${sport}/${id}`;
              }
              else {
                window.location.href += `#/event/${sport}/${id}`;
              }
            }
          });
        });
    }
    playBig.css('overflow', 'scroll');
    done();
  });
});