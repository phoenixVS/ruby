exports('betslip', (params, done) => {
  insertHtmlModules({
    ".betslipWrapper": [
      "betslip/betslip.html"
    ]
  }, () => {
    const betslip = $('.betslipWrapper');
    const content = $('li.single-section.standardBet');
    const count = $('span.betSlipyCountText');

    betslip.slideDown('fast');

    ((bets) => {
      count.text(bets.length);
      content.append(`<ul>`);
      bets.map((item, index) => {
        content.children('ul').append(`
          <li data-item-id="0" data-item-type="single" class="restrictedCong  oddsChange hasodds " data-item-plbtid="1778" data-item-leaguecode="GUATRL" data-item-fpid="567803582" data-fixtureid="86071151" data-item-push="0">
            <div class="bs-ItemOverlay"></div> <div class="selectionRow">
              <div class="restrictedMultiple"></div>
              <div class="removeColumn"><a href="javascript:void(0);" class="remove"></a></div>
              <div class="selection">
                <div class="selectionDescription">Не забьет 1-й Гол</div>
                <div class="fullSlipMode">Следующий гол</div>
                <div class="fullSlipMode">Кобан Империал - Резерв v Депортиво Истапа - Резерв</div>
              </div>
              <div class="odds">11.00</div>
              <div class="stake">
                <input data-inp-type="sngstk" type="text" class="stk" value="" placeholder="Ставка" readonly="readonly">
                <div class="stakeToReturn hidden  ">
                  К выплате
                  <span class="stakeToReturn_Value">&nbsp;0,00</span>
                </div>
                </div>
              </div>
            <div class="deleteItem">Delete</div>
          </li>`);
      });
    })(window.BetslipList);

    function appendBet() {

    }

    done();
  });
});