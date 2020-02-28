exports('prematch_event', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');

  $('.prematch').empty();

  insertHtmlModules({
    '.prematch': [
      'prematch/prematch_event.html',
    ]
  }, () => {

    const PD = params.PD;
    const CT = params.CT;

    function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }
    let url = 'http://bestline.bet/sports/?PD=';
    url += PD;

    httpGet(url, 'prematch');
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'prematch') {
            const tree = growTree(data);
            renderPrematch(tree);
          }
          else {
            throw new Error('Uncorrect handler name.');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function growTree(data) {
      let curMA = '';
      let curMG = '';
      let tree = [];
      tree.MG = [];
      data.map((item, index) => {
        if (item.type === 'CL') {
          tree.push(item);
        }
        else {
          if (item.type === 'EV') {
            tree.push(item);
          }
          else {
            if (item.type === 'MG') {
              tree.MG.push(item);
              curMG = item;
              curMG.MA = [];
            }
            else {
              if (item.type === 'MA') {
                curMG.MA.push(item);
                curMA = item;
                curMA.PA = [];
              }
              else {
                if (item.type === 'PA') {
                  curMA.PA.push(item);
                }
              }
            }
          }
        }
      });
      return tree;
    }

    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };

    function transformDay(str) {
      if (str) {
        const year = str.substring(0, 4);
        const month = str.substring(4, 6);
        const day = str.substring(6, 8);
        let time = str.substring(8, 12);
        const ls2lt = time.substring(0, 2);
        time = time.replace(ls2lt, `${ls2lt}: `)

        /* const date = ${time} ${month}/${day};*/
        const date = `${time}`;
        const dt = new Date(year, month, day).getTime();

        return [date, dt]
      } else {
        return ''
      }
    };

    function renderPrematch(data) {
      let render = new Promise((resolve, reject) => {
        console.dir(data);
        $('.prematch-title .sport-name').text(data[1].TB.split(',')[0] + ' / ');
        $('.prematch-title .league').text(data[1].TB.split('#¬')[1].split(',')[0]);
        $('.event-name').text(' / ' + data[1].TB.split('#¬')[2].split(',')[0]);

        data.MG.forEach((mg) => {
          if (mg.SY == 'cm') {
            mg.MA.forEach(item => {
              $('.prematch-table-title').append(`
              <div class="item" data-id="${item.ID}" data-pd="${item.PD}">${item.NA}</div>
            `);
            });
          }
        });
        $('.prematch-table-title .item:first-child').addClass('selected');
        for (mg of data.MG) {
          if (mg.N2 == 'Start Time') {
            document.querySelector('.event-date').innerText = new Date(transformDay(mg.BC)[1]).toDateString();
            break;
          }
        }

        // coef-table
        $(`[data-id=coef_table]`).addClass('event');
        data.MG.forEach((mg, i) => {
          if (i > 1) {
            $('.prematch-table .coeficient-table').append(`
                  <div data-id="row_info" data-row-status="not_active" data-coef-id="${mg.IT}" class="row info det" style="height: 50px; border-bottom: 0.5px solid black;">
                    <div class="cell">
                      <p class="font">${mg.NA}</p>
                    </div>
                  </div>
              `);
          }
        });
        resolve();
      });
      render
        .then(
          response => {
            return new Promise((resolve, reject) => {
              data.MG.forEach((mg, i) => {
                if (mg.DO == 1 && i > 1) {
                  const cur = $(`[data-coef-id="${mg.IT}"]`);
                  cur.addClass('active');
                  cur.removeClass('not-active');
                  cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  data.MG.forEach((mg) => {
                    if (mg.IT == cur.data('coefId') && mg.MA.length > 0) {
                      let new_item = $(`<div data-id="coef_row" data-bet="${mg.IT}" class="row" style="height: auto;">
                        </div>`).hide();
                      cur.after(new_item);
                      if (mg.MA[0].PA.length > 3 && typeof mg.MA[0].PA[0].OD !== 'undefined') {
                        mg.MA.map(ma => {
                          const div = document.createElement('div');
                          div.className = 'bets_column';
                          div.appendChild(titleTemplateForBets(ma));
                          ma.PA.map(pa => {
                            div.appendChild(forEventDataColumnTemplate(pa, mg.SY, data[0].NA, mg.NA, data[0].CL));
                          });
                          new_item.append(div);
                        });
                      }
                      else {
                        if (typeof mg.MA[0].PA[0].OD !== 'undefined') {
                          if (mg.MA.length > 1) {
                            mg.MA.forEach((ma, i) => {
                              mg.MA[i].PA.forEach((pa) => {
                                $(`[data-bet=${mg.IT}]`).append(`
                                <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                                <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient">
                                  <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                  <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                                </button>
                                </div>`);
                              });
                              if (mg.MA[0].CN < mg.MA[0].PA.length) {
                                $(`[data-bet=${ma.IT}]`).children('.cell').addClass('half-w');
                              }
                            });
                          }
                          else {
                            mg.MA[0].PA.forEach((pa) => {
                              $(`[data-bet=${mg.IT}]`).append(`
                              <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                              <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient" >
                                <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                              </button>
                              </div>`);
                            });
                            if (mg.MA[0].CN < mg.MA[0].PA.length) {
                              $(`[data-bet=${ma.IT}]`).children('.cell').addClass('half-w');
                            }
                          }
                        }
                      }
                      new_item.slideDown('fast');
                      //RenderRows(cur.data('coefId'), ma);
                    }
                  });

                }
              });
              resolve();
            });
          }
        )
        .then(
          response => {
            $(`[data-id=row_info]`).on('click', (elem) => {
              const waitForBS = new Promise((resolve, reject) => {
                let cur = $(elem.target);
                if (cur.is('p')) {
                  cur = cur.parent().parent();
                }
                if (cur.data('rowStatus') == 'not_active') {
                  cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  cur.addClass('active');
                  cur.removeClass('not-active');
                  data.MG.forEach((mg) => {
                    if (mg.IT == cur.data('coefId') && mg.MA.length > 0) {
                      let new_item = $(`<div data-id="coef_row" data-bet="${mg.IT}" class="row" style="height: auto;">
                        </div>`).hide();
                      cur.after(new_item);
                      if (mg.MA[0].PA.length > 3 && typeof mg.MA[0].PA[0].OD !== 'undefined') {
                        mg.MA.map(ma => {
                          const div = document.createElement('div');
                          div.className = 'bets_column';
                          div.appendChild(titleTemplateForBets(ma));
                          ma.PA.map(pa => {
                            div.appendChild(forEventDataColumnTemplate(pa, mg.SY, data[0].NA, mg.NA, data[0].CL));
                          });
                          new_item.append(div);
                        });
                      }
                      else {
                        if (typeof mg.MA[0].PA[0].OD !== 'undefined') {
                          if (mg.MA.length > 1) {
                            mg.MA.forEach((ma, i) => {
                              mg.MA[i].PA.forEach((pa) => {
                                $(`[data-bet=${mg.IT}]`).append(`
                                <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                                <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient">
                                  <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                  <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                                </button>
                                </div>`);
                              });
                              if (mg.MA[0].CN < mg.MA[0].PA.length) {
                                $(`[data-bet=${ma.IT}]`).children('.cell').addClass('half-w');
                              }
                            });
                          }
                          else {
                            mg.MA[0].PA.forEach((pa) => {
                              $(`[data-bet=${mg.IT}]`).append(`
                              <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                              <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient" >
                                <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                              </button>
                              </div>`);
                            });
                            if (mg.MA[0].CN < mg.MA[0].PA.length) {
                              $(`[data-bet=${ma.IT}]`).children('.cell').addClass('half-w');
                            }
                          }
                        }
                      }
                      new_item.slideDown('fast');
                      //RenderRows(cur.data('coefId'), ma);
                    }
                  });
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
            // preloader done
            preloader.addClass('done').removeClass('opaci');
            $('[data-id=row_info]').css('position', 'relative');
            $('[data-id=row_info]').children().css('position', 'relative');

            $('.prematch-table-title .item').on('click', (event) => {
              let cur = $(event.target);
              if (cur.is('.selected')) { }
              else {
                $('.prematch-table-title .item').removeClass('selected');
                cur.addClass('selected');
              }
            });
            // go back to league
            $('.round-b').on('click', (event) => {
              window.history.back();
            });
            loadJsModules({
              betslip_link: { loadCSS: false, loadLanguage: false }
            });
            window.scrollTo(0, 0);
          }
        );
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
            return `<p class="font down blick">${modifyBets(pa.OD)}</p>`;
          }
        }
      };
      div.className = `maTable__cell`;
      div.innerHTML = `
      <button class="button coefficient ${SU2}" data-BS="${pa.BS}" data-FI="${pa.FI}" data-ID="${pa.ID}" data-OD="${pa.OD}" data-SU="${pa.SU}">
        <p class="font ellipsis mra"> ${shortize(NA ? NA : '')}</p>
        ${bet()}
      </button >
        `
      return div
    };
    done();
  });
});