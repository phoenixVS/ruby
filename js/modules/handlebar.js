exports("handlebar", () => {
    $(document.body).ready(() => {
        window.onhashchange = locationHashChanged;
        locationHashChanged();
    });
});

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function emptyHandler() {
    // loading modules for main view
    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
            slider: { loadCSS: false, loadLanguage: false },
            play_big: { loadCSS: false, loadLanguage: false },
            coef_table: { loadCSS: false, loadLanguage: false },
            live: { loadCSS: false, loadLanguage: false },
            play_table: { loadCSS: false, loadLanguage: false },
            betslip_link: { loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            // video lurk
            let video = $(`[data-id=video]`);
            if (video.data(`display`) === 'none') {
                video.css('display', 'none');
            }
            else {
                video.data(`display`, 'none').attr('data-display', 'none');
                video.css('display', 'none');
            }
            // betslip lurk
            let betslip = $(`[data-id=betslip]`);
            if (betslip.data(`display`) === 'none') {
                betslip.css('display', 'none');
            }
            else {
                betslip.data(`display`, 'none').attr('data-display', 'none');
                betslip.css('display', 'none');
            }
            // betslip lurk
            let betslip_small = $(`[data-id=betslip-small]`);
            if (betslip_small.data(`display`) === 'none') {
                betslip_small.css('display', 'none');
            }
            else {
                betslip_small.data(`display`, 'none').attr('data-display', 'none');
                betslip_small.css('display', 'none');
            }
            // betslip-link lurk
            let betslip_link = $(`[data-id=betslip-link]`);
            if (betslip_link.data(`display`) === 'none') {
                betslip_link.css('display', 'none');
            }
            else {
                betslip_link.data(`display`, 'none').attr('data-display', 'none');
                betslip_link.css('display', 'none');
            }
        },
        error => {
            console.log(`modules haven't been loaded :_( \n
                and everthing because of: ${error}`);
        });
}
    let json_data;

    $.ajax({
        url: 'http://bestline.bet/inplay/',
        success: function (data) {
      
        if (data != undefined) {
            json_data = data;
            return json_data;        
        } else {
            console.log("ERROR: Data is undefined")
            return 0;
        }
        }
    });

// filters from slider
function filterHandler(json, ID) {

    $(`[data-id="play-table"]`).empty();
    json.DATA.forEach(sport => {
        if (parseInt(sport.ID) == ID) {

          let mutchCounter = 0;

          for (let i = 0; i < sport.CT.length; i++) {

            if (mutchCounter < 20) {
              if (sport.CT[i].EV.length < 4) {
                for (let j = 0; j < sport.CT[i].EV.length; j++) {
                  $(`[data-id="play-table"]`).append(`
                  <div class="row">
                   <div class="cell">
                   <div class="[ play-link ]"> 
                   <div class="[ play-link-block ]"> 
                   <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
                   <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
                  </div> 
                   <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div> <p class="font m-white">'${sport.CT[i].EV[j].SS}'</p> 
                   <p class="font m-white">87:03</p> </div> </div> </div> 
                   <div class="cell"> 
                   <button class="button coefficient">1/1</button> </div> 
                   <div class="cell"> 
                   <button class="button coefficient">1/1</button> </div> 
                   <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>`);
                  mutchCounter++;
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  $(`[data-id="play-table"]`).append(`<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">'${sport.CT[i].EV[j].NA}'</p> <p class="font m-white ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat porro consectetur ratione repellendus quae assumenda ducimus totam ipsam earum quas quos ex consequatur provident repellat voluptatibus eum? Aspernatur esse.</p> </div>
                   <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div>
                   <p class="font m-white">'${sport.CT[i].EV[j].SS}'</p>
                   <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> 
                  <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>`);
                  mutchCounter++;
                }
              }
              $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
              <div class="cell"> <p class="font">'${sport.CT[i].NA} '</p> </div> 
              <div class="cell"> <p class="font">1</p> </div> 
              <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
            } else {
              break;
            }
          }
        } else {
          return true;
        }
      });

}

// game video player page load
function gameHandler() {
    console.log('game');
    const gameWrapper = $('[data-id=game]');

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            game: { loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            gameWrapper.data(`display`, 'true');
            // betslip lurk
            let betslip = $(`[data-id=betslip]`);
            if (betslip.data(`display`) === 'none') {
                betslip.css('display', 'none');
            }
            else {
                betslip.data(`display`, 'none').attr('data-display', 'none');
                betslip.css('display', 'none');
            }
            // betslip small lurk
            let betslip_small = $(`[data-id=betslip-small]`);
            if (betslip_small.data(`display`) === 'none') {
                betslip_small.css('display', 'none');
            }
            else {
                betslip_small.data(`display`, 'none').attr('data-display', 'none');
                betslip_small.css('display', 'none');
            }
            // paly-table lurk
            let play_table = $(`[data-id=play-table]`);
            if (play_table.data(`display`) === 'none') {
                play_table.css('display', 'none');
            }
            else {
                play_table.data(`display`, 'none').attr('data-display', 'none');
                play_table.css('display', 'none');
            }
            // betslip-link lurk
            let betslip_link = $(`[data-id=betslip-link]`);
            if (betslip_link.data(`display`) === 'none') {
                betslip_link.css('display', 'none');
            }
            else {
                betslip_link.data(`display`, 'none').attr('data-display', 'none');
                betslip_link.css('display', 'none');
            }
        },
        error => {
            console.log(`modules haven't been loaded :_( \n
        and everthing because of: ${error}`);
        });
}

function betslipHandler() {

}

function betslip_smallHandler() {

}

function locationHashChanged() {
    let hash = window.location.hash.split('/');
    switch (hash[1]) {
        case 'filter': filterHandler(json_data, window.location.hash.substr(9)); break;
        case 'game': gameHandler(); break;
        case 'betslip': betslipHandler(); break;
        case 'betslip-small': betslip_smallHandler(); break;
        default: emptyHandler(); break;
    }
}