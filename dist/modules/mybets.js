"use strict";

exports('mybets', function (params, done) {
  console.log("my bets done");
  insertHtmlModules({// ".mybets": [
    //     "my-bets/my-bets.html",
    // ],
  }, function () {
    var mybets = $("[data-id=\"mybets\"]");

    function renderMyBets() {
      mybets.empty();
      var promise = new Promise(function (resolve, reject) {
        mybets.append($('<div>').load("./html/modules/my-bets/my-bets.html", function () {
          mybets.append($('<div>').load("./html/modules/my-bets/betslipy.html", function () {
            $('#betslipContent').append($('<div class="betsBodyWrapper"></div>').load("./html/modules/my-bets/cash-out.html", function () {
              resolve();
            }));
          }));
        }));
      });
      promise.then(function (response) {
        // Preloader finishes
        var preloader = $('#page-preloader');
        preloader.addClass('done');
        preloader.removeClass('opaci');
        preloader.data("status", 'done').attr('data-status', 'done'); // navbar logic

        $('.tab__link').on('click', function (event) {
          var cur = $(event.target);

          if (!cur.is('.active')) {
            if (cur.html() == 'Betslip') {
              $('.betslipy').remove();
            } else {
              $('.betslipy').remove();
              mybets.append($('<div>').load("./html/modules/my-bets/betslipy.html", function () {
                $('#betslipContent').append($('<div class="betsBodyWrapper"></div>').load("./html/modules/my-bets/cash-out.html", function () {
                  $('.myBets-navLinks>a').on('click', navLinksHandler);
                }));
              }));
            }

            cur.addClass('active');
            cur.siblings().removeClass('active');
          }
        });

        function navLinksHandler(event) {
          var cur = $(event.target);

          if (!cur.is('.active')) {
            $('.betsBodyWrapper').remove();

            if (cur.data("name") == 'cashOut') {
              $('#betslipContent').append($('<div class="betsBodyWrapper"></div>').load("./html/modules/my-bets/cash-out.html", function () {}));
            } else {
              $('#betslipContent').append($('<div class="betsBodyWrapper"></div>').load("./html/modules/my-bets/".concat(cur.html().toLowerCase(), ".html"), function () {}));
            }

            cur.addClass('active');
            cur.siblings().removeClass('active');
          }
        }

        $('.myBets-navLinks>a').on('click', navLinksHandler);
        window.translate();
      });
    }

    renderMyBets();
  });
});