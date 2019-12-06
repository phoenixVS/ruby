exports('slider', (params, done) => {
  insertHtmlModules({
    ".main .slider": [
      "slider/slider.html"
    ]
  }, () => {
    // basic slider setup
    const sliderWrapper = $('.slider-wrapper');
    const sliderLinks = $('.slider-link');
    (() => {
      $('button.slider-prev').remove();
      $('button.slider-next').remove();
      sliderWrapper.css({
        'padding-left': '0px',
        'animate': 'true',
        'overflow': 'scroll',
      });
    })(0);
    // Games parsing
    (() => {
     
     let myData;

     function gameParser(gameData) {
      if (gameData.STATUS == 'SUCCESS') {

      } else {
        console.log("DATA STATUS error");
      }
     }

     setInterval(() => {
          $.ajax({
            url: "http://bestline.bet/inplay/",
            success: function (data) {
              myData = data;
            }
          });

          gameParser(myData);
      }, 5000);

    })(0);
    done();
  });
});