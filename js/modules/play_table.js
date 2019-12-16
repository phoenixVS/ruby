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

    httpGet(urlInplay, 'inplay');
    function renderTable(data, ID) {
      let promise = new Promise((resolve, reject) => {
        data.DATA.forEach(sport => {
          if (parseInt(sport.ID) == ID) {
            if (sport.ID == 1) {
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
                      <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white">87:03</p> </div> </div> </div> 
                      <div class="cell">
                        <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[0].OD.F}</button> </div> 
                      <div class="cell"> 
                        <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[1].OD.F}</button>
                      </div> 
                      <div class="cell">
                        <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[2].OD.F}</button> 
                      </div>
                    </div>`);
                  $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
                <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
                <div class="cell"> <p class="font">1</p> </div> 
                <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
                }
              }
            }
            else {
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
                      <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white">87:03</p> </div> </div> </div> 
                      <div class="cell">
                        <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[0].OD.F}</button> </div> 
                      <div class="cell"> 
                        <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[1].OD.F}</button>
                      </div> 
                    </div>`);
                  $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
                <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
                <div class="cell"> <p class="font">1</p> </div> 
                <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
                }
              }
            }
          }
          else {
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
            console.log(window.location.href.split('#')[0]);
            //if filter is active - remove it from hash
            if (window.location.hash.split('/')[1] == 'filer') {
              console.log(window.location.href.split('#')[0]);
              window.location.hash = '';
              window.location.href += `/event/${id}`;
            }
            else {
              if (window.location.hash == '#') {
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
        });
    }
  });
});