exports('betslip', (params, done) => {
  if ($('.betslipWrapper').length > 0) {
    $('.betslipWrapper').empty();
  }
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

    // get request body from cookies
    // let formData = new FormData();
    // formData.append('bt', 1);
    // formData.append('ns', '');
    // formData.append('mo', 1);
    // formData.append('ms', '||');
    // formData.append('cs', '||');
    // console.log(formData);
    let ns = '';
    const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
    const keys = Object.keys(parsedCookies);
    for (name of keys) {
      if (name.substring(0, 3) == 'pa_') {
        ns += parsedCookies[name];
      }
    }
    // Data to send on the server
    const data = `{
      "bt": "1",
      "ns": "${ns}",
      "mo": "1",
      "ms": "",
      "cs": ""
    }`;
    console.log(JSON.parse(data));
    const url = 'https://www.bestline.bet/bs/?op=1';

    function loadBetslip(url, callback) {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open("POST", url, false);
      xhr.send(JSON.stringify(JSON.parse(data)));
    }

    loadBetslip(url, (response) => {
      console.log(response.replace('betSlip', 'betSlipy'));
      /{bss}(.*?){bse}/i.exec(response)[1].split('&')[3].slice(3).split('||').map((item) => {
        if (item) {
          console.log(/fp=(.*)#so/i.exec(item)[1]);
          console.log(item);
        }
      });
      $('#bsDiv')
        .empty()
        .append(response.replace('betSlip', 'betSlipy'));
    });
    /* 
        // Convert fractial to decimal
        modifyBets = (od) => {
          const nums = od.split('/');
          return (nums[0] / nums[1] + 1).toFixed(2)
        };
        // Count multiplyer if avaliable
        function multiOdds() {
          if (BetslipList.uniquenes(window.BetslipList)) {
            let m = 1;
            window.BetslipList.map((item) => {
              m *= modifyBets(item.OD);
            });
            m = Math.round((m + Number.EPSILON) * 100) / 100;
            bsLink.children().children('.text-right').children('p.font').text('Multiply Odds');
            bsLink.children().children('.text-right').children('p.title').text(m);
          }
          else {
            bsLink.children().children('.text-right').children('p.font').text(' ');
            bsLink.children().children('.text-right').children('p.title').text(' ');
          }
        }
    
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
              // Moving
              // const lis = document.querySelectorAll('.single-section.standardBet > ul > li');
              // for (let i = 0; i < lis.length; li++) {
              //   lis[i].addEventListener('mousedown', (event) => {
              //     // event.preventDefault();
              //     console.log(`down`);
              //   });
              // }
              $('.deleteItem').on('click', (event) => {
                const cur = $(event.target).closest('li.hasodds');
                console.log(cur);
                let eventID = cur.closest('li.hasodds').data('event');
                let ID = cur.closest('li.hasodds').data(`id`);
                window.BetslipList.map((item, index) => {
                  if (item.eventID == eventID) {
                    window.BetslipList.splice(index, 1);
                  }
                });
                $(`.button.coefficient[data-id=${ID}]`).removeClass('selected');
                $('.betSlipyCountText').text(BetslipList.length);
                cur.animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
                  cur.remove();
                  $('.betslip-link p.betslip-link-count').attr('data', BetslipList.length);
                  if ($('.betslip-link p.betslip-link-count').attr('data') == 0) {
                    bsLink.slideUp('fast');
                  }
                  multiOdds();
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
              item.on('touchstart', (event) => {
                const cur = $(event.target);
                const li = cur.closest('li.hasodds')[0];
                const transformStyle = li.style.transform;
                const startTranslated = transformStyle.replace(/[^\d.]/g, '');
                const startX = event.originalEvent.touches[0].pageX;
                // const width = setInterval(() => {
                //   if (distance < -100) {
                //     console.log('not +100');
                //     cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance}`);
                //   }
                //   else {
                //     console.log('+100');
                //     cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance + 100}`);
                //   }
                // }, 150);
                //console.log('startX:', startX);
                let distance = 0;
                item.on('touchmove', (event) => {
                  cur.parent('.single-section.standardBet > ul > li').addClass('mov');
                  const curX = event.originalEvent.touches[0].pageX;
                  //console.log('curX:', curX);
                  distance = curX - startX;
                  console.log(distance);
                  let drugEl = $(event.target).closest('li.hasodds');
                  if (startTranslated == '') {
                    if (distance < 0) {
                      drugEl.css('transform', `translateX(${distance}px)`);
                    }
                    if (distance < -100) {
                      cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance}`);
                    }
                  }
                  else {
                    if (distance < 0) {
                      // d - 100
                      drugEl.css('transform', `translateX(${distance}px)`);
                    }
                    if (distance < -100) {
                      // -d + 100
                      cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance}`);
                    }
                  }
                });
                cur.on('touchend', (event) => {
                  const transformStyleEnd = li.style.transform;
                  let endTranslated = transformStyleEnd.replace(/[^\d.]/g, '');
                  if (endTranslated > 200) {
                    let eventID = cur.closest('li.hasodds').data('event');
                    let ID = cur.closest('li.hasodds').data(`id`);
                    window.BetslipList.map((item, index) => {
                      if (item.eventID == eventID) {
                        window.BetslipList.splice(index, 1);
                      }
                    });
                    $(`.button.coefficient[data-id=${ID}]`).removeClass('selected');
                    $('.betSlipyCountText').text(parseInt($('.betSlipyCountText').text()) - 1);
                    cur.closest('li.hasodds').animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
                      cur.closest('li.hasodds').remove();
                      if ($('.betSlipyCountText').text() == 0) {
                        blur.removeClass('block');
                        blur.addClass('none');
                        betslip.slideUp('fast');
                        if (window.BetslipList.length > 0) {
                          bsLink.slideDown('fast');
                        }
                      }
                    });
                  }
                  if (distance < -70) {
                    cur.closest('li.hasodds').css('transform', `translateX(-100px)`);
                    cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${100}`);
                  }
                  else {
                    cur.closest('li.hasodds').css('transform', ``);
                    cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${100}`);
                  }
                  cur.parent('.single-section.standardBet > ul > li').removeClass('mov');
                  event.stopPropagation();
                });
              });
              let nptChng = new Event('inputChange');
              // stakepad
              const onStake = (event) => {
                let cur = $(event.target);
                if (cur.is('.stake')) {
                  cur = cur.children('input.stk');
                }
                if (cur.is('.stakeToReturn')) {
                  cur = cur.parent('.stake').children('input.stk');
                }
                if (cur.is('.focus')) {
                  $('.stk.focus').removeClass('focus');
                  $.each($('.stk'), (i, el) => {
                    if ($(el).siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == '0.00') {
                      $(el).siblings('.stakeToReturn').addClass('hidden');
                    }
                  });
                  cur.closest('.hasodds').removeClass('keypad');
                  item.children('.stakepad').slideUp(250, function () {
                    $(this).children('.stakepad').remove();
                  });
                }
                else {
                  $('.stakepad').slideUp(250, function () {
                    $(this).remove();
                  });
                  input.removeClass('focus');
                  cur.addClass('focus');
                  cur.siblings('.stakeToReturn').removeClass('hidden');
                  cur.closest('.hasodds').append($('<div class="stakepad">').load(`./html/modules/betslip/keyboard.html`, () => {
                    cur.closest('.hasodds').addClass('keypad');
                    $('.stakepad').hide();
                    $('.stakepad').slideDown('fast');
                    $('.keyboard-button').on('touchstart', (event) => {
                      let cur = $(event.target);
                      let n = cur.html();
                      if (n == 'Done') {
                        if ($('.stk.focus').val().includes('.')) {
                          if ($('.stk.focus').val().split('.')[1].length < 1) {
                            $('.stk.focus').val($('.stk.focus').val().slice(0, -1));
                          }
                        }
                        cur.css('border-radius', '0');
                        if ($('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == '0.00') {
                          $('.stakeToReturn').addClass('hidden');
                        }
                        $('.stk.focus').removeClass('focus');
                        cur.closest('.hasodds').removeClass('keypad');
                        item.children('.stakepad').slideUp(250, function () {
                          $(this).remove();
                        });
                      }
                      else {
                        if (n == '') {
                          cur.css('border-radius', '0');
                          $('.stk.focus').val($('.stk.focus').val().slice(0, -1));
                          document.querySelector('.stk.focus').dispatchEvent(nptChng);
                        }
                        else {
                          if (n == '.') {
                            cur.css('border-radius', '0');
                            if ($('.stk.focus').val().includes('.')) { }
                            else {
                              $('.stk.focus').val($('.stk.focus').val() + n);
                              document.querySelector('.stk.focus').dispatchEvent(nptChng);
                            }
                          }
                          else {
                            if ($('.stk.focus').val().includes('.')) {
                              if ($('.stk.focus').val().split('.')[1].length < 2) {
                                $('.stk.focus').val($('.stk.focus').val() + n);
                                document.querySelector('.stk.focus').dispatchEvent(nptChng);
                              }
                            }
                            else {
                              $('.stk.focus').val($('.stk.focus').val() + n);
                              document.querySelector('.stk.focus').dispatchEvent(nptChng);
                            }
                          }
                        }
                      }
                      cur.addClass('stakePadKeyDown');
                      $('#stakePadToolTip').text(n);
                    });
                    $('.keyboard-button').on('touchend', (event) => {
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
              };
              $('.stake').on('click', onStake);
              // on input change
              const inputs = document.querySelectorAll('.stk');
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('inputChange', (event) => {
                  const cur = $(event.target);
                  let multiplyer = parseFloat(cur.parent().siblings('.odds').text());
                  let tr = parseFloat($('.stk.focus').val()) * multiplyer;
                  if (!isNaN(tr)) {
                    $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text(Math.round((tr + Number.EPSILON) * 100) / 100);
                  }
                  else {
                    $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text('0.00');
                  }
                  const total = $('#bstsx');
                  let sum = 0;
                  $('.stakeToReturn_Value').each((index, el) => {
                    sum += parseFloat($(el).text());
                  });
                  if (typeof String(sum).split('.')[1] === 'undefined') {
                    total.text('$' + sum + '.00');
                  }
                  else {
                    if (String(sum).split('.')[1].length < 2) {
                      total.text('$' + sum + '0');
                    }
                    else {
                      total.text('$' + sum);
                    }
                  }
                });
              }
              // Edit mode
              $('#bsDiv').on('editMode', function () {
                // Remove stakepad if is
                if ($('input.stk.focus').length > 0) {
                  let cur = $('input.stk.focus');
                  cur.removeClass('focus');
                  cur.siblings('.stakeToReturn').addClass('hidden');
                  cur.closest('.hasodds').removeClass('keypad');
                  item.children('.stakepad').slideUp(250, function () {
                    $(this).remove();
                  });
                }
    
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
                  let cur = $(event.target);
                  let eventID = cur.closest('li.hasodds').data('event');
                  let ID = cur.closest('li.hasodds').data(`id`);
                  window.BetslipList.map((item, index) => {
                    if (item.eventID == eventID) {
                      window.BetslipList.splice(index, 1);
                    }
                  });
                  $(`.button.coefficient[data-id=${ID}]`).removeClass('selected');
                  $('.betSlipyCountText').text(parseInt($('.betSlipyCountText').text()) - 1);
                  if (cur.is('span')) {
                    cur = cur.parent();
                  }
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
        // oddsChange class
        function appendBet(item) {
          let { eventID, eventNA, marketNA, BS, FI, HA, HD, ID, IT, NA, OD, OR, SU } = item;
          content.children('ul').append(`
                    <li class= "hasodds" data-event="${eventID}" data-BS="${BS}" data-FI="${FI}" data-HA="${HA}" data-HD="${HD}" data-ID="${ID}" data-IT="${IT}" data-NA="${NA}" data-OD="${OD}" data-OR="${OR}" data-SU="${SU}" >
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
                      <input data-inp-type="sngstk" type="text" class="stk" value="" placeholder="Stake" readonly="readonly" maxlength="9">
                        <div class="stakeToReturn hidden  ">
                          To return&nbsp;
                      <span class="stakeToReturn_Value">0.00</span>
                        </div>
                    </div>
                    </div>
                    <div class="deleteItem">Delete</div>
              </li>`);
        }
     */
    done();
  });
});