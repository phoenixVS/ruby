exports('coef_table', (params, done) => {
  insertHtmlModules({
    // ".coeficient-table": [
    //   "main/coeficient-table.html"
    // ]
  }, () => {
    let curID = params.sportID;
    let urlInplay = 'http://bestline.bet/inplay/',
      urlGames = 'http://212.8.249.162:81/inplay.php',
      urlBets = 'http://bestline.bet/event/?FI=';
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            let small = true;
            if (curID === undefined) {
              ID = parseInt(data.DATA[0].ID);
            }
            else {
              small = false;
              ID = curID;
            }
            renderCoefTable(data, ID, small);
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
    // httpGet(urlBets, 'bets');
    // httpGet(urlGames, 'games');

    function renderCoefTable(data, ID, small) {
      let promise = new Promise((resolve, reject) => {
        if (small) {

          if (data != undefined) {

            $(`[data-id=coef_table]`).empty().append(`
              <div class="row">
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font">9.50</span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font">6.00</span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">2</span>
                  <span data-id="coef-three" class="font">2.75</span>
                </button>
              </div>
            </div>
            `);
            $(`[data-id=coef-one]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[0].OD.D);
            $(`[data-id=coef-two]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[2].OD.D);
            $(`[data-id=coef-three]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[1].OD.D);

          } else {
            console.log("ERROR: Data is undefined")
          }

        }
        else {
          $(`[data-id=coef_table]`).empty();
          console.log(`AAAAAAAAAAAAAAAAAAAAAAAa`);
          // data.DATA.forEach(sport => {
          //   if (parseInt(sport.ID) == ID) {

          //   }
          // }
        }
        resolve();
      });

      promise.then(() => { });
    }
    done();
  });
});  