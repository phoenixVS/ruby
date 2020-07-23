"use strict";

exports('fetch', function (params, done) {
  console.log("fetching...");
  insertHtmlModules({}, function () {
    var urlInplay = 'http://bestline.bet/api/?key=inplay',
        urlInplayNew = 'https://bestline.bet/api2/?key=inplay-tree',
        urlBets = 'http://bestline.bet/api/?key=',
        urlSports = 'http://bestline.bet/sports/?PD=all';

    window.sportsLoad = function () {
      httpGet(urlSports, 'sports');
    };

    window.tableLoad = function () {
      /* httpGet(urlInplay, 'inplay'); */
      httpGet(urlInplayNew, 'inplay');
    };

    window.eventLoad = function (ID) {
      var url = urlBets + ID;
      httpGet(url, 'bets');
    }; // Fetch API request


    function httpGet(url, name) {
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (name == 'sports') {
          var tree = growTree(data, 'sports');
          window.prematch = tree;
        } else {
          if (name == 'inplay') {
            /* const tree = growTree(data, 'inplay'); */
            var _tree = growNewTree(data, 'inplay');

            window.inplay = _tree;
            console.log(_tree);
          } else {
            if (name == 'bets') {
              var _tree2 = growTree(data, 'bets');

              window.event = _tree2;
              console.log(_tree2);
            } else {
              throw new Error('Uncorrect handler name.');
            }
          }
        }
      })["catch"](function (err) {
        console.log(err);
      });
    } // buidling tree from parsed json
    // parse input object massive into a tree 


    function growTree(data, type) {
      console.log(type);

      if (type == 'inplay') {
        var curCL = '';
        var curCT = '';
        var curEV = '';
        var curMA = '';
        var curPA = '';
        var tree = [];
        data.map(function (item, index) {
          if (item.type === 'CL') {
            if (data[index + 1].type != 'CT') {
              tree.push(item);
              curCL = item;
              curCL.CT = [];
              curCL.CT.push({});
              curCT = curCL.CT[0];
              curCT.EV = [];
            } else {
              tree.push(item);
              curCL = item;
              curCL.CT = [];
            }
          }

          if (item.type === 'CT') {
            curCL.CT.push(item);
            curCT = item;
            curCT.EV = [];
          }

          if (item.type === 'EV') {
            curCT.EV.push(item);
            curEV = item;
            curEV.MA = [];
          }

          if (item.type === 'MA') {
            curEV.MA.push(item);
            curMA = item;
            curMA.PA = [];
          }

          if (item.type === 'PA') {
            curMA.PA.push(item);
            curPA = item;
          }
        });
        return tree;
      } else {
        if (type == 'sports') {
          var _curCL = '';
          var _tree3 = [];
          data.map(function (item, index) {
            if (item.type === 'CL') {
              _tree3.push(item);

              _curCL = item;
              _curCL.EV = []; //console.log(curCL.EV)
            }

            if (item.type === 'EV') {
              _curCL.EV.push(item);
            }
          });
          return _tree3;
        } else {
          var _curEV = '';
          var curTG = '';
          var curTE = '';
          var curES = '';
          var curSC = '';
          var curSL = '';
          var _curMA = '';
          var curCO = '';
          var _curPA = '';
          var _tree4 = [];

          if (data == null) {
            window.location.hash = '';
            return;
          }

          data.map(function (item, index) {
            if (type == 'bets') {
              if (item.type === 'EV') {
                _tree4.push(item);

                _curEV = item;
                _curEV.TG = [];
                _curEV.TE = [];
                _curEV.ES = [];
                _curEV.SC = [];
                _curEV.MA = [];
              }

              if (item.type === 'TG') {
                _curEV.TG.push(item);
              }

              if (item.type === 'TE') {
                _curEV.TE.push(item);
              }

              if (item.type === 'ES') {
                _curEV.ES.push(item);
              }

              if (item.type === 'SC') {
                _curEV.SC.push(item);

                curSC = item;
                curSC.SL = [];
              }

              if (item.type === 'SL') {
                curSC.SL.push(item);
              }

              if (item.type === 'MA') {
                _curEV.MA.push(item);

                _curMA = item;
                _curMA.CO = [];
              }

              if (item.type === 'CO') {
                _curMA.CO.push(item);

                curCO = item;
                curCO.PA = [];
              }

              if (item.type === 'PA') {
                curCO.PA.push(item);
              }
            }
          });
          return _tree4;
        }
      }
    }

    function growNewTree(data, type) {
      if (type === 'inplay') {
        if (data) {
          data = data.sort(function (a, b) {
            return a.priority - b.priority;
          });
          return data;
        }

        return [];
      }
    }

    done();
  });
});