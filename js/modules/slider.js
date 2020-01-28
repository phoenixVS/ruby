exports('slider', (params, done) => {
  insertHtmlModules({
    ".main .slider": [
      "slider/slider.html"
    ]
  }, () => {
    // basic slider setup
    const sliderWrapper = $('.slider-wrapper');
    (() => {
      $('button.slider-prev').remove();
      $('button.slider-next').remove();
      sliderWrapper.css({
        'padding-left': '0px',
        'animate': 'true',
        'overflow': 'scroll',
      });
    })(0);
    // Parse and set filters
    (() => {
      renderSlider(window.inplay);;

      function renderSlider(data) {
        console.log(data);
        if (data) {
          data.DATA.forEach((el) => {
            sliderWrapper.append(`
          <a data-id="${parseInt(el.ID)}"
            data-name="${el.NA}"
            data-order="${parseInt(el.OR)}"
            data-topic-id="${el.IT}"
            class="[ slider-link ]"
            href="#/filter/${el.ID}">
            <span class="sports-${parseInt(el.ID) + 3} [ slider-icon ]"></p>
          </a>
          `);
          });
        }
        else {
          alert('DATA 404');
        }
      }
    })(0);
    done();
  });
});