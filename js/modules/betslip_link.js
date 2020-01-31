exports('betslip_link', (params, done) => {
  insertHtmlModules({
    ".betslip-link": [
      "betslip/betslip-link.html"
    ]
  }, () => {
    const bsLink = $('.betslip-link');
    const betslip = $('.betslipWrapper');
    const coefBtn = $('button.button.coefficient');

    window.BetslipList = [];   // array of selected odds

    (() => {
      bsLink.css({
        'min-width': `${screen.width}px`,
        'max-width': `${screen.width}px`,
      });
    })(0);

    coefBtn.on('click', (event) => {
      const cur = $(event.target);
      if (cur.hasClass('selected')) {
        cur.removeClass('selected');
        BetslipList.map((item, index) => {
          if (item.eventID == cur.parent().siblings(`[data-id=event]`).data('gameId') && item.type == cur.data('type')) {
            BetslipList.splice(index, 1);
          }
        });
      }
      else {
        const BetslipItem = {};
        BetslipItem.eventID = cur.parent().siblings(`[data-id=event]`).data('gameId');
        BetslipItem.type = cur.data('type');
        BetslipList.push(BetslipItem);
        cur.addClass('selected');
        bsLink.slideDown('fast');
        console.log(`render`);
      }
      rerenderLink();
    });

    function rerenderLink() {
      $('.betslip-link p.betslip-link-count').attr('data', BetslipList.length);
      if ($('.betslip-link p.betslip-link-count').attr('data') == 0) {
        bsLink.slideUp('fast');
      }
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