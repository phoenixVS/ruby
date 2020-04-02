exports('aside', (params, done) => {

  insertHtmlModules({
    ".aside": [
      "aside/aside.html"
    ]
  }, () => {

    // aside handler
    let show_menu = $('.show-menu');
    let aside = $('.aside');
    show_menu.on('click', () => {
      aside.removeClass('not-active');
      aside.addClass('active');
      aside.attr('data-id', 'aside-active');
      if (typeof window.prematch === 'undefined') {
        window.sportsLoad();
      }
      RenderAside(window.inplay);

      if (sessionStorage.getItem('aside') == 'inplay') {
        RenderAside(window.inplay);
      } else if (sessionStorage.getItem('aside') == 'sport') {
        RenderAsideAll(window.inplay, window.prematch);
      } else if (sessionStorage.getItem('aside') == 'fav') {
        RenderAsideFav(window.inplay);
      } else {
        RenderAside(window.inplay);
      }
    });

    function AddFav(NAME, ID) {
      localStorage.setItem(NAME, ID);
    }

    function RemoveFav(NAME) {
      localStorage.removeItem(NAME);
    }

    jQuery.fn.outerHTML = function () {
      return $(this).clone().wrap('<div></div>').parent().html();
    };

    function resort() {
      Array.from($(`[data-id=liel`)).sort((c, n) => $(c).attr("data-sort") - $(n).attr("data-sort")).sort((c, n) => ($(n).hasClass("active") ? 1 : 0) - ($(c).hasClass("active") ? 1 : 0)).forEach((e, i) => {
        $(e).css("top", i * 37 + "px");
      });
    }

    function RenderAside(data) {
      console.log(`ra`);
      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
        <div class="search-container" data-id="search">
          <div id="search" data-id="search">
            <i class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
            <form class="search-form" data-id="search">
              <input type="text" id="search-input" placeholder="Search..." data-id="search">
            </form>
          </div>
        </div>
        <a data-id="aside-fav"class="[ favourite-category ] flex-container align-middle align-justify">
          <span class="font">My favourites</span>
          <span data-id="main-fav-star" class="star not-active:before active"></span>
        </a>
        <div class="[ tab-header border ] flex-container align-middle align-justify">
          <a data-id="aside-live" class="[ tab-link active ]">In-play</a>
          <a data-id="aside-all" class="[ tab-link ]">Sport</a>
        </div><ul data-id="aside-ul" style="position: relative; top: 0; left: 0;"></ul>`);

        /* 
        let cks = JSON.parse(JSON.stringify(Cookies.get()));
        let fav_arr = [];
        for (let i in cks) {
          let name_ = i;
          let ID_ = Cookies.get(name_);
          let id_;
    
          if (name_ != 'logon') {
            for (let j = 0; j < data.DATA.length; j++) {
              if (name_ == data.DATA[j].NA) {
                id_ = j;
    
              }
            }
          
            $(`[data-id=aside-ul]`).append(`
            <li id="${id_}" data-id="liel" data-div="aside-link-${ID_}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
            <span class="sports-${ID_}" style="margin-left: 5px; "></span>
            <span class="font sport-name" style = "margin-left: 10px;">${name_}</span>
            <span data-id="fav-star" data-sport="${ID_}" data-name="${name_}" data-clicked="on" class="star not-active:before active" style="position: absolute; left: 79%;"></span>
            </li>
            `);
            fav_arr.push(name_);
          } else {
            continue;
          }
        } */
        for (let i = 0; i < data.length; i++) {

          let ID = data[i].ID;
          let name = data[i].NA;
          let ev_count = 0;

          for (let n = 0; n < data[i].CT.length; n++) {
            ev_count++;
          }
          $(`[data-id=aside-ul]`).append(`
            <li data-d="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
            <span class="sports-${ID}" style="margin-left: 5px;"></span>
            <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
            <span style="position: absolute; left: 75%;">${ev_count} Events</span>
            </li>
            `);

          $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
            if (true) {
              window.location.hash = '/inplay/' + ID;

              aside.removeClass('active');
              aside.addClass('not-active');
            }
          });
        }
        resolve();
      });

      promise
        .then(() => {

          function checkVariable() {
            if (typeof window.prematch !== 'undefined') {
              $(`[data-id=aside-all]`).on('click', () => {
                RenderAsideAll(window.inplay, window.prematch);
              });
            }
            else {
              setTimeout(checkVariable, 100);
            }
          }

          setTimeout(checkVariable, 100);



          $(`[data-id=main-fav-star]`).click((el) => {
            //console.log("Just click");
            $(el.target).slideUp();
          });
          $(`[data-id=main-fav-star]`).click(() => {
            RenderAsideFav(window.inplay);
          });



          $(`[data-id=search]`).on('click', (el) => {
            el.stopPropagation();
            if ($(el.target).data('id') == 'search') {
              if (window.searchIsLoaded != true) {
                loadJsModules({
                  search: { loadCSS: true, loadLanguage: false },
                });
                window.searchIsLoaded = true;
                aside.removeClass('active');
                aside.addClass('not-active');

              } else {
                aside.removeClass('active');
                aside.addClass('not-active');
                $('.main-search-container').addClass('active');
                $('.main-search-container').removeClass('not-active');
                let vh = window.innerHeight * 0.01;
                // document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
              }
            } else {
              return false;
            }
          });

          sessionStorage.removeItem('aside');
          sessionStorage.setItem('aside', 'inplay');
        });

    }

    function asideOrderAnim(elem) {
      elem.stopPropagation();
      AddFav($(elem.target).data(`name`), $(elem.target).data(`sport`));
      console.log('Added to fav ' + $(elem.target).data(`sport`));
      $(elem.target).addClass('active');
      $(elem.target).removeClass('not-active');
      $(elem.target).attr('data-clicked', 'on');
      $(elem.target).parent().toggleClass("active");

      resort();
      $(elem.target).prop("onclick", null).off("click");

      $(elem.target).click((el) => {
        if ($(el.target).data('clicked') == 'on') {
          asideOrderBack(el);
        } else {
          asideOrderAnim(el);
        }
      });
    }

    function asideOrderBack(elem) {
      elem.stopPropagation();
      RemoveFav($(elem.target).data(`name`));
      $(elem.target).addClass('not-active');
      $(elem.target).removeClass('active');
      $(elem.target).attr('data-clicked', 'off');
      $(elem.target).parent().toggleClass("active");

      resort();
      $(elem.target).prop("onclick", null).off("click");

      $(elem).click((el) => {
        if ($(el.target).data('clicked') == 'on') {
          asideOrderBack(el);
        } else {
          asideOrderAnim(el);
        }
      });
    }

    function RenderAsideAll(data, prematch) {
      console.log(`render All`);
      console.log(prematch);
      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
        <div class="search-container" data-id="search">
        <div id="search" data-id="search">
            <i class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
            <form class="search-form" data-id="search">
              <input type="text" id="search-input" placeholder="Search..." data-id="search">
            </form>
          </div>
        </div>
        <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
          <span class="font">My favourites</span>
          <span data-id="main-fav-star" class="star not-active:before active"></span>
        </a>
      <div class="[ tab-header border ] flex-container align-middle align-justify">
        <a data-id="aside-live" class="[ tab-link ]">In-play</a>
        <a data-id="aside-all" class="[ tab-link active ]">Sport</a>
      </div>
      <div id='-1' data-div="asidelink/-1" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
        <span class="sports--1" style="margin-left: 5px; "></span>
        <span class="font sport-name" style = "margin-left: 10px;">Home</span>
        <span data-id="home" style="position: absolute; left: 79%;"></span>
      </div>
      <ul data-id="aside-ul" style="position:relative; width: 100%; height: auto; min-height: 500px;"></ul>`);
        /*$(`[data-id=aside-ul]`).append(`
      <li id="0" data-id="liel" data-div="home" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
      <span class="sports--1" style="margin-left: 5px; "></span>
      <span class="font sport-name" style = "margin-left: 10px;">Home</span>
      <span data-id="home" style="position: absolute; left: 79%;"></span>
      </li>
      `);*/
        let sort_counter = 0;
        let cks = getAllStorage();
        let fav_arr = [];
        for (let i = 0; i < cks.length; i++) {
          let name_ = cks[i];
          let ID_ = localStorage.getItem(name_);
          let id_;

          if (name_ != 'logon') {
            for (let j = 0; j < data.length; j++) {
              if (name_ == data[j].NA) {
                id_ = j;
              }
            }


            $(`[data-id=aside-ul]`).append(`
              <li id=${id_} data-sort="${sort_counter}" data-id="liel" data-div="asidelink/${ID_}" class="[ navigation-link ] flex-container align-middle nav-link active" style="position: absolute; width: 100%; transition: 0.5s;" >
              <span class="sports-${ID_}" style="margin-left: 5px; "></span>
              <span class="font sport-name" style = "margin-left: 10px;">${name_}</span>
              <span data-id="fav-star" data-sport="${ID_}" data-name="${name_}" data-clicked="on" class="star not-active:before active" style="position: absolute; left: 79%;"></span>
              </li>
              `);

            sort_counter++;

            fav_arr.push(name_);
          } else {
            continue;
          }
        }
        // for (let i = 0; i < data.length; i++) {

        //   let ID = data[i].ID;
        //   let name = data[i].NA;

        //   if (fav_arr.includes(name)) {
        //     continue;
        //   } else {
        //     $(`[data-id=aside-ul]`).append(`
        //     <li id="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
        //     <span class="sports-${ID}" style="margin-left: 5px; "></span>
        //     <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
        //     <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
        //     </li>
        //     `);

        //     $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
        //       if (true) {
        //         window.location.hash = '/sport/' + ID;

        //         aside.removeClass('active');
        //         aside.addClass('not-active');
        //       }
        //     });
        //   }
        // }

        for (let i = 0; i < prematch.length; i++) {

          let ID = prematch[i].ID;
          let name = prematch[i].NA;
          let PD = prematch[i].NA;
          if (ID != -2) {
            if (prematch[i].EV.length > 0) {
              /*${ID == -1 ? '<span data-id="home" style="position: absolute; left: 79%;"></span> ' : '*/
              for (event of prematch[i].EV) {
                ID = event.ID;
                name = event.NA;
                PD = event.NA;
                if (ID != -1) {

                  $(`[data-id=aside-ul]`).append(`
                  <li id="${i}" data-sort="${sort_counter}" data-id="liel" data-div="asidelink/${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: absolute;width: 100%; transition: 0.5s;" >
                  <span class="sports-${ID}" style="margin-left: 5px; "></span>
                  <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
                  <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
                  </li>
                  `);

                  sort_counter++;

                } else {
                  continue;
                }
              }
            }
            else {
              if (fav_arr.includes(name)) {
                continue;
              } else {
                if (ID != -1) {
                  $(`[data-id=aside-ul]`).append(`
                <li id="${i}" data-sort="${sort_counter}" data-id="liel" data-div="asidelink/${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: absolute; width: 100%; transition: 0.5s;" >
                <span class="sports-${ID}" style="margin-left: 5px; "></span>
                <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
                <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
                </li>
                `);
                  sort_counter++;

                } else {
                  continue;
                }
                // onclick to prematch
                $(`.navigation-link`).off();
                $(`.navigation-link`).on('click', (ev) => {
                  let cur = $(ev.target);
                  if (!cur.is(`.navigation-link`)) {
                    cur = cur.parent(`.navigation-link`);
                  }
                  console.log(cur);
                  let ID = cur.data(`div`).split('/')[1];
                  if (ID == -1) {
                    ID = 'home';
                    window.location.hash = '';
                    aside.removeClass('active');
                    aside.addClass('not-active');
                    return;
                  }
                  console.log(`//ID//${ID}`);
                  window.location.hash = '/sport/' + ID;
                  aside.removeClass('active');
                  aside.addClass('not-active');
                });
              }
            }
          }
        }

        resolve();
      });
      promise
        .then(() => {
          resort();

          $(`[data-div=home]`).on('click', () => {
            window.location.hash = '/sport/home';
          });

          $(`[data-id=aside-live]`).on('click', () => {

            RenderAside(window.inplay);
          });

          $(`[data-id=main-fav-star]`).click((el) => {
            //console.log("Just click");
            $(el.target).slideUp();
          });
          $(`[data-id=main-fav-star]`).click((el) => {
            RenderAsideFav(window.inplay);
            //console.log("FadeIn");
          });
          $(`[data-id=fav-star]`).click((elem) => {
            if ($(elem.target).data('clicked') == 'on') {
              asideOrderBack(elem);
            } else {
              asideOrderAnim(elem);
            }
          });
          $(`[data-id=search]`).on('click', (el) => {

            el.stopPropagation();
            if ($(el.target).data('id') == 'search') {
              if (window.searchIsLoaded != true) {
                loadJsModules({
                  search: { loadCSS: true, loadLanguage: false },
                });
                window.searchIsLoaded = true;
                aside.removeClass('active');
                aside.addClass('not-active');
                document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
              } else {
                aside.removeClass('active');
                aside.addClass('not-active');
                $('.main-search-container').addClass('active');
                $('.main-search-container').removeClass('not-active');
                let vh = window.innerHeight * 0.01;
                console.log(vh);
                // Then we set the value in the --vh custom property to the root of the document
                document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
                // We listen to the resize event
                // window.addEventListener('resize', () => {
                //   // We execute the same script as before
                //   let vh = window.innerHeight * 0.01;
                //   document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
                // });
              }
            } else {
              return false;
            }
          });
          sessionStorage.removeItem('aside');
          sessionStorage.setItem('aside', 'sport');
          // onclick to prematch
          $(`.navigation-link`).off();
          $(`.navigation-link`).on('click', (ev) => {
            let cur = $(ev.target);
            if (!cur.is(`.navigation-link`)) {
              cur = cur.parent(`.navigation-link`);
            }
            console.log(cur);
            let ID = cur.data(`div`).split('/')[1];
            if (ID == -1) {
              ID = 'home';
              window.location.hash = '';
              aside.removeClass('active');
              aside.addClass('not-active');
              return;
            }
            console.log(`//ID//${ID}`);
            window.location.hash = '/sport/' + ID;
            aside.removeClass('active');
            aside.addClass('not-active');
          });
        });
    }

    function getAllStorage() {

      let archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

      for (; key = keys[i]; i++) {
        archive.push(key);
      }

      return archive;
    }

    function RenderAsideFav(data) {
      console.log(`render FAV`);

      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
        <div class="search-container" data-id="search">
          <div id="search" data-id="search">
            <i class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
            <form class="search-form" data-id="search">
              <input type="text" id="search-input" placeholder="Search..." data-id="search">
            </form>
          </div>
        </div>
          <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
            <span class="font">My favourites</span>
          </a>
          <div class="[ tab-header border ] flex-container align-middle align-justify">
            <a data-id="aside-live" class="[ tab-link ]">In-play</a>
            <a data-id="aside-all" class="[ tab-link ]">All</a>
        </div>`);
        let cookies = getAllStorage();
        for (let f = 0; f < cookies.length; f++) {
          let name = cookies[f];
          let ID = localStorage.getItem(name);

          console.log("Name: " + name);
          console.log("Value: " + ID);

          if (name != 'logon' && name != 'username' && name != 'password') {
            $(`[data-id=aside]`).append(`
      <div data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
        
        <span class="sports-${ID}" style="margin-left: 5px; "></span>
        <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
      </div>
      `);
            $(`[data-id=aside-link-${ID}]`).on('click', () => {

              window.location.hash = '/sport/' + ID;

              aside.removeClass('active');
              aside.addClass('not-active');
            });
          } else {
            continue;
          }
        }
        $(`[data-id=aside-live]`).on('click', () => {
          RenderAside(window.inplay);
        });


        function checkVariable() {
          if (typeof window.prematch !== 'undefined') {
            $(`[data-id=aside-all]`).on('click', () => {
              RenderAsideAll(window.inplay, window.prematch);
            });
          }
          else {
            setTimeout(checkVariable, 100);
          }
        }

        setTimeout(checkVariable, 100);

        resolve();

      });

      promise.then(() => {
        $(`[data-id=search]`).on('click', (el) => {

          el.stopPropagation();
          if ($(el.target).data('id') == 'search') {
            if (window.searchIsLoaded != true) {
              loadJsModules({
                search: { loadCSS: true, loadLanguage: false },
              });
              window.searchIsLoaded = true;
              aside.removeClass('active');
              aside.addClass('not-active');
              document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
            } else {
              aside.removeClass('active');
              aside.addClass('not-active');
              $('.main-search-container').removeClass('not-active');
              $('.main-search-container').addClass('active');

              let vh = window.innerHeight * 0.01;
              console.log(vh);
              // Then we set the value in the --vh custom property to the root of the document
              document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
              // We listen to the resize event
              window.addEventListener('resize', () => {
                // We execute the same script as before
                let vh = window.innerHeight * 0.01;
                document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
              });
            }
          } else {
            return false;
          }
        });
        sessionStorage.removeItem('aside');
        sessionStorage.setItem('aside', 'fav');
      });
      // onclick to prematch
      $(`.navigation-link`).off();
      $(`.navigation-link`).on('click', (ev) => {
        let cur = $(ev.target);
        if (!cur.is(`.navigation-link`)) {
          cur = cur.parent(`.navigation-link`);
        }
        console.log(cur);
        let ID = cur.data(`div`).split('/')[1];
        if (ID == -1) {
          ID = 'home';
          window.location.hash = '';
          aside.removeClass('active');
          aside.addClass('not-active');
          return;
        }
        console.log(`//ID//${ID}`);
        window.location.hash = '/sport/' + ID;
        aside.removeClass('active');
        aside.addClass('not-active');
      });
    }

    let aside_close = $('.aside-close');
    aside_close.on('click', () => {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    $('.close-field').on('touchstart', () => {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    done();
  });
});