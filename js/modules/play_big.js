exports('play_big', (params, done) => {
  insertHtmlModules({
    ".play-big": [
      "main/play-big.html"
    ]
  }, () => {
    // const pBlock = $('.play-big .block');
    // pBlock.parent().css('display', 'flex');
    // pBlock.css('display', 'block');
    done();
  });
});