exports('search', (params, done) => {
    insertHtmlModules({
    }, () => {

      function GET(val) {
        /*https:/bestline.bet/api/1/sitesearch/query?lid=31&zid=0&pd=%23AX%23K%5E%25D0%25B0%25D0%25B0%23&cid=195&cgid=1&cs64=W0&ct64=J3&cg64=01&area=DYNAMIC_SEARCH*/
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

            <div class="search-body">
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
              if ( input_val.length >= 2 ) {
                console.log(input_val);
              }
            });
        });
      }
      renderSearch();
      done();
    });
  });