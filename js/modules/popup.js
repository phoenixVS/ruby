exports('popup', (params, done) => {
  const popupName = params.popup;
  $('body .popup').remove();
  $('body').append($('<div class="popup"></div>'));
  insertHtmlModules({
    '.popup': [
      `popup/${popupName}`,
    ]
  }, () => {
    $('.blur').removeClass('none').addClass('block');
    $('.blur').on('touchstart', (event) => {
      $('.blur').removeClass('block').addClass('none');
      $('body .popup').remove();
    });
    $('.sign-up-footer button').on('click', (event) => {
      $('.blur').removeClass('block').addClass('none');
      $('body .popup').remove();
    });
    done();
  });
});