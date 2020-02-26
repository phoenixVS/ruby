exports('search', (params, done) => {
  insertHtmlModules({
  }, () => {

    function GET(squery) {
      let URL = "http://bestline.bet/search/?query=" + squery;

      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          RenderSearchResult(data);
        });
    }

    function RenderSearchResult(data) {
      new Promise((resolve, reject) => {
        let choosen = false;
        let lastEV = '';
        let res_content = $('.search-result');
        res_content.empty();
        res_content.append(`
        <div class="search-scroll">
        </div>
        `);
        let scroll = $('.search-scroll');
        let cl_counter = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 'CL') {
            cl_counter++
            if (cl_counter > 1) {
              for (let g = 0; g < data.length; g++) {
                if (data[g].type == 'CL' && data[g].NA != choosen_NA) {
                  scroll.append(`
                    <div class="search-scroll-item">
                      <p class="font">${data[g].NA}</p>
                    </div>
                    `);
                } else {
                  continue;
                }
              }
              break;
            } else {
              choosen = true;
              choosen_NA = data[i].NA;
              scroll.append(`
              <div class="search-scroll-item choosen">
                <p class="font">${data[i].NA}</p>
              </div>
              `);
            }
          } else if (data[i].type == 'EV') {
            lastEV = data[i].NA;
            res_content.append(`
                <div class="search-ev">
                  <p class="font m-white">${data[i].NA}</p>
                </div>
                `);
          } else if (data[i].type == 'MG') {
            if ($(res_content.children(`.search-ev-links-${i}`)).length) {
              if (lastEV == 'Teams') {
                $(`.search-ev-links-${i}`).append(`
                    <div class="s-ev-link">
                      <p class="font white t-clicked">${data[i].NA}</p>
                      <div class="t-market-group active">
                        <div class="market-pa">
                        <div class="market-pa-item">
                            <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                            <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>

                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>
                        </div>
                        <div class="market-bets">
                        </div>
                      </div>
                    </div>
                  `);
              } else {
                $(`.search-ev-links-${i}`).append(`
                  <div class="s-ev-link">
                    <p class="font white">${data[i].NA}</p>
                  </div>
                  `);
              }
            } else {
              if (lastEV == 'Teams') {
                res_content.append(`
                    <div class="search-ev-links-${0}">
                      <div class="s-ev-link">
                        <p class="font white t-clicked">${data[i].NA}</p>
                        <div class="t-market-group active">
                        <div class="market-pa">
                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>

                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>
                        </div>
                        <div class="market-bets">
                        </div>
                      </div>
                      </div>
                    </div>
                  `);
              } else {
                res_content.append(`
                    <div class="search-ev-links-${0}">
                      <div class="s-ev-link">
                        <p class="font white">${data[i].NA}</p>
                      </div>
                    </div>
                  `);
              }
            }
          }
        }
        resolve();
      }).then(() => {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
        function eSetClicked(el) {
          $(el.target).removeClass('t-not-clicked');
          $(el.target).addClass('t-clicked');
          $(el.target).prop("onclick", null).off("click");

          let marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('not-active');
          marketDIV.addClass('active');

          $(el.target).on('click', (item) => {
            eSetNotClicked(item);
          });
        }

        function eSetNotClicked(el) {
          $(el.target).removeClass('t-clicked');
          $(el.target).addClass('t-not-clicked');
          $(el.target).prop("onclick", null).off("click");

          let marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('active');
          marketDIV.addClass('not-active');

          $(el.target).on('click', (item) => {
            eSetClicked(item);
          });
        }

        $('.s-ev-link p.t-clicked').on('click', (el) => {
          eSetNotClicked(el);
        });
      });
    }

    function renderSearch() {
      let renderPromise = new Promise((resolve, reject) => {
        if ($('.main-search-container').hasClass('not-active')) {
          $('.main-search-container').addClass('active');
          $('.main-search-container').removeClass('not-active');
          resolve();
        } else {
          $(`<div style="display: none;" data-id="main-search-container" class="main-search-container">

            <div data-id="main-search-container"class="searchContent" style="display: inline-table">
              <div data-id="main-search-container"class="search-container" data-id="search">
                <div data-id="main-search-container"id="search" data-id="search">

                  <i data-id="main-search-container"class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
                  <form data-id="search-field"class="search-form" data-id="search">
                    <input type="text"id="search-input" placeholder="Search..." data-id="search">
                  </form>
                  <div data-id="search-mic" class="search-mic">
                  <i class="fas fa fa-microphone"></i>
                  </div>
                  <div data-id="main-search-container"class="search-close">
                    <p class="font white">Close</p>
                  </div>

                </div>
              </div>
            </div>

            <div class="search-body active">
              <div class="search-example">
                <p class="font m-white">Search examples:</p>
              </div>
              <div class="search-links">
                <div class="s-link">
                  <p class="font white">AFC Champions League</p>
                </div>
                <div class="s-link">
                  <p class="font white">Algeria Youth League</p>
                </div>
                <div class="s-link">
                  <p class="font white">Argentina Reserve League</p>
                </div>
              </div>
            </div>

            <div class="search-result not-active">
              <div class="search-scroll">
                <div class="search-scroll-item choosen">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Tennis</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Basketball</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Cricket</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Handball</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Ice Hokey</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
              </div>
            </div>
          </div>
        `).prependTo('#content').fadeIn('middle');
          resolve();
        }
      });
      renderPromise.then(() => {
        console.log('search then done');
        $('.search-close').on('click', (el) => {
          console.log('Exit');
          $('.main-search-container').removeClass('active');
          $('.main-search-container').addClass('not-active');
        });
        $(`[data-id=search-field]`).on('input', (el) => {
          let input_val = $(el.target).val();
          if (input_val.length >= 1) {
            $('.search-mic').empty().append('<i class="fas fa fa-times"></i>');
            $('.search-mic').on('click', () => {
              $(el.target).val('');
              $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');

              $('.search-result').removeClass('active');
              $('.search-result').addClass('not-active');

              $('.search-body').removeClass('not-active');
              $('.search-body').addClass('active');
            });
          } else {
            $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');
            $('.search-mic').prop("onclick", null).off("click");
          }
          if (input_val.length >= 2) {
            GET('ef');
            $('.search-body').removeClass('active');
            $('.search-body').addClass('not-active');

            $('.search-result').removeClass('not-active');
            $('.search-result').addClass('active');
          } else {

            $('.search-result').removeClass('active');
            $('.search-result').addClass('not-active');

            $('.search-body').removeClass('not-active');
            $('.search-body').addClass('active');
          }
        });
      });
    }
    renderSearch();
    done();
  });
});