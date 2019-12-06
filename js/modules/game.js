exports('game', (params, done) => {
  insertHtmlModules({
    ".game": [
      "game/game.html"
    ]
  }, () => {
    done();
  });
});