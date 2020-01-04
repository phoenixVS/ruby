exports('user_menu', (params, done) => {
  insertHtmlModules({
    // ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, () => {
    function renderUserMenu() {
      let renderPromise = new Promise((resolve, reject) => {
        $(`<div class="container">
        <div data-id="user-menu" class="menu-wrapper">
          <div class="[ user-menu ]">
          <div class="[ user-menu-wrapper ]">
            <div class="[ user-menu-img ]"></div>
            <p class="[ user-menu-name ] text-center">Сергей Ступаков</p>
            <p class="[ user-menu-email ] text-center">sergey@voliacable.com</p>
            <hr class="[ user-menu-separate ]">
            <p class="font [ user-menu-text ]">Игровой счет:</p>
            <p class="font text-uppercase [ user-menu-big primary ]">1707101</p>
            <p class="font [ user-menu-text ]">Баланс на счету:</p>
            <p class="font text-uppercase [ user-menu-big second ]">1.50 UAH</p>
            <p class="font [ user-menu-text ]">Нерасчитаные ставки:</p>
            <p class="font text-uppercase [ user-menu-big primary ]">0.00 UAH</p>
          </div>
          <div class="[ user-menu-links ]">
            <a href="#" class="[ user-menu-link active ] flex-container align-middle">
              <p class="fa fa-money"></p>
              <p class="font">История счета</p>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-cogs"></p>
              <p class="font">Настройка счета</p>
              <div class="[ user-menu-notification ]"></div>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-refresh"></p>
              <p class="font">Ввод/вывод средств</p>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-gift"></p>
              <p class="font">Акции и бонусы</p>
            </a>
            <a href="#" class="[ user-menu-link ] flex-container align-middle">
              <p class="fa fa-sign-out"></p>
              <p class="font">Выйти</p>
            </a>
          </div>
        </div>
        </div>
        </div>`).prependTo('#content').slideDown('slow');
        resolve();
      });
      renderPromise.then(() => {
        $(`[data-id=login]`).off('click', renderUserMenu);
        const login = $('.user-menu');
        $('.loginButton').on('click', () => {
          login.fadeOut().remove("active");
          $(`[data-id=login]`).on('click', renderUserMenu);
        });
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=user-menu]`).length != 0) return false; // disable trigger on login popup
          login.fadeOut().remove("active");
          $(`[data-id=login]`).on('click', renderUserMenu);
        });
      });
    }
    $(`[data-id=login]`).on('click', renderUserMenu);
    done();
  });
});