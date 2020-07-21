exports('slider', (params, done) => {
	$('.slider').empty()
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
    /* (() => {
      renderSlider(window.inplay);

      function shortize(name) {
        let str = name;
        str = str.slice(0, 7);
        if (name.length > 7) {
          str += '..';
        }
        return str;
      }

      function renderSlider(data) {
        const renderSlider = new Promise((resolve, reject) => {
          if (data) {
            data.forEach((el) => {
              if (el.CT) {
                sliderWrapper.append(`
                <a data-id="${parseInt(el.ID)}"
                  data-name="${el.NA}"
                  data-order="${parseInt(el.OR)}"
                  data-topic-id="${el.IT}"
                  class="[ slider-link ]"
                  href="#/inplay/${el.ID}">
                  <span class="sports-4 [ slider-icon ]">
                  <p class="slider-text">${shortize(el.NA)}</p><span>
                </a>
              `);
              }
            });
            resolve();
          }
          else {
            alert('DATA 404');
          }
        });
        renderSlider
          .then(response => {
            let activeLink = window.location.hash.split('/')[2];
            if (typeof activeLink !== 'undefined') {
              document.querySelector(`.slider-link`).classList.remove('active');
              document.querySelector(`.slider-link[data-id="${activeLink}"]`).classList.add('active');
            }
            else {
              document.querySelector(`.slider-link`).classList.remove('active');
              document.querySelector(`.slider-wrapper .slider-link:first-child`).classList.add('active');
            }
          });
      }
		})(0); */
		(() => {
			// Start preloader
			const preloader = $('#page-preloader');
			preloader.removeClass('done').addClass('opaci');

			renderSliderNew(window.inplay);

			function shortize(name) {
				let str = name;
				str = str.slice(0, 7);
				if (name.length > 7) {
					str += '..';
				}
				return str;
			}

			function renderSliderNew(data) {

				$('.slider .slider-wrapper').empty();
				const renderSlider = new Promise((resolve, reject) => {
					if (data) {
						data.forEach(sport => {
							if (sport.categories) {
								sliderWrapper.append(`
                <a data-id="${parseInt(sport.id)}"
                  data-name="${sport.name}"
                  data-order="${parseInt(sport.priority)}"
                  data-template-id="${sport.templateId}"
                  class="[ slider-link ]"
                  href="#/inplay/${sport.id}">
                  <span class="sports-4 [ slider-icon ]">
                  <p class="slider-text">${shortize(sport.name)}</p><span>
                </a>
              `);
							}
						});
						resolve();
					}
					else {
						alert('DATA 404');
					}
				});
				renderSlider
					.then(response => {
						let activeLink = window.location.hash.split('/')[2];
						if (typeof activeLink !== 'undefined') {
							document.querySelector(`.slider-link`).classList.remove('active');
							document.querySelector(`.slider-link[data-id="${activeLink}"]`).classList.add('active');
						}
						else {
							document.querySelector(`.slider-link`).classList.remove('active');
							document.querySelector(`.slider-wrapper .slider-link:first-child`).classList.add('active');
						}
					});
			}
		})(0);
		done();
	});
});