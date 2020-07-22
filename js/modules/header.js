exports('header', (params, done) => {
  if ($('.header .menu').length > 0) {
    $('.header .top').empty();
    $('.header .show-menu').empty();
    $('.header .menu').empty();
  }
  insertHtmlModules({
    ".header .top": [
      "header/top-menu.html",
    ],
    ".header .show-menu": [
      "header/show-menu.html",
    ],
    ".header .menu": [
      "header/menu.html",
    ]
  }, () => {
    async function setBtnClicked() {
      window.scrollTo(0, 0);
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      let processing = await loadJsModules({
        user_menu: { loadCSS: true, loadLanguage: false },
      });
      $('div.UserMenu_Overlay').removeClass('hidden');
      $('div.UserMenu_Overlay').on('click', (ev) => {
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
    // Login and user menu handlers
    if (window.conf.CUSTOMER_CONFIG.LOGGED_IN == true) {
      Cookies.set('logon', 'false');
      //$(`[data-id=user-menu]`).hide();
      $(`[data-id=mybets-button]`).show();
      $(`[data-id=registration-button]`).hide();
    } else {
      Cookies.set('logon', 'false');
      $(`[data-id=mybets-button]`).hide();
      $(`[data-id=registration-button]`).show();
    }
    $(`[data-id=login-button]`).on('click', () => {
      console.log("Log-button onclick");
      if (Cookies.get('logon') == 'true') {
        setBtnClicked();
      }
      else {
        console.log('User is not logged in!');
        loadJsModules({
          login: { loadCSS: true, loadLanguage: false },
        });
      }
    });

    $(`[data-id=calendar]`).on('click', () => {
      console.log("Calendar");
      window.location.hash = "/calendar/";
    });
    // clocks
    const time = $('#time');
    (function updateTime() {
      let date = new Date(),
        hh = date.getUTCHours(),
        mm = date.getUTCMinutes(),
        ss = date.getSeconds(),
        offset = window.conf.CUSTOMER_CONFIG.TZ;//date.getTimezoneOffset();
      //offset /= 60;
      /* if (offset > 0) {
          offset = 'GMT -' + offset.toString();
      } else { offset = 'GMT +' + (-(offset.toString())); } */
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      time.html(`${hh}:${mm}:${ss} ${offset}`);
      setTimeout(updateTime, 1000);
    })(0); // end of time :_(

    // languages handler
    function navEncode(nav) {
      const la = nav.slice(0, 2);
      let lang;
      const dict = {
        'en': 'English',
        'ru': 'Russian',
      }
      for (key in Object.keys(dict)) {
        if (key == la) {
          lang = dict.key;
          return lang;
        }
      }
      if (typeof lang == 'undefined') {
        return 'English';
      }
    }

    if (typeof Cookies.get('lang') === 'undefined') {
      let lang = navEncode(navigator.language);
      Cookies.set('lang', lang);
    }
    $(`[data-id=dropdown-langs]`).text(Cookies.get('lang'));
    $(`[data-lang-name]`).removeClass('active');
    $(`[data-lang-name=${Cookies.get('lang')}]`).addClass('active');

    const langsBtn = $(`[data-id=lang-scroll]`);
    const dropdown = $('a.top-menu-dropdown');
    // Converting camel case to snake case
    function toSnakeCase(str) {
      let snk = str.replace(/([A-Z])/g, "-$1").toLowerCase();
      return snk;
    }
    // An jquery toggleClass analog for data attributes
    (function ($) {
      $.fn.toggleData = function (data_attr, val, alt) {
        return this.each(function () {
          let elem = $(this);
          if (elem.data(data_attr) == val) {
            elem.data(data_attr, alt).attr('data-' + toSnakeCase(data_attr), alt);
          }
          else {
            elem.data(data_attr, val).attr('data-' + toSnakeCase(data_attr), val);
          }
        });
      };
    }(jQuery));
    // Langs changer
    (function languageSwitcher() {
      dropdown.on('click', () => {
        $(`[data-class=lang]`).off();
        dropdown.toggleClass('not-active');
        dropdown.toggleClass('active');
        dropdown.toggleData(`status`, 'active', 'not-active');
        langsBtn.toggleClass('not-active');
        langsBtn.toggleClass('active');
        // Escape key handler
        $(document).on('keydown', (event) => {
          if (event.keyCode === 27) {
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          }
        });
        // Language click landler
        $(`[data-class=lang]`).on('click', (event) => {
          let cur = $(event.target);
          Cookies.set('lang', cur.data(`langName`));
          window.translate();
          if (!cur.is('.active')) {
            $('.languages-link')
              .removeClass('active');
            cur.addClass('active');
            dropdown.text(cur.text());
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          }
          else {
            dropdown.removeClass('active').addClass('not-active');
            langsBtn.removeClass('active').addClass('not-active');
          }
        });
      });
    })(0); // end of langs changer

    // Sticky navbar
    window.onscroll = function () { stick() };
    // Get the navbar
    var navbar = document.querySelector("#navbar");
    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stick() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        document.querySelector('.slider').style.marginTop = '64px';
        if ($(`[data-id="calendarContainer"]`).length) {
          document.querySelector(`[data-id="calendarContainer"]`).style.marginTop = '64px';
        }
        if ($('.video-title').length) {
          document.querySelector('.video-title').style.marginTop = '64px';
        }
      } else {
        navbar.classList.remove("sticky");
        document.querySelector('.slider').style.marginTop = '0';
        if ($(`[data-id="calendarContainer"]`).length) {
          document.querySelector(`[data-id="calendarContainer"]`).style.marginTop = '0';
        }
        if ($('.video-title').length) {
          document.querySelector('.video-title').style.marginTop = '0';
        }
      }
    }
    // Clear all cookies function
    window.cookieCleaner = () => {
      document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }

    // Account profile redirect
    let username = 'vasya1999';
    $(`[data-id=mybets-button]`).prop('href', `#/mybets`);
    $(`[data-id=registration-button]`).prop('href', `#/registration`);
    done();
  });
});