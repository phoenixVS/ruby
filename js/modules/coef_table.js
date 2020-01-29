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
          console.log(data);
          let sport = data[0].TG[0].CT;
          let rowsPromise = new Promise((resolve, reject) => {
            $(`[data-id=coef_table]`).empty();
            data[0].MA.forEach(ma => {
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
                data[0].MA.forEach((ma) => {
                  if (ma.ID == cur.data('coefId')) {
                    let new_item = $(`<div data-id="coef_row" data-bet="${ma.ID}" class="row" style="height: auto;">
                    </div>`).hide();
                    cur.after(new_item);
                    if (ma.CO.length > 1) {
                      CO.map(co => {
                        const div = document.createElement('div');
                        div.className = 'bets_column';
                        div.appendChild($(`${((co.NA) && (!co.NA.includes('Count'))) ? CO.NA : ''}`));
                        co.PA.map(pa => {
                          div.appendChild(this.forEventDataColumnTemplate(pa));
                        });
                        $(`[data-bet=${ma.ID}]`).appendChild(div);
                      });
                    }
                    else {
                      ma.CO[0].PA.forEach((pa) => {
                        $(`[data-bet=${ma.ID}]`).append(`
                        <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                        <button style="padding-left: 10px;" class="button coefficient">
                          <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${pa.NA}</span>
                          <span class="font">${pa.OD}</span>
                        </button>
                      </div>`);
                      });
                    }
                    new_item.slideDown('fast');
                    //RenderRows(cur.data('coefId'), ma);
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
                $(`[data-bet=${cur.data('coefId')}]`).slideUp('normal').remove();
                cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
              }
            });
          });
        }
      });
    }
    forEventDataColumnTemplate = (data) => {
      const { NA, SU, IT, OD } = data;
      const SU2 = (SU == 1) ? 'disabled' : '';
      const div = document.createElement('div');

      div.className = `maTable__cell`;
      div.innerHTML = `
      <button class="button coefficient ${SU2}" data-it="${IT}">
        <p class="font ellipsis mra"> ${NA ? NA : ''}</p>
        ${SU == 1 ? `<span class="fa fa-lock lock"></span>` : `<p class="font down blick">${this.modifyBets(OD)}</p>`}
      </button>		
  `
      return div
    };
    done();
  });
});