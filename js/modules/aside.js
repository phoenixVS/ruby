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

    function RenderAside(data) {
        
        $(`[data-id=aside]`).empty();
      $(`[data-id=aside]`).append(`
  <a data-id="aside-fav"class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
    <span class="star"></span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link active ]">Live</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
  </div>`);
        for (let i = 0; i < data.DATA.length; i++) {
        
          let ID = data.DATA[i].ID;
          let name = data.DATA[i].NA;
  
          $(`[data-id=aside]`).append(`
          <a data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle align-justify nav-link" >
            <span class="sports-${ID}"></span>
            <span class="font">${name}</span>
            <span data-id="fav-star" data-sport="${ID}" class="star"></span>
          </a>
          `);
          $(`[data-id=aside-link-${ID}]`).on('click', () => {
          
            window.location = 'http://localhost/everest/#/filter/' + ID;
          
            aside.removeClass('active');
            aside.addClass('not-active');
          });
          $(`[data-sport=${ID}]`).click( (elem) => {
           console.log('Clicked sport ' + ID);
         });
        }

        $(`[data-id=aside-all]`).on('click', () => {

          httpGetAll(urlInplay, 'inplay');
        });
        $(`[data-id=main-fav-star]`).click( () => {
          httpGetFav(urlInplay, 'inplay');
        });
    }

    function RenderAsideAll(data) {
    $(`[data-id=aside]`).empty();
      $(`[data-id=aside]`).append(`
  <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
    <span data-id="main-fav-star" class="star"></span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link ]">Live</a>
    <a data-id="aside-all" class="[ tab-link active ]">All</a>
  </div>`);
    for (let i = 0; i < data.DATA.length; i++) {
        
      let ID = data.DATA[i].ID;
      let name = data.DATA[i].NA;
  
      $(`[data-id=aside]`).append(`
      <a data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle align-justify nav-link" >
        
        <span class="sports-${ID}"></span>
        <span class="font">${name}</span>
        <span data-id="fav-star" data-sport="${ID}" class="star"></span>
      </a>
      `);
      $(`[data-id=aside-link-${ID}]`).on('click', () => {
      
        window.location = 'http://localhost/everest/#/filter/' + ID;
      
        aside.removeClass('active');
        aside.addClass('not-active');
      });
      $(`[data-sport=${ID}]`).click( (elem) => {
        console.log('Clicked sport ' + ID);
      });
    }

    $(`[data-id=aside-live]`).on('click', () => {

      httpGet(urlInplay, 'inplay');
    });
   $(`[data-id=main-fav-star]`).click( () => {
     httpGetFav(urlInplay, 'inplay');
   });
    }

    function RenderAsideFav(data) {
      $(`[data-id=aside]`).empty();
      $(`[data-id=aside]`).append(`
  <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link ]">Live</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
  </div>`);

  for (let i = 0; i < data.DATA.length; i++) {
        
    let ID = data.DATA[i].ID;
    let name = data.DATA[i].NA;

    $(`[data-id=aside]`).append(`
    <a data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle align-justify nav-link" >
      <span class="font">${name}</span>
      <span class="sports-${ID}"></span>
    </a>
    `);
    $(`[data-id=aside-link-${ID}]`).on('click', () => {
    
      window.location = 'http://localhost/everest/#/filter/' + ID;
    
      aside.removeClass('active');
      aside.addClass('not-active');
    });
  }
    }
/*
    function AddSportCookie(sportID) {
      Cookies.set(sportID, 'added');
    }
*/
    let aside_close = $('.aside-close');
    aside_close.on('click', () => {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    done();
  });
});