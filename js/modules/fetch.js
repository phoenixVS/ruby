exports('fetch', (params, done) => {
  console.log(`fetching...`);
  insertHtmlModules({}, () => {

    let urlInplay = 'http://bestline.bet/api/?key=inplay',
      urlBets = 'http://bestline.bet/api/?key=',
      urlSports = 'http://bestline.bet/sports/?PD=all';

    window.sportsLoad = () => {
      httpGet(urlSports, 'sports');
    };

    window.tableLoad = () => {
      httpGet(urlInplay, 'inplay');
    };

    window.eventLoad = (ID) => {
      let url = urlBets + ID;
      httpGet(url, 'bets');
    };

    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'sports') {
            const tree = growTree(data, 'sports');
            window.prematch = tree;
          }
          else {
            if (name == 'inplay') {
              const tree = growTree(data, 'inplay');
              window.inplay = tree;
              console.log(tree);
            }
            else {
              if (name == 'bets') {
                const tree = growTree(data, 'bets');
                window.event = tree;
                console.log(tree);
              }
              else {
                throw new Error('Uncorrect handler name.');
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    // buidling tree from parsed json
    // parse input object massive into a tree 
    function growTree(data, type) {
      console.log(type);
      if (type == 'inplay') {
        let curCL = '';
        let curCT = '';
        let curEV = '';
        let curMA = '';
        let curPA = '';
        let tree = [];
        data.map((item, index) => {
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
      }
      else {
        if (type == 'sports') {
          let curCL = '';
          let tree = [];
          data.map((item, index) => {
            if (item.type === 'CL') {
              tree.push(item);
              curCL = item;
              curCL.EV = [];
            }
            if (item.type === 'EV') {
              curCL.EV.push(item);
            }
          });
          return tree;
        }
        else {
          let curEV = '';
          let curTG = '';
          let curTE = '';
          let curES = '';
          let curSC = '';
          let curSL = '';
          let curMA = '';
          let curCO = '';
          let curPA = '';
          let tree = [];
          data.map((item, index) => {
            if (type == 'bets') {
              if (item.type === 'EV') {
                tree.push(item);
                curEV = item;
                curEV.TG = [];
                curEV.TE = [];
                curEV.ES = [];
                curEV.SC = [];
                curEV.MA = [];
              }
              if (item.type === 'TG') {
                curEV.TG.push(item);
              }
              if (item.type === 'TE') {
                curEV.TE.push(item);
              }
              if (item.type === 'ES') {
                curEV.ES.push(item);
              }
              if (item.type === 'SC') {
                curEV.SC.push(item);
                curSC = item;
                curSC.SL = [];
              }
              if (item.type === 'SL') {
                curSC.SL.push(item);
              }
              if (item.type === 'MA') {
                curEV.MA.push(item);
                curMA = item;
                curMA.CO = [];
              }
              if (item.type === 'CO') {
                curMA.CO.push(item);
                curCO = item;
                curCO.PA = [];
              }
              if (item.type === 'PA') {
                curCO.PA.push(item);
              }
            }
          });
          return tree;
        }
      }
    }

    done();
  });
});