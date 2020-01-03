exports('user', (params, done) => {
  insertHtmlModules({
    // ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, () => {
    function renderUserContent(username) {
      let content = $(`
      <div class="userContent">
			
			<div class="[ setting ]">
				<div class="[ setting-nav ] flex-container align-middle">
					<a data-id="balance" data-status="not-active" class="[ setting-nav-link ]">
						<span data-id="balance" class="font">BALANCE MANAGEMENT</span>
					</a>
					<a data-id="personal" data-status="not-active" class="[ setting-nav-link ]">
						<span data-id="personal" class="font">PERSONAL INFORMATION</span>
					</a>
					<a data-id="transaction" data-def="casier" data-status="not-active" class="[ setting-nav-link ]">
						<span data-id="transaction" class="font">TRANSACTION HISTORY</span>
					</a>
					<a data-id="access" data-def="casier" data-status="not-active" class="[ setting-nav-link ]">
						<span data-id="access" class="font">ACCESS LOG</span>
					</a>
				</div>
				<div data-id="setting-box" class="[ setting-box primary ]">
						
				</div>
			</div>
      `);
      $('.main>.container').empty();
      content.prependTo($('.main>.container')).slideDown('slow');
    }
    let renderPromise = new Promise((resolve, reject) => {
      let navRenderPromise = new Promise((resolve, reject) => {
        renderUserContent(params.username);
        resolve();
      });
      navRenderPromise
        .then(() => {
          let nav_link = params.nav_link;
          $(`[data-id=${nav_link}]`).addClass('active');
          $(`[data-id=setting-box]`).append($('<div>').load(`./html/modules/user/${nav_link}/setting-nav.html`, function () {
            let nav_link_small = params.nav_link_small;
            if (nav_link_small === undefined) {
              $(`[data-id=setting-box]`).empty().append($('<div>').load(`./html/modules/user/${nav_link}/default.html`));
            }
            else {
              $(`[data-id=${nav_link_small}]`).addClass('active');
              $(`[data-id=setting-box]`).append($('<div>').load(`./html/modules/user/${nav_link}/${nav_link_small}.html`));
            }
          }));
        });
      resolve();
    });
    renderPromise
      .then(() => {
        // Preloader finishes
        const preloader = $('#page-preloader');
        if (preloader.data(`status`) != 'done') {
          preloader.addClass('done');
          preloader.data(`status`, 'done').attr('data-status', 'done');
        }
        $('.setting-nav-link').on('click', (event) => {
          let cur = $(event.target);
          if (cur.data('status') == 'active') { }
          else {
            let t = cur.data('id');
            window.location.hash = '';
            window.location.href += `/user/${params.username}/${t}`;
          }
        });
        $('.setting-nav-link.small').on('click', (event) => {
          let cur = $(event.target);
          console.log(`Hello`);
          if (cur.data('status') == 'active') { }
          else {

            let t = cur.data('id');
            window.location.hash = '';
            window.location.href += `/user/${params.username}/${$('.setting-nav-link.active').data('id')}/${t}`;
          }
        });
      });
    done();
  });
});