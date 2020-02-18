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

    function betsCounter() {
      let counter = 0;
      const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
      const keys = Object.keys(parsedCookies);
      for (name of keys) {
        if (name.substring(0, 3) == 'pa_') {
          counter++;
        }
      }
      return counter;
    }
    // get request body from cookies
    // let formData = new FormData();
    // formData.append('bt', 1);
    // formData.append('ns', '');
    // formData.append('mo', 1);
    // formData.append('ms', '||');
    // formData.append('cs', '||');
    // console.log(formData);
    let ns = '', ms = '||';
    const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
    const keys = Object.keys(parsedCookies);
    for (name of keys) {
      if (name.substring(0, 3) == 'pa_') {
        ns += parsedCookies[name];
      }
      if (name === 'ms') {
        ms = parsedCookies[name];
      }
    }
    // Data to send on the server
    const data = `{
      "bt": "1",
      "ns": "${ns}",
      "mo": "1",
      "ms": "${ms}",
      "cs": ""
    }`;
    let url = '';
    if (typeof params.update === 'undefined') {
      url = 'https://www.bestline.bet/bs/?op=1';
    }
    else {
      url = 'https://www.bestline.bet/bs/?op=9';
    }

    function loadBetslip(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open("POST", url, true);
      xhr.send(JSON.stringify(JSON.parse(data)));
    }

    loadBetslip(url, (response) => {

      const betslipRender = new Promise((resolve, reject) => {
        /{bss}(.*?){bse}/i.exec(response)[1].split('&')[3].slice(3).split('||').map((item) => {
          if (item) {
            Cookies.set(`pa_${/fp=(.*)#so/i.exec(item)[1]}`, item + '||');
          }
        });
        if (typeof /{bss}(.*?){bse}/i.exec(response)[1].split('&')[4] !== 'undefined') {
          Cookies.remove('ms')
          Cookies.set('ms', /{bss}(.*?){bse}/i.exec(response)[1].split('&')[4].slice(3));
        }
        response = response.replace(/betSlip/g, 'betSlipy');
        // let newBetslip = $(response).find('.betSlipyCloseIcon').append(`<span class="close"></span>`);
        const newBetslip = $(response);
        const newBetslipContent = newBetslip.children('#betslipContent');
        const newBetslipFooter = newBetslip.children('#betslipFooter');
        if (newBetslipContent.find('.bs-useFreeBetAmount').length > 0) {
          if (/{(.*)}/i.exec(newBetslipContent.find('.bs-useFreeBetAmount').text())[1] == 0) {
            newBetslipContent.find('.bs-useFreeBet').addClass('hidden');
          }
        }
        newBetslipContent.find('.removeColumn').empty().append($('<span class="close remove-bet"></span>'));
        newBetslipContent.find('.single-section.standardBet ul li').each((i, el) => {
          el.classList.add('hasodds');
        });
        newBetslipContent.find('input').attr('readonly', 'readonly').attr('maxlength', '9');
        // newBetslipContent.find('.bs-MultipleBets_HighestAccumulator').children('.stake').removeClass('stake');
        // newBetslipContent.find('.bs-MultipleBets_HighestAccumulator .bs-stakeContainer').addClass('stake');
        $('.betSlipyCountText').text(betsCounter());
        $('#betslipContent')
          .empty()
          .append(newBetslipContent);
        $('#betslipFooter')
          .empty()
          .append(newBetslipFooter);
        resolve();
      });
      betslipRender.then((response) => {
        let item = $('.single-section.standardBet > ul > li');
        let input = $('input.stk');
        blur.on('click', () => {
          blur.removeClass('block');
          blur.addClass('none');
          betslip.slideUp('fast');
          if (betsCounter() > 0) {
            bsLink.slideDown('fast');
          }
        });

        // Accept changes
        $('.acceptChanges').on('click', (event) => {
          loadJsModules({
            betslip: { update: true, loadCSS: true, loadLanguage: false },
          });
        });

        $('#BetSlipEditButton').on('click', (event) => {
          $('#bsDiv').addClass('editMode').trigger('editMode');
          $(event.target).text('Done');
        });
        // Show / hide multiples
        $('.mbHeader').on('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          $('.multiplesWrapper').toggleClass('open');
          $('.multiplesWrapper').toggleClass('closed');
          if ($('.multiplesWrapper').is('.closed')) {
            $('.mbHeader .mlthd').text('Show multiples');
            $('.multiplesLabel').eq(0).slideUp('fast', () => {
              $('.multiplesLabel').eq(0).slideDown('fast');
            });
            $('.multiplesLabel').not(':eq(0)').slideUp('fast');
          } else {
            $('.multiplesLabel').not(':eq(0)').slideDown('fast');
            $('.multiplesLabel').eq(0).slideUp('fast', () => {
              $('.multiplesLabel').eq(0).slideDown('fast');
            });
            $('.mbHeader .mlthd').text('Hide multiples');
          }
        });

        let startX = 0;
        item.on('touchstart', (event) => {
          const cur = $(event.target);
          const li = cur.closest('li.hasodds')[0];
          li.classList.add('moving');
          const transformStyle = li.style.transform;
          const startTranslated = transformStyle.replace(/[^\d.]/g, '');
          startX = event.originalEvent.touches[0].pageX;
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
          cur.on('touchmove', (event) => {
            cur.parent('.single-section.standardBet > ul > li').addClass('mov');
            const curX = event.originalEvent.touches[0].pageX;
            distance = curX - startX;
            const drugEl = $(event.target).closest('.single-section.standardBet > ul > li');

            if (startTranslated == '') {
              if (distance < 0) {
                drugEl.css('transform', `translateX(${distance}px)`);
              }
              if (distance < -100) {
                cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance}px`);
              }
            }
            else {
              if (distance < 0) {
                //   // d - 100
                //   drugEl.css('transform', `translateX(${distance}px)`);
                // }
                // if (distance < -100) {
                // -d + 100
                drugEl.css('transform', `translateX(${distance - 100}px)`);
                cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${-distance + 100}px`);
              }
            }
          });
          cur.on('touchend', (event) => {
            cur.parent('.single-section.standardBet > ul > li').removeClass('mov');
            $('.deleteItem').on('touchstart', (event) => {
              const cur = $(event.target).closest('li.hasodds');
              const eventID = cur.closest('li.hasodds').data('event');
              const ID = cur.closest('li.hasodds').data(`itemFpid`);
              console.log(ID);
              const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
              const keys = Object.keys(parsedCookies);

              let counter = 0;
              for (name of keys) {
                if (name.substring(0, 3) == 'pa_') {
                  if (name.slice(3) == ID) {
                    Cookies.remove(`pa_${ID}`);
                    $(`[data-id= ${ID}]`).removeClass('selected');
                    counter--;
                  }
                  counter++;
                }
              }
              $(`.button.coefficient[data-id= ${ID}]`).removeClass('selected');
              $('.betSlipyCountText').text(betsCounter());
              $('.betslip-link p.betslip-link-count').attr('data', counter);
              cur.animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
                cur.remove();
                $('.betslip-link p.betslip-link-count').attr('data', counter);
                if ($('.betslip-link p.betslip-link-count').attr('data') == 0) {
                  bsLink.slideUp('fast');
                }
                multiOdds();
                if (betsCounter() == 0) {
                  blur.removeClass('block');
                  blur.addClass('none');
                  betslip.slideUp('fast');
                }
                if (betsCounter() > 0) {
                  loadJsModules({
                    betslip: { loadCSS: true, loadLanguage: false },
                  });
                }
              });
            });
            const transformStyleEnd = li.style.transform;
            let endTranslated = transformStyleEnd.replace(/[^\d.]/g, '');
            if (endTranslated > 200) {
              let eventID = cur.closest('li.hasodds').data('event');
              const ID = cur.closest('li.hasodds').data(`itemFpid`);

              const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
              const keys = Object.keys(parsedCookies);

              let counter = 0;
              for (name of keys) {
                if (name.substring(0, 3) == 'pa_') {
                  if (name.slice(3) == ID) {
                    Cookies.remove(`pa_${ID}`);
                    $(`[data-id=${ID}]`).removeClass('selected');
                    counter--;
                  }
                  counter++;
                }
              }

              $(`.button.coefficient[data-id= ${ID}]`).removeClass('selected');
              $('.betSlipyCountText').text(counter);
              $('.betslip-link p.betslip-link-count').attr('data', counter);
              cur.closest('li.hasodds').animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
                cur.closest('li.hasodds').remove();
                if ($('.betSlipyCountText').text() == 0) {
                  blur.removeClass('block');
                  blur.addClass('none');
                  betslip.slideUp('fast');
                  if (betsCounter() > 0) {
                    loadJsModules({
                      betslip: { loadCSS: true, loadLanguage: false },
                    });
                    bsLink.slideDown('fast');
                  }
                }
              });
            }
            if (distance < -70) {
              cur.closest('li.hasodds').css('transform', `translateX(-100px)`);
              cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${100} `);
            }
            else {
              cur.closest('li.hasodds').css('transform', ``);
              cur.closest('.single-section.standardBet > ul > li').children('.deleteItem').css('width', `${100} `);
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
          if (cur.is('.bs-stakeContainer')) {
            cur = cur.children('input.stk');
          }
          if (cur.is('.stakeToReturn')) {
            cur = cur.parent('.bs-stakeContainer').children('input.stk');
          }
          if (cur.is('.bs-StandardMultipleStake_ToReturn')) {
            cur = cur.parent('.bs-stakeContainer').children('input.stk');
          }
          if (cur.is('.stakeToReturn')) {
            cur = cur.parent('.stake').children('input.stk');
          }
          if (cur.is('.focus')) {
            $('.stk.focus').removeClass('focus');
            $.each($('.stk'), (i, el) => {
              if ($(el).siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == ' 0.00' || $(el).siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == `&nbsp;0.00`) {
                $(el).siblings('.stakeToReturn').addClass('hidden');
                $(el).siblings('.bs-StandardMultipleStake_ToReturn').addClass('hidden');
              }
            });
            if ($('.bs-StandardMultipleStake_ToReturnValue').text() == ' 0.00' || $('.bs-StandardMultipleStake_ToReturnValue').text() == ` &nbsp;0.00`) {
              $('.bs-StandardMultipleStake_ToReturn').addClass('hidden');
              console.log(`triggered`);
            }
            cur.closest('.hasodds').removeClass('keypad');
            cur.closest('.bs-stakeContainer').removeClass('keypad');
            $('.stakepad').slideUp(250, function () {
              $(this).remove();
            });
          }
          else {
            $('.stakepad').remove();
            input.removeClass('focus');
            if (cur.is('input')) {
              cur[0].classList.add('focus');
            }

            cur.siblings('.stakeToReturn').removeClass('hidden');
            cur.siblings('.bs-StandardMultipleStake_ToReturn').removeClass('hidden');
            (cur.closest('.hasodds').length == 0 ? cur.closest('.multiplesWrapper li') : cur.closest('.hasodds')).append($('<div class="stakepad">').load(`./html/modules/betslip/keyboard.html`, () => {
              cur.closest('.hasodds').addClass('keypad');
              cur.closest('.bs-stakeContainer').addClass('keypad');
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
                  $.each($('.stk'), (i, el) => {
                    if ($(el).siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == ' 0.00' || $(el).siblings('.stakeToReturn').children('.stakeToReturn_Value').text() == `&nbsp;0.00`) {
                      $(el).siblings('.stakeToReturn').addClass('hidden');
                      $(el).siblings('.bs-StandardMultipleStake_ToReturn').addClass('hidden');
                    }
                  });
                  if ($('.bs-StandardMultipleStake_ToReturnValue').text() == ' 0.00' || $('.bs-StandardMultipleStake_ToReturnValue').text() == `&nbsp;0.00`) {
                    $('.bs-StandardMultipleStake_ToReturn').addClass('hidden');
                  }
                  $('.stk.focus').removeClass('focus');
                  cur.closest('.hasodds').removeClass('keypad');
                  cur.closest('.stakepad').slideUp(250, function () {
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
        // $('.bs-stakeContainer').on('click', onStake);
        // on input change
        const inputs = document.querySelectorAll('.stk');
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener('inputChange', (event) => {
            const cur = $(event.target);
            let multiplyer = 0;
            if (cur.parent().siblings('.odds').length > 0) {
              document.querySelector('#mltsngstk').value = '';
              multiplyer = parseFloat(cur.parent().siblings('.odds').text());
            }
            else {
              if (cur.parent().siblings('.bs-multiple-default-odds').length > 0) {
                multiplyer = parseFloat(cur.parent().siblings('.bs-multiple-default-odds').text());
              }
              else {
                multiplyer = parseFloat(cur.siblings('.multiplesBetCount').text().split('x')[0]);
              }
            }
            let tr;
            if (cur.is('#mltsngstk')) {
              tr = parseFloat($('.stk.focus').val());
            }
            else {
              tr = parseFloat($('.stk.focus').val()) * multiplyer;
            }

            if (!isNaN(tr) && $('.stk.focus').val().length > 0) {
              tr = tr.toFixed(2);
              let trStr = tr.toString();

              if (typeof trStr.split('.')[1] == 'undefined') {
                trStr += '.00';
              }
              else {
                if (trStr.split('.')[1].length == 1) {
                  trStr += '0';
                }
              }
              if (cur.is('#mltsngstk')) {
                $('li.hasodds input.stk').val(trStr);
              }
              $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text(' ' + trStr);
              $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('span.bs-StandardMultipleStake_ToReturnValue').text(' ' + trStr);
            }
            else {
              if (cur.is('#mltsngstk')) {
                $('li.hasodds input').val('');
              }
              $('.stk.focus').siblings('.stakeToReturn').children('.stakeToReturn_Value').text(' 0.00');
              $('.stk.focus').siblings('.bs-StandardMultipleStake_ToReturn').children('span.bs-StandardMultipleStake_ToReturnValue').text(' 0.00');
            }
            const total = $('#bstsx');
            let sum = 0;
            $('.hasodds input.stk').each((index, el) => {
              if (el.value !== '')
                sum += parseFloat(el.value);
            });
            sum += parseFloat($('span.bs-StandardMultipleStake_ToReturnValue').text());
            // if (document.querySelector('.bs-MultipleBets_Singles .stake input.stk').value !== '') {
            //   sum += parseFloat(parseFloat(document.querySelector('.bs-MultipleBets_Singles .stake input.stk').value) * parseFloat(document.querySelector('.bs-MultipleBets_Singles .stake .multiplesBetCount').innerText.split('x')[0]));
            // }
            $('.mlt').each((index, el) => {
              if (index > 0) {
                console.log(el.querySelector('.mltbrk').innerText, ':');
                console.log(el.querySelector('.stake .bs-stakeContainer input.stk').value);
                console.log(el.querySelector('.multiplesBetCount').innerText.split('x')[0]);
                if (el.querySelector('.stake .bs-stakeContainer input.stk').value == '') return;
                sum += parseFloat(parseFloat(el.querySelector('.stake .bs-stakeContainer input.stk').value) * parseFloat(el.querySelector('.multiplesBetCount').innerText.split('x')[0]));
              }
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
            const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
            const keys = Object.keys(parsedCookies);
            for (name of keys) {
              if (name.substring(0, 3) == 'pa_') {
                Cookies.remove(name);
              }
            }
            blur.removeClass('block');
            blur.addClass('none');
            betslip.slideUp('fast');
          });
          // Remove bet
          $('.removeColumn').on('click', (event) => {
            let cur = $(event.target);
            let eventID = cur.closest('li.hasodds').data('event');
            let ID = cur.closest('li.hasodds').data(`itemFpid`);

            let counter = 0;
            const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
            const keys = Object.keys(parsedCookies);
            for (name of keys) {
              if (name.substring(0, 3) == 'pa_') {
                if (name.slice(3) == ID) {
                  Cookies.remove(`pa_${ID}`);
                  $(`[data-id= ${ID}]`).removeClass('selected');
                  counter--;
                }
                counter++;
              }
            }

            window.BetslipList.map((item, index) => {
              if (item.eventID == eventID) {
                window.BetslipList.splice(index, 1);
              }
            });
            $(`.button.coefficient[data-id= ${ID}]`).removeClass('selected');
            $('.betSlipyCountText').text(betsCounter());
            $('.betslip-link p.betslip-link-count').attr('data', betsCounter());
            if (cur.is('span')) {
              cur = cur.parent();
            }
            cur.parent().parent().animate({ "margin-right": '+=200', opacity: 0.25, height: "toggle" }, 250, () => {
              cur.parent().parent().remove();
              if ($('.betSlipyCountText').text() == 0) {
                blur.removeClass('block');
                blur.addClass('none');
                betslip.slideUp('fast');
                if (betsCounter() > 0) {
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
    });

    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };
    // Count multiplyer if avaliable
    function multiOdds() {
      if (BetslipList.uniquenes(window.BetslipList)) {
        let m = 1;
        const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
        const keys = Object.keys(parsedCookies);
        for (name of keys) {
          if (name.substring(0, 3) == 'pa_') {
            m *= modifyBets(/o=(.*)#f=/i.exec(parsedCookies[name])[1]);
          }
        }
        m = m.toFixed(2);
        let mStr = m.toString();

        if (typeof mStr.split('.')[1] == 'undefined') {
          mStr += '.00';
        }
        else {
          if (mStr.split('.')[1].length == 1) {
            mStr += '0';
          }
        }
        bsLink.children().children('.text-right').children('p.font').text('Multiply Odds');
        bsLink.children().children('.text-right').children('p.title').text(mStr);
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

    $('#betslipFooter').on('click', (event) => {
      const cur = $(event.target);
      event.preventDefault();
    });

    $('.betSlipyCloseIcon').on('click', () => {
      blur.removeClass('block');
      blur.addClass('none');
      betslip.slideUp('fast');
      if (betsCounter() > 0) {
        bsLink.slideDown('fast');
      }
      else {
        bsLink.slideUp('fast');
      }
    });
    // oddsChange class
    function appendBet(item) {
      let { eventID, eventNA, marketNA, BS, FI, HA, HD, ID, IT, NA, OD, OR, SU } = item;
      content.children('ul').append(`
            < li class= "hasodds" data-event="${eventID}" data-BS="${BS}" data-FI="${FI}" data-HA="${HA}" data-HD="${HD}" data-ID="${ID}" data-IT="${IT}" data-NA="${NA}" data-OD="${OD}" data-OR="${OR}" data-SU="${SU}" >
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

    done();
  });
});