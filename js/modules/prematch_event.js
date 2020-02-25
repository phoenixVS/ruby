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
                  <div data-id="row_info" data-row-status="not_active" data-coef-id="${mg.ID}" class="row info det" style="height: 50px; border-bottom: 0.5px solid black;">
                    <div class="cell">
                      <p class="font">${mg.NA}</p>
                    </div>
                  </div>
              `);
          }
        });

        // preloader done
        preloader.addClass('done').removeClass('opaci');
        resolve();
      });
      render.then(
        response => {
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
            window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
          });

        }
      );
    }
    done();
  });
});