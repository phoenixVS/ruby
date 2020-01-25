exports('user_menu', (params, done) => {
  insertHtmlModules({}, () => {
    function renderUserMenu() {
      let renderPromise = new Promise((resolve, reject) => {
        $(`
        <div data-id="user-menu" class="menu-wrapper">
          <div class="[ user-menu ]">
          <div class="[ user-menu-wrapper ]">
            <div class="[ user-menu-img ]"></div>
            <p class="[ user-menu-name ] text-center">Ivan Ivanov</p>
            <p class="[ user-menu-email ] text-center">example@gmail.com</p>
            <hr class="[ user-menu-separate ]">
            <p class="font [ user-menu-text ]">Game score:</p>
            <p class="font text-uppercase [ user-menu-big primary ]">1707101</p>
            <p class="font [ user-menu-text ]">Balance on the account:</p>
            <p class="font text-uppercase [ user-menu-big second ]">1.50 UAH</p>
            <p class="font [ user-menu-text ]">Unsettled bets:</p>
            <p class="font text-uppercase [ user-menu-big primary ]">0.00 UAH</p>
          </div>
          <div class="[ user-menu-links ]">
            <a data-id="accountHistory" href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-money"></p>
              <p class="font">Account history</p>
            </a>
            <a data-id="accountSettings" href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-cogs"></p>
              <p class="font">Account settings</p>
              <div class="[ user-menu-notification ]"></div>
            </a>
            <a data-id="depositWithdraw" href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-refresh"></p>
              <p class="font">Deposit / Withdraw funds</p>
            </a>
            <a data-id="promoBonuses" href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-gift"></p>
              <p class="font">Promotions and bonuses</p>
            </a>
            <a data-id="exitUser" href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-sign-out"></p>
              <p class="font">Exit</p>
            </a>
          </div>
        </div>
        </div>`).prependTo($('#content')).slideDown("fast");
        resolve();
      });
      renderPromise.then(() => {
        $(`[data-id=login]`).off('click', renderUserMenu);
        const user_menu = $(`[data-id=user-menu]`);
        $('.loginButton').on('click', () => {
          user_menu.slideUp("fast").remove("active");
          //$(`[data-id=login]`).on('click', renderUserMenu);
        });
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=user-menu]`).length != 0) return false; // disable trigger on login popup
          user_menu.slideUp("fast").remove("active").remove();
          //$(`[data-id=login]`).on('click', renderUserMenu);
        });
        // Account profile redirect
        let username = 'vasya1999';
        $(`[data-id=accountHistory]`).prop('href', `#/user/${username}/transaction`)
          .on('click', () => {
            window.location.hash = `/user/${username}/transaction`;
            user_menu.slideUp("fast").remove("active").remove();
          });
        $(`[data-id=accountSettings]`).prop('href', `#/user/${username}/balance/account`)
          .on('click', () => {
            window.location.hash = `/user/${username}/balance/account`;
            user_menu.slideUp("fast").remove("active").remove();
          });
        $(`[data-id=depositWithdraw]`).prop('href', `#/user/${username}/balance/deposit`)
          .on('click', () => {
            window.location.hash = `/user/${username}/balance/deposit`;
            user_menu.slideUp("fast").remove("active").remove();
          });
        $(`[data-id=promoBonuses]`).prop('href', `#`)
          .on('click', () => {
            window.location.hash = ``;
            user_menu.slideUp("fast").remove("active").remove();
          });
        $(`[data-id=exitUser]`).on('click', (event) => {
          user_menu.slideUp("fast").remove("active").remove();
          window.location.href = ``;
          Cookies.set('logon', 'false');
        });
      });
    }

    renderUserMenu();
  });
  done();
});