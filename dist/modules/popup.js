"use strict";

exports('popup', function (params, done) {
  var popupName = params.popup;
  $('body .popup').remove();
  $('body').append($('<div class="popup"></div>'));
  insertHtmlModules({
    '.popup': ["popup/".concat(popupName)]
  }, function () {
    $('.blur').removeClass('none').addClass('block');
    $('.blur').on('touchstart', function (event) {
      $('.blur').removeClass('block').addClass('none');
      $('body .popup').remove();
    });
    $('.sign-up-footer button').on('click', function (event) {
      $('.blur').removeClass('block').addClass('none');
      $('body .popup').remove();
    });
    done();
  });
});