exports('login', (params, done) => {
  insertHtmlModules({
  }, () => {
    function renderLoginPopup() {
      let renderPromise = new Promise((resolve, reject) => {
        $('.blur').removeClass('none').addClass('block');
        $('#content').prepend(`
        <div class="loginContainer">
          <div class="loginContent">
            <div class="loginHeader"></div>
            <!--User Name-->
            <div class="inputLogin">
              <input type="text" placeholder="User name" autocapitalize="off" autocomplete="off" autocorrect="off" class="userName">
              <div class="ClearButton"></div>
            </div>
            <!--Password-->
            <div class="inputPassword>
              <input type="password" placeholder="Password" autocapitalize="off" autocomplete="off" autocorrect="off" class="pwd">
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
                    <span type="checkbox" class="checkboxInput"></span> Remain in the system
                </label>
              </div>
            </div>
            <div class="loginButton">Login</div>
            <div class="lostLogin ">Forgot the password?</div>
          </div>
        </div>
      `);
        resolve();
      });
      renderPromise.then(() => {
        const login = $('.loginContainer');
        $('.blur').on('click', () => {
          login.css('display', 'none');
          $('.blur').removeClass('block').addClass('none');
        });
      });
    }
    $(`[data-id=login]`).on('click', renderLoginPopup);

    done();
  });
});