exports('login', (params, done) => {
  insertHtmlModules({
  }, () => {

    function sendLoginData(data) {
      //TODO: sending data for validation
      return false;
    }   

    function LoginHandler(login, blur, attempt_counter, data) {
      console.log(attempt_counter);
      let usr_name = $('#username').val();
      let password = $('#password').val();

      if (usr_name != '' && password != '') {
        
        const loginForm = {
          DATA: {
            username: usr_name,
            pass: password,
          }
        };

        let accepted = sendLoginData(loginForm);

        if (accepted) {
          login.fadeOut('middle').remove("active");
          blur.removeClass('block').addClass('none');
          Cookies.set('logon', 'true');
          console.log('success');
        } else {
          attempt_counter++;
          if (attempt_counter == 3) {
            console.log(attempt_counter);
            console.log('Blocking account...');
            /*Только для теста, потом убрать*/
            /*Вместо блокировки выполняет логин*/ 
            /*........................................*/
            login.fadeOut('middle').remove("active");
            blur.removeClass('block').addClass('none');
            Cookies.set('logon', 'true');
            console.log('success');
            /*.........................................*/
          } else if (attempt_counter == 1 || attempt_counter == 2) {
            console.log(attempt_counter);
            $('.failedLogPass').css('display', 'none');
            $('.failedLoginAccountLock').show();
            $('.failedLoginHeader').show();
            $('.loginButton').prop("onclick", null).off("click");
            $('.loginButton').on('click', () => {
              LoginHandler(login, blur, attempt_counter);
            });
          }
        }
      } else {
        if (attempt_counter == 2) {
          console.log(attempt_counter);
          console.log('Blocking account...');
        } else {
          console.log('Unsuccess');
          $('.failedLogPass').show();
          $('.loginButton').prop("onclick", null).off("click");
          $('.loginButton').on('click', () => {
            LoginHandler(login, blur, attempt_counter);
          });
        }
      }
    }

    function renderLoginPopup() {
      let renderPromise = new Promise((resolve, reject) => {
        $('.blur').removeClass('none').addClass('block');
        $(`<div style="display: none;" data-id="loginContainer" class="loginContainer">
          <div class="loginContent">
            <div class="loginHeader">Login</div>
            <!--User Name-->
            <div class="inputLogin">
              <input id="username" type="text" placeholder="User name" name="username" autocapitalize="off" autocomplete="off" autocorrect="off">
              <div class="clearButton"></div>
            </div>
            <!--Password-->
            <div class="inputPassword">
              <input id="password" type="password" placeholder="Password" name="password" autocapitalize="off" autocomplete="off" autocorrect="off">
              <div class="showPassword"></div>
            </div>
            <div class="failedLogin">
              <div class="failedLoginHeader">Your access details were not found.</div>
              <div class="failedLoginCaseSensitive">The password recognition system is case sensitive.</div>
              <div class="failedLoginAccountLock ">Your account will be blocked after three unsuccessful login attempts.</div>
              <div class="failedLogPass">Enter login and password</div>
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
        var attempt_counter = 0;

        $('.loginButton').on('click', () => {
          LoginHandler(login, blur, attempt_counter);
        });

        $('.checkboxText').on('click', checkmark);
        blur.removeClass('none').addClass('block');

        $("body").click(function (e) {
          if ($(e.target).closest(`[data-id=login]`).length != 0) return false; // disable trigger on first click to log in
          if ($(e.target).closest(`[data-id=loginContainer]`).length != 0) return false; // disable trigger on login popup
          login.fadeOut().remove("active");
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
            console.log('Checked');
          }
        }
      });
    }
    renderLoginPopup();
    // $(`[data-id=login]`).on('click', renderLoginPopup);
    done();
  });
});