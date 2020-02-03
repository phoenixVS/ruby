exports('betslip', (params, done) => {
  insertHtmlModules({
    ".betslipWrapper": [
      "betslip/betslip.html"
    ]
  }, () => {
    const betslip = $('.betslipWrapper');
    const bsLink = $('.betslip-link');
    const blur = $(`[data-id=blur]`);
    const content = $('li.single-section.standardBet');
    const count = $('span.betSlipyCountText');

    blur.removeClass('none');
    blur.addClass('block');
    betslip.slideDown('middle');

    if (Cookies.get('logon') == 'true') {
      // TODO: clear LOGIN button
    }
    else {
      $('.betSlipyLogin').on('click', () => {
        blur.removeClass('block');
        blur.addClass('none');
        betslip.slideUp('fast');
        loadJsModules({
          login: { loadCSS: true, loadLanguage: false },
        });
      });
    }
    ((bets) => {
      const betsRenderer = new Promise((resolve, reject) => {
        count.text(bets.length);
        content.append(`<ul>`);
        bets.map((item, index) => {
          appendBet(item);
        });
        resolve();
      });
      betsRenderer
        .then((response) => {
          let item = $('.single-section.standardBet > ul > li');
          let input = $('input.stk');
          blur.on('click', () => {
            blur.removeClass('block');
            blur.addClass('none');
            betslip.slideUp('fast');
            if (window.BetslipList.length > 0) {
              bsLink.slideDown('fast');
            }
          });
          $('#BetSlipEditButton').on('click', (event) => {
            $('#bsDiv').addClass('editMode').trigger('editMode');
            $(event.target).text('Done');
          });
          item.hammer().on('swipeleft', function (ev) {
            if (ev.gesture.distance > 100) {
              console.log(ev.gesture.distance);
              ev.target.style.transform = 'translateX(-100px)';
            }
          });
          input.on('click', (event) => {
            const cur = $(event.target);
            if (cur.is('.focus')) {
              input.removeClass('focus');
              cur.siblings('.stakeToReturn').addClass('hidden');
              item.children('.stakepad').slideUp(250, function () {
                $(this).remove();
              });
            }
            else {
              $('.stakepad').slideUp(250, function () {
                $(this).remove();
              });
              input.removeClass('focus');
              cur.addClass('focus');
              $('.stakeToReturn').addClass('hidden');
              cur.siblings('.stakeToReturn').removeClass('hidden');
              cur.closest('.restrictedCong').append($('<div class="stakepad">').load(`./html/modules/betslip/keyboard.html`, () => {
                $('.stakepad').hide();
                $('.stakepad').slideDown('fast');
                $('.keyboard-button').on('mousedown', (event) => {
                  let cur = $(event.target);
                  let n = cur.html();
                  cur.addClass('stakePadKeyDown');
                  $('#stakePadToolTip').text(n);
                });
                $('.keyboard-button').on('mouseup', (event) => {
                  let cur = $(event.target);
                  let n = cur.html();
                  cur.removeClass('stakePadKeyDown');
                  $('#stakePadToolTip').empty();
                });
                $('.keyboard-button').on('click', (event) => {
                  event.preventDefault();
                  let cur = $(event.target);
                  let n = cur.html();
                });
              }));
            }
          });
          $('#bsDiv').on('editMode', function () {
            $('#BetSlipEditButton').off();
            $('.removeAll').on('click', (event) => {
              $('.button.coefficient.selected').removeClass('selected');
              window.BetslipList.splice(0, BetslipList.length);
              blur.removeClass('block');
              blur.addClass('none');
              betslip.slideUp('fast');
              if (window.BetslipList.length > 0) {
                bsLink.slideDown('fast');
              }
            });
            $('#BetSlipTypeSelectorWrapper').on('click', (event) => {
              const cur = $(event.target);
              if ($('.betslipTypeSelector.showing').length > 0) {
                cur.parent().removeClass('active');
                $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
                $('.BetSlipType').off();
              }
              else {
                cur.parent().addClass('active');
                $('ul.bs-BetSlip').after($('#BetSlipTypesWrapper'));
                $('#bsDiv > .betslipTypeSelector').addClass('showing').hide().slideDown('fast');
                $('.BetSlipType').on('click', (event) => {
                  $('.bet-slip-type option').attr('selected', '');
                  $(`.bet-slip-type option:contains("${$('.BetSlipType').text()}")`).attr('selected', 'selected');
                  $('.BetSlipType-selected').removeClass('BetSlipType-selected').addClass('BetSlipType');
                  $(event.target).removeClass('BetSlipType').addClass('BetSlipType-selected');
                  $('#BetSlipTypeSelector').text($('.BetSlipType-selected').text());
                  $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
                });
                $('.BetSlipType-selected').on('click', (event) => {
                  $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
                });
              }
            });
            $('#BetSlipEditButton').on('click', (event) => {
              $('#bsDiv').removeClass('editMode');
              $('.remove-bet').on('click', (event) => {
                const cur = $(event.tartget);
                let eventID = cur.parent().parent().attr('data-event');
                // TODO: remove element
              });
              $(event.target).text('Edit');
              $('#BetSlipEditButton').on('click', (event) => {
                $('#bsDiv').addClass('editMode').trigger('editMode');
                $(event.target).text('Done');
              });
            });
          });
        });
    })(window.BetslipList);

    $('.betSlipyCloseIcon').on('click', () => {
      blur.removeClass('block');
      blur.addClass('none');
      betslip.slideUp('fast');
      if (window.BetslipList.length > 0) {
        bsLink.slideDown('fast');
      }
    });

    function appendBet(item) {
      let { eventID, type, coef } = item;
      content.children('ul').append(`
          <li data-event="${eventID} data-coef="${coef}" data-type="${type}">
            <div class="bs-ItemOverlay"></div> <div class="selectionRow">
              <div class="restrictedMultiple"></div>
              <div class="removeColumn"><span class="close remove-bet"></span></div>
              <div class="selection">
                <div class="selectionDescription">Не забьет 1-й Гол</div>
                <div class="fullSlipMode">Следующий гол</div>
                <div class="fullSlipMode">Кобан Империал - Резерв v Депортиво Истапа - Резерв</div>
              </div>
              <div class="odds">${coef}</div>
              <div class="stake">
                <input data-inp-type="sngstk" type="text" class="stk" value="" placeholder="Ставка" readonly="readonly">
                <div class="stakeToReturn hidden  ">
                  To return
                  <span class="stakeToReturn_Value">&nbsp;0,00</span>
                </div>
                </div>
              </div>
            <div class="deleteItem">Delete</div>
          </li>`);
    }

    done();
  });
});