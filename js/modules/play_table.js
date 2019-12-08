exports('play_table', (params, done) => {
  insertHtmlModules({
    ".play-table": [
      "play-table/play-table.html"
    ]
  }, () => {

    const rows = $('.play-table .row');
    (() => {
      rows.on('click', () => {

      });
    })(0);

    const URL = "http://bestline.bet/inplay/";

    function fillPlayTable(JSON) {

      if(JSON != undefined) {
        for (let i = 0; i < JSON.DATA.length; i++) {
          for (let j = 0; j < 4; j++) {
            if (JSON.DATA[i].CT[0].EV[j] != undefined) {
              $(`[data-id="play-table"]`).append('<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">' + JSON.DATA[i].CT[0].EV[j].NA + '</p> <p class="font m-white ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat porro consectetur ratione repellendus quae assumenda ducimus totam ipsam earum quas quos ex consequatur provident repellat voluptatibus eum? Aspernatur esse.</p> </div> <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div> <p class="font m-white">1 - 0</p> <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>');            
            } else {
              break;
            }
          }
        }
        
       //console.log(JSON.DATA[0].CT[0].EV[0].NA);
      } else {
        console.log("ERROR: Data is undefined");
      }
    }

    $.ajax({
      url: URL,
      success: function (data) {
        
        if (data != undefined) {
          fillPlayTable(data);
          //console.log(data);
        } else {
          console.log("ERROR: Data is undefined")
        }
      }
    });

    done();
  });
});