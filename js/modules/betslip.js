exports('betslip', (params, done) => {
  insertHtmlModules({
    ".betslip": [
      "betslip/betslip.html"
    ]
  }, () => {
    done();
  });
});