exports('play_big', (params, done) => {
    insertHtmlModules({
      // ".play-big": [
      //   "main/play-big.html"
      // ]
    }, () => {
      const playBig = $(`[data-id=play-big]`);
  
  
      let curID = params.sportID;
  
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
      // httpGet(urlBets, 'bets');
      // httpGet(urlGames, 'games');
  
  
      function TimerBig() {
  
        let tmCurrent = parseInt($(`[data-id="timer-big"]`).text().split(':')[0]),
          tsCurrent = parseInt($(`[data-id="timer-big"]`).text().split(':')[1]);
  
        let tm, ts;
        if (tsCurrent == 59) {
          tm = tmCurrent + 1;
          ts = 0;
        } else {
          tm = tmCurrent;
          ts = tsCurrent + 1;
        }
  
        if (tm < 9) {
          tm = '0' + tm;
        }
  
        if (ts < 9) {
          ts = '0' + ts;
        }
  
        $(`[data-id="timer-big"]`).text(tm + ':' + ts);
      }
  
  
  
      function fillPlayBig(data, ID) {
        if (data != undefined) {
          let id = parseInt(ID);
          data.DATA.forEach(sport => {
            if (parseInt(sport.ID) == ID) {
              playBig.data(`[gameId]`, `${sport.CT[0].EV[0].FI}`).attr('data-game-id', `${sport.CT[0].EV[0].FI}`);
              playBig.append(`<div data-game-id="${sport.CT[0].EV[0].FI}" class="block">
            <p data-game-id="${sport.CT[0].EV[0].FI}" class="font m-white ellipsis">${sport.CT[0].NA}</p>
            <p data-game-id="${sport.CT[0].EV[0].FI}" class="font white title ellipsis">${sport.CT[0].EV[0].NA}</p>
            </div>
            <div data-game-id="${sport.CT[0].EV[0].FI}" class="block">
            <p data-game-id="${sport.CT[0].EV[0].FI}" data-id="timer-big" class="font m-white ellipsis text-right">00:00</p>
            <p data-game-id="${sport.CT[0].EV[0].FI}" class="font white title ellipsis text-right">${sport.CT[0].EV[0].SS}</p>
            </div>`);
              setInterval(TimerBig, 1000);
            }
          });
        } else {
          console.log("Oops, 404");
        }
  
        TimerBig(0, 0);
      }
  
      if (intervalCounter != 1) {
        setInterval(TimerBig, 1000);
        intervalCounter = 1;
      }
      playBig.css('overflow', 'scroll');
  
      // Handle opening of game section
      $(`[data-id=play-big]`).on('click', (event) => {
        let id = $(event.target).data('gameId');
        let curURL = window.location.href;
        //if filter is active - clean it
        if (window.location.hash.split('/')[1] == 'filer') {
          window.location.href = window.location.href.split('#')[0];
          window.location.href += `#/event/${id}`;
        }
        else {
          window.location.href += `#/event/${id}`;
        }
      });
  
      done();
    });
  });