exports('betslip_link', (params, done) => {
  if ($('.betslip-link').length > 0) {
    $('.betslip-link').empty();
  }
  insertHtmlModules({
    ".betslip-link": [
      "betslip/betslip-link.html"
    ]
  }, () => {
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

    (() => {
      bsLink.css({
        'min-width': `${screen.width}px`,
        'max-width': `${screen.width}px`,
      });
    })(0);

    coefBtn.on('click', (event) => {
      const cur = $(event.target).closest('.button.coefficient');
      if (cur.hasClass('selected')) {
        cur.removeClass('selected');
        Cookies.remove('pa_' + cur[0].dataset.id);
        BetslipList.map((item, index) => {
          if (item.eventID == cur.parent().siblings(`[data-id=event]`).data('gameId') && item.type == cur.data('type')) {
            BetslipList.splice(index, 1);
          }
        });
      }
      else {
        const BetslipItem = {};
        BetslipItem.eventID = cur.parent().siblings(`[data-id=event]`).data('gameId');
        BetslipItem.eventNA = cur.data(`eventna`);
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
        const timestamp = date.getTime();
        let tsToHex = timestamp.toString(16);
        Cookies.set('pa_' + cur[0].dataset.id, 'o=' + BetslipItem.OD + '#'
          + 'f=' + BetslipItem.FI + '#'
          + 'fp=' + BetslipItem.ID + '#'
          + 'id=' + BetslipItem.FI + '-' + BetslipItem.ID + 'Y' + '#'
          + 'sa=' + tsToHex + '||');
        // console.log(Cookies.get('pa_' + cur[0].dataset.id));
        cur.addClass('selected');
        bsLink.slideDown('fast');
      }
      rerenderLink();
    });
    $('.button.coefficient.disabled').off('click');
    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };

    function rerenderLink() {
      $('.betslip-link p.betslip-link-count').attr('data', BetslipList.length);
      if ($('.betslip-link p.betslip-link-count').attr('data') == 0) {
        bsLink.slideUp('fast');
      }
      multiOdds();
    }

    bsLink.on('click', (event) => {
      bsLink.slideUp('fast');
      betslip.empty();
      loadJsModules({
        betslip: { loadCSS: true, loadLanguage: false },
      });
    });
    done();
  });
});