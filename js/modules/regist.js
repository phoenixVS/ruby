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
    let curPopup = 'details';
    $('.button.primary.disable').removeClass('disable');
    $('.button.primary.disable').addClass('backward');
    // Preloader finishes
    const preloader = $('#page-preloader');
    if (preloader.data(`status`) != 'done') {
      preloader.addClass('done');
      preloader.data(`status`, 'done').attr('data-status', 'done');
    }

    // Registration logic
    // Move forward
    $(`[data-id=nextButton]`).on('click', () => {
      if (curPopup == 'details') {
        $(`[data-id=details]`).removeClass('active');
        $(`[data-id=details]`).addClass('not-active');
        $(`[data-id=information]`).removeClass('not-active');
        $(`[data-id=information]`).addClass('active');
        curPopup = 'information';
      }
      else {
        if (curPopup == 'information') {
          $(`[data-id=information]`).removeClass('active');
          $(`[data-id=information]`).addClass('not-active');
          $(`[data-id=confirmation]`).removeClass('not-active')
          $('.button.primary.disabled').removeClass('disabled');
          curPopup = 'confirmation';
        }
        else {
          // TODO: registration confirmed
        }
      }
    });
    // Move backward
    $(`[data-id=prevButton]`).on('click', () => {
      if (curPopup == 'information') {
        $(`[data-id=information]`).removeClass('active');
        $(`[data-id=information]`).addClass('not-active');
        $(`[data-id=details]`).removeClass('not-active');
        $(`[data-id=details]`).addClass('active');
        curPopup = 'details';
      }
      else {
        if (curPopup == 'confirmation') {
          $(`[data-id=confirmation]`).removeClass('active');
          $(`[data-id=confirmation]`).addClass('not-active');
          $(`[data-id=information]`).removeClass('not-active');
          $(`[data-id=information]`).addClass('active');
          curPopup = 'information';
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