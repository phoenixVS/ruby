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
      httpGet(urlInplay, 'inplay');
    });

    let urlInplay = 'http://bestline.bet/inplay/',
      urlGames = 'http://212.8.249.162:81/inplay.php',
      urlBets = 'http://bestline.bet/event/?FI=';

    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            RenderAside(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function httpGetAll(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            RenderAsideAll(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function httpGetFav(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            RenderAsideFav(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function AddFav(NAME, ID) {
      Cookies.set(NAME, ID);
    }

    jQuery.fn.outerHTML = function () {
      return $(this).clone().wrap('<div></div>').parent().html();
    };

    function RenderAside(data) {

      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
  <a data-id="aside-fav"class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
    <span data-id="main-fav-star" class="star not-active:before active"></span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link active ]">In-play</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
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
        for (let i = 0; i < data.DATA.length; i++) {

          let ID = data.DATA[i].ID;
          let name = data.DATA[i].NA;
          let ev_count = 0;

          for (let n = 0; n < data.DATA[i].CT.length; n++) {
            ev_count++;
          }
          $(`[data-id=aside-ul]`).append(`
            <li data-d="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
            <span class="sports-${ID}" style="margin-left: 5px; "></span>
            <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
            <span style="position: absolute; left: 75%;">${ev_count} Events</span>
            </li>
            `);
  
            $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
              if (true) {
                window.location = 'http://46.101.202.52/everest/#/filter/' + ID;
            
                aside.removeClass('active');
                aside.addClass('not-active');
              }
            });
        }
        resolve();
      });

      promise
        .then(() => {
          console.log('Promise done');
          $(`[data-id=aside-all]`).on('click', () => {

            httpGetAll(urlInplay, 'inplay');
          });
          $(`[data-id=main-fav-star]`).click((el) => {
            //console.log("Just click");
            $(el.target).slideUp();
          });
          $(`[data-id=main-fav-star]`).click(() => {
            httpGetFav(urlInplay, 'inplay');
          });

          $(`[data-id=fav-star]`).on('click', (el) => {

            if ($(el.target).data('clicked') == 'on') {
              asideOrderBack(el);
            } else {
              asideOrderAnim(el);
            }
          });
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
      Cookies.remove($(elem.target).data(`name`));
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

    function RenderAsideAll(data) {

      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
  <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
    <span data-id="main-fav-star" class="star not-active:before active"></span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link ]">In-play</a>
    <a data-id="aside-all" class="[ tab-link active ]">All</a>
  </div><ul data-id="aside-ul" style="position: relative; top: 0; left: 0;"></ul>`);
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
        for (let i = 0; i < data.DATA.length; i++) {

          let ID = data.DATA[i].ID;
          let name = data.DATA[i].NA;

          if (fav_arr.includes(name)) {
            continue;
          } else {
            $(`[data-id=aside-ul]`).append(`
            <li id="${i}" data-id="liel" data-div="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
            <span class="sports-${ID}" style="margin-left: 5px; "></span>
            <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
            <span data-id="fav-star" data-sport="${ID}" data-name="${name}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
            </li>
            `);

            $(`[data-div=aside-link-${ID}]`).on('click', (elem) => {
              if (true) {
                window.location = 'http://46.101.202.52/everest/#/filter/' + ID;
            
                aside.removeClass('active');
                aside.addClass('not-active');
              }
            });
          }
        }

        resolve();
      });
      promise
        .then(() => {
          console.log('Promise done');
          $(`[data-id=aside-live]`).on('click', () => {

            httpGet(urlInplay, 'inplay');
          });

          $(`[data-id=main-fav-star]`).click((el) => {
            //console.log("Just click");
            $(el.target).slideUp();
          });
          $(`[data-id=main-fav-star]`).click((el) => {
            httpGetFav(urlInplay, 'inplay');
            //console.log("FadeIn");
          });
          $(`[data-id=fav-star]`).click((elem) => {
            asideOrderAnim(elem);
          });

        });
    }

    function RenderAsideFav(data) {

      let promise = new Promise((resolve, reject) => {
        $(`[data-id=aside]`).empty();
        $(`[data-id=aside]`).append(`
  <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link ]">In-play</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
  </div>`);
        let cookies = JSON.parse(JSON.stringify(Cookies.get()));
        for (let i in cookies) {
          console.log(i);
          let name = i;
          let ID = Cookies.get(name);

          if (name != 'logon' && name != 'username' && name != 'password') {
            $(`[data-id=aside]`).append(`
      <div data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
        
        <span class="sports-${ID}" style="margin-left: 5px; "></span>
        <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
      </div>
      `);
      $(`[data-id=aside-link-${ID}]`).on('click', () => {
      
        window.location = 'http://46.101.202.52/everest/#filter/' + ID;
      
        aside.removeClass('active');
        aside.addClass('not-active');
      });
       } else {
         continue;
       }
     }
        $(`[data-id=aside-live]`).on('click', () => {

          httpGet(urlInplay, 'inplay');
        });
        $(`[data-id=aside-all]`).on('click', () => {

          httpGetAll(urlInplay, 'inplay');
        });
      });

      promise.then(() => {
        console.log('Promise done');
      });
    }

    let aside_close = $('.aside-close');
    aside_close.on('click', () => {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    done();
  });
});