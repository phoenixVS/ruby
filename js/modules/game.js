exports('game', (params, done) => {
  insertHtmlModules({
    // ".game": [
    //   "game/game.html"
    // ]
  }, () => {
    let ID = params.gameId;
    let urlInplay = 'http://bestline.bet/inplay/',
      urlBets = 'http://bestline.bet/event/?FI=';
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            console.log(data);
          }
          else if (name == 'games') {
            console.log(data);
          }
          else if (name == 'bets') {
            renderEvent(data, ID);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(`On request: ${urlBets}`);
        })
    }

    // httpGet(urlInplay, 'inplay');
    httpGet((urlBets + ID.toString()), 'bets');
    // rendering game data
    function renderEvent(data, ID) {
      if (data) {
        let gameWrapper = $(`[data-id=game]`);
        gameWrapper.append(`
        <div class="[ video-title not-active ] flex-container align-center-middle">
          <button class="button square [ video-title-button ] fa fa-angle-left"></button>
          <p class="font [ video-title-text ]"><span>${data.RESULT.EV[0].NA.split(' v ')[0] + ' - ' + data.RESULT.EV[0].NA.split(' v ')[1]}</span></p>
        </div>
        <div class="[ video-play ] flex-container align-middle align-justify">
          <p class="flex-container align-middle">
            <span class="[ video-play-square white ]"></span>
            <span class="font">${data.RESULT.EV[0].NA.split(' v ')[0]}</span>
          </p>
          <p class="font title [ video-play-count ]">${data.RESULT.EV[0].SS}</p>
          <p class="flex-container align-middle">
            <span class="font">${data.RESULT.EV[0].NA.split(' v ')[0]}</span>
            <span class="[ video-play-square red ]"></span>
          </p>
        </div>
        <div class="[ video-body ]"></div>
        `);
      }
    }

    done();
  });
});