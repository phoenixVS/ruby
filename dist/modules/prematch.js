"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports('prematch', function (params, done) {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }

  var preloader = $('#page-preloader').addClass('opaci');
  preloader.removeClass('done');
  preloader.children('img').remove();
  $('.prematch').empty();
  insertHtmlModules({
    '.prematch': ['prematch/main.html']
  }, function () {
    //console.log("PREMATCH LOADED");
    var ID = params.ID;

    function encodeURL(pd) {
      var url = encodeURIComponent(pd);
      return url;
    } //let url = 'http://bestline.bet/sports/?PD=';


    var url2 = 'https://bestline.bet/api2/?key=sports';
    /*for (sport of window.prematch) {
      if (sport.ID == ID) {
        url += encodeURL(sport.PD);
      }
    }*/
    //httpGet(url, 'prematch');

    httpGetNew(url2, 'prematch'); // Fetch API request

    function httpGetNew(url, name) {
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (name == "prematch") {
          console.log(data);
          var tree = growNewTree(data, ID);
          renderNewPrematch(tree);
        } else {
          throw new Error('Uncorrect handler name.');
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }

    function httpGet(url, name) {
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (name == 'prematch') {
          var tree = growTree(data);
          renderPrematch(tree);
        } else {
          throw new Error('Uncorrect handler name.');
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }

    function growNewTree(data, id) {
      var leguesOBJ = [];
      var spName = "";

      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          spName = data[i].name;

          var _loop = function _loop(j) {
            var name = data[i].categories[j].name; //leguesOBJ[name] = [];

            var tempLeagArr = [];
            data[i].categories[j].leagues.forEach(function (legue) {
              tempLeagArr.push(_defineProperty({}, legue.name, legue.id));
            });
            leguesOBJ.push(_defineProperty({}, name, tempLeagArr));
          };

          for (var j = 0; j < data[i].categories.length; j++) {
            _loop(j);
          }
        }
      }

      leguesOBJ.push(_defineProperty({}, "spName", spName));
      return leguesOBJ;
    }

    function growTree(data) {
      var EV = '';
      var CL = '';
      var curMG = '';
      var curMA = '';
      var curPA = '';
      var tree = [];
      tree.MG = [];
      data.map(function (item, index) {
        if (item.type === 'CL') {
          tree.push(item);
          CL = item;
        } else {
          if (item.type === 'EV') {
            tree.push(item);
            EV = item;
          } else {
            if (item.type === 'MG') {
              tree.MG.push(item);
              curMG = item;
              curMG.MA = [];
            } else {
              if (item.type === 'MA') {
                curMG.MA.push(item);
                curMA = item;
                curMA.PA = [];
              } else {
                if (item.type === 'PA') {
                  curMA.PA.push(item);
                }
              }
            }
          }
        }
      });
      return tree;
    }

    function renderNewPrematch(data) {
      console.log(data);
      var render = new Promise(function (resolve, reject) {
        var spName = "";
        data.forEach(function (item) {
          if (item.spName) {
            spName = item.spName;
          }
        });
        $('.prematch-title-main').text(spName);
        $('.prematch-table-title__main').append("\n              <div class=\"item\" data-id=\"\" data-pd=\"\">Coupons</div>\n              <div class=\"item\" data-id=\"\" data-pd=\"\">My Teams</div>\n              <div class=\"item\" data-id=\"\" data-pd=\"\">Outrights</div>\n            ");
        $('.prematch-table-title__main .item:first-child').addClass('selected');
        data.forEach(function (item) {
          if (!item.spName) {
            $('.prematch-table .container-fluid').append("\n              <div class=\"market-group opened\" data-id=\"\" data-it=\"\" data-pd=\"\">\n                <div class=\"market-group-text\" id=\"\">\n                  <span class=\"market-group-name\">".concat(Object.keys(item)[0], "</span>\n                </div>\n                <div id=\"").concat(Object.keys(item)[0].replace(/\s/g, ''), "\" class=\"\"coupon-list></div>\n              </div>\n              ")); //console.log(Object.values(item)[0]);

            Object.values(item)[0].forEach(function (elem) {
              //console.log(Object.keys(elem)[0]);
              $('#' + Object.keys(item)[0].replace(/\s/g, '')).append("\n                <div data-legueid=\"".concat(Object.values(elem)[0], "\" data-leguename=\"").concat(Object.keys(elem)[0], "\" data-spname=\"").concat(spName, "\" class=\"coupon-name\">").concat(Object.keys(elem)[0], "</div>\n              "));
            });
          }
        });
        resolve();
      }).then(function (response) {
        preloader.addClass('done').removeClass('opaci'); // go to sport inplay

        $('.inplay-link').on('click', function (event) {
          window.location.hash = '/' + 'inplay' + '/' + window.location.hash.split('/')[2];
        });
        $('.coupon-name').on('click', function (event) {
          var cur = $(event.target.closest('.coupon-name'));
          var legueID = cur.data("legueid");
          var legueName = cur.data("leguename");
          var sport = cur.data("spname");
          console.log(legueID);
          sessionStorage.setItem('prematchSport', sport);
          sessionStorage.setItem('prematchLeague', legueName);
          /*let url = 'https://bestline.bet/api2/?key=league&leagueId=' + legueID;
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data.events);
            })
            .catch((err) => {
              console.log(err);
            })*/

          window.location.hash += '/' + legueID;
        });
        $('.market-group').on('click', function (event) {
          var cur = $(event.target.closest('.market-group'));

          if (cur.is('.opened')) {
            cur.removeClass('opened');
            cur.addClass('closed');
          } else {
            cur.removeClass('closed');
            cur.addClass('opened');
          }
        });
        $('.prematch-table-title__main .item').on('click', function (event) {
          var cur = $(event.target);

          if (cur.is('.selected')) {
            cur.removeClass('.selected');
          } else {
            $('.prematch-table-title__main .item').removeClass('selected');
            cur.addClass('selected');
          }
        });
      });
    }

    function renderPrematch(data) {
      var render = new Promise(function (resolve, reject) {
        console.dir(data);
        $('.prematch-title-main').text(data[0].NA);
        data.MG[0].MA.forEach(function (item) {
          if (typeof item.NA !== 'undefined') {
            $('.prematch-table-title__main').append("\n              <div class=\"item\" data-id=\"".concat(item.ID, "\" data-pd=\"").concat(item.PD, "\">").concat(item.NA, "</div>\n            "));
          }
        });
        $('.prematch-table-title__main .item:first-child').addClass('selected'); // Render table of leagues

        if (data[0].ID != 1) {
          data.MG.map(function (item, i) {
            if (typeof item.NA !== 'undefined' && item.NA !== 'Match Coupon'
            /*for tennis*/
            ) {
                $('.prematch-table .container-fluid').append("\n              <div class=\"market-group opened\" data-id=\"".concat(item.ID, "\" data-it=\"").concat(item.IT, "\" data-pd=\"").concat(item.PD, "\">\n                <div class=\"market-group-text\">\n                  <span class=\"market-group-name\">").concat(item.NA, "</span>\n                </div>\n              </div>\n              "));
              }
          });
        } else {
          // Soccer
          data.MG.map(function (mg, i) {
            if (i > 1 && mg.NA == 'Full Time Result') {
              mg.MA.map(function (ma, i) {
                if (i > 0) {
                  $('.prematch-table .container-fluid').append("\n                  <div class=\"market-group closed\" data-id=\"".concat(ma.ID, "\" data-it=\"").concat(ma.IT, "\" data-pd=\"").concat(ma.PD, "\">\n                    <div class=\"market-group-text\">\n                      <span class=\"market-group-name\">").concat(ma.NA, "</span>\n                    </div>\n                  </div>\n                  "));

                  if (ma.DO == '1') {
                    var cur = $('.prematch-table .container-fluid .market-group:last-child');
                    var url = 'http://bestline.bet/sports/?PD=';
                    var coupon_list = $("<div class=\"coupon-list\"></div>");
                    data.MG.map(function (item) {
                      if (item.NA == "Full Time Result") {
                        item.MA.map(function (ma) {
                          if (ma.PD == cur.data("pd")) {
                            url += encodeURL(ma.PD);
                            fetch(url).then(function (response) {
                              return response.json();
                            }).then(function (json) {
                              var _iterator = _createForOfIteratorHelper(json),
                                  _step;

                              try {
                                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                                  item = _step.value;

                                  if (item.type == 'PA') {
                                    coupon_list.append("\n                                        <div data-pd=\"".concat(item.PD, "\" class=\"coupon-name\">\n                                          ").concat(item.NA, "\n                                        </div>\n                                    "));
                                  }
                                }
                              } catch (err) {
                                _iterator.e(err);
                              } finally {
                                _iterator.f();
                              }
                            }).then(function () {
                              coupon_list.appendTo(cur).hide().slideDown(150);
                              cur.removeClass('closed');
                              cur.addClass('opened');
                              $('.coupon-name').off();
                              $('.coupon-name').on('click', function (event) {
                                event.preventDefault();
                                event.stopPropagation();
                                var cur = $(event.target);
                                var PD = cur.data("pd");
                                window.location.hash += '/' + encodeURL(PD);
                              });
                            });
                          }
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        }

        resolve();
      });
      render.then(function (response) {
        // preloader done
        preloader.addClass('done').removeClass('opaci'); // go to sport inplay

        $('.inplay-link').on('click', function (event) {
          window.location.hash = '/' + 'inplay' + '/' + window.location.hash.split('/')[2];
        });
        $('.prematch-table-title__main .item').on('click', function (event) {
          var cur = $(event.target);

          if (cur.is('.selected')) {} else {
            $('.prematch-table-title__main .item').removeClass('selected');
            cur.addClass('selected');
          }
        }); // appending MAs aka list-item

        if (data[0].ID != 1) {
          $('.market-group').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var cur = $(event.target);

            if (!cur.is('.market-group')) {
              cur = cur.parents('.market-group');
            }

            var _iterator2 = _createForOfIteratorHelper(data.MG),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                mg = _step2.value;

                if (mg.PD == cur.data("pd")) {
                  var PD = mg.MA[0].PA[0].PD;
                  window.location.hash += '/' + encodeURL(PD);
                }
              }
              /* data.MG.map((mg) => {
                if (mg.PD == cur.data(`pd`)) {
                  let PD = mg.MA[0].PA[0].PD;
                  window.location.hash += '/' + encodeURL(PD);
                }
              }); */

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          });
          /*  $('.market-group').on('click', (event) => {
                      let cur = $(event.target);
             if (!cur.is('.market-group')) {
               while (!cur.is('.market-group')) {
                 cur = cur.parent();
               }
             }
                      if (cur.is('.closed')) {
               let market_list = $(`<div class="market-group-list"></div>`);
               let IT = cur.data(`it`);
               data.MG.map((item) => {
                 if (item.IT == IT) {
                   item.MA.map((item) => {
                     market_list.append(`
                     <div class="list-item closed" data-it="${item.IT}">
                       <div class="item-header">
                         ${item.NA}
                       </div>
                     </div>
                     `);
                   });
                 }
               });
               market_list.appendTo(cur).hide().slideDown(150);
               cur.removeClass('closed');
               cur.addClass('opened');
                        // append PAs aka coupon-link
               $('.list-item').off();
               $('.list-item').on('click', (event) => {
                 event.preventDefault();
                 event.stopPropagation();
                 let cur = $(event.target);
                 if (!cur.is('.list-item')) {
                   while (!cur.is('.list-item')) {
                     cur = cur.parent();
                   }
                 }
                 const IT = cur.parent().parent().data(`it`);
                 if (cur.is('.closed')) {
                   let coupon_list = $(`<div class="coupon-list"></div>`);
                   let maIT = cur.data(`it`);
                   data.MG.map((item) => {
                     if (item.IT == IT) {
                       item.MA.map((item) => {
                         if (item.IT == maIT) {
                           item.PA.map((item) => {
                             coupon_list.append(`
                                 <div data-pd="${item.PD}" class="coupon-name">
                                   ${item.NA}
                                 </div>
                             `);
                           });
                         }
                       });
                     }
                   });
                   coupon_list.appendTo(cur).hide().slideDown(150);
                   cur.removeClass('closed');
                   cur.addClass('opened');
                            $('.coupon-name').off();
                   $('.coupon-name').on('click', (event) => {
                     event.preventDefault();
                     event.stopPropagation();
                     let cur = $(event.target);
                     let PD = cur.data(`pd`);
                     window.location.hash += '/' + encodeURL(PD);
                   });
                 }
                 else {
                   cur.children('.coupon-list').slideUp(150, () => { cur.children('.coupon-list').remove(); cur.removeClass('opened'); cur.addClass('closed'); });
                   cur.addClass('closed');
                   cur.removeClass('opened');
                 }
               });
                      }
             else {
               cur.children('.market-group-list').slideUp(150, () => { cur.children('.market-group-list').remove(); cur.removeClass('opened'); cur.addClass('closed'); });
             }
           }); */
        } else {
          // if Soccer
          $('.market-group').on('click', function (event) {
            // add preloader
            var preloader = $('#page-preloader');
            preloader.removeClass('done').addClass('opaci');
            var cur = $(event.target);

            if (!cur.is('.market-group')) {
              while (!cur.is('.market-group')) {
                cur = cur.parents('.market-group');
              }
            }

            var url = 'http://bestline.bet/sports/?PD=';

            if (cur.is('.closed')) {
              var coupon_list = $("<div class=\"coupon-list\"></div>");
              data.MG.map(function (item) {
                if (item.NA == "Full Time Result") {
                  item.MA.map(function (ma) {
                    if (ma.PD == cur.data("pd")) {
                      url += encodeURL(ma.PD);
                      fetch(url).then(function (response) {
                        return response.json();
                      }).then(function (json) {
                        console.log(json);

                        var _iterator3 = _createForOfIteratorHelper(json),
                            _step3;

                        try {
                          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                            item = _step3.value;

                            if (item.type == 'PA') {
                              coupon_list.append("\n                                  <div data-pd=\"".concat(item.PD, "\" class=\"coupon-name\">\n                                    ").concat(item.NA, "\n                                  </div>\n                              "));
                            }
                          }
                        } catch (err) {
                          _iterator3.e(err);
                        } finally {
                          _iterator3.f();
                        }
                      }).then(function () {
                        // finish preloader
                        preloader.addClass('done').removeClass('opaci');
                        coupon_list.appendTo(cur).hide().slideDown(150);
                        cur.removeClass('closed');
                        cur.addClass('opened');
                        $('.coupon-name').off();
                        $('.coupon-name').on('click', function (event) {
                          event.preventDefault();
                          event.stopPropagation();
                          var cur = $(event.target);
                          var PD = cur.data("pd");
                          window.location.hash += '/' + encodeURL(PD);
                        });
                      });
                    }
                  });
                }
              });
            } else {
              console.log(cur.children('.coupon-list'));
              cur.children('.coupon-list').slideUp(150, function () {
                cur.children('.coupon-list').remove();
                cur.removeClass('opened');
                cur.addClass('closed'); // finish preloader

                preloader.addClass('done').removeClass('opaci');
              });
            }
          });
        } // Open items that should be opened


        data.MG.map(function (item) {
          if (item.DO == 1 && typeof item.NA !== 'undefined') {// $(`div.prematch div.container-fluid div[data-it="${item.IT}"`).trigger('click');
          }
        });
      });
    }

    done();
  });
});