exports('prematch', (params, done) => {
  if (typeof window.prematch === 'undefined') {
    window.sportsLoad();
  }
  const preloader = $('#page-preloader');
  preloader.removeClass('done').addClass('opaci');

  $('.prematch').empty();

  insertHtmlModules({
    '.prematch': [
      'prematch/main.html',
    ]
  }, () => {

    const ID = params.ID;

    function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }
    let url = 'http://bestline.bet/sports/?PD=';
    for (sport of window.prematch) {
      if (sport.ID == ID) {
        url += encodeURL(sport.PD);
      }
    }

    httpGet(url, 'prematch');
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'prematch') {
            const tree = growTree(data);
            renderPrematch(tree);
          }
          else {
            throw new Error('Uncorrect handler name.');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function growTree(data) {
      let tree = [];

      return tree;
    }

    function renderPrematch(data) {
      let render = new Promise((resolve, reject) => {
        console.dir(data);
        $('.prematch-title').text(data[0].NA);
        resolve();
      });

      render.then(
        response => {
          // preloader done
          preloader.addClass('done').removeClass('opaci');
        }
      );
    }

    done();
  });
});