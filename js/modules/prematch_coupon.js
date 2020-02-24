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

    function renderPrematch(data) {
      let render = new Promise((resolve, reject) => {
        console.dir(data);
        $('.prematch-title .sport-name').text(data[1].TB.split(',')[0] + ' / ');
        $('.prematch-title .league').text(data.MG[data.MG.length - 1].ED);

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

        data.MA.forEach((item, i) => {
          if (typeof item.PD === 'undefined' && item.PA.length > 0) {
            // teams
            let col_name = item.NA;
            if (item.PY == 'di' && item.SY == 'ccl' && item.NA == ' ' && $('.tableWrapper .table-col').length == 0) {
              $('.tableWrapper').append(`
              <div class="table-col Teams" data-id="${item.ID}" data-it="${item.IT}">
                <div class="col-label flex-container align-center ${item.NA}">
                  &nbsp;
                </div>
              </div>
            `);
              for (item of item.PA) {
                if (typeof item.NA !== 'undefined') {
                  $(`.table-col.Teams`).append(`
                    <div class="col-item flex-container">
                      <div class="col-info">
                        <div class="item-time">${item.BC.slice(-4).slice(0, 2) + ':' + item.BC.slice(-4).slice(2)}</div>
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
                      </div>
                    </div>
                  `);
                }
              }
            }
            else {
              // Spread
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