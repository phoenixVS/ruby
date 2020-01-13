exports('regist', (params, done) => {
  insertHtmlModules({
    ".registrationWrapper": [
      "registration/details.html",
      "registration/information.html",
      "registration/confirmation.html",
    ],
  }, () => {
    // Preliminary handle
    $(`[data-id=details]`).removeClass('not-active');
    $(`[data-id=details]`).addClass('active');
    $('.button.primary.disable').removeClass('disable');
    $('.button.primary.disable').addClass('backward');
    // curPopup handler
    Popup = {
      activeInternal: 10,
      activeListener: function (val) { },
      set active(val) {
        this.activeInternal = val;
        this.activeListener(val);
      },
      get active() {
        return this.activeInternal;
      },
      registerListener: function (listener) {
        this.activeListener = listener;
      }
    }
    // Switching checkmark
    function onCheckmark(input) {
      input.parent().parent()
        .addClass('corrected')
        .removeClass('uncorrected');
    }
    function offCheckmark(input) {
      input.parent().parent()
        .addClass('uncorrected')
        .removeClass('corrected');
    }
    // Form validation
    Popup.registerListener((val) => {
      if (val == 'details') {
        $(`[data-id=nextButton]`).addClass('disable');
        $('#Login').on('input', (event) => {
          let cur = $(event.target);
          if (/^([A-Za-z0-9_-]{8,})$/.test(cur.val())) {
            onCheckmark(cur);
            if ($('.sign-up-body-item').filter('.corrected').length == 3) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            offCheckmark(cur);
            $(`[data-id=nextButton]`).addClass('disable');
          }
        });
        $('#Password').on('input', (event) => {
          $(`[data-id=nextButton]`).addClass('disable');
          let cur = $(event.target);
          if (/^([A-Za-z0-9]{8,})$/.test(cur.val())) {
            onCheckmark(cur);
            if ($('.sign-up-body-item').filter('.corrected').length == 3) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            offCheckmark(cur);
            $(`[data-id=nextButton]`).addClass('disable');
          }
        });
        $('#PasswordSecondary').on('input', (event) => {
          $(`[data-id=nextButton]`).addClass('disable');
          let cur = $(event.target);
          if (cur.val() == $('#Password').val()) {
            cur.parent()
              .addClass('corrected')
              .removeClass('uncorrected');
            if ($('.sign-up-body-item').filter('.corrected').length == 3) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            cur.parent()
              .removeClass('corrected')
              .addClass('uncorrected');
            $(`[data-id=nextButton]`).addClass('disable');
          }
        });
      } else {
        if (val == 'information') {
          // TODO: information handlers
        } else {
          if (val == 'confirmation') {
            // TODO: conf handlers
          }
        }
      }
    });

    Popup.active = 'details';
    // Preloader finishes
    const preloader = $('#page-preloader');
    if (preloader.data(`status`) != 'done') {
      preloader.addClass('done');
      preloader.data(`status`, 'done').attr('data-status', 'done');
    }

    // Registration logic
    // Move forward
    $(`[data-id=nextButton]`).on('click', () => {
      if (Popup.active == 'details') {
        $(`[data-id=details]`).removeClass('active');
        $(`[data-id=details]`).addClass('not-active');
        $(`[data-id=information]`).removeClass('not-active');
        $(`[data-id=information]`).addClass('active');
        Popup.active = 'information';
      }
      else {
        if (Popup.active == 'information') {
          $(`[data-id=information]`).removeClass('active');
          $(`[data-id=information]`).addClass('not-active');
          $(`[data-id=confirmation]`).removeClass('not-active')
          $('.button.primary.disabled').removeClass('disabled');
          Popup.active = 'confirmation';
        }
        else {
          // TODO: registration confirmed
        }
      }
    });
    // Move backward
    $(`[data-id=prevButton]`).on('click', () => {
      if (Popup.active == 'information') {
        $(`[data-id=information]`).removeClass('active');
        $(`[data-id=information]`).addClass('not-active');
        $(`[data-id=details]`).removeClass('not-active');
        $(`[data-id=details]`).addClass('active');
        Popup.active = 'details';
      }
      else {
        if (Popup.active == 'confirmation') {
          $(`[data-id=confirmation]`).removeClass('active');
          $(`[data-id=confirmation]`).addClass('not-active');
          $(`[data-id=information]`).removeClass('not-active');
          $(`[data-id=information]`).addClass('active');
          Popup.active = 'information';
        }
      }
    });
    // const RegistrationForm = {
    //   Details: {
    //     Login: '',
    //     Password: '',
    //   },
    //   Information: {
    //     Country: 1,
    //     Currency: 1,
    //     FirstName: '',
    //     SecondName: '',
    //     Phone: {
    //       Operator: 1,
    //       Number: 1234567,
    //     },
    //     Email: '',
    //     BirthDate: {
    //       Day: 1,
    //       Month: 1,
    //       Year: 1,
    //     },
    //     Adress: '',
    //     Gender: 'woman',
    //   },
    //   Confirmation: {
    //     InfoProcessed: true,
    //     LegalAge: true,
    //     LegalAgeCasino: true,
    //     Rules: true,
    //   },
    // };
    done();
  });
});