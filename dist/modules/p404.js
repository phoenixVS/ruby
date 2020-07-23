"use strict";

exports('p404', function (params, done) {
  insertHtmlModules({// ".play-big": [
    //   "main/play-big.html"
    // ]
  }, function () {
    // Preloader finishes
    var preloader = $('#page-preloader');

    if (preloader.data("status") != 'done') {
      preloader.addClass('done');
      preloader.data("status", 'done').attr('data-status', 'done');
    }

    $('.main').empty().append("\n      <div id=\"404\"><p>oops...</p>\n      <h2>Page not found </h2>\n      </div>\n    ").css({
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      color: 'white'
    });
  });
});