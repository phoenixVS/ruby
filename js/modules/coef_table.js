exports('coef_table', (params, done) => {
  insertHtmlModules({
    ".coeficient-table": [
      "main/coeficient-table.html"
    ]
  }, done);
});