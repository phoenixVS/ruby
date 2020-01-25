exports('betslip_small', (params, done) => {
  insertHtmlModules({
    ".betslip_small": [
      "betslip_small/betslip_small.html"
    ]
  }, () => {
    done();
  });
});