exports('prematch', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader').addClass('opaci');
  preloader.removeClass('done');
  preloader.children('img').remove();

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

        // Render table of leagues
        if (data[0].ID != 1) {
          data.MG.map((item, i) => {
            if (i > 1 && typeof item.NA !== 'undefined') {
              $('.prematch-table .container-fluid').append(`
              <div class="market-group opened" data-id="${item.ID}" data-it="${item.IT}" data-pd="${item.PD}">
                <div class="market-group-text">
                  <span class="market-group-name">${item.NA}</span>
                </div>
              </div>
              `);
            }
          });
        }
        else {
          data.MG.map((mg, i) => {
            if (i > 1 && mg.NA == 'Full Time Result') {
              mg.MA.map((ma, i) => {
                if (i > 0) {
                  $('.prematch-table .container-fluid').append(`
              <div class="market-group closed" data-id="${ma.ID}" data-it="${ma.IT}" data-pd="${ma.PD}">
                <div class="market-group-text">
                  <span class="market-group-name">${ma.NA}</span>
                </div>
              </div>
              `);
                }
              });
            }
          });
        }
        resolve();
      });

      render.then(
        response => {
          // preloader done
          preloader.addClass('done').removeClass('opaci');

          // go to sport inplay
          $('.inplay-link').on('click', (event) => {
            window.location.hash = '/' + 'inplay' + '/' + window.location.hash.split('/')[2];
          });

          $('.prematch-table-title .item').on('click', (event) => {
            let cur = $(event.target);
            if (cur.is('.selected')) { }
            else {
              $('.prematch-table-title .item').removeClass('selected');
              cur.addClass('selected');
            }
          });
          // appending MAs aka list-item
          if (data[0].ID != 1) {
            $('.market-group').on('click', (event) => {
              event.preventDefault();
              event.stopPropagation();
              let cur = $(event.target);
              if (!cur.is('.market-group')) {
                cur = cur.parents('.market-group');
              }
              for (mg of data.MG) {
                if (mg.PD == cur.data(`pd`)) {
                  let PD = mg.MA[0].PA[0].PD;
                  window.location.hash += '/' + encodeURL(PD);
                }
              }
              /* data.MG.map((mg) => {
                if (mg.PD == cur.data(`pd`)) {
                  let PD = mg.MA[0].PA[0].PD;
                  window.location.hash += '/' + encodeURL(PD);
                }
              }); */
            });
            /*  $('.market-group').on('click', (event) => {
       
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
                           if (item.IT == maIT) {
                             item.PA.map((item) => {
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
                     coupon_list.appendTo(cur).hide().slideDown(150);
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
                     cur.children('.coupon-list').slideUp(150, () => { cur.children('.coupon-list').remove(); cur.removeClass('opened'); cur.addClass('closed'); });
                     cur.addClass('closed');
                     cur.removeClass('opened');
                   }
                 });
       
               }
               else {
                 cur.children('.market-group-list').slideUp(150, () => { cur.children('.market-group-list').remove(); cur.removeClass('opened'); cur.addClass('closed'); });
               }
             }); */
          }
          else {// if Soccer
            $('.market-group').on('click', (event) => {
              // add preloader
              const preloader = $('#page-preloader');
              preloader.removeClass('done').addClass('opaci');

              let cur = $(event.target);
              if (!cur.is('.market-group')) {
                while (!cur.is('.market-group')) {
                  cur = cur.parents('.market-group');
                }
              }
              let url = 'http://bestline.bet/sports/?PD=';

              if (cur.is('.closed')) {
                let coupon_list = $(`<div class="coupon-list"></div>`);
                data.MG.map((item) => {
                  if (item.NA == "Full Time Result") {
                    item.MA.map((ma) => {
                      if (ma.PD == cur.data(`pd`)) {
                        url += encodeURL(ma.PD);
                        fetch(url)
                          .then((response) => {
                            return response.json();
                          })
                          .then((json) => {
                            console.log(json);
                            for (item of json) {
                              if (item.type == 'PA') {
                                coupon_list.append(`
                                  <div data-pd="${item.PD}" class="coupon-name">
                                    ${item.NA}
                                  </div>
                              `);
                              }
                            }
                          })
                          .then(() => {
                            // finish preloader
                            preloader.addClass('done').removeClass('opaci');
                            coupon_list.appendTo(cur).hide().slideDown(150);
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
                          });
                      }
                    });
                  }
                });
              }
              else {
                console.log(cur.children('.coupon-list'));
                cur.children('.coupon-list').slideUp(150, () => {
                  cur.children('.coupon-list').remove();
                  cur.removeClass('opened'); cur.addClass('closed');
                  // finish preloader
                  preloader.addClass('done').removeClass('opaci');
                });
              }
            });
          }

          // Open items that should be opened
          data.MG.map((item) => {
            if (item.DO == 1 && typeof item.NA !== 'undefined') {
              // $(`div.prematch div.container-fluid div[data-it="${item.IT}"`).trigger('click');
            }
          });
        }
      );
    }

    done();
  });
});