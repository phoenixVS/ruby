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
        renderCoefTable(window.inplay, ID, true);
      }
      else {
        let ID = parseInt(window.inplay[0].ID);
        renderCoefTable(window.inplay, ID, true);
      }
    }

    // Shortening club name
    function shortize(name) {
      let str = name;
      if (screen.width < 350) {
        str = str.slice(0, 12);
        if (name.length > 12) {
          str += '...';
        }
        return str;
      } else if (screen.width > 350 && screen.width < 450) {
        str = str.slice(0, 16);
        if (name.length > 16) {
          str += '...';
        }
        return str;
      } else {
        str = str.slice(0, 18);
        if (name.length > 18) {
          str += '...';
        }
        return str;
      }
    }

    function renderCoefTable(data, ID, small) {
      let promise = new Promise((resolve, reject) => {
        if (small) {
          /*
          $(`[data-id=coef_table]`).append(`
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
        */}
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
                  $(`[data-id=coef-one]`).text(modifyBets(sport.CT[0].EV[0].MA[0].PA[0].OD))
                    .data('BS', `${CT[0].EV[0].MA[0].PA[0].BS}`).attr('data-BS', `${CT[0].EV[0].MA[0].PA[0].BS}`);
                  $(`[data-id=coef-two]`).text(modifyBets(sport.CT[0].EV[0].MA[0].PA[1].OD))
                    .data('BS', `${CT[0].EV[0].MA[0].PA[1].BS}`).attr('data-BS', `${CT[0].EV[0].MA[0].PA[1].BS}`);
                  $(`[data-id=coef-three]`).text(modifyBets(sport.CT[0].EV[0].MA[0].PA[2].OD))
                    .data('BS', `${CT[0].EV[0].MA[0].PA[2].BS}`).attr('data-BS', `${CT[0].EV[0].MA[0].PA[2].BS}`);
                }
                else {
                  $(`[data-id=coef-one]`).text(modifyBets(sport.CT[0].EV[0].MA[0].PA[0].OD))
                    .data('BS', `${CT[0].EV[0].MA[0].PA[0].BS}`).attr('data-BS', `${CT[0].EV[0].MA[0].PA[0].BS}`);;
                  $(`[data-id=coef-three]`).text(modifyBets(sport.CT[0].EV[0].MA[0].PA[1].OD))
                    .data('BS', `${CT[0].EV[0].MA[0].PA[1].BS}`).attr('data-BS', `${CT[0].EV[0].MA[0].PA[1].BS}`);;
                  $(`[data-id=coef-two]`).remove();
                }
              }
            });
          } else {
            console.log("ERROR: Data is undefined")
          }
        }
        else {
          let sport = data[0].TG[0].CT;
          let rowsPromise = new Promise((resolve, reject) => {
            $(`[data-id=coef_table]`).empty();
            $(`[data-id=coef_table]`).addClass('event');
            data[0].MA.forEach(ma => {
              $(`[data-id=coef_table]`).append(`
                <div data-id="row_info" data-row-status="not_active" data-coef-id="${ma.ID}" class="row info det" style="height: 50px; border-bottom: 0.5px solid black;">
                  <div class="cell">
                    <p class="font">${ma.NA}</p>
                  </div>
                </div>
                `);
            });
            resolve();
          });
          rowsPromise
            .then(response => {
              return new Promise((resolve, reject) => {
                data[0].MA.map((ma) => {
                  if (ma.DO == 1) {
                    console.log(ma.ID);
                    let cur = $(`[data-coef-id="${ma.ID}"]`);
                    cur.addClass('active');
                    cur.removeClass('not-active');
                    data[0].MA.forEach((ma) => {
                      if (ma.ID == cur.data('coefId')) {
                        let new_item = $(`<div data-id="coef_row" data-bet="${ma.ID}" class="row" style="height: auto;">
                      </div>`).hide();
                        cur.after(new_item);
                        if (ma.CO.length > 1) {
                          ma.CO.map(co => {
                            const div = document.createElement('div');
                            div.className = 'bets_column';
                            div.appendChild(titleTemplateForBets(co));
                            co.PA.map(pa => {
                              div.appendChild(forEventDataColumnTemplate(pa, co.SY, data[0].NA, ma.NA, data[0].CL));
                            });
                            new_item.append(div)
                          });
                        }
                        else {
                          ma.CO[0].PA.forEach((pa) => {
                            $(`[data-bet=${ma.ID}]`).append(`
                          <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                          <button style="padding-left: 10px;" class="button coefficient" data-eventNA="${data[0].NA}" data-cl="${data[0].CL}" data-marketNA="${ma.NA}" data-BS="${pa.BS}" data-FI="${pa.FI}" data-HA="${pa.HA}" data-HD="${pa.HD}" data-ID="${pa.ID}" data-IT="${pa.IT}" data-NA="${pa.NA}" data-OD="${pa.OD}" data-OR="${pa.OR}" data-SU="${pa.SU}" class="button coefficient" >
                            <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.N2 ? pa.N2 : pa.NA)}</span>
                            <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                          </button>
                        </div>`);
                          });
                          if (ma.CO[0].CN < ma.CO[0].PA.length) {
                            $(`[data-bet=${ma.ID}]`).children('.cell').addClass('half-w');
                          }
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
                      alignItems: 'flex-start',
                    });
                    $('[data-id=row_info]').children().css('position', 'relative');
                    cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  }
                });
                resolve();
              })
            })
            .then((resolve) => {
              const slideBetsRenderer = new Promise((resolve, reject) => {
                $(`[data-id=row_info]`).on('click', (elem) => {
                  const waitForBS = new Promise((resolve, reject) => {
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
                            ma.CO.map(co => {
                              const div = document.createElement('div');
                              div.className = 'bets_column';
                              div.appendChild(titleTemplateForBets(co));
                              co.PA.map(pa => {
                                div.appendChild(forEventDataColumnTemplate(pa, co.SY, data[0].NA, ma.NA, data[0].CL));
                              });
                              new_item.append(div)
                            });
                          }
                          else {
                            ma.CO[0].PA.forEach((pa) => {
                              $(`[data-bet=${ma.ID}]`).append(`
                          <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                          <button style="padding-left: 10px;" class="button coefficient" data-eventNA="${data[0].NA}" data-cl="${data[0].CL}" data-marketNA="${ma.NA}" data-BS="${pa.BS}" data-FI="${pa.FI}" data-HA="${pa.HA}" data-HD="${pa.HD}" data-ID="${pa.ID}" data-IT="${pa.IT}" data-NA="${pa.NA}" data-OD="${pa.OD}" data-OR="${pa.OR}" data-SU="${pa.SU}" class="button coefficient" >
                            <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.N2 ? pa.N2 : pa.NA)}</span>
                            <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                          </button>
                        </div>`);
                            });
                            if (ma.CO[0].CN < ma.CO[0].PA.length) {
                              $(`[data-bet=${ma.ID}]`).children('.cell').addClass('half-w');
                            }
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
                        alignItems: 'flex-start',
                      });
                      $('[data-id=row_info]').children().css('position', 'relative');
                      cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                    }
                    else {
                      cur.removeClass('active');
                      cur.addClass('not-active');
                      coID = cur.data('coefId');
                      $(`[data-bet=${coID}]`).slideUp(250, () => { $(`[data-bet=${coID}]`).remove(); });
                      cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
                    }
                    resolve();
                  });
                  waitForBS
                    .then(response => {
                      // $('.betslip-link').empty();
                      loadJsModules({
                        betslip_link: { loadCSS: false, loadLanguage: false }
                      });
                    });
                });
                resolve();
              });
              slideBetsRenderer
                .then(response => {
                  return new Promise((resolve, reject) => {
                    // data[0].MA.map((ma) => {
                    //   if (ma.DO == 1) {
                    //     console.log(ma.ID);
                    //     $(`div.coeficient-table.event div[data-coef-id="${ma.ID}"`).trigger('click');
                    //   }
                    // });
                    resolve();
                  });
                })
                .then((response) => {
                  loadJsModules({
                    betslip_link: { loadCSS: false, loadLanguage: false }
                  });
                });
            });
        }
      });
    }
    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };
    // Render title of the column
    titleTemplateForBets = (CO) => {
      const div = document.createElement('div');
      div.className = 'bets_title';
      div.innerHTML = `
        ${shortize(CO.NA ? ((CO.NA == ' ' ? '&nbsp;' : CO.NA)) : '&nbsp;')}
      `
      //${CO.NA && !CO.NA.includes('Count') ? CO.NA : '&nbsp;'}
      return div
    };
    // Render column for bet coef_row
    forEventDataColumnTemplate = (pa, SY, eventNA, marketNA, sport) => {
      const { NA, SU, IT, OD } = pa;
      const SU2 = (SU == 1) ? 'disabled' : '';
      const div = document.createElement('div');

      let bet = () => {
        if (SU == 9) {
          return ' ';
        }
        else {
          if (SU == 1) {
            if (OD) {
              return `<span class="fa fa-lock lock"></span>`;
            }
            else {
              return ' ';
            }
          }
          else {
            return `<p class="font down blick">${modifyBets(OD)}</p>`;
          }
        }
      };
      div.className = `maTable__cell`;
      div.innerHTML = `
      <button class="button coefficient ${SU2}" data-it="${IT}" data-eventNA="${eventNA}" data-cl="${sport}" data-marketNA="${marketNA}" data-BS="${pa.BS}" data-FI="${pa.FI}" data-HA="${pa.HA}" data-HD="${pa.HD}" data-ID="${pa.ID}" data-IT="${pa.IT}" data-NA="${pa.NA}" data-OD="${pa.OD}" data-OR="${pa.OR}" data-SU="${pa.SU}">
        <p class="font ellipsis mra"> ${shortize(NA ? NA : '')}</p>
        ${bet()}
      </button >
        `
      return div
    };
    done();
  });
});