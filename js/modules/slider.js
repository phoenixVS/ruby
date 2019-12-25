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

      let urlInplay = 'http://bestline.bet/inplay/',
        urlGames = 'http://212.8.249.162:81/inplay.php',
        urlBets = 'http://bestline.bet/event/?FI=';
      // Fetch API request
      function httpGet(url, name) {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (name == 'inplay') {
              renderSlider(data);
            }
            else if (name == 'games') {
              console.log(data);
            }
            else if (name == 'bets') {
              console.log(data);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }

      httpGet(urlInplay, 'inplay');
      // httpGet(urlBets, 'bets');
      // httpGet(urlGames, 'games');

      function renderSlider(data) {
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