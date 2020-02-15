exports('regist', (params, done) => {
  $('.registrationWrapper').empty();
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
  const RegistrationForm = {
    Details: {
      Login: '',
      Password: '',
    },
    Information: {
      Country: '',
      Currency: '',
      FirstName: '',
      SecondName: '',
      Phone: {
        Operator: '',
        Number: '',
      },
      Email: '',
      BirthDate: {
        Day: '',
        Month: '',
        Year: '',
      },
      Adress: '',
      Gender: '',
    },
    Confirmation: {
      InfoProcessed: true,
      LegalAge: true,
      LegalAgeCasino: true,
      Rules: true,
    },
  };
  if (params.fast == 'fast') {
    insertHtmlModules({
      ".registrationWrapper": [
        "registration/fast.html",
      ],
    }, () => {
      // Preloader finishes
      if ($('#page-preloader').data(`status`) != 'done') {
        $('#page-preloader').addClass('done');
        $('#page-preloader').data(`status`, 'done').attr('data-status', 'done');
      }
      // Preliminary handle
      $(`[data-id=details]`).removeClass('not-active');
      $(`[data-id=details]`).addClass('active');
      $('.button.primary.disable').removeClass('disable');
      $('.button.primary.disable').addClass('backward');

      if ($('.details .sign-up-body-item').filter('.corrected').length != 4) {
        $(`[data-id=nextButton]`).addClass('disable');
      }
      else {
        $(`[data-id=nextButton]`).removeClass('disable');
      }
      $('#Login').on('input', (event) => {
        let cur = $(event.target);
        if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
          if (/^([A-Za-z0-9_-]{8,})$/.test(cur.val())) {
            onCheckmark(cur);
            if ($('.details .sign-up-body-item').filter('.corrected').length == 4) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            offCheckmark(cur);
            $(`[data-id=nextButton]`).addClass('disable');
          }
        }
      });
      $('#Login').on('blur', (event) => {
        let cur = $(event.target);
        if (cur.val().length < 8) offCheckmark(cur);
      });
      $('#Password').on('input', (event) => {
        $(`[data-id=nextButton]`).addClass('disable');
        const complex = $('.password-check');
        let cur = $(event.target);
        complex.removeClass('medium').removeClass('hight').addClass('low');
        if (cur.val().length >= 10 && cur.val().match(/[0-9]/g) !== null) {
          complex.removeClass('low').removeClass('hight').addClass('medium');
        }
        if (cur.val().length >= 14 && cur.val().match(/[A-Z]/g) !== null && cur.val().match(/[0-9]/g).length !== null) {
          complex.removeClass('low').removeClass('medium').addClass('hight');
        }
        if ((cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected'))) {
          if (/^([A-Za-z0-9]{8,})$/.test(cur.val())) {
            onCheckmark(cur);
            if (complex.is('.medium') || complex.is('.hight')) {
              onCheckmark(cur);
            }
            else {
              offCheckmark(cur);
              $(`[data-id=nextButton]`).addClass('disable');
            }
            // Additional check for  secondary password
            if ($('#PasswordSecondary').val() != cur.val() && $('#PasswordSecondary').val().length > 1) {
              $('#PasswordSecondary').parent().addClass('uncorrected').removeClass('corrected');
            }
            else {
              if ($('#PasswordSecondary').val() == cur.val())
                $('#PasswordSecondary').parent().addClass('corrected').removeClass('uncorrected');
            }
            if ($('.sign-up-body-item').filter('.corrected').length == 4) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            complex.removeClass('medium').removeClass('hight').addClass('low');
            offCheckmark(cur);
            $(`[data-id=nextButton]`).addClass('disable');
          }
        }
      });
      $('#Password').on('blur', (event) => {
        let cur = $(event.target);
        if (cur.val().length < 8) offCheckmark(cur);
      });
      $('#PasswordSecondary').on('input', (event) => {
        $(`[data-id=nextButton]`).addClass('disable');
        let cur = $(event.target);
        if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
          if (cur.val() == $('#Password').val()) {
            cur.parent()
              .addClass('corrected')
              .removeClass('uncorrected');
            if ($('.details .sign-up-body-item').filter('.corrected').length == 4) {
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
        }
      });
      $('#PasswordSecondary').on('blur', (event) => {
        let cur = $(event.target);
        if (cur.val().length < 8) offCheckmark(cur);
      });
      // Email
      $('#Email').on('input', (event) => {
        let cur = $(event.target);
        if (cur.val().length >= 6 || cur.parent().is('.corrected') || cur.parent().is('.uncorrected')) {
          if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(cur.val().toLowerCase())) {
            cur.parent().removeClass('uncorrected')
              .addClass('corrected');
            if ($('.information .sign-up-body-item').filter('.corrected').length == 4) {
              $(`[data-id=nextButton]`).removeClass('disable');
            } else {
              $(`[data-id=nextButton]`).addClass('disable');
            }
          }
          else {
            cur.parent().removeClass('corrected')
              .addClass('uncorrected');
            $(`[data-id=nextButton]`).addClass('disable');
          }
        }
      });
      $(`[data-id=nextButton]`).on('click', () => {
        RegistrationForm.Details.Login = $('#Login').val();
        RegistrationForm.Details.Password = $('#Password').val();
        RegistrationForm.Information.Email = $('#Email').val();
      });
    });
    done();
  }
  else {
    insertHtmlModules({
      ".registrationWrapper": [
        "registration/details.html",
        "registration/information.html",
        "registration/confirmation.html",
      ],
    }, () => {
      // Preloader finishes
      if ($('#page-preloader').data(`status`) != 'done') {
        $('#page-preloader').addClass('done');
        $('#page-preloader').data(`status`, 'done').attr('data-status', 'done');
      }
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
      // Form validation
      Popup.registerListener((val) => {
        if (val == 'details') {
          if ($('.details .sign-up-body-item').filter('.corrected').length != 3) {
            $(`[data-id=nextButton]`).addClass('disable');
          }
          else {
            $(`[data-id=nextButton]`).removeClass('disable');
          }
          $('#Login').on('input', (event) => {
            let cur = $(event.target);
            if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
              if (/^([A-Za-z0-9_-]{8,})$/.test(cur.val())) {
                onCheckmark(cur);
                if ($('.details .sign-up-body-item').filter('.corrected').length == 3) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                } else {
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
              else {
                offCheckmark(cur);
                $(`[data-id=nextButton]`).addClass('disable');
              }
            }
          });
          $('#Login').on('blur', (event) => {
            let cur = $(event.target);
            if (cur.val().length < 8) offCheckmark(cur);
          });
          $('#Password').on('input', (event) => {
            $(`[data-id=nextButton]`).addClass('disable');
            const complex = $('.password-check');
            let cur = $(event.target);
            complex.removeClass('medium').removeClass('hight').addClass('low');
            if (cur.val().length >= 10 && cur.val().match(/[0-9]/g) !== null) {
              complex.removeClass('low').removeClass('hight').addClass('medium');
            }
            if (cur.val().length >= 14 && cur.val().match(/[A-Z]/g) !== null && cur.val().match(/[0-9]/g).length !== null) {
              complex.removeClass('low').removeClass('medium').addClass('hight');
            }
            if ((cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected'))) {
              if (/^([A-Za-z0-9]{8,})$/.test(cur.val())) {
                onCheckmark(cur);
                if (complex.is('.medium') || complex.is('.hight')) {
                  onCheckmark(cur);
                }
                else {
                  offCheckmark(cur);
                  $(`[data-id=nextButton]`).addClass('disable');
                }
                // Additional check for  secondary password
                if ($('#PasswordSecondary').val() != cur.val() && $('#PasswordSecondary').val().length > 1) {
                  $('#PasswordSecondary').parent().addClass('uncorrected').removeClass('corrected');
                }
                else {
                  if ($('#PasswordSecondary').val() == cur.val())
                    $('#PasswordSecondary').parent().addClass('corrected').removeClass('uncorrected');
                }
                if ($('.sign-up-body-item').filter('.corrected').length == 3) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                } else {
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
              else {
                complex.removeClass('medium').removeClass('hight').addClass('low');
                offCheckmark(cur);
                $(`[data-id=nextButton]`).addClass('disable');
              }
            }
          });
          $('#Password').on('blur', (event) => {
            let cur = $(event.target);
            if (cur.val().length < 8) offCheckmark(cur);
          });
          $('#PasswordSecondary').on('input', (event) => {
            $(`[data-id=nextButton]`).addClass('disable');
            let cur = $(event.target);
            if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
              if (cur.val() == $('#Password').val()) {
                cur.parent()
                  .addClass('corrected')
                  .removeClass('uncorrected');
                if ($('.details .sign-up-body-item').filter('.corrected').length == 3) {
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
            }
          });
          $('#PasswordSecondary').on('blur', (event) => {
            let cur = $(event.target);
            if (cur.val().length < 8) offCheckmark(cur);
          });
        } else {
          if (val == 'information') {
            if ($('.information .sign-up-body-item').filter('.corrected').length != 8) {
              $(`[data-id=nextButton]`).addClass('disable');
            }
            else {
              $(`[data-id=nextButton]`).removeClass('disable');
            }
            // Country
            $('#Country').on('click', (event) => {
              let cur = $(event.target);
              cur.children('[value="0"]').wrap('<span/>')
            });
            $('#Country').on('change', (event) => {
              let cur = $(event.target);
              cur.parent()
                .removeClass('uncorrected')
                .addClass('corrected');
              if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                $(`[data-id=nextButton]`).removeClass('disable');
              } else {
                $(`[data-id=nextButton]`).addClass('disable');
              }
            });
            // Currency
            $('#Currency').on('click', (event) => {
              let cur = $(event.target);
              cur.children('[value="0"]').wrap('<span/>')
            });
            $('#Currency').on('change', (event) => {
              let cur = $(event.target);
              cur.parent()
                .removeClass('uncorrected')
                .addClass('corrected');
              if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                $(`[data-id=nextButton]`).removeClass('disable');
              } else {
                $(`[data-id=nextButton]`).addClass('disable');
              }
            });
            // Name and Surname
            $('#FirstName').on('change', (event) => {
              firstEnter++;
            });
            let firstEnter = 0;
            $('#FirstName').on('input', (event) => {
              let cur = $(event.target);
              let curNeighbour = $('#SecondName');
              if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
                if (/^([A-Za-z_-]{8,})$/.test(cur.val()) && /^([A-Za-z0-9_-]{8,})$/.test(curNeighbour.val())) {
                  onCheckmark(cur);
                  if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                    $(`[data-id=nextButton]`).removeClass('disable');
                  } else {
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
                else {
                  if (firstEnter > 1) {
                    offCheckmark(cur);
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
              }
            });
            $('#SecondName').on('change', (event) => {
              firstEnter++;
            });
            $('#SecondName').on('input', (event) => {
              let cur = $(event.target);
              let curNeighbour = $('#FirstName');
              if (cur.val().length >= 8 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
                if (/^([A-Za-z_-]{8,})$/.test(cur.val()) && /^([A-Za-z0-9_-]{8,})$/.test(curNeighbour.val())) {
                  onCheckmark(cur);
                  if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                    $(`[data-id=nextButton]`).removeClass('disable');
                  } else {
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
                else {
                  if (firstEnter > 1) {
                    offCheckmark(cur);
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
              }
            });
            // Phone
            $('#Number').on('input', (event) => {
              let cur = $(event.target);
              if (cur.val().length >= 7 || cur.parent().parent().is('.corrected') || cur.parent().parent().is('.uncorrected')) {
                if (/^([0-9]{7,})$/.test(cur.val())) {
                  onCheckmark(cur);
                  if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                    $(`[data-id=nextButton]`).removeClass('disable');
                  } else {
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
                else {
                  offCheckmark(cur);
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
            });
            // Email
            $('#Email').on('input', (event) => {
              let cur = $(event.target);
              if (cur.val().length >= 6 || cur.parent().is('.corrected') || cur.parent().is('.uncorrected')) {
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(cur.val().toLowerCase())) {
                  cur.parent().removeClass('uncorrected')
                    .addClass('corrected');
                  if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                    $(`[data-id=nextButton]`).removeClass('disable');
                  } else {
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
                else {
                  cur.parent().removeClass('corrected')
                    .addClass('uncorrected');
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
            });
            const date = {
              day: false,
              month: false,
              year: false,
            };
            // Birth Date day
            $('#Day').on('click', (event) => {
              let cur = $(event.target);
              cur.children('[value="00"]').wrap('<span/>');
            });
            $('#Day').on('change', (event) => {
              date.day = true;
              let cur = $(event.target);
              if (date.day && (date.year && date.month)) {
                onCheckmark(cur);
                if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                } else {
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
            });
            // Birth Date month
            $('#Month').on('click', (event) => {
              let cur = $(event.target);
              cur.children('[value="00"]').wrap('<span/>');
            });
            $('#Month').on('change', (event) => {
              date.month = true;
              let cur = $(event.target);
              if (date.day && (date.year && date.month)) {
                onCheckmark(cur);
                if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                } else {
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
            });
            // Birth Date year
            $('#Year').on('click', (event) => {
              let cur = $(event.target);
              cur.children('[value="00"]').wrap('<span/>');
            });
            $('#Year').on('change', (event) => {
              date.year = true;
              let cur = $(event.target);
              if (date.day && (date.year && date.month)) {
                onCheckmark(cur);
                if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                } else {
                  $(`[data-id=nextButton]`).addClass('disable');
                }
              }
            });
            // Adress
            $('#Adress').on('input', (event) => {
              let cur = $(event.target);
              if (/^[a-zA-Z0-9\s,.'-]{7,}$/.test(cur.val())) {
                cur.parent()
                  .removeClass('uncorrected')
                  .addClass('corrected');
                if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
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
            // Gender
            if (!($(`[data-class=gender]`).eq(0).is('checked')) || !($(`[data-class=gender]`).eq(1).is('checked'))) {
              $(event.target).parent()
                .removeClass('corrected')
                .addClass('uncorrected');
            }
            $(`[data-class=gender]`).on('click', (event) => {
              const cur = $(event.target);
              onCheckmark(cur);
              if ($('.information .sign-up-body-item').filter('.corrected').length == 8) {
                $(`[data-id=nextButton]`).removeClass('disable');
              } else {
                $(`[data-id=nextButton]`).addClass('disable');
              }
            });
          } else {
            if (val == 'confirmation') {
              $(`[data-id=nextButton]`).addClass('disable');
              const confs = {
                personalInfo: false,
                totalAge: false,
                casinoAge: false,
                termsCond: false,
              };
              function checkButton() {
                if (confs.personalInfo && (confs.totalAge && (confs.casinoAge && confs.termsCond))) {
                  $(`[data-id=nextButton]`).removeClass('disable');
                }
                else {
                  if (confs.personalInfo && (confs.totalAge && confs.termsCond)) {
                    $(`[data-id=nextButton]`).removeClass('disable');
                  }
                  else {
                    $(`[data-id=nextButton]`).addClass('disable');
                  }
                }
              }
              $('#personalInfo').on('click', () => {
                const cur = $(event.target);
                if (!confs.personalInfo) {
                  confs.personalInfo = true;
                  RegistrationForm.Confirmation.InfoProcessed = true;
                  checkButton();
                }
                else {
                  confs.personalInfo = false;
                  RegistrationForm.Confirmation.LegalAge = false;
                  checkButton();
                }
              });
              $('#totalAge').on('click', () => {
                const cur = $(event.target);
                if (!confs.totalAge) {
                  confs.totalAge = true;
                  RegistrationForm.Confirmation.LegalAge = true;
                  checkButton();
                }
                else {
                  confs.totalAge = false;
                  RegistrationForm.Confirmation.LegalAge = false;
                  checkButton();
                }
              });
              $('#casinoAge').on('click', () => {
                const cur = $(event.target);
                if (!confs.casinoAge) {
                  confs.casinoAge = true;
                  RegistrationForm.Confirmation.LegalAgeCasino = true;
                  checkButton();
                }
                else {
                  confs.casinoAge = false;
                  RegistrationForm.Confirmation.LegalAgeCasino = false;
                  checkButton();
                }
              });
              $('#termsCond').on('click', () => {
                const cur = $(event.target);
                if (!confs.termsCond) {
                  confs.termsCond = true;
                  RegistrationForm.Confirmation.Rules = true;
                  checkButton();
                }
                else {
                  confs.termsCond = false;
                  RegistrationForm.Confirmation.Rules = false;
                  checkButton();
                }
              });
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
          RegistrationForm.Details.Login = $('#Login').val();
          RegistrationForm.Details.Password = $('#Password').val();
          Popup.active = 'information';
        }
        else {
          if (Popup.active == 'information') {
            $(`[data-id=information]`).removeClass('active');
            $(`[data-id=information]`).addClass('not-active');
            $(`[data-id=confirmation]`).removeClass('not-active')
            $('.button.primary.disabled').removeClass('disabled');
            RegistrationForm.Information.Country = $('#Country').val();
            RegistrationForm.Information.Currency = $('#Currency').val();
            RegistrationForm.Information.FirstName = $('#FirstName').val();
            RegistrationForm.Information.SecondName = $('#SecondName').val();
            RegistrationForm.Information.Phone.Operator = $('#Operator').val();
            RegistrationForm.Information.Phone.Number = $('#Number').val();
            RegistrationForm.Information.Email = $('#Email').val();
            RegistrationForm.Information.BirthDate.Day = $('#Day').val();
            RegistrationForm.Information.BirthDate.Month = $('#Month').val();
            RegistrationForm.Information.BirthDate.Year = $('#Year').val();
            RegistrationForm.Information.Adress = $('#Adress').val();
            if (!($(`[data-class=gender]`).eq(0).is('checked'))) {
              RegistrationForm.Information.Gender = 'male';
            }
            else {
              RegistrationForm.Information.Gender = 'female';
            }
            Popup.active = 'confirmation';
          }
          else {
            const url = 'http://bestline.bet/api/?key=inplay';
            const data = JSON.stringify(RegistrationForm);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.onload = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  console.log(xhr.responseText);
                  loadJsModules({
                    popup: { popup: 'regist-popup.html', loadCSS: true, loadLanguage: false },
                  });
                  window.location.hash = '';
                } else {
                  console.error(xhr.statusText);
                }
              }
            };
            xhr.onerror = function (e) {
              console.error(xhr.statusText);
            };
            xhr.send(data);
            console.log(data);
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
      done();
    });
    window.translate();
  }
});