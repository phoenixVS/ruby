exports('login', (params, done) => {
  insertHtmlModules({
  }, () => {
    function renderLoginPopup() {
      let renderPromise = new Promise((resolve, reject) => {
        $('.blur').removeClass('none').addClass('block');
        $('#content').prepend(`
        <div data-id="loginContainer" class="loginContainer">
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
                  <div><input type="checkbox">
                  <span type="checkbox" class="checkboxInput"></span></div>
                  <div>Remain in the system</div>
                </label>
              </div>
            </div>
            <div class="loginButton">Submit</div>
            <div class="lostLogin ">Forgot the password?</div>
          </div>
        </div>
      `);
        resolve();
      });
      renderPromise.then(() => {
        $(`[data-id=login]`).off('click', renderLoginPopup);
        const login = $('.loginContainer');
        const blur = $(`[data-id=blur]`);
        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=loginContainer]`).length != 0) return false; // disable trigger on login popup
          login.fadeOut().remove("active");
          blur.removeClass('block').addClass('none');
          $(`[data-id=login]`).on('click', renderLoginPopup);
        });
        blur.removeClass('none').addClass('block');
      });
    }
    $(`[data-id=login]`).on('click', renderLoginPopup);
    done();
  });
});