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
      let kek = ['val'];
      RenderAside(kek);

      if (sessionStorage.getItem('aside') == 'inplay') {
        let kek = ['val'];
        RenderAside(kek);
      } else if (sessionStorage.getItem('aside') == 'sport') {
        RenderAsideAll(window.inplay, window.prematch); RenderAsideAll
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

    function RenderAside(data) {
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
        }*/
        for (let i = 0; i < data.length; i++) {/*

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
          });*/
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

          $(`[data-id=fav-star]`).on('click', (el) => {
            if ($(el.target).data('clicked') == 'on') {
              asideOrderBack(el);
            } else {
              asideOrderAnim(el);
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
              } else {
                aside.removeClass('active');
                aside.addClass('not-active');
                $('.main-search-container').addClass('active');
                $('.main-search-container').removeClass('not-active');
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

      let $myLi = $($(elem.target)).parent();
      let listHeight = $(`[data-id=aside-ul]`).innerHeight();
      let elemHeight = $myLi.height();
      let elemTop = $myLi.position().top;
      let moveUp = listHeight - (listHeight - elemTop);
      let moveDown = elemHeight;
      let liId = $myLi.attr("id");
      let enough = false;
      let liHtml = $myLi.outerHTML();

      $(`[data-id=liel]`).each((index, el) => {
        console.log(liId);
        console.log($(el).attr('id'));
        if ($(el).attr('id') == liId) {
          return false;
        } else {
          $(el).animate({ "top": '+=' + moveDown }, 380);
        }
      });

      $myLi.animate({ "top": '-=' + moveUp }, 380, function () {
        $myLi.remove();
        let oldHtml = $(`[data-id=aside-ul]`).html();
        $(`[data-id=aside-ul]`).html(liHtml + oldHtml);
        $(`[data-id=liel]`).attr("style", "position: relative; top: 0; left: 0;");
        $(`[data-id=fav-star]`).on('click', (el) => {

          if ($(el.target).data('clicked') == 'on') {
            asideOrderBack(el);
          } else {
            asideOrderAnim(el);
          }
        });
      });
    }

    function asideOrderBack(elem) {
      elem.stopPropagation();
      RemoveFav($(elem.target).data(`name`));
      $(elem.target).addClass('not-active');
      $(elem.target).removeClass('active');
      $(elem.target).attr('data-clicked', 'off');

      let $myLi = $($(elem.target)).parent();
      let listHeight = $(`[data-id=aside-ul]`).innerHeight();
      let elemHeight = $myLi.height();
      let elemTop = $myLi.position().top;
      let moveUp = listHeight - (listHeight - elemTop);
      let moveDown = elemHeight;
      let liId = $myLi.attr("id");
      let enough = false;
      let liHtml = $myLi.outerHTML();

      $(`[data-id=liel]`).each((index, el) => {
        console.log(liId);
        console.log($(el).attr('id'));
        if ($(el).attr('id') == liId) {
          return false;
        } else {
          $(el).animate({ "top": '+=' + moveDown }, 380);
        }
      });

      $myLi.animate({ "top": '-=' + moveUp }, 380, function () {
        $myLi.remove();
        let oldHtml = $(`[data-id=aside-ul]`).html();
        $(`[data-id=aside-ul]`).html(liHtml + oldHtml);
        $(`[data-id=liel]`).attr("style", "position: relative; top: 0; left: 0;");
        $(`[data-id=fav-star]`).on('click', (el) => {

          if ($(el.target).data('clicked') == 'on') {
            asideOrderBack(el);
          } else {
            asideOrderAnim(el);
          }
        });
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
      </div><ul data-id="aside-ul" style="position: relative; top: 0; left: 0;"></ul>`);
        $(`[data-id=aside-ul]`).append(`
      <li id="0" data-id="liel" data-div="home" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
      <span class="sports--1" style="margin-left: 5px; "></span>
      <span class="font sport-name" style = "margin-left: 10px;">Home</span>
      <span data-id="home" style="position: absolute; left: 79%;"></span>
      </li>
      `);
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
            <li id=${id_} data-id="liel" data-div="aside-link-${ID_}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
            <span class="sports-${ID_}" style="margin-left: 5px; "></span>
            <span class="font sport-name" style = "margin-left: 10px;">${name_}</span>
            <span data-id="fav-star" data-sport="${ID_}" data-name="${name_}" data-clicked="on" class="star not-active:before active" style="position: absolute; left: 79%;"></span>
            </li>
            `);
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
                  <li id="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
                  <span class="sports-${ID}" style="margin-left: 5px; "></span>
                  <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
                  <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>'
                  </li>
                  `);
                } else {
                  continue;
                }
              }

              $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
                if (ID == -1) {
                  ID = 'home';
                }
                if (true) {
                  window.location.hash = '/sport/' + ID;

                  aside.removeClass('active');
                  aside.addClass('not-active');
                }
              });
            }
            else {
              if (fav_arr.includes(name)) {
                continue;
              } else {
                if (ID != -1) {
                  $(`[data-id=aside-ul]`).append(`
                <li id="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
                <span class="sports-${ID}" style="margin-left: 5px; "></span>
                <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
                <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
                </li>
                `);
                } else {
                  continue;
                }
                $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
                  if (ID == -1) {
                    ID = 'home';
                  }
                  if (true) {
                    window.location.hash = '/sport/' + ID;

                    aside.removeClass('active');
                    aside.addClass('not-active');
                  }
                });
              }
            }
          }
        }

        resolve();
      });
      promise
        .then(() => {

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
            asideOrderAnim(elem);
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
          sessionStorage.setItem('aside', 'sport');
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