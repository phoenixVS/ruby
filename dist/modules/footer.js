"use strict";

exports('footer', function (params, done) {
  $('.footer').empty();
  insertHtmlModules({
    ".footer": ["footer/footer.html"]
  }, function () {});
});