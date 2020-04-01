exports('live', (params, done) => {
  $('.live').empty();
  insertHtmlModules({
    ".live": [
      "main/live.html"
    ]
  },
    () => {
      let ID = params.sportId;
      let count = 0;
      if (typeof ID !== 'undefined') {
        let index = 0;
        for (sport of window.inplay) {
          if (sport.ID == ID) {
            break;
          }
          index++;
        }
        window.inplay[index].CT.reduce((counter, currentValue) => {
          currentValue.EV.reduce((counter, currentValue) => {
            count++;
          }, 0);
        }, 0);
        $('.live-title span.font.mr').text(`${count} EVENTS`);
      }
      else {
        window.inplay[0].CT.reduce((counter, currentValue) => {
          currentValue.EV.reduce((counter, currentValue) => {
            count++;
          }, 0);
        }, 0);
        $('.live-title span.font.mr').text(`${count} EVENTS`);
      }
      setTimeout(() => {
        console.log(`live-title length: `, $('.live-title').length);
        if ($('.live-title').length > 1) {
          $(`[data-id=live] .live-title:last-child`).remove();
        }
      }, 100)
      done();
    });
});