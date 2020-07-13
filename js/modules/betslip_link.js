exports('betslip_link', (params, done) => {
  if (document.querySelector('.betslip-link').innerHTML.length > 0) {
    // $('.betslip-link').empty();ы
  }
  else {
    insertHtmlModules({
      ".betslip-link": [
        "betslip/betslip-link.html"
      ]
    }, () => {
      $('.betslip-link .mini-loader').addClass('done');
      rerenderLink(betsCounter());
    });
  }
  const bsLink = $('.betslip-link');
  const betslip = $('.betslipWrapper');
  const coefBtn = $('button.button.coefficient');

  bsLink.off();
  coefBtn.off();

  function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    })
  }

  // Evaluate number of bets in cookies
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

  window.BetslipList = [];   // array of selected odds
  BetslipList.uniquenes = (betsList) => {
    let ids = [];
    betsList.map((item) => {
      ids.push(item.eventID);
    });
    if (window.BetslipList.length > uniq(ids).length) {
      return false;
    }
    return true;
  }

  let counter = 0;
  const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
  const keys = Object.keys(parsedCookies);
  for (name of keys) {
    if (name.substring(0, 3) == 'pa_') {
      $(`[data-id=${name.slice(3)}]:not(.disabled)`).addClass('selected');
      counter++;
    }
  }

  PAs = {
    activeInternal: 10,
    activeListener: function (val) { },
    set active(val) {
      this.activeInternal = val;
      this.activeListener(val);
    },
    get active() {
      return this.activeInternal;
    },
    changeListener: function (listener) {
      this.activeListener = listener;
    }
  }

  PAs.changeListener((val) => {
    if (betsCounter() == 0) {
      bsLink.slideUp('fast');
    }
    else {
      rerenderLink(betsCounter());
    }
  });

  if (betsCounter() != 0) {
    PAs.active = betsCounter;
    // bsLink.slideDown('fast');
    rerenderLink(betsCounter());
  }
  else {
    bsLink.slideUp('fast');
  }

  function multiOdds() {
    if (BetslipList.uniquenes(window.BetslipList)) {
      let m = 1;
      const parsedCookies = JSON.parse(JSON.stringify(Cookies.get()));
      const keys = Object.keys(parsedCookies);

      for (name of keys) {
        if (name.substring(0, 3) == 'pa_') {
          m *= (/o=(.*)#f=/i.exec(parsedCookies[name])[1].includes('/') ? modifyBets(/o=(.*)#f=/i.exec(parsedCookies[name])[1]) : /o=(.*)#f=/i.exec(parsedCookies[name])[1]);
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
      $('.betslip-link .mini-loader').css({
        '-webkit-transform': 'translateZ(0) translateX(0vw)',
        '-ms-transform': 'translateZ(0) translateX(0w)',
        'transform': 'translateZ(0) translateX(0vw)',
      });
      $('.betslip-link .text-right').show();
      bsLink.children().children('.text-right').children('p.font').text(window.dict.multiodds);
      bsLink.children().children('.text-right').children('p.title').text(mStr);
    }
    else {
      $('.betslip-link .text-right').hide();
      bsLink.children().children('.text-right').children('p.font').html('&nbsp;');
      bsLink.children().children('.text-right').children('p.title').html('&nbsp;');
    }
  }

  (() => {
    if (window.innerHeight > window.innerWidth) {
      bsLink.css({
        'min-width': `${screen.width}px`,
        'max-width': `${screen.width}px`,
      });
    }
    else {
      bsLink.css({
        'min-width': `60vw`,
        'max-width': `60vw`,
      });
    }
  })(0);

  async function addBet() {

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

    const reqData = {
      ns: ns,
      ms: ms,
    }

    console.log("ADD_BET");
    const rawResponse = await fetch('https://bestline.bet/betsapi/addbet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    });
    const content = await rawResponse.json();
    changes = content.sr !== 0 && content.sr !== 2 && typeof content.sr !== 'undefined';
    /*if sr == 0 - place bet*/
    /*if sr == 2 - */
    console.log(content);
  }

  coefBtn.on('click', (event) => {
    const cur = $(event.target).closest('.button.coefficient');
    if (cur.hasClass('selected')) {
      Cookies.remove('pa_' + cur[0].dataset.id);
      cur.removeClass('selected');
      multiOdds();
      BetslipList.map((item, index) => {
        if (item.eventID == cur.parent().siblings(`[data-id=event]`).data('gameId') && item.type == cur.data('type')) {
          BetslipList.splice(index, 1);
        }
      });
      PAs.active = betsCounter();
    }
    else {
      const BetslipItem = {};
      BetslipItem.eventID = cur.parent().siblings(`[data-id=event]`).data('gameId');
      BetslipItem.eventNA = cur.data(`eventna`);
      BetslipItem.CL = cur.data(`cl`);
      BetslipItem.marketNA = cur.data(`marketna`);
      BetslipItem.BS = cur.data(`bs`);
      BetslipItem.FI = cur.data(`fi`);
      BetslipItem.HA = cur.data(`ha`);
      BetslipItem.HD = cur.data(`hd`);
      BetslipItem.ID = cur.data(`id`);
      BetslipItem.IT = cur.data(`it`);
      BetslipItem.NA = cur.data(`na`);
      BetslipItem.OD = cur.data(`od`);
      BetslipItem.OR = cur.data(`or`);
      BetslipItem.SU = cur.data(`su`);
      BetslipList.push(BetslipItem);
      const date = new Date();
      let timestamp = date.getTime();
      timestamp = Math.round(timestamp / 1000);
      let tsToHex = timestamp.toString(16);
      console.log(tsToHex);
      Cookies.set('pa_' + cur[0].dataset.id,
        'pt=N#'
        + 'o=' + BetslipItem.OD + '#'
        + 'f=' + BetslipItem.FI + '#'
        + 'fp=' + BetslipItem.ID + '#'
        + 'so=' + '#'
        + 'c=' + BetslipItem.CL + '#'
        + 'id=' + BetslipItem.FI + '-' + BetslipItem.ID + 'Y' + '#'
        + 'sa=' + tsToHex + '-' + '60D0DCE9' + '#'
        + '|FO=' + 'False' + '#'
        + 'mt=' + '2' + '#'
        + 'st=' + '#'
        + 'tr=' + '#'
        + 'es=' + '1' + '#'
        + 'ust=' + '#'
        + 'TP=' + 'BS' + BetslipItem.FI + '-' + BetslipItem.ID + '#'
        // + 'pbc=' + '0' + '#'
        + '||');
      // console.log(Cookies.get('pa_' + cur[0].dataset.id));
      cur.addClass('selected');
      bsLink.slideDown('fast');
      rerenderLink(betsCounter());
      PAs.active = betsCounter();

      addBet();
    }
  });

  $('.button.coefficient.disabled').off('click');

  // Convert fractial to decimal
  function modifyBets(od) {
    const nums = od.split('/');
    return (nums[0] / nums[1] + 1).toFixed(2)
  };

  // rerenderLink(PAs.active);
  function rerenderLink(val) {
    if (val == 0) {
      bsLink.slideUp('fast');
    }
    if (val >= 1) {
      bsLink.slideDown('fast');
    }
    $('.betslip-link p.betslip-link-count').attr('data', betsCounter());
    if (val > 1) {
      multiOdds();
    }
    else {
      $('.betslip-link .mini-loader').css({
        '-webkit-transform': 'translateZ(0) translateX(-7vw)',
        '-ms-transform': 'translateZ(0) translateX(-7vw)',
        'transform': 'translateZ(0) translateX(-7vw)',
      });
      $('.betslip-link .text-right').hide();
      bsLink.children().children('.text-right').children('p.font').html('&nbsp;');
      bsLink.children().children('.text-right').children('p.title').html('&nbsp;');
    }
    window.translate();
  }

  $('.betslip-link .mini-loader').addClass('done');

  bsLink.on('click', (event) => {
    bsLink.off();
    // bsLink.slideUp('fast');
    $('.betslip-link .mini-loader').removeClass('done');
    loadJsModules({
      betslip: { loadCSS: true, loadLanguage: false },
    });
  });

});