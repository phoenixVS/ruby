exports('coef_table', (params, done) => {
  insertHtmlModules({
    // ".coeficient-table": [
    //   "main/coeficient-table.html"
    // ]
  }, () => {
    const filtered = params.filtered; // is filter active
    const expand = params.expand;     // is event expanded
    const ID = params.gameId;         // id of sport to handle

    if (expand) {
      renderCoefTable(window.event, null, false);
    }
    else {
      if (filtered) {
        let ID = params.sportId;
        console.log(ID);
        renderCoefTable(window.inplay, ID, true);
      }
      else {
        let ID = parseInt(window.inplay[0].ID);
        renderCoefTable(window.inplay, ID, true);
      }
    }

    function renderCoefTable(data, ID, small) {
      let promise = new Promise((resolve, reject) => {
        if (small) {
          $(`[data-id=coef_table]`).empty().append(`
              <div class="row">
              <div class="cell w33" >
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font"></span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font"></span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient" style="padding-left: 10px;">
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
            data.forEach(sport => {
              if (parseInt(sport.ID) == ID) {
                if (ID == 1) {
                  $(`[data-id=coef-one]`).text(sport.CT[0].EV[0].MA[0].PA[0].OD);
                  $(`[data-id=coef-two]`).text(sport.CT[0].EV[0].MA[0].PA[1].OD);
                  $(`[data-id=coef-three]`).text(sport.CT[0].EV[0].MA[0].PA[2].OD);
                }
                else {
                  $(`[data-id=coef-one]`).text(sport.CT[0].EV[0].MA[0].PA[0].OD);
                  $(`[data-id=coef-three]`).text(sport.CT[0].EV[0].MA[0].PA[1].OD);
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
            <div data-id="row_info" data-row-status="not_active" data-coef-id="${ma.ID}" class="row info det" style="height: 50px; border-bottom: 0.5px solid black;">
              <div class="cell">
                <p data-coef-id="${ma.ID}" class="font">${ma.NA}</p>
              </div>
            </div>
            `);
            });
            resolve();
          });
          rowsPromise.then((resolve) => {
            $(`[data-id=row_info]`).on('click', (elem) => {
              let cur = $(elem.target);

              if (cur.is('p')) {
                cur = cur.parent().parent();
              }
              if (cur.data('rowStatus') == 'not_active') {
                cur.addClass('active');
                cur.removeClass('not-active');
                data.RESULT.EV[0].MA.forEach((ma) => {
                  if (ma.ID == cur.data('coefId')) {
                    let new_item = $(`<div data-id="coef_row" data-bet="${ma.ID}" class="row" style="height: auto;">
                    </div>`).hide();
                    cur.after(new_item);
                    ma.PA.forEach((pa) => {
                      $(`[data-bet=${ma.ID}]`).append(`
                      <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                      <button style="padding-left: 10px;" class="button coefficient">
                        <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${pa.NA}</span>
                        <span class="font">${pa.OD.D}</span>
                      </button>
                    </div>`);
                    });
                    new_item.show('normal');
                    RenderRows(cur.data('coefId'), ma);
                  }
                });
                $('[data-id=row_info]').css('position', 'relative');
                $(`[data-bet=${cur.data('coefId')}]`).css({
                  position: 'relative',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                });
                $('[data-id=row_info]').children().css('position', 'relative');
                cur.data('rowStatus', 'active').attr('data-row-status', 'active');
              }
              else {
                cur.removeClass('active');
                cur.addClass('not-active');
                $(`[data-bet=${cur.data('coefId')}]`).remove();
                cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
              }
            });
          });
          function RenderRows(ID, ma) {
            let cur = $(`[data-bet=${ID}]`);
            let betNames = $(`[data-id=bet_name_${ID}]`);
            console.log(ID);
            switch (ID) {
              case 1777:
                betNames.eq(0).html(`1`);
                betNames.eq(1).html(`X`);
                betNames.eq(2).html(`2`); break;
              case 10115:
                betNames.eq(0).html(`1X`);
                betNames.eq(1).html(`X2`);
                betNames.eq(2).html(`12`); break;
              case 10161:
                betNames.eq(0).html(`1`);
                betNames.eq(1).html(`X`);
                betNames.eq(2).html(`2`); break;
              case 1778:
                betNames.eq(0).html(`1`);
                betNames.eq(2).html(`2`); break;
              case 10124: break;
              case 10568: break;
              case 10147:
                betNames.eq(0).html(`1`);
                betNames.eq(1).html(`2`); break;
              case 50281:
                betNames.each((elem) => {
                  console.log(elem);
                });
              // betNames.forEach((elem) => {
              //   console.log(elem);
              // });
              //betNames.eq(0).html(`${ma.PA[0].HA}`);
              //betNames.eq(1).html(`${ma.PA[1].HA}`);
              //betNames.eq(2).html(`${ma.PA[2].HA}`);
              //betNames.eq(3).html(`${ma.PA[3].HA}`);
              //betNames.eq(4).html(`${ma.PA[4].HA}`);
              //betNames.eq(5).html(`${ma.PA[5].HA}`);
              //betNames.eq(6).html(`${ma.PA[6].HA}`);
              //betNames.eq(7).html(`${ma.PA[7].HA}`); break;
              default: break;
            }
          }
        }
      });
    }
    done();
  });
});