exports('game', (params, done) => {
  insertHtmlModules({
    // ".game": [
    //   "game/game.html"
    // ]
  }, () => {
    renderEvent(window.event);
    // rendering game data
    function renderEvent(data) {
      console.log(data);
      const ev = data[0];
      const eventRenderer = new Promise((resolve, reject) => {
        if (data) {
          const gameWrapper = $(`[data-id=game]`);
          gameWrapper.empty().append(`
            <div class="[ video-title not-active ] flex-container align-center-middle">
              <button class="button square [ video-title-button ] fa fa-angle-left"></button>
              <p class="font [ video-title-text ]"><span>${ev.TE[0].NA
            + ' &nbsp;&nbsp; VS &nbsp;&nbsp; ' + ev.TE[1].NA}</span></p>
            </div>
            <div class="[ video-play ] flex-container align-middle align-justify">
              <p class="flex-container align-middle">
                <span class="[ video-play-square white ]"></span>
                <span class="font">${ev.TE[0].NA}</span>
              </p>
              <p class="font title [ video-play-count ]">${ev.SS}</p>
              <p class="flex-container align-middle">
                <span class="font">${ev.TE[1].NA}</span>
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
        })
        .catch((err) => { console.log(err); });
    }

    done();
  });
});