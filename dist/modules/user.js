"use strict";

exports('user', function (params, done) {
  insertHtmlModules({// ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, function () {
    function renderUserContent(username) {
      $.fn.htmlTo = function (elem) {
        return this.each(function () {
          $(elem).html($(this).html());
        });
      };

      var content = $("\n      <div class=\"userContent\">\n\t\t\t\n        <div class=\"[ setting ]\">\n          <div class=\"[ setting-nav ] flex-container align-middle\">\n            <a data-id=\"balance\" data-status=\"not-active\" class=\"[ setting-nav-link ]\">\n              <span data-id=\"balance\" class=\"font\">BALANCE MANAGEMENT</span>\n            </a>\n            <a data-id=\"personal\" data-status=\"not-active\" class=\"[ setting-nav-link ]\">\n              <span data-id=\"personal\" class=\"font\">PERSONAL INFORMATION</span>\n            </a>\n            <a data-id=\"transaction\" data-def=\"casier\" data-status=\"not-active\" class=\"[ setting-nav-link ]\">\n              <span data-id=\"transaction\" class=\"font\">TRANSACTION HISTORY</span>\n            </a>\n            <a data-id=\"access\" data-def=\"casier\" data-status=\"not-active\" class=\"[ setting-nav-link ]\">\n              <span data-id=\"access\" class=\"font\">ACCESS LOG</span>\n            </a>\n          </div>\n          <div data-id=\"setting-box\" class=\"[ setting-box primary ]\"></div>\n        </div>\n      </div>\n      ");
      $(".container .userContent").empty(); // $('.main>.container').empty();
      //content.htmlTo('.main .container');

      content.prependTo($('.main .container'));
    }

    var renderPromise = new Promise(function (resolve, reject) {
      var navRenderPromise = new Promise(function (resolve, reject) {
        renderUserContent(params.username);
        resolve();
      });
      navRenderPromise.then(function () {
        var nav_link = params.nav_link;
        $("[data-id=".concat(nav_link, "]")).addClass('active');
        $("[data-id=setting-box]").append($('<div id="userRoom">').load("./html/modules/user/".concat(nav_link, "/setting-nav.html"), function () {
          var nav_link_small = params.nav_link_small;

          if (nav_link_small === undefined) {
            $("[data-id=setting-box]").empty().append($('<div id="userRoom">').load("./html/modules/user/".concat(nav_link, "/default.html"), function () {
              resolve();
            }));
          } else {
            $("[data-id=".concat(nav_link_small, "]")).addClass('active');
            $("[data-id=setting-box]").append($('<div id="userRoom">').load("./html/modules/user/".concat(nav_link, "/").concat(nav_link_small, ".html"), function () {
              resolve();
            }));
          }
        }));
      });
    });
    renderPromise.then(function () {
      // Preloader finishes
      var preloader = $('#page-preloader');

      if (preloader.data("status") != 'done') {
        preloader.addClass('done');
        preloader.data("status", 'done').attr('data-status', 'done');
      }

      $('.setting-nav-link').off('click');
      $('.setting-nav-link').on('click', function (event) {
        var cur = $(event.target);

        if (cur.data('status') == 'active') {} else {
          var t = cur.data('id');
          window.location.href = "#/user/".concat(params.username, "/").concat(t);
        }
      });
      $("[data-class=nav-link-small]").off('click');
      $("[data-class=nav-link-small]").on('click', function (event) {
        var cur = $(event.target);

        if (cur.data('status') == 'active') {} else {
          window.location.href = "#/user/".concat(params.username, "/").concat($('.setting-nav-link.active').data('id'), "/").concat(cur.data('id'));
        }
      });
    });
    done();
  });
});