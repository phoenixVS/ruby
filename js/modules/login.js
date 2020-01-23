exports('login', (params, done) => {
  insertHtmlModules({
  }, () => {
    function renderLoginPopup() {
      let renderPromise = new Promise((resolve, reject) => {
        $('.blur').removeClass('none').addClass('block');
        $(`<div style="display: none;" data-id="loginContainer" class="loginContainer">
          <div class="loginContent">
            <div class="loginHeader">Login</div>
            <!--User Name-->
            <div class="inputLogin">
              <input type="text" placeholder="User name" name="username" autocapitalize="off" autocomplete="off" autocorrect="off">
              <div class="clearButton"></div>
            </div>
            <!--Password-->
            <div class="inputPassword">
              <input type="password" placeholder="Password" name="password" autocapitalize="off" autocomplete="off" autocorrect="off">
              <div class="showPassword"></div>
            </div>
            <div class="failedLogin">
              <div class="failedLoginHeader">Your access details were not found.</div>
              <div class="failedLoginCaseSensitive">The password recognition system is case sensitive.</div>
              <div class="failedLoginAccountLock ">Your account will be blocked after three unsuccessful login attempts.</div>
            </div>
            <div class="stayInContainer">
              <div class="checkboxContainer">
                <label class="checkboxText">
                Remain in the system
                  <input id="checkbox" type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="loginButton">Submit</div>
            <div class="inscriptions">
              <span class="lostLogin">Forgot the password?</span>
              <span class="register">Registration</span>
            </div>
          </div>
        </div>
      `).prependTo('#content').fadeIn('middle');
        resolve();
      });
      renderPromise.then(() => {
        // $(`[data-id=login]`).off('click', renderLoginPopup);
        const login = $('.loginContainer');
        const blur = $(`[data-id=blur]`);
        $('.loginButton').on('click', () => {
          login.fadeOut('middle').remove("active").remove();
          blur.removeClass('block').addClass('none');
          Cookies.set('logon', 'true');
          //$(`[data-id=login]`).on('click', renderLoginPopup);
        });
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=loginContainer]`).length != 0) return false; // disable trigger on login popup
          login.fadeOut().remove("active");
          login.remove();
          blur.removeClass('block').addClass('none');
          // $(`[data-id=login]`).on('click', renderLoginPopup);
        });
        // Checkbox handler
        function checkmark() {
          if ($('#checkbox').is(':checked')) {
            $('#checkbox').prop('checked', false);
          }
          else {
            $('#checkbox').prop('checked', true);
          }
        }
        $('.checkboxText').on('click', checkmark);
        blur.removeClass('none').addClass('block');
      });
    }
    renderLoginPopup();
    // $(`[data-id=login]`).on('click', renderLoginPopup);
    done();
  });
});