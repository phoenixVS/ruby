exports('prematch_coupon', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');
  preloader.children('img').remove();

  $('.prematch').empty();

  // load styles and unload event styles
  if (document.querySelector(`[href="./css/modules/prematch_event.css"]`) !== null) {
    document.querySelector(`[href="./css/modules/prematch_event.css"]`).parentNode.removeChild(document.querySelector(`[href="./css/modules/prematch_event.css"]`));
  }
  let fileref = document.createElement("link");
  let filename = `./css/modules/prematch_coupon.css`;
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);

  insertHtmlModules({
    '.prematch': [
      'prematch/prematch_coupon.html',
    ]
  }, () => {

    const PD = params.PD;

    function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }

    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      if (typeof nums[1] === 'undefined') {
        return od + '.00';
      }
      return (nums[0] / nums[1] + 1).toFixed(2)      
    };

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
      console.log(data);
      let curMA = '';
      let tree = [];
      tree.MG = [];
      tree.MA = [];
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
              // curMG = item;
              // curMG.MA = [];
            }
            else {
              if (item.type === 'MA') {
                tree.MA.push(item);
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

    function transformDay(str) {
      if (str) {
        const year = str.substring(0, 4);
        let month = parseInt(str.substring(4, 6));
        month--;
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

        data.MA.forEach((item) => {
          if (typeof item.PD !== 'undefined' && typeof item.NA !== 'undefined') {
            $('.prematch-table-title').append(`
              <div class="item" data-id="${item.ID}">${item.NA}</div>
            `);
          }
        });
        $('.prematch-table-title .item:first-child').addClass('selected');

        let mg_idx = 0;
        data.MA.forEach((item) => {
          if (typeof item.PD === 'undefined' && item.PA.length == 0) {
            $('.prematch-table-filter').append(`
              <div class="item" data-idx="${mg_idx}" data-id="${item.ID}" data-it="${item.IT}">${item.NA}</div>
            `);
            mg_idx++;
          }
        });
        $('.prematch-table-filter .item:first-child').addClass('selected');
        if ($('.prematch-table-filter .item').length == 0) {
          $('.prematch-table-filter').css('display', 'none');
        }
        if (data[0].ID !== '1' && data[0].ID !== '13') { // Basketball, ice hockey etc.
          let events = 0, bets = 0, tables = 0;
          data.MA.forEach((ma) => {
            if (ma.SY == 'ccl') {
              tables++;
            }
          });
          let table = document.querySelector('.tableWrapper').cloneNode(true);
          document.querySelector('.tableWrapper').parentNode.removeChild(document.querySelector('.tableWrapper'));
          for (let i = 0; i < tables; i++) {
            table.dataset.index = i;
            if (i == 0) {
              table.classList.add('active');
            }
            else {
              table.classList.remove('active');
              table.classList.add('hidden');
            }
            let new_node = table.cloneNode(true);
            document.querySelector('.prematch-table').appendChild(new_node);
            // document.querySelector('.prematch-table-filter').insertAdjacentElement('afterend', table);
          }
          data.MA.forEach((item, i) => {
            bets = 0;
            if (typeof item.PD === 'undefined' && item.PA.length > 0) {
              // teams
              let col_name = item.NA;
              if ((item.PY == 'di' || item.PY == 'do') && item.SY == 'ccl' && item.NA == ' ' && $('.tableWrapper .table-col').length == 0) {
                $('.tableWrapper').append(`
                  <div class="table-col Teams">
                    <div class="col-label flex-container align-center ${item.NA}">
                      ${new Date(transformDay(item.PA[0].BC)[1]).toDateString()}
                    </div>
                  </div>
                `);
                for (item of item.PA) {
                  if (typeof item.NA !== 'undefined') {
                    events++;
                    $(`.table-col.Teams`).append(`
                    <div class="col-item flex-container" data-event-id="${item.PD}" data-pd="${item.PD}">
                      <div class="col-info">
                        <div class="item-time">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</div>
                        <div class="item-markets">${item.MR}</div>
                        <div class="item-video">
                          <div class="sport-icon play"></div>
                        </div>
                      </div>
                      <div class="col-item-name">
                        <div class="team home">
                          <span>${item.D1.split(',')[0] + '&nbsp;'}</span>${item.NA}
                        </div>
                        <div class="team away">
                          <span>${item.D1.split(',')[1] + '&nbsp;'}</span>${item.N2}
                        </div>
                        ${item.TM == 'Tie' ? `
                          <div class="team away">
                            <span></span> Tie
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `);
                  }
                }
              }
              else {
                // Spread && Total | Money line
                if (item.SY == 'cci') {
                  let col_name = item.NA !== ' ' ? item.NA : `moneyline${item.SY}`;
                  col_name = col_name.replace(/\s+/g, '');
                  $('.tableWrapper[data-index="0"]').append(`
                    <div class="table-col ${col_name}" data-id="${item.ID}" data-it="${item.IT}">
                      <div class="col-label flex-container align-center">
                        ${item.NA}
                      </div>
                    </div>
                  `);
                  item.PA.map((item) => {
                    bets++;
                    if (modifyBets(item.OD) == 'NaN') {
                      $(`.table-col${'.' + col_name}`).append(`
                      <div class="col-item flex-container">
                        <button class="button coefficient disabled">
                          <span class="ha">
                            OTB
                          </span>
                        </button>
                      </div>
                    `);
                    }
                    else {
                      bets++;
                      $(`.table-col${'.' + col_name}`).append(`
                      <div class="col-item flex-container">
                        <button class="button coefficient" data-id="${item.ID}" data-fi="${item.FI}">
                          <span class="ha">
                            ${item.HA}
                          </span>
                          <span class="od">
                            ${modifyBets(item.OD)}
                          </span>
                        </button>
                      </div>
                    `);
                    }
                  });
                }
                else {
                  if (item.SY == 'ccj') {
                    let col_name = item.NA !== ' ' ? item.NA : `moneyline${item.SY}`;
                    col_name = col_name.replace(/\s+/g, '');
                    $('.tableWrapper[data-index="1"]').append(`
                    <div class="table-col ${col_name}" data-id="${item.ID}" data-it="${item.IT}">
                      <div class="col-label flex-container align-center">
                        ${item.NA}
                      </div>
                    </div>
                  `);
                    item.PA.map((item) => {
                      // bets++;
                      if (modifyBets(item.OD) == 'NaN') {
                        $(`.table-col${'.' + col_name}`).append(`
                          <div class="col-item flex-container">
                            <button class="button coefficient disabled">
                              <span class="ha">
                                OTB
                              </span>
                            </button>
                          </div>
                        `);
                      }
                      else {
                        console.log(col_name);
                        console.log($(`.table-col${'.' + col_name}`).length);
                        // bets++;
                        $(`.table-col${'.' + col_name}`).append(`
                          <div class="col-item flex-container">
                            <button class="button coefficient" data-id="${item.ID}" data-fi="${item.FI}">
                              <span class="ha">
                                ${item.HA}
                              </span>
                              <span class="od">
                                ${modifyBets(item.OD)}
                              </span>
                            </button>
                          </div>
                        `);
                      }
                    });
                  }
                }
              }
            }
          });
          console.log('bets', bets);
          console.log(`events`, events);
          if (bets / events > 2.5) {
            $('.table-col.Teams').addClass('three');
          }
        }
        else {   // Soccer && Tennis
          let prevDate = 0;
          let play_table = $(`<div class="play-table table"></div>`);
          data.MA.forEach((item, i) => {
            if (item.NA == ' ' && item.SY == 'ccd') {
              data.MA[i].PA.forEach((item, i) => {
                if (prevDate == item.BC) { }
                else {
                  // append date group
                  if (data[0].ID != '1') {
                    play_table.append(`
                  <div class="row [ info ]"> 
                    <div class="cell"> 
                      <p class="font">${new Date(transformDay(item.BC)[1]).toDateString()}</p> 
                    </div> 
                    <div class="cell" style="width: 50%; max-width: 50%"> 
                      <p class="font">1</p> 
                    </div> 
                    <div class="cell" style="width: 50%; max-width: 50%"> 
                      <p class="font">2</p> 
                    </div>
                  </div>
                  `);
                  }
                  else {
                    play_table.append(`
                    <div class="row [ info ]"> 
                      <div class="cell"> 
                        <p class="font">${new Date(transformDay(item.BC)[1]).toDateString()}</p> 
                      </div> 
                      <div class="cell"> 
                        <p class="font">1</p> 
                      </div> 
                      <div class="cell"> 
                        <p class="font">X</p> 
                      </div>
                      <div class="cell"> 
                        <p class="font">2</p> 
                      </div>
                    </div>
                    `);
                  }
                  prevDate = item.BC;
                }
                // append event
                play_table.append(`
                <div class="row">
                <div class="cell" ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`}>
                  <div ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`} data-class="play-link" class="[ play-link ]">
                      <div ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`} class="team home">
                        <p class="font m-white ellipsis" data-pd="${item.PD}">${item.NA}</p>
                        <div class="team-score" ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`}></div>
                      </div>
                      <div ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`} class="team away">
                        <p ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`} class="font m-white ellipsis">${item.N2}</p>
                        <div class="team-score" ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`}"></div>
                      </div>
                      <div ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`} class="[ metadata-wrapper ] text-right">
                        <p class="font m-white timer-el">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</p>
                        <div class="marketCount" ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`}> ${typeof item.PD !== 'undefined' ? `${item.MR}` : `INPLAY`}</div>
                        <div class="sport-icon play" ${typeof item.PD !== 'undefined' ? `data-pd="${item.PD}" data-event-id="${item.PD}"` : `data-inplay-id="${'C' + item.ML.split('/')[1]}"`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                `);
                // append bet
                if (data[0].ID != '1') {
                  // tennis
                  let home = 0, away = 0;
                  data.MA.forEach((ma) => {
                    if (ma.IT === 'C41-83-1') {
                      home = ma.PA[i];
                    }
                    if (ma.IT === 'C41-83-2') {
                      away = ma.PA[i];
                    }
                  });
                  play_table.children('.row:last-child').append(`
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;">
                      <button class="button coefficient ${home.OD == '0/0' ? 'disabled' : ''}" data-id="${home.ID}" data-fi="${home.FI}">${home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD)}</button> 
                    </div> 
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;"> 
                      <button class="button coefficient ${away.OD == '0/0' ? 'disabled' : ''}" data-id="${away.ID}" data-fi="${away.FI}">${away.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(away.OD)}</button>
                    </div>
                  `);
                }
                else {
                  // soccer
                  let home = 0, draw = 0, away = 0;
                  data.MA.forEach((ma) => {
                    if (ma.IT === 'C41-40-1') {
                      home = ma.PA[i];
                    }
                    if (ma.IT === 'C41-40-2') {
                      draw = ma.PA[i];
                    }
                    if (ma.IT === 'C41-40-3') {
                      away = ma.PA[i];
                    }
                  });
                  play_table.children('.row:last-child').append(`
                  <div class="cell" style="display: table-cell;">
                    <button class="button coefficient ${home.OD == '0/0' ? 'disabled' : ''}" data-id="${home.ID}" data-fi="${home.FI}">${home.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(home.OD)}</button> 
                  </div> 
                  <div class="cell" style="display: table-cell;"> 
                  <button class="button coefficient ${draw.OD == '0/0' ? 'disabled' : ''}" data-id="${draw.ID}" data-fi="${draw.FI}">${draw.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(draw.OD)}</button>
                  </div> 
                  <div class="cell" style="display: table-cell;">
                  <button class="button coefficient ${away.OD == '0/0' ? 'disabled' : ''}" data-id="${away.ID}" data-fi="${away.FI}">${away.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(away.OD)}</button> 
                  </div>
                `);
                }
              });
            }
          });
          $('.tableWrapper').append(play_table);
        }
        // preloader done
        preloader.addClass('done').removeClass('opaci');
        resolve();
      });
      render.then(
        response => {

          document.querySelector('body').scrollTop;

          // go back to sport
          $('.round-b').on('click', (event) => {
            window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
          });
          document.querySelector('.sport-name').addEventListener('click', (event) => {
            window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
          });
          // load prematch event
          document.querySelectorAll(`[data-event-id]`).forEach((item) => {
            item.addEventListener('click', (event) => {
              const cur = $(event.target);
              if (cur.is('.col-item')) {
                if (typeof cur.data(`pd`) !== 'undefined') {
                  window.location.hash += '/' + encodeURL(cur.data(`pd`));
                }
                else {
                  window.location.hash += '/' + encodeURL(cur.data(`pd`));
                }
              }
              else {
                if (typeof cur.parents(`.col-item`).data(`pd`) !== 'undefined') {
                  window.location.hash += '/' + encodeURL(cur.parents(`.col-item`).data(`pd`));
                }
                else {
                  window.location.hash += '/' + encodeURL(cur.parents(`.play-link`).data(`pd`));
                }
              }
            });
          });
          // load inplay event
          document.querySelectorAll(`[data-inplay-id]`).forEach((item) => {
            item.addEventListener('click', (event) => {
              event.preventDefault();
              const cur = $(event.target);
              if (cur.is('.col-item')) {
                if (typeof cur.data(`pd`) !== 'undefined') {
                  window.location.hash = '';
                  window.location.hash += '/' + 'event/' + encodeURL(cur.data(`inplayId`));
                }
                else {
                  window.location.hash = '';
                  window.location.hash += '/' + 'event/' + encodeURL(cur.data(`inplayId`));
                }
              }
              else {
                if (typeof cur.parents(`.col-item`).data(`pd`) !== 'undefined') {
                  window.location.hash = '';
                  window.location.hash += '/' + 'event/' + encodeURL(cur.parents(`.col-item`).data(`inplayId`));
                }
                else {
                  window.location.hash = '';
                  window.location.hash += '/' + 'event/' + encodeURL(cur.parents(`.play-link`).data(`inplayId`));
                }
              }
            });
          });

          $('.prematch-table-title .item').on('click', (event) => {
            let cur = $(event.target);
            if (cur.is('.selected')) { }
            else {
              $('.prematch-table-title .item').removeClass('selected');
              cur.addClass('selected');
            }
          });

          $('.prematch-table-filter .item').on('click', (event) => {
            let cur = $(event.target);
            if (cur.is('.selected')) { }
            else {
              $('.tableWrapper').removeClass('active').addClass('hidden');
              let idx = cur.data('idx');
              console.log(idx);
              console.log('length: ', $(`.tableWrapper[data-index="${idx}"]`).length);
              $(`.tableWrapper[data-index="${idx}"]`).removeClass('hidden').addClass('active');
              $('.prematch-table-filter .item').removeClass('selected');
              cur.addClass('selected');
            }
          });
          loadJsModules({
            betslip_link: { loadCSS: true, loadLanguage: false }
          });
        }
      );
    }
    done();
  });
});