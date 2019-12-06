exports('aside', (params, done) => {
  insertHtmlModules({
    ".aside": [
      "aside/aside.html"
    ]
  }, () => {
    // aside handler
    let show_menu = $('.show-menu');
    let aside = $('.aside');
    show_menu.on('click', () => {
      aside.removeClass('not-active');
      aside.addClass('active');
    });
    let aside_close = $('.aside-close');
    aside_close.on('click', () => {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    done();
  });
});