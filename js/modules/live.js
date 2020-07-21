exports('live', (params, done) => {
  $('.live').empty();
  insertHtmlModules({
    ".live": [
      "main/live.html"
    ]
  },
    () => {
      let ID = params.sportId;
      let eventsCount = 0;
      let index = 0;
      if (typeof ID !== 'undefined') {
        for (sport of window.inplay) {
          if (sport.id == ID) {
            break;
          }
          index++;
        }
      }
      window.currentView?.categories.forEach(category => {
        category.leagues.forEach(league => {
          league.events?.forEach(event => {
            eventsCount++;
          }, 0);
        }, 0);
      }, 0);
      $('.live-title span.font.mr').text(`${eventsCount} EVENTS`);
      setTimeout(() => {
        console.log(`live-title length: `, $('.live-title').length);
        if ($('.live-title').length > 1) {
          $(`[data-id=live] .live-title:last-child`).remove();
        }
      }, 10)
      done();
    });
});