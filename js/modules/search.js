exports('search', (params, done) => {
    insertHtmlModules({
    }, () => {

      async function GET(squery) {
        let URL = "http://bestline.bet/api/1/sitesearch/query?squery=" + squery;
        let resp = await fetch(URL);

        return resp;
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
              <div class="search-ev">
              <p class="font m-white">Competitions</p>
            </div>
            <div class="search-ev-links">
                <div class="s-ev-link">
                  <p class="font white">AFC Champions League</p>
                </div>
                <div class="s-ev-link">
                  <p class="font white">Algeria Youth League</p>
                </div>
                <div class="s-ev-link">
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
              console.log(GET(input_val));
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
              if ( input_val.length >= 2 ) {
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