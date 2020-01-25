exports('betslip_link', (params, done) => {
  insertHtmlModules({
    ".betslip-link": [
      "betslip/betslip-link.html"
    ]
  }, () => {
    const bsLink = $('.betslip-link');
    (() => {
      bsLink.css({
        'min-width': `${screen.width}px`,
        'max-width': `${screen.width}px`,
      });
    })(0);

    done();
  });
});