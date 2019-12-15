exports('play_table', (params, done) => {
  insertHtmlModules({
    // ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, () => {

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
            renderTable(data, ID);
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
      setInterval(function() {
        $(`[data-id=play-table]`).forEach(element => {
          if (element.data("dc") == 1) {
            if (data[i].TT == 0) {
              $(`[data-timer=${data[i].FI}]`).text("Break");
            } else {
              if (data[i].TM == 0) {
    
                let tu = $(`[data-timer=${data[i].FI}]`).data("tu");
                let etu = tu.toString();
    
                let years = etu.substring(0, 4),
                  month = etu.substring(4, 6),
                  day = etu.substring(6, 8),
                  hours = etu.substring(8, 10),
                  minute = etu.substring(10, 12),
                  second = etu.substring(12, 14);
    
                $(`[data-timer=${data[i].FI}]`).data("tm", minute);
                $(`[data-timer=${data[i].FI}]`).data("ts", second);
    
                let interval = setInterval(function () {
    
                  let tm = parseInt($(`[data-timer=${data[i].FI}]`).data("tm"));
                  let ts = parseInt($(`[data-timer=${data[i].FI}]`).data("ts"));
    
                  if (ts == 59) {
                    tm = tm + 1;
                    ts = 0;
                  } else {
                    ts = ts + 1;
                  }
    
                  $(`[data-timer=${data[i].FI}]`).text(createTimerInplay(tm, ts));
    
                  $(`[data-timer=${data[i].FI}]`).data("tm", tm);
                  $(`[data-timer=${data[i].FI}]`).data("ts", ts);
                }, 1000);
              } else {
                let interval = setInterval(function () {
                  let tm = parseInt($(`[data-timer=${data[i].FI}]`).data("tm"));
                  let ts = parseInt($(`[data-timer=${data[i].FI}]`).data("ts"));
    
                  if (ts == 59) {
                    tm = tm + 1;
                    ts = 0;
                  } else {
                    ts = ts + 1;
                  }
    
                  $(`[data-timer=${data[i].FI}]`).text(createTimerInplay(tm, ts));
    
                  $(`[data-timer=${data[i].FI}]`).data("tm", tm);
                  $(`[data-timer=${data[i].FI}]`).data("ts", ts);
                }, 1000);
              }
            }
          } else {
            $(`[data-timer=${data[i].FI}]`).text("Match has no time ");
          }
        });
      }, 1000);
    }

    httpGet(urlInplay, 'inplay');
    function renderTable(data, ID) {
      //window.intervalCount = 0;
      //window.intervals = new Array();
      let promise = new Promise((resolve, reject) => {
        data.DATA.forEach(sport => {
          if (parseInt(sport.ID) == ID) {

            for (let i = 0; i < sport.CT.length; i++) {
              for (let j = 0; j < sport.CT[i].EV.length; j++) {
                $(`[data-id="play-table"]`).append(`
                    <div class="row">
                    <div class="cell" data-game-id="${sport.CT[i].EV[j].FI}" data-id="event">
                    <div data-class="play-link" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link ]">
                      <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ]"> 
                        <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
                        <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
                      </div> 
                    <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ] text-right"> <div data-game-id="${sport.CT[i].EV[j].FI}" class="sport-icon play"></div> <p data-game-id="${sport.CT[i].EV[j].FI}" data-class="play-link" class="font m-white">${sport.CT[i].EV[j].SS}</p> 
                      <p data-timer="${sport.CT[i].EV[j].FI}" data-game-id="${sport.CT[i].EV[j].FI}" data-tu="${sport.CT[i].EV[j].TU}" data-tm="${sport.CT[i].EV[j].TM}" data-ts="${sport.CT[i].EV[j].TS}" class="font m-white">87:03</p> </div> </div> </div> 
                      <div class="cell">
                        <button class="button coefficient" data-class="play-link">1/1</button> </div> 
                      <div class="cell"> 
                        <button class="button coefficient" data-class="play-link">1/1</button>
                      </div> 
                      <div class="cell">
                        <button class="button coefficient" data-class="play-link">1/1</button> 
                      </div>
                    </div>`);
                    //startTimerInplay(sport.CT[i].EV[j], sport.CT[i].EV[j].FI);
              }
              $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
                <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
                <div class="cell"> <p class="font">1</p> </div> 
                <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
            }

            //startTimerInplay(sport.CT[i].EV);
          } else {
            return true;
          }
        });
        resolve();
      });

      promise
        .then(() => {
          // Handle opening of game section
          $(`[data-id=event]`).on('click', (event) => {
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
          // Preloader finishes
          const preloader = $('#page-preloader');
          if (preloader.data(`status`) != 'done') {
            preloader.addClass('done');
            preloader.data(`status`, 'done').attr('data-status', 'done');
          }
        });
    }
  });
});