exports('play_table', (params, done) => {
  insertHtmlModules({
    ".play-table": [
      "play-table/play-table.html"
    ]
  }, () => {
    const rows = $('.play-table .row');
    (() => {
      rows.on('click', () => {

      });
    })(0);

    done();
  });
});