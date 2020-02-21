exports('prematch', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');

  $('.prematch').empty();

  insertHtmlModules({
    '.prematch': [
      'prematch/main.html',
    ]
  }, () => {

    const ID = params.ID;

    function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }
    let url = 'http://bestline.bet/sports/?PD=';
    for (sport of window.prematch) {
      if (sport.ID == ID) {
        url += encodeURL(sport.PD);
      }
    }

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
      let EV = '';
      let CL = '';
      let curMG = '';
      let curMA = '';
      let curPA = '';
      let tree = [];
      tree.MG = [];
      data.map((item, index) => {
        if (item.type === 'CL') {
          tree.push(item);
          CL = item;
        }
        else {
          if (item.type === 'EV') {
            tree.push(item);
            EV = item;
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

    function renderPrematch(data) {
      let render = new Promise((resolve, reject) => {
        console.dir(data);
        $('.prematch-title').text(data[0].NA);
        data.MG[0].MA.forEach((item) => {
          $('.prematch-table-title').append(`
          <div class="item" data-id="${item.ID}" data-pd="${item.PD}">${item.NA}</div>
          `);
        });
        $('.prematch-table-title .item:first-child').addClass('selected');
        console.log(data.MG);
        data.MG.map((item, i) => {
          if (i > 1 && typeof item.NA !== 'undefined') {
            $('.prematch-table .container-fluid').append(`
            <div class="market-group closed" data-id="${item.ID}" data-it="${item.IT}" data-pd="${item.PD}">
              <div class="market-group-text">
                <span class="market-group-name">${item.NA}</span>
              </div>
            </div>
            `);
          }
        });

        resolve();
      });

      render.then(
        response => {
          // preloader done
          preloader.addClass('done').removeClass('opaci');

          $('.prematch-table-title .item').on('click', (event) => {
            let cur = $(event.target);
            if (cur.is('.selected')) { }
            else {
              $('.prematch-table-title .item').removeClass('selected');
              cur.addClass('selected');
            }
          });
          // appending MAs aka list-item
          $('.market-group').on('click', (event) => {

            let cur = $(event.target);
            if (!cur.is('.market-group')) {
              while (!cur.is('.market-group')) {
                cur = cur.parent();
              }
            }

            if (cur.is('.closed')) {
              let market_list = $(`<div class="market-group-list"></div>`);
              let IT = cur.data(`it`);
              data.MG.map((item) => {
                if (item.IT == IT) {
                  item.MA.map((item) => {
                    market_list.append(`
                    <div class="list-item closed" data-it="${item.IT}">
                      <div class="item-header">
                        ${item.NA}
                      </div>
                    </div>
                    `);
                  });
                }
              });
              market_list.appendTo(cur).hide().slideDown(150);
              cur.removeClass('closed');
              cur.addClass('opened');

              // append PAs aka coupon-link
              $('.list-item').off();
              $('.list-item').on('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                let cur = $(event.target);
                if (!cur.is('.list-item')) {
                  while (!cur.is('.list-item')) {
                    cur = cur.parent();
                  }
                }
                const IT = cur.parent().parent().data(`it`);
                if (cur.is('.closed')) {
                  let coupon_list = $(`<div class="coupon-list"></div>`);
                  let maIT = cur.data(`it`);
                  data.MG.map((item) => {
                    if (item.IT == IT) {
                      item.MA.map((item) => {
                        // console.log(item);
                        console.log(maIT);
                        console.log(item.IT);
                        if (item.IT == maIT) {
                          item.PA.map((item) => {
                            console.log(item);
                            coupon_list.append(`
                                <div data-pd="${item.PD}" class="coupon-name">
                                  ${item.NA}
                                </div>
                            `);
                          });
                        }
                      });
                    }
                  });
                  cur.append(coupon_list);
                  cur.removeClass('closed');
                  cur.addClass('opened');

                  $('.coupon-name').off();
                  $('.coupon-name').on('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    let cur = $(event.target);
                    let PD = cur.data(`pd`);
                    window.location.hash += '/' + encodeURL(PD);
                  });
                }
                else {
                  cur.children('.coupon-list').remove();
                  cur.addClass('closed');
                  cur.removeClass('opened');
                }
              });

            }
            else {
              cur.children('.market-group-list').slideUp(150, () => { cur.children('.market-group-list').remove(); cur.removeClass('opened'); cur.addClass('closed'); });
            }
          });
          // Open items that should be opened
          data.MG.map((item) => {
            if (item.DO == 1 && typeof item.NA !== 'undefined') {
              console.log($(`div.prematch div.container-fluid div[data-it="${item.IT}"`));
              $(`div.prematch div.container-fluid div[data-it="${item.IT}"`).trigger('click');
            }
          });
        }
      );
    }

    done();
  });
});