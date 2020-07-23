"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

exports('aside', function (params, done) {
  insertHtmlModules({
    ".aside": ["aside/aside.html"]
  }, function () {
    // aside handler
    var show_menu = $('.show-menu');
    var aside = $('.aside');
    show_menu.on('click', function () {
      aside.removeClass('not-active');
      aside.addClass('active');
      aside.attr('data-id', 'aside-active');

      if (typeof window.prematch === 'undefined') {
        window.sportsLoad();
      }

      RenderAsideAll([''], window.prematch);

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
      Array.from($("[data-id=liel")).sort(function (c, n) {
        return $(c).attr("data-sort") - $(n).attr("data-sort");
      }).sort(function (c, n) {
        return ($(n).hasClass("active") ? 1 : 0) - ($(c).hasClass("active") ? 1 : 0);
      }).forEach(function (e, i) {
        $(e).css("top", i * 37 + "px");
      });
    }

    function RenderAside(data) {
      console.log("ra");
      var promise = new Promise(function (resolve, reject) {
        $("[data-id=aside]").empty();
        $("[data-id=aside]").append("\n        <div class=\"search-container\" data-id=\"search\">\n          <div id=\"search\" data-id=\"search\">\n            <i class=\"fa fa-search\" aria-hidden=\"true\" id=\"search-icon\" style=\"font-size: 20px; color: #fff\" data-id=\"search\"></i>\n            <form class=\"search-form\" data-id=\"search\">\n              <input type=\"text\" id=\"search-input\" placeholder=\"Search...\" data-id=\"search\">\n            </form>\n          </div>\n        </div>\n        <a data-id=\"aside-fav\"class=\"[ favourite-category ] flex-container align-middle align-justify\">\n          <span class=\"font\">My favourites</span>\n          <span data-id=\"main-fav-star\" class=\"star not-active:before active\"></span>\n        </a>\n        <div class=\"[ tab-header border ] flex-container align-middle align-justify\">\n          <a data-id=\"aside-live\" class=\"[ tab-link active ]\">In-play</a>\n          <a data-id=\"aside-all\" class=\"[ tab-link ]\">Sport</a>\n        </div><ul data-id=\"aside-ul\" style=\"position: relative; top: 0; left: 0;\"></ul>");
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

        var _loop = function _loop(i) {
          var ID = data[i].ID;
          var name = data[i].NA;
          var ev_count = 0;

          for (var n = 0; n < data[i].CT.length; n++) {
            ev_count++;
          }

          $("[data-id=aside-ul]").append("\n            <li data-d=\"".concat(i, "\" data-id=\"liel\" data-div=\"aside-link-").concat(ID, "\" class=\"[ navigation-link ] flex-container align-middle nav-link\" style=\"position: relative; top: 0; left: 0;\" >\n            <span class=\"sports-").concat(ID, "\" style=\"margin-left: 5px;\"></span>\n            <span class=\"font sport-name\" style = \"margin-left: 10px;\">").concat(name, "</span>\n            <span style=\"position: absolute; left: 75%;\">").concat(ev_count, " Events</span>\n            </li>\n            "));
          $("[data-div=aside-link-".concat(ID, "]")).on('click', function (elem) {
            if (true) {
              window.location.hash = '/inplay/' + ID;
              aside.removeClass('active');
              aside.addClass('not-active');
            }
          });
        };

        for (var i = 0; i < data.length; i++) {
          _loop(i);
        }

        resolve();
      });
      promise.then(function () {
        function checkVariable() {
          if (typeof window.prematch !== 'undefined') {
            $("[data-id=aside-all]").on('click', function () {
              RenderAsideAll(window.inplay, window.prematch);
            });
          } else {
            setTimeout(checkVariable, 100);
          }
        }

        setTimeout(checkVariable, 100);
        $("[data-id=main-fav-star]").click(function (el) {
          //console.log("Just click");
          $(el.target).slideUp();
        });
        $("[data-id=main-fav-star]").click(function () {
          RenderAsideFav(window.inplay);
        });
        $("[data-id=search]").on('click', function (el) {
          el.stopPropagation();

          if ($(el.target).data('id') == 'search') {
            if (window.searchIsLoaded != true) {
              loadJsModules({
                search: {
                  loadCSS: true,
                  loadLanguage: false
                }
              });
              window.searchIsLoaded = true;
              aside.removeClass('active');
              aside.addClass('not-active');
            } else {
              aside.removeClass('active');
              aside.addClass('not-active');
              $('.main-search-container').addClass('active');
              $('.main-search-container').removeClass('not-active');

              var _vh = window.innerHeight * 0.01; // document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);

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
      AddFav($(elem.target).data("name"), $(elem.target).data("sport"));
      console.log('Added to fav ' + $(elem.target).data("sport"));
      $(elem.target).addClass('active');
      $(elem.target).removeClass('not-active');
      $(elem.target).attr('data-clicked', 'on');
      $(elem.target).parent().toggleClass("active");
      resort();
      $(elem.target).prop("onclick", null).off("click");
      $(elem.target).click(function (el) {
        if ($(el.target).data('clicked') == 'on') {
          asideOrderBack(el);
        } else {
          asideOrderAnim(el);
        }
      });
    }

    function asideOrderBack(elem) {
      elem.stopPropagation();
      RemoveFav($(elem.target).data("name"));
      $(elem.target).addClass('not-active');
      $(elem.target).removeClass('active');
      $(elem.target).attr('data-clicked', 'off');
      $(elem.target).parent().toggleClass("active");
      resort();
      $(elem.target).prop("onclick", null).off("click");
      $(elem).click(function (el) {
        if ($(el.target).data('clicked') == 'on') {
          asideOrderBack(el);
        } else {
          asideOrderAnim(el);
        }
      });
    }

    function RenderAsideAll(data, prematch) {
      console.log("render All");
      console.log(prematch);
      var promise = new Promise(function (resolve, reject) {
        $("[data-id=aside]").empty();
        $("[data-id=aside]").append("\n        <div class=\"search-container\" data-id=\"search\">\n        <div id=\"search\" data-id=\"search\">\n            <i class=\"fa fa-search\" aria-hidden=\"true\" id=\"search-icon\" style=\"font-size: 20px; color: #fff\" data-id=\"search\"></i>\n            <form class=\"search-form\" data-id=\"search\">\n              <input type=\"text\" id=\"search-input\" placeholder=\"Search...\" data-id=\"search\">\n            </form>\n          </div>\n        </div>\n        <a data-id=\"aside-fav\" class=\"[ favourite-category ] flex-container align-middle align-justify\">\n          <span class=\"font\">My favourites</span>\n          <span data-id=\"main-fav-star\" class=\"star not-active:before active\"></span>\n        </a>\n      <div class=\"[ tab-header border ] flex-container align-middle align-justify\">\n        <a data-id=\"aside-live\" class=\"[ tab-link ]\">In-play</a>\n        <a data-id=\"aside-all\" class=\"[ tab-link active ]\">Sport</a>\n      </div>\n      <div data-div=\"home\" class=\"[ navigation-link ] flex-container align-middle nav-link\" style=\"position: relative; top: 0; left: 0;\" >\n      <span class=\"sports--1\" style=\"margin-left: 5px; \"></span>\n      <span class=\"font sport-name\" style = \"margin-left: 10px;\">Home</span>\n      <span data-id=\"home\" style=\"position: absolute; left: 79%;\"></span>\n      </div>\n      <ul data-id=\"aside-ul\" style=\"position:relative; width: 100%; height: auto; min-height: 500px;\"></ul>");
        /*$(`[data-id=aside-ul]`).append(`
        <li id="0" data-id="liel" data-div="home" class="[ navigation-link ] flex-container align-middle nav-link" style="position: relative; top: 0; left: 0;" >
        <span class="sports--1" style="margin-left: 5px; "></span>
        <span class="font sport-name" style = "margin-left: 10px;">Home</span>
        <span data-id="home" style="position: absolute; left: 79%;"></span>
        </li>
        `);*/

        var sort_counter = 0;
        var cks = getAllStorage();
        var fav_arr = [];

        for (var i = 0; i < cks.length; i++) {
          var name_ = cks[i];
          var ID_ = localStorage.getItem(name_);
          var id_ = void 0;

          if (name_ != 'logon') {
            for (var j = 0; j < data.length; j++) {
              if (name_ == data[j].NA) {
                id_ = j;
              }
            }

            $("[data-id=aside-ul]").append("\n              <li id=".concat(id_, " data-sort=\"").concat(sort_counter, "\" data-id=\"liel\" data-div=\"aside-link-").concat(ID_, "\" class=\"[ navigation-link ] flex-container align-middle nav-link active\" style=\"position: absolute; width: 100%; transition: 0.5s;\" >\n              <span class=\"sports-").concat(ID_, "\" style=\"margin-left: 5px; \"></span>\n              <span class=\"font sport-name\" style = \"margin-left: 10px;\">").concat(name_, "</span>\n              <span data-id=\"fav-star\" data-sport=\"").concat(ID_, "\" data-name=\"").concat(name_, "\" data-clicked=\"on\" class=\"star not-active:before active\" style=\"position: absolute; left: 79%;\"></span>\n              </li>\n              "));
            sort_counter++;
            fav_arr.push(name_);
          } else {
            continue;
          }
        } // for (let i = 0; i < data.length; i++) {
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


        for (var _i = 0; _i < prematch.length; _i++) {
          var ID = prematch[_i].ID;
          var name = prematch[_i].NA;
          var PD = prematch[_i].NA;

          if (ID != -2) {
            if (prematch[_i].EV.length > 0) {
              /*${ID == -1 ? '<span data-id="home" style="position: absolute; left: 79%;"></span> ' : '*/
              var _iterator = _createForOfIteratorHelper(prematch[_i].EV),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  event = _step.value;
                  ID = event.ID;
                  name = event.NA;
                  PD = event.NA;

                  if (ID != -1) {
                    $("[data-id=aside-ul]").append("\n                  <li id=\"".concat(_i, "\" data-sort=\"").concat(sort_counter, "\" data-id=\"liel\" data-div=\"aside-link-").concat(ID, "\" class=\"[ navigation-link ] flex-container align-middle nav-link\" style=\"position: absolute;width: 100%; transition: 0.5s;\" >\n                  <span class=\"sports-").concat(ID, "\" style=\"margin-left: 5px; \"></span>\n                  <span class=\"font sport-name\" style = \"margin-left: 10px;\">").concat(name, "</span>\n                  <span data-id=\"fav-star\" data-sport=\"").concat(ID, "\" data-name=\"").concat(name, "\" class=\"star not-active:before\" style=\"position: absolute; left: 79%;\"></span>\n                  </li>\n                  "));
                    sort_counter++;
                  } else {
                    continue;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } else {
              if (fav_arr.includes(name)) {
                continue;
              } else {
                if (ID != -1) {
                  $("[data-id=aside-ul]").append("\n                <li id=\"".concat(_i, "\" data-sort=\"").concat(sort_counter, "\" data-id=\"liel\" data-div=\"aside-link-").concat(ID, "\" class=\"[ navigation-link ] flex-container align-middle nav-link\" style=\"position: absolute; width: 100%; transition: 0.5s;\" >\n                <span class=\"sports-").concat(ID, "\" style=\"margin-left: 5px; \"></span>\n                <span class=\"font sport-name\" style = \"margin-left: 10px;\">").concat(name, "</span>\n                <span data-id=\"fav-star\" data-sport=\"").concat(ID, "\" data-name=\"").concat(name, "\" class=\"star not-active:before\" style=\"position: absolute; left: 79%;\"></span>\n                </li>\n                "));
                  sort_counter++;
                } else {
                  continue;
                } // onclick to prematch


                $("[data-div]").on('click', function (ev) {
                  var cur = $(ev.target);

                  if (typeof cur.data("div") == 'undefined') {
                    cur = cur.parent("li");
                  }

                  console.log(cur);
                  var ID = cur.data("div").split('-')[2];

                  if (ID == -1) {
                    ID = 'home';
                  }

                  if (ID !== 'home') {
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
      promise.then(function () {
        resort();
        $("[data-div=home]").on('click', function () {
          window.location.hash = '/sport/home';
        });
        $("[data-id=aside-live]").on('click', function () {
          RenderAside(window.inplay);
        });
        $("[data-id=main-fav-star]").click(function (el) {
          //console.log("Just click");
          $(el.target).slideUp();
        });
        $("[data-id=main-fav-star]").click(function (el) {
          RenderAsideFav(window.inplay); //console.log("FadeIn");
        });
        $("[data-id=fav-star]").click(function (elem) {
          if ($(elem.target).data('clicked') == 'on') {
            asideOrderBack(elem);
          } else {
            asideOrderAnim(elem);
          }
        });
        $("[data-id=search]").on('click', function (el) {
          el.stopPropagation();

          if ($(el.target).data('id') == 'search') {
            if (window.searchIsLoaded != true) {
              loadJsModules({
                search: {
                  loadCSS: true,
                  loadLanguage: false
                }
              });
              window.searchIsLoaded = true;
              aside.removeClass('active');
              aside.addClass('not-active');
              document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(vh, "px"));
            } else {
              aside.removeClass('active');
              aside.addClass('not-active');
              $('.main-search-container').addClass('active');
              $('.main-search-container').removeClass('not-active');

              var _vh2 = window.innerHeight * 0.01;

              console.log(_vh2); // Then we set the value in the --vh custom property to the root of the document

              document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(_vh2, "px")); // We listen to the resize event
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
        sessionStorage.setItem('aside', 'sport'); // onclick to prematch

        $("[data-div]").on('click', function (ev) {
          var cur = $(ev.target);

          if (typeof cur.data("div") == 'undefined') {
            cur = cur.parent("li");
          }

          console.log(cur);
          var ID = cur.data("div").split('-')[2];

          if (ID == -1) {
            ID = 'home';
          }

          if (ID !== 'home') {
            window.location.hash = '/sport/' + ID;
            aside.removeClass('active');
            aside.addClass('not-active');
          }
        });
      });
    }

    function getAllStorage() {
      var archive = [],
          keys = Object.keys(localStorage),
          i = 0,
          key;

      for (; key = keys[i]; i++) {
        archive.push(key);
      }

      return archive;
    }

    function RenderAsideFav(data) {
      console.log("render FAV");
      var promise = new Promise(function (resolve, reject) {
        $("[data-id=aside]").empty();
        $("[data-id=aside]").append("\n        <div class=\"search-container\" data-id=\"search\">\n          <div id=\"search\" data-id=\"search\">\n            <i class=\"fa fa-search\" aria-hidden=\"true\" id=\"search-icon\" style=\"font-size: 20px; color: #fff\" data-id=\"search\"></i>\n            <form class=\"search-form\" data-id=\"search\">\n              <input type=\"text\" id=\"search-input\" placeholder=\"Search...\" data-id=\"search\">\n            </form>\n          </div>\n        </div>\n          <a data-id=\"aside-fav\" class=\"[ favourite-category ] flex-container align-middle align-justify\">\n            <span class=\"font\">My favourites</span>\n          </a>\n          <div class=\"[ tab-header border ] flex-container align-middle align-justify\">\n            <a data-id=\"aside-live\" class=\"[ tab-link ]\">In-play</a>\n            <a data-id=\"aside-all\" class=\"[ tab-link ]\">All</a>\n        </div>");
        var cookies = getAllStorage();

        var _loop2 = function _loop2(f) {
          var name = cookies[f];
          var ID = localStorage.getItem(name);
          console.log("Name: " + name);
          console.log("Value: " + ID);

          if (name != 'logon' && name != 'username' && name != 'password') {
            $("[data-id=aside]").append("\n      <div data-id=\"aside-link-".concat(ID, "\" class=\"[ navigation-link ] flex-container align-middle nav-link\" style=\"position: relative; top: 0; left: 0;\" >\n        \n        <span class=\"sports-").concat(ID, "\" style=\"margin-left: 5px; \"></span>\n        <span class=\"font sport-name\" style = \"margin-left: 10px;\">").concat(name, "</span>\n      </div>\n      "));
            $("[data-id=aside-link-".concat(ID, "]")).on('click', function () {
              window.location.hash = '/sport/' + ID;
              aside.removeClass('active');
              aside.addClass('not-active');
            });
          } else {
            return "continue";
          }
        };

        for (var f = 0; f < cookies.length; f++) {
          var _ret = _loop2(f);

          if (_ret === "continue") continue;
        }

        $("[data-id=aside-live]").on('click', function () {
          RenderAside(window.inplay);
        });

        function checkVariable() {
          if (typeof window.prematch !== 'undefined') {
            $("[data-id=aside-all]").on('click', function () {
              RenderAsideAll(window.inplay, window.prematch);
            });
          } else {
            setTimeout(checkVariable, 100);
          }
        }

        setTimeout(checkVariable, 100);
        resolve();
      });
      promise.then(function () {
        $("[data-id=search]").on('click', function (el) {
          el.stopPropagation();

          if ($(el.target).data('id') == 'search') {
            if (window.searchIsLoaded != true) {
              loadJsModules({
                search: {
                  loadCSS: true,
                  loadLanguage: false
                }
              });
              window.searchIsLoaded = true;
              aside.removeClass('active');
              aside.addClass('not-active');
              document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(vh, "px"));
            } else {
              aside.removeClass('active');
              aside.addClass('not-active');
              $('.main-search-container').removeClass('not-active');
              $('.main-search-container').addClass('active');

              var _vh3 = window.innerHeight * 0.01;

              console.log(_vh3); // Then we set the value in the --vh custom property to the root of the document

              document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(_vh3, "px")); // We listen to the resize event

              window.addEventListener('resize', function () {
                // We execute the same script as before
                var vh = window.innerHeight * 0.01;
                document.querySelector('.main-search-container').style.setProperty('--vh', "".concat(vh, "px"));
              });
            }
          } else {
            return false;
          }
        });
        sessionStorage.removeItem('aside');
        sessionStorage.setItem('aside', 'fav');
      }); // onclick to prematch

      $("[data-div]").on('click', function (ev) {
        var cur = $(ev.target);

        if (typeof cur.data("div") == 'undefined') {
          cur = cur.parent("li");
        }

        console.log(cur);
        var ID = cur.data("div").split('-')[2];

        if (ID == -1) {
          ID = 'home';
        }

        if (ID !== 'home') {
          window.location.hash = '/sport/' + ID;
          aside.removeClass('active');
          aside.addClass('not-active');
        }
      });
    }

    var aside_close = $('.aside-close');
    aside_close.on('click', function () {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    $('.close-field').on('touchstart', function () {
      aside.removeClass('active');
      aside.addClass('not-active');
    });
    done();
  });
});