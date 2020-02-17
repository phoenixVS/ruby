exports('search', (params, done) => {
    insertHtmlModules({
    }, () => {
      function renderSearch() {
        let renderPromise = new Promise((resolve, reject) => {
            console.log('Search.');
          $(`<div style="display: none;" data-id="main-search-container" class="main-search-container">

            <div class="searchContent" style="display: inline-table">
              <div class="search-container" data-id="search">
                <div id="search" data-id="search">
                  <i class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
                  <form class="search-form" data-id="search">
                    <input type="text" id="search-input" placeholder="Search..." data-id="search">
                  </form>
                  <div class="search-close">
                    <p class="font white">Close</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).prependTo('#content').fadeIn('middle');
          resolve();
        });
        renderPromise.then(() => {
            console.log('search then done');
            $('.search-close').on('click', (el) => {
              console.log('Exit');
            });
        });
      }
      renderSearch();
      done();
    });
  });