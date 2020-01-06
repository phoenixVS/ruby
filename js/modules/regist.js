exports('regist', (params, done) => {
  insertHtmlModules({
    ".registrationWrapper": [
      "registration/registration.html"
    ]
  }, () => {
    function renderUserContent(username) {
      let content = $(`

      `);
      //$('.main>.container').empty();
      content.prependTo($('.main>.container')).slideDown('slow');
    }
    let renderPromise = new Promise((resolve, reject) => {
      renderUserContent(params.username);
      resolve();
    });
    renderPromise
      .then(() => {
        // Preloader finishes
        const preloader = $('#page-preloader');
        if (preloader.data(`status`) != 'done') {
          preloader.addClass('done');
          preloader.data(`status`, 'done').attr('data-status', 'done');
        }
        // Form handling
        const formWrapper = $(`[data-id=registrationWrapper]`);
        formWrapper.data(`display`, 'true').attr('display', 'block');
        formWrapper.css('display', 'block');
      });
    done();
  });
});