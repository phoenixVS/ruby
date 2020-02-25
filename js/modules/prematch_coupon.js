exports('prematch_coupon', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');

  $('.prematch').empty();

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

        data.MA.forEach((item) => {
          if (typeof item.PD !== 'undefined') {
            $('.prematch-table-title').append(`
              <div class="item" data-id="${item.ID}" data-pd="${item.PD}">${item.NA}</div>
            `);
          }
        });
        $('.prematch-table-title .item:first-child').addClass('selected');

        data.MA.forEach((item) => {
          if (typeof item.PD === 'undefined' && item.PA.length == 0) {
            $('.prematch-table-filter').append(`
              <div class="item" data-id="${item.ID}" data-it="${item.IT}">${item.NA}</div>
            `);
          }
        });
        $('.prematch-table-filter .item:first-child').addClass('selected');

        if (data[0].ID !== '1' && data[0].ID !== '13') { // Basketball, ice hockey etc.
          let events = 0, bets = 0;
          data.MA.forEach((item, i) => {
            bets = 0;
            if (typeof item.PD === 'undefined' && item.PA.length > 0) {
              // teams
              let col_name = item.NA;
              if ((item.PY == 'di' || item.PY == 'do') && item.SY == 'ccl' && item.NA == ' ' && $('.tableWrapper .table-col').length == 0) {
                console.log();
                console.log(transformDay(item.PA[0].BC));
                $('.tableWrapper').append(`
                  <div class="table-col Teams" data-id="${item.ID}" data-it="${item.IT}">
                    <div class="col-label flex-container align-center ${item.NA}">
                      ${new Date(transformDay(item.PA[0].BC)[1]).toDateString()}
                    </div>
                  </div>
                `);
                for (item of item.PA) {
                  if (typeof item.NA !== 'undefined') {
                    events++;
                    $(`.table-col.Teams`).append(`
                    <div class="col-item flex-container">
                      <div class="col-info">
                        <div class="item-time">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</div>
                        <div class="item-markets">${item.MR}</div>
                        <div class="item-video">
                          <div class="sport-icon play"></div>
                        </div>
                      </div>
                      <div class="col-item-name">
                        <div class="team home">
                          <span>${item.D1.split(',')[0] + ' '}</span>${item.NA}
                        </div>
                        <div class="team away">
                          <span>${item.D1.split(',')[1] + ' '}</span>${item.N2}
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
                // Spread && Total
                let col_name = item.NA;
                if (item.NA == 'Spread' || item.NA == 'Total') {
                  $('.tableWrapper').append(`
                <div class="table-col ${col_name}" data-id="${item.ID}" data-it="${item.IT}">
                  <div class="col-label flex-container align-center">
                    ${item.NA}
                  </div>
                </div>
              `);
                  item.PA.map((item) => {
                    bets++;
                    if (modifyBets(item.OD) == 'NaN') {
                      $(`.table-col.${col_name}`).append(`
                      <div class="col-item flex-container">
                        <button class="button-coefficient disabled">
                          <span class="ha">
                            OTB
                          </span>
                        </button>
                      </div>
                    `);
                    }
                    else {
                      bets++;
                      $(`.table-col.${col_name}`).append(`
                      <div class="col-item flex-container">
                        <button class="button-coefficient">
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
                  // 
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
                  prevDate = item.BC;
                }
                // append event
                play_table.append(`
                <div class="row">
                <div class="cell" data-pd="${item.PD}" data-id="event">
                  <div data-pd="${item.PD}" data-class="play-link" data-pd="${item.PD}" class="[ play-link ]">
                      <div data-pd="${item.PD}" class="team home">
                        <p class="font m-white ellipsis" data-pd="${item.PD}">${item.NA}</p>
                        <div class="team-score" data-pd="${item.PD}"></div>
                      </div>
                      <div data-pd="${item.PD}" class="team away">
                        <p data-pd="${item.PD}" class="font m-white ellipsis">${item.N2}</p>
                        <div class="team-score" data-pd="${item.PD}"></div>
                      </div>
                      <div data-pd="${item.PD}" class="[ metadata-wrapper ] text-right">
                        <p class="font m-white timer-el">${item.BC.slice(-6).slice(0, 2) + ':' + item.BC.slice(-6).slice(2, 4)}</p>
                        <div class="marketCount" data-pd="${item.PD}">${item.MR}</div>
                        <div class="sport-icon play" data-pd="${item.PD}"></div>
                      </div>
                    </div>
                  </div>
                </div>
                `);
                // append bet
                if (data[0].ID === '13') {
                  // tennis
                  play_table.children('.row:last-child').append(`
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;">
                      <button class="button coefficient ${data.MA[4].PA[i].OD == '0/0' ? 'disabled' : ''}">${data.MA[4].PA[i].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(data.MA[4].PA[i].OD)}</button> 
                    </div> 
                    <div class="cell" style="display: table-cell; min-width: 24%; max-width: 24%;"> 
                      <button class="button coefficient ${data.MA[5].PA[i].OD == '0/0' ? 'disabled' : ''}">${data.MA[5].PA[i].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(data.MA[5].PA[i].OD)}</button>
                    </div>
                  `);
                }
                else {
                  // soccer
                  play_table.children('.row:last-child').append(`
                  <div class="cell" style="display: table-cell;">
                    <button class="button coefficient ${data.MA[5].PA[i].OD == '0/0' ? 'disabled' : ''}">${data.MA[5].PA[i].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(data.MA[5].PA[i].OD)}</button> 
                  </div> 
                  <div class="cell" style="display: table-cell;"> 
                  <button class="button coefficient ${data.MA[6].PA[i].OD == '0/0' ? 'disabled' : ''}">${data.MA[6].PA[i].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(data.MA[6].PA[i].OD)}</button>
                  </div> 
                  <div class="cell" style="display: table-cell;">
                  <button class="button coefficient ${data.MA[7].PA[i].OD == '0/0' ? 'disabled' : ''}">${data.MA[7].PA[i].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(data.MA[7].PA[i].OD)}</button> 
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

          // go back to sport
          $('.round-b').on('click', (event) => {
            window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
          });

          document.querySelector('.play-link').addEventListener('click', (event) => {
            const cur = event.target;
            window.location.hash += '/' + encodeURL(cur.dataset.pd);
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
              $('.prematch-table-filter .item').removeClass('selected');
              cur.addClass('selected');
            }
          });

        }
      );
    }
    done();
  });
});