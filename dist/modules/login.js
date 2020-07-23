"use strict";

exports('login', function (params, done) {
  insertHtmlModules({}, function () {
    function sendLoginData(data) {
      //TODO: sending data for validation
      return false;
    }

    function LoginHandler(login, blur, attempt_counter, data) {
      loginValidation();
      console.log(attempt_counter);
      var usr_name = $('#username').val();
      var password = $('#password').val();

      if (usr_name.length >= 8 && password.length >= 8) {
        var loginForm = {
          DATA: {
            username: usr_name,
            pass: password
          }
        };
        var accepted = sendLoginData(loginForm);

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

            /*.......................................*/

            login.fadeOut('middle').remove("active");
            blur.removeClass('block').addClass('none');
            Cookies.set('logon', 'true');
            console.log('success');
            /*.........................................*/
          } else if (attempt_counter == 1 || attempt_counter == 2) {
            console.log(attempt_counter);
            $('.failedLogChar').css('display', 'none');
            $('.failedLoginAccountLock').show();
            $('.failedLoginHeader').show();
            $('.loginButton').prop("onclick", null).off("click");
            $('.loginButton').on('click', function () {
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
          $('.failedLogChar').show();
          $('.loginButton').prop("onclick", null).off("click");
          $('.loginButton').on('click', function () {
            LoginHandler(login, blur, attempt_counter);
          });
        }
      }
    }

    function loginValidation() {
      var input = $("[data-req=1]");
      var regExp = input.data('reg-exp');
      console.log(regExp);
      console.log(input.val());

      if (input.val().match(regExp)) {
        console.log("OK");
      } else {
        console.log("Not valid");
      }
    }

    function renderLoginPopup() {
      var renderPromise = new Promise(function (resolve, reject) {
        $('.blur').removeClass('none').addClass('block');
        $("<div style=\"display: none;\" data-id=\"loginContainer\" class=\"loginContainer\">\n          <div class=\"loginContent\" style=\"display: inline-table\">\n            <div class=\"loginHeader\" data-lang=\"login\">Login</div>\n            <!--User Name-->\n            <div class=\"inputLogin\">\n              <input data-req=\"1\" data-reg-exp=\"/^([A-Za-z0-9]{8,})$/\" data-lang=\"usrname\" id=\"username\" type=\"text\" placeholder=\"User name\" name=\"username\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\">\n              <div class=\"clearButton\"></div>\n            </div>\n            <!--Password-->\n            <div class=\"inputPassword\">\n              <input data-req=\"1\" id=\"password\" type=\"password\" data-lang=\"pass\" placeholder=\"Password\" name=\"password\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\">\n              <div class=\"showPassword\"></div>\n            </div>\n            <div class=\"failedLogin\">\n              <div class=\"failedLoginHeader\">Your access details were not found.</div>\n              <div class=\"failedLoginCaseSensitive\">The password recognition system is case sensitive.</div>\n              <div class=\"failedLoginAccountLock \">Your account will be blocked after three unsuccessful login attempts.</div>\n              <div class=\"failedLogPass\">Enter login and password</div>\n              <div class=\"failedLogChar\">Login and password must be at least 8 characters length.</div>\n            </div>\n            <div class=\"stayInContainer\">\n              <div class=\"checkboxContainer\">\n                <label class=\"checkboxText\" data-lang=\"remain\">\n                Remain in the system\n                  <input id=\"checkbox\" type=\"checkbox\">\n                  <span class=\"checkmark\"></span>\n                </label>\n              </div>\n            </div>\n            <div class=\"loginButton\" data-lang=\"submit\">Submit</div>\n            <div class=\"inscriptions\">\n              <span class=\"lostLogin\" data-lang=\"password\">Forgot the password?</span>\n              <span class=\"register\" data-lang=\"register\">Registration</span>\n            </div>\n          </div>\n        </div>\n      ").prependTo('#content').fadeIn('middle');
        resolve();
      });
      renderPromise.then(function () {
        $('.register').on('click', function () {
          login.fadeOut('middle').remove("active");
          blur.removeClass('block').addClass('none');
          window.location.hash = "/registration/";
        }); //$(`[data-id=login]`).off('click', renderLoginPopup);

        var login = $('.loginContainer');
        var blur = $("[data-id=blur]");
        var attempt_counter = 0;
        $('.loginButton').on('click', function () {
          LoginHandler(login, blur, attempt_counter);
        });
        $('.checkboxText').on('click', checkmark);
        blur.removeClass('none').addClass('block');
        $("body").click(function (e) {
          if ($(e.target).closest("[data-id=login]").length != 0) return false; // disable trigger on first click to log in

          if ($(e.target).closest("[data-id=loginContainer]").length != 0) return false; // disable trigger on login popup

          login.fadeOut().remove("active");
          blur.removeClass('block').addClass('none'); // $(`[data-id=login]`).on('click', renderLoginPopup);
        }); // Checkbox handler

        function checkmark() {
          if ($('#checkbox').is(':checked')) {
            $('#checkbox').prop('checked', false);
          } else {
            $('#checkbox').prop('checked', true);
            console.log('Checked');
          }
        }

        window.translate();
      });
    }

    renderLoginPopup(); // $(`[data-id=login]`).on('click', renderLoginPopup);

    done();
  });
});