exports('footer', (params, done) => {
  $('.footer').empty();
  insertHtmlModules({
    ".footer": [
      "footer/footer.html"
    ]
  }, () => {
  });
});