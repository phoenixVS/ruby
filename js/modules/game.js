exports('game', (params, done) => {
  insertHtmlModules({
    // ".game": [
    //   "game/game.html"
    // ]
  }, () => {
    // Shortening club name
    function shortize(name) {
      let str = name;
      if (screen.width < 400) {
        str = str.slice(0, 10);
        if (name.length > 10) {
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

    renderEvent(window.event);
    // rendering game data
    function renderEvent(data) {
      const ev = data[0];
      const eventRenderer = new Promise((resolve, reject) => {
        if (data) {
          const gameWrapper = $(`[data-id=game]`);
          gameWrapper.empty().append(`
            <div class="[ video-title not-active ] flex-container align-center-middle" >
              <button class="button square [ video-title-button ] fa fa-angle-left"></button>
              <p class="font [ video-title-text ] bet-title"><span>${shortize(ev.TE[0].NA)
            + ' &nbsp;&nbsp; VS &nbsp;&nbsp; ' + shortize(ev.TE[1].NA)}</span></p>
            </div>
            <div class="[ video-play ] flex-container align-middle align-justify">
              <p class="flex-container align-middle">
                <span class="[ video-play-square white ]"></span>
                <span class="font">${shortize(ev.TE[0].NA)}</span>
              </p>
              <p class="font title [ video-play-count ]">${ev.SS}</p>
              <p class="flex-container align-middle">
                <span class="font">${shortize(ev.TE[1].NA)}</span>
                <span class="[ video-play-square red ]"></span>
              </p>
            </div>
            <div class="[ video-body ]"></div>
            `);
          resolve();
        }
        else {
          throw new Error(`Error: Data not found`);
        }
      });
      eventRenderer
        .then(() => {
          // Preloader finishes
          const preloader = $('#page-preloader');
          if (preloader.data(`status`) != 'done') {
            preloader.addClass('done');
            preloader.data(`status`, 'done').attr('data-status', 'done');
          }
          // Move back button
          $('.video-title-button').on('click', () => { window.location.hash = ''; });

          // Event switcher
          $('.bet-title').on('click', (event) => {

          });
        })
        .catch((err) => { console.log(err); });
    }

    done();
  });
});