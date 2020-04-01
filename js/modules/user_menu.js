exports('user_menu', (params, done) => {
  // $(`[data-id=user-menu]`).empty();
  insertHtmlModules({}, () => {
    function renderUserMenu() {
      let renderPromise = new Promise((resolve, reject) => {
        // $('.menu-wrapper').show();
        // $('.menu-wrapper').empty();
        $(`[data-id=user-menu]`).empty().append($('<div>').load(`./html/modules/user/user-menu/user-menu.html`, () => {
          // $(`[data-id=user-menu]`).slideDown("fast", () => {
          //   resolve();
          // });
          resolve();
        }));
      });
      renderPromise.then(() => {
        let rect = document.querySelector(`[data-id=login-button]`).getBoundingClientRect();
        let selfRect = document.querySelector(`.user-menu`).getBoundingClientRect();
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const scrollDown = document.querySelector('.menu-wrapper .scrollDown');
        if (document.querySelector('.menu-wrapper').scrollHeight < 0.7 * vh) {
          console.log(`70vh: `, 0.7 * vh);
          console.log(`scrollHeight: `, document.querySelector('.menu-wrapper').scrollHeight);
          console.log(`Height fits in`);
          scrollDown.parentNode.removeChild(scrollDown);
        }
        else {
          setTimeout(() => {
            if (scrollDown !== null) {
              scrollDown.parentNode.removeChild(scrollDown);
            }
          }, 1900);
          console.log(`Height doesn't fits in`);
        }
        let a = 0;
        if (selfRect.top > 30) {
          a = 60
        }
        if (document.querySelector('.slider').style.display != 'none') {
          document.querySelector(`.menu-wrapper`).style.top = '-50px';
        }
        else {
          document.querySelector(`.menu-wrapper`).style.top = '0';
        }
        const orientationCalcHeight = (ev) => {
          let orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
          if (orientation === "landscape-primary") {
            $('.user-menu').css('max-height', '70vh');
          } else if (orientation === "landscape-secondary") {
            $('.user-menu').css('max-height', '70vh');
          } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
            $('.user-menu').css('max-height', '77vh');
          } else if (orientation === undefined) {
            $('.user-menu').css('max-height', '77vh');
          }
          $('.user-menu-email').text(window.conf.CUSTOMER_CONFIG.USER_NAME);
        }
        orientationCalcHeight();
        window.addEventListener("orientationchange", orientationCalcHeight);
        // $('.user-menu').css('top', `${rect.bottom - a}px`);
        // $('.menu-wrapper').css('top', `${rect.bottom - a}px`);
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
        async function setBtnClicked() {
          window.scrollTo(0, 0);
          document.getElementsByTagName('body')[0].style.overflow = 'hidden';
          document.getElementsByTagName('html')[0].style.overflow = 'hidden';
          let processing = await loadJsModules({
            user_menu: { loadCSS: true, loadLanguage: false },
          });
          $('div.UserMenu_Overlay').removeClass('hidden');
          $('div.UserMenu_Overlay').on('click', (ev) => {
            console.log(`overlay`);
            setBtnNotClicked();
          });
          const user_menu = $(`[data-id=user-menu]`);
          $('.log-button').prop("onclick", null).off();
          $('.login-font').hide();
          user_menu.show();
          $('.log-button').removeClass('not-clicked');
          $('.log-button').addClass('clicked');


          $('.log-button').on('click', (el) => {
            setBtnNotClicked();
          });
        }
        async function setBtnNotClicked() {
          $('div.UserMenu_Overlay').addClass('hidden');
          $('.UserMenu_Overlay').off();
          document.getElementsByTagName('body')[0].style.removeProperty('overflow');
          document.getElementsByTagName('html')[0].style.removeProperty('overflow');
          const user_menu = $(`[data-id=user-menu]`);
          $('.log-button').prop("onclick", null).off();
          $('.login-font').show();
          user_menu.hide();
          $('.log-button').removeClass('clicked');
          $('.log-button').addClass('not-clicked');

          $('.log-button').on('click', (el) => {
            setBtnClicked();
          });
        }
        let username = 'username';
        $(`[data-id=accountHistory]`).prop('href', `#/user/${username}/transaction`)
          .on('click', () => {
            window.location.hash = `/user/${username}/transaction`;
            setBtnNotClicked();
            user_menu.slideUp("fast").removeClass("active").hide();
          });
        $(`[data-id=accountSettings]`).prop('href', `#/user/${username}/balance/account`)
          .on('click', () => {
            setBtnNotClicked();
            window.location.hash = `/user/${username}/balance/account`;
            user_menu.slideUp("fast").removeClass("active").hide();
          });
        $(`[data-id=depositWithdraw]`).prop('href', `#/user/${username}/balance/deposit`)
          .on('click', () => {
            setBtnNotClicked();
            window.location.hash = `/user/${username}/balance/deposit`;
            user_menu.slideUp("fast").removeClass("active").hide();
          });
        $(`[data-id=promoBonuses]`).prop('href', `#`)
          .on('click', () => {
            setBtnNotClicked();
            window.location.hash = ``;
            user_menu.slideUp("fast").removeClass("active").hide();
          });
        $(`[data-id=exitUser]`).on('click', (event) => {
          user_menu.slideUp("fast").removeClass("active").hide();
          setBtnNotClicked();
          window.location.href = ``;
          Cookies.set('logon', 'false');
        });
      });
    }

    renderUserMenu();
  });
  done();
});