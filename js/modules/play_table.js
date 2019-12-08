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
/*
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
*/

    function RenderTable(JSON ,ID) {
      
      JSON.DATA.forEach(sport => {
        if(parseInt(sport.ID) == ID) {

          let mutchCounter = 0;

          for (let i = 0; i < sport.CT.length; i++) {
            
            if (mutchCounter < 20) {
              if (sport.CT[i].EV.length < 4) {
                for (let j = 0; j < sport.CT[i].EV.length; j++) {
                  $(`[data-id="play-table"]`).append('<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">' + sport.CT[i].EV[j].NA + '</p> <p class="font m-white ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat porro consectetur ratione repellendus quae assumenda ducimus totam ipsam earum quas quos ex consequatur provident repellat voluptatibus eum? Aspernatur esse.</p> </div> <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div> <p class="font m-white">' + sport.CT[i].EV[j].SS +'</p> <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>');
                  mutchCounter++;
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  $(`[data-id="play-table"]`).append('<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">' + sport.CT[i].EV[j].NA + '</p> <p class="font m-white ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat porro consectetur ratione repellendus quae assumenda ducimus totam ipsam earum quas quos ex consequatur provident repellat voluptatibus eum? Aspernatur esse.</p> </div> <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div> <p class="font m-white">' + sport.CT[i].EV[j].SS +'</p> <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>');
                  mutchCounter++;
                }
              }
              $(`[data-id="play-table"]`).append('<div class="row [ info ]"> <div class="cell"> <p class="font">' + sport.CT[i].NA + '</p> </div> <div class="cell"> <p class="font">1</p> </div> <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>');
            } else {
              break;
            }
          }
        } else {
          return true;
        }
      });
      
    }
    
    $.ajax({
      url: URL,
      success: function (data) {
        
        if (data != undefined) {
          RenderTable(data, parseInt(data.DATA[0].ID));
          
        } else {
          console.log("ERROR: Data is undefined")
        }
      }
    });

    done();
  });
});