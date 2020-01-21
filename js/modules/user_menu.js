exports('user_menu', (params, done) => {
  insertHtmlModules({
    // ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, () => {
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
            <a href="#/user/vasya1999/transaction" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-money"></p>
              <p class="font">Account history</p>
            </a>
            <a href="#/user/vasya1999/balance/account" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-cogs"></p>
              <p class="font">Account settings</p>
              <div class="[ user-menu-notification ]"></div>
            </a>
            <a href="#/user/vasya1999/balance/deposit" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-refresh"></p>
              <p class="font">Deposit / Withdraw funds</p>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-gift"></p>
              <p class="font">Promotions and bonuses</p>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-sign-out"></p>
              <p class="font">Exit</p>
            </a>
          </div>
        </div>
        </div>`).prependTo('#content').slideDown('slow');
        resolve();
      });
      renderPromise.then(() => {
        $(`[data-id=login]`).off('click', renderUserMenu);
        const user_menu = $(`[data-id=user-menu]`);
        $('.loginButton').on('click', () => {
          user_menu.fadeOut().remove("active");
          $(`[data-id=login]`).on('click', renderUserMenu);
        });
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=user-menu]`).length != 0) return false; // disable trigger on login popup
          user_menu.fadeOut().remove("active");
          $('#content .menu-wrapper').remove();
          $(`[data-id=login]`).on('click', renderUserMenu);
        });
      });
    }
    $(`[data-id=login]`).on('click', renderUserMenu);
    done();
  });
});