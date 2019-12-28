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

    function AddFav(ID) {
      Cookies.set('favourites', ID);
    }

    jQuery.fn.outerHTML = function() {
      return $(this).clone().wrap('<div></div>').parent().html();
    };

    function RenderAside(data) {

      let promise = new Promise( (resolve, reject) => {
        $(`[data-id=aside]`).empty();
    $(`[data-id=aside]`).append(`
  <a data-id="aside-fav"class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
    <span data-id="main-fav-star" class="star"></span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link active ]">Live</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
  </div><div data-id="aside-ul"></div>`);
        for (let i = 0; i < data.DATA.length; i++) {
        
          let ID = data.DATA[i].ID;
          let name = data.DATA[i].NA;
  
          $(`[data-id=aside]`).append(`
          <div id="${i}" data-id="liel" data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative;" >
          <span class="sports-${ID}" style="margin-left: 5px; "></span>
          <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
          <span data-id="fav-star" data-sport="${ID}" class="star not-active:before" style="position: absolute; left: 79%;"></span>
          </div>
          `);
          $(`[data-id=aside-link-${ID}]`).on('click', (elem) => {
            if (true) {
              window.location = 'http://localhost/everest/#/filter/' + ID;
          
              aside.removeClass('active');
              aside.addClass('not-active');
            }
          });
        }
        resolve();
      });
      
      promise
      .then( () => {
        console.log('Promise done');
        $(`[data-id=aside-all]`).on('click', () => {

          httpGetAll(urlInplay, 'inplay');
        });
        $(`[data-id=main-fav-star]`).click( () => {
          httpGetFav(urlInplay, 'inplay');
        });

        $(`[data-id=fav-star]`).click( (elem) => {
          AddFav($(elem.target).data(`sport`));
          console.log('Added to fav ' + $(elem.target).data(`sport`));

          $(elem.target).addClass('active:before');
          $(elem.target).removeClass('not-active:before');
        });
        $(`[data-id=fav-star]`).on('click', (elem) => {
          let $myLi = $($(elem.target)).parent();
          let listHeight = $(`[data-id=aside-ul]`).innerHeight();
          let elemHeight = $myLi.height();
          let elemTop = $myLi.position().top;
          let moveUp = listHeight - (listHeight - elemTop);
          let moveDown = elemHeight;
          let liId = $myLi.attr("id");
          let enough = false;
          let liHtml = $myLi.outerHTML();
    
          $(`[data-id=liel]`).each(function() {
            if ($($(elem.target)).parent().attr("id") == liId) {
              return false;
          }
          $($(elem.target)).parent().animate({"top": '+=' + moveDown}, 200);
          });
    
          $myLi.animate({"top": '-=' + moveUp}, 500, function() {
          $myLi.remove();
          var oldHtml = $(`[data-id=aside-ul]`).html();
          $(`[data-id=aside-ul]`).html(liHtml + oldHtml);
          //$(`[data-id=liel]`).attr("style", "");
          });
        });
      }); 
    }

    function RenderAsideAll(data) {

      let promise = new Promise( (resolve, reject) => {
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
      <a data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" >
        
        <span class="sports-${ID}" style="margin-left: 5px; "></span>
        <span class="font sport-name" style = "margin-left: 10px;">${name}</span>
        <span data-id="fav-star" data-sport="${ID}" class="star" style="position: absolute; left: 79%;"></span>
      </a>
      `);
      $(`[data-id=aside-link-${ID}]`).on('click', () => {
      
        window.location = 'http://localhost/everest/#/filter/' + ID;
      
        aside.removeClass('active');
        aside.addClass('not-active');
      });
    }
    resolve();
      });
      promise
      .then(() => {
        console.log('Promise done');
        $(`[data-id=aside-live]`).on('click', () => {

          httpGet(urlInplay, 'inplay');
        });
       $(`[data-id=main-fav-star]`).click( () => {
         httpGetFav(urlInplay, 'inplay');
       });
    
       $(`[data-id=fav-star]`).click( (elem) => {
        AddFav($(elem.target).data(`sport`));
        console.log('Added to fav ' + $(elem.target).data(`sport`));
      });

      });
    }

    function RenderAsideFav(data) {

      //window.fav_array = JSON.parse(Cookies.get());

      $(`[data-id=aside]`).empty();
      $(`[data-id=aside]`).append(`
  <a data-id="aside-fav" class="[ favourite-category ] flex-container align-middle align-justify">
    <span class="font">My favourites</span>
  </a>
  <div class="[ tab-header border ] flex-container align-middle align-justify">
    <a data-id="aside-live" class="[ tab-link ]">Live</a>
    <a data-id="aside-all" class="[ tab-link ]">All</a>
  </div>`);
     /* if (window.fav_array != undefined) {
        if (window.fav_array.length == 1 || window.fav_array.length > 1) {
          for (let i = 0; i < data.DATA.length; i++) {
        
            let ID = data.DATA[i].ID;
            let name = data.DATA[i].NA;
        
            $(`[data-id=aside]`).append(`
            <a data-id="aside-link-${ID}" class="[ navigation-link ] flex-container align-middle nav-link" >
              
              <span class="sports-${ID}"></span>
              <span class="font" style = "margin-left: 5px;" >${name}</span>
            </a>
            `);
            $(`[data-id=aside-link-${ID}]`).on('click', () => {
            
              window.location = 'http://localhost/everest/#/filter/' + ID;
            
              aside.removeClass('active');
              aside.addClass('not-active');
            });
          }
        } else {
          console.log('Length is 0');
        }
      }*/
  $(`[data-id=aside-live]`).on('click', () => {

    httpGet(urlInplay, 'inplay');
  });
  $(`[data-id=aside-all]`).on('click', () => {

    httpGetAll(urlInplay, 'inplay');
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