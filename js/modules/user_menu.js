exports('user_menu', (params, done) => {
  insertHtmlModules({}, () => {
    function renderUserMenu() {
      let renderPromise = new Promise((resolve, reject) => {
        $('.menu-wrapper').show();
        $(`
        
          <div class="[ user-menu ]">
          <div class="[ user-menu-wrapper ]">
            <div class="[ prefferences-tab-button to-settings ]"></div>
            <div class="[ user-menu-img ]"></div>
            <p class="[ user-menu-name ] text-center">Ivan Ivanov</p>
            <p class="[ user-menu-email ] text-center">${window.conf.CUSTOMER_CONFIG.USER_NAME}</p>
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
          <div class="[ prefference-menu hidden ]">
            <div class="[ prefference-menu__row ]">
            Time Zone
            </div>
              <div class="[ prefference-menu__selectionWrapper ]">
                <select class="selectionWrapper_list">
                  "Time Zone"
                  <option id="1">UK</option>
                  <option id="2">ET</option>
                  <option id="3">PT</option>
                  <option id="4">CET</option>
                  <option id="5">CT</option>
                  <option id="6">MT</option>
                  <option id="7">GMT-12</option>
                  <option id="8">GMT-11</option>
                  <option id="9">GMT-10</option>
                  <option id="10">GMT-9</option>
                  <option id="11">GMT-8</option>
                  <option id="12">GMT-7</option>
                  <option id="13">GMT-6</option>
                  <option id="14">GMT-5</option>
                  <option id="15">GMT-4</option>
                  <option id="16">GMT-3</option>
                  <option id="17">GMT-2</option>
                  <option id="18">GMT-1</option>
                  <option id="19">GMT</option>
                  <option id="20">GMT+1</option>
                  <option id="21" selected="selected">GMT+2</option>
                  <option id="22">GMT+3</option>
                  <option id="23">GMT+4</option>
                  <option id="24">GMT+5</option>
                  <option id="25">GMT+6</option>
                  <option id="26">GMT+7</option>
                  <option id="27">GMT+8</option>
                  <option id="28">GMT+9</option>
                  <option id="35">GMT+9.5</option>
                  <option id="29">GMT+10</option>
                  <option id="36">GMT+10.5</option>
                  <option id="30">GMT+11</option>
                  <option id="31">GMT+12</option>
                  <option id="32">GMT+13</option>
                  <option id="33">EET</option>
                  <option id="34">POR</option>
                </select>
              </div>
              <div class="[ prefference-menu__row ]">
                Odds Display
              </div>
              <div class="[ prefference-menu__selectionWrapper ]">
                <select data-select="odds" class="selectionWrapper_list">
                  "Odds Display"
                  <option value="1" id="1">Fractional</option>
                  <option value="2" id="2">Decimal</option>
                  <option value="3" id="3">American</option>
                </select>
              </div>
              <div class="[ prefference-menu__row ]">
                Max Inactivity Time
              </div>
              <div class="[ prefference-menu__selectionWrapper ]">
                <select class="selectionWrapper_list">
                "Max Inactivity Time"
                  <option id="1">20 Minutes</option>
                  <option id="2">1 Hour</option>
                  <option id="3">2 Hour</option>
                  <option id="4">3 Hour</option>
                  <option id="5">6 Hour</option>
                  <option id="6">12 Hour</option>
                </select>
              </div>
              <div class="[ prefference-menu__row ]">
                Betting Currency
              </div>
              <div class="[ prefference-menu__selectionWrapper ]">
                <select class="selectionWrapper_list">
                "Betting Currency"
                <option id="1">USD</option>
                <option id="2">EUR</option>
                </select>
              </div>
          </div>
        </div>`).prependTo($('#content .menu-wrapper')).slideDown("fast");
        console.log('Rendering');
        resolve();
      });
      renderPromise.then(() => {
        $(`.prefferences-tab-button`).on('click', (ev) => {
          // switch menu button
          $('.prefferences-tab-button').toggleClass('to-settings').toggleClass('to-menu');
          $('.prefference-menu').toggleClass('hidden');
          $('.user-menu-links').toggleClass('hidden');
        });
        // option selected changer
        /*  $(`[data-select=odds]`).children('option:not([selected])').on('click', (ev) => {
           console.log(`triggered`);
           let cur = $(ev.target);
           cur.siblings('[selected=selected]').attr('selected', '');
           cur.attr('selected', 'selected');
           let ID = cur.attr('id');
           console.table([`ID`, ID]);
           // window.conf.CUSTOMER_CONFIG.ODDS_TYPE = ID;
         }); */
        // Odds type switcher
        $(`[data-select=odds]`).on('change', (ev) => {
          let selectedIndex = document.querySelector(`[data-select=odds]`).options[document.querySelector(`[data-select=odds]`).selectedIndex].value;
          window.conf.CUSTOMER_CONFIG.ODDS_TYPE = selectedIndex;
          window.location.reload(true);
        });
        //$(`[data-id=login-button]`).off('click', renderUserMenu);
        const user_menu = $(`[data-id=user-menu]`);
        /*$(`[data-id=login-button]`).on('click', () => {
          user_menu.slideUp("fast").remove("active");
        });
        */
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=user-menu]`).length != 0) return false; // disable trigger on login popup
          //user_menu.slideUp("fast").remove("active");
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
    console.log('Rendered user menu');
  });
  done();
});