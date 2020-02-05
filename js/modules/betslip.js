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

    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };

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
            ev.target.style.transform = `translateX(${ev.gesture.distance})`;
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
              cur.closest('.hasodds').removeClass('keypad');
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
              cur.closest('.hasodds').append($('<div class="stakepad">').load(`./html/modules/betslip/keyboard.html`, () => {
                cur.closest('.hasodds').addClass('keypad');
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
            // remove all bets
            $('.removeAll').on('click', (event) => {
              $('.button.coefficient.selected').removeClass('selected');
              item.animate({ "margin-right": '+=200' }, 150);
              window.BetslipList.splice(0, BetslipList.length);
              blur.removeClass('block');
              blur.addClass('none');
              betslip.slideUp('fast');
              if (window.BetslipList.length > 0) {
                bsLink.slideDown('fast');
              }
            });
            // Remove bet
            $('.removeColumn').on('click', (event) => {
              const cur = $(event.target);
              let eventID = cur.closest('li.hasodds').data('event');
              let ID = cur.closest('li.hasodds').data(`id`);
              window.BetslipList.map((item, index) => {
                if (item.eventID == eventID) {
                  window.BetslipList.splice(index, 1);
                }
              });
              $(`.button.coefficient[data-id=${ID}]`).removeClass('selected');
              $('.betSlipyCountText').text(parseInt($('.betSlipyCountText').text()) - 1);
              cur.parent().parent().animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
                cur.parent().parent().remove();
                if ($('.betSlipyCountText').text() == 0) {
                  blur.removeClass('block');
                  blur.addClass('none');
                  betslip.slideUp('fast');
                  if (window.BetslipList.length > 0) {
                    bsLink.slideDown('fast');
                  }
                }
              });
            });
            $('.betslip-select').on('click', (event) => {
              const cur = $(event.target);
              if ($('.betslipTypeSelector.showing').length > 0) {
                $('#BetSlipTypeSelectorWrapper').removeClass('active');
                $('#BetSlipTypeSelectorWrapper').after($('.betslipTypeSelector.showing').removeClass('showing'));
                $('.BetSlipType').off();
              }
              else {
                $('#BetSlipTypeSelectorWrapper').addClass('active');
                $('ul.bs-BetSlip').after($('#BetSlipTypesWrapper'));
                $('#bsDiv > .betslipTypeSelector').addClass('showing').hide().slideDown('fast');
                $('.BetSlipType').on('click', (event) => {
                  const cur = $(event.target);
                  let type = cur.text();
                  $('.betslip-select').data('text', type).attr('data-text', type);
                  $('#BetSlipTypeSelectorWrapper').removeClass('active');
                  $('.bet-slip-type option').each((index, item) => {
                    if ($(item).text() == type) {
                      $(item).attr('selected', 'selected');
                    }
                    else {
                      $(item).removeAttr('selected');
                    }
                  });
                  $('.BetSlipType').off();
                  $('.BetSlipType-selected').removeClass('BetSlipType-selected').addClass('BetSlipType');
                  cur.removeClass('BetSlipType').addClass('BetSlipType-selected');
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
              $(event.target).text('Edit');
              $('#BetSlipEditButton').on('click', (event) => {
                $('#bsDiv').addClass('editMode').trigger('editMode');
                $(event.target).text('Done');
              });
            });
          });
        });
    })(window.BetslipList);
    $('#betslipFooter').on('click', (event) => {
      const cur = $(event.target);
      event.preventDefault();
    });
    $('.betSlipyCloseIcon').on('click', () => {
      blur.removeClass('block');
      blur.addClass('none');
      betslip.slideUp('fast');
      if (window.BetslipList.length > 0) {
        bsLink.slideDown('fast');
      }
    });

    function appendBet(item) {
      let { eventID, eventNA, marketNA, BS, FI, HA, HD, ID, IT, NA, OD, OR, SU } = item;
      content.children('ul').append(`
                <li class= "hasodds oddsChange" data-event="${eventID}" data-BS="${BS}" data-FI="${FI}" data-HA="${HA}" data-HD="${HD}" data-ID="${ID}" data-IT="${IT}" data-NA="${NA}" data-OD="${OD}" data-OR="${OR}" data-SU="${SU}" >
              <div class="bs-ItemOverlay" ></div > <div class="selectionRow">
                <div class="restrictedMultiple"></div>
                <div class="removeColumn"><span class="close remove-bet"></span></div>
                <div class="selection">
                  <div class="selectionDescription">${NA}</div>
                  <div class="fullSlipMode">${marketNA}</div>
                  <div class="fullSlipMode">${eventNA}</div>
                </div>
                <div class="odds">${modifyBets(OD)}</div>
                <div class="stake">
                  <input data-inp-type="sngstk" type="text" class="stk" value="" placeholder="Stake" readonly="readonly">
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