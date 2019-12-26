exports('coef_table', (params, done) => {
  insertHtmlModules({
    // ".coeficient-table": [
    //   "main/coeficient-table.html"
    // ]
  }, () => {
    let sportId = params.sportId;
    let gameId = params.gameId;

    let urlInplay = 'http://bestline.bet/inplay/',
      urlGames = 'http://212.8.249.162:81/inplay.php',
      urlBets = 'http://bestline.bet/event/?FI=';

    if (sportId === undefined && gameId === undefined) {
      httpGet(urlInplay, 'inplay');
    }
    else if (sportId != undefined) {
      httpGet(urlInplay, 'inplay');
    }
    else {
      httpGet((urlBets + gameId.toString()), 'bets');
    }

    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            let small = true;
            let ID = parseInt(data.DATA[0].ID);
            if (sportId != undefined) {
              ID = sportId;
            }
            renderCoefTable(data, ID, small);
          }
          else if (name == 'games') {
            console.log(data);
          }
          else if (name == 'bets') {
            let small = false;
            let ID = gameId;
            renderCoefTable(data, ID, small);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function renderCoefTable(data, ID, small) {
      let promise = new Promise((resolve, reject) => {
        if (small) {
          $(`[data-id=coef_table]`).empty().append(`
              <div class="row">
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font"></span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font"></span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">2</span>
                  <span data-id="coef-three" class="font"></span>
                </button>
              </div>
            </div>
            `);
          resolve();
        }
        else {
          resolve();
        }
      });
      promise.then(() => {
        if (small) {
          if (data != undefined) {
            data.DATA.forEach(sport => {
              if (parseInt(sport.ID) == ID) {
                if (ID == 1) {
                  $(`[data-id=coef-one]`).text(sport.CT[0].EV[0].MA[0].PA[0].OD.D);
                  $(`[data-id=coef-two]`).text(sport.CT[0].EV[0].MA[0].PA[2].OD.D);
                  $(`[data-id=coef-three]`).text(sport.CT[0].EV[0].MA[0].PA[1].OD.D);
                }
                else {
                  $(`[data-id=coef-one]`).text(sport.CT[0].EV[0].MA[0].PA[0].OD.D);
                  $(`[data-id=coef-three]`).text(sport.CT[0].EV[0].MA[0].PA[1].OD.D);
                  $(`[data-id=coef-two]`).remove();
                }
              }
            });
          } else {
            console.log("ERROR: Data is undefined")
          }
        }
        else {
          let sport = params.sport;
          let rowsPromise = new Promise((resolve, reject) => {
            $(`[data-id=coef_table]`).empty();
            data.RESULT.EV[0].MA.forEach((ma, i) => {
              $(`[data-id=coef_table]`).append(`
            <div data-id="row_info" data-row-status="not_active" data-coef-id="${ma.ID}" class="row info">
              <div class="cell">
                <p data-coef-id="${ma.ID}" class="font">${ma.NA}</p>
              </div>
            </div>
            `);
            });
            resolve();
            // <div data-id="coef_row-${i}" class="row">
            // </div>
            // ma.PA.forEach((pa) => {
            //   $(`[data-id=coef_row-${i}]`).append(`
            //   <div class="cell w33">
            //       <button class="button coefficient">
            //         <span class="font m-white"></span>
            //         <span class="font">${pa.OD.D}</span>
            //       </button>
            //     </div>
            // `);
            // });
          });
          rowsPromise.then((resolve) => {
            $(`[data-id=row_info]`).on('click', (elem) => {
              let cur = $(elem.target);
              if (cur.data('rowStatus') == 'not_active') {
                data.RESULT.EV[0].MA.forEach((ma) => {
                  if (ma.ID == cur.data('coefId')) {
                    let new_item = $(`<div data-id="coef_row" data-bet="${ma.ID}" class="row">
                    </div>`).hide();
                    cur.after(new_item);
                    ma.PA.forEach((pa) => {
                      $(`[data-bet=${ma.ID}]`).append(`
                      <div style="margin: auto; max-width: 2000px;" class="cell">
                      <button class="button coefficient">
                        <span class="font m-white"></span>
                        <span class="font">${pa.OD.D}</span>
                      </button>
                    </div>`);
                    });
                    new_item.show('normal');
                    RenderRows(cur.data('coefId'));
                  }
                });
                $(`[data-bet=${cur.data('coefId')}]`).css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  //alignContent: 'stretch',
                  //alignItems: 'stretch',
                });
                cur.data('rowStatus', 'active').attr('data-row-status', 'active');
              }
              else {
                $(`[data-bet=${cur.data('coefId')}]`).remove();
                cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
              }
            });
          });
          function RenderRows(ID) {
            let cur = $(`[data-bet=${ID}]`);
            switch (ID) {
              case 1777:
                console.log(`It's ${ID}`);
              default: break;
            }
          }
        }
      });
    }
    done();
  });
});  