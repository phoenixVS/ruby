exports('play_big', (params, done) => {
  insertHtmlModules({
    // ".play-big": [
    //   "main/play-big.html"
    // ]
  }, () => {
    const playBig = $(`[data-id=play-big]`);
    const URL = "http://bestline.bet/inplay/";
    (() => {
      $.ajax({
        url: URL,
        success: function (data) {

          if (data != undefined) {
            fillPlayBig(data);
            //console.log(data);
          } else {
            console.log("DATA 404")
          }
        }
      });

    })(null);

    function fillPlayBig(JSON) {
      if (JSON != undefined) {
        playBig.append(`<div class="block">
      <p class="font m-white ellipsis">${JSON.DATA[0].CT[0].NA}</p>
      <p class="font white title ellipsis">${JSON.DATA[0].CT[0].EV[0].NA}</p>
      </div>
      <div class="block">
      <p class="font m-white ellipsis text-right">00:00</p>
      <p class="font white title ellipsis text-right">${JSON.DATA[0].CT[0].EV[0].SS}</p>
      </div>`);
      } else {
        console.log("DATA 404");
      }
    }

    playBig.css('overflow', 'scroll');

    done();
  });
});