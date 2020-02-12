exports('langs', (params, done) => {
  async function loadLanguage() {
    const language = Cookies.get('lang');
    const scr = document.createElement("script");
    const dic = {
      'English': 'eng-l.js',
      'Russian': 'rus-l.js',
    }
    scr.src = 'js/langs/' + dic[language];
    document.head.appendChild(scr);
    return;
  };

  loadLanguage();

  window.translate = () => {
    const language = Cookies.get('lang');
    if ($(`script#lang[data-langname=${language}]`).length == 0) {
      loadLanguage().then(() => {
        setTimeout(() => {
          if (typeof window.dict !== 'undefined') {
            $(`[data-lang]`).each((i, el) => {
              console.log(window.dict[$(el).data(`lang`)]);
              $(el).text(window.dict[$(el).data(`lang`)]);
            });
          }
        }, 100);
      });
    }
    else {
      if (typeof window.dict !== 'undefined') {
        $(`[data-lang]`).each((i, el) => {
          console.log(window.dict[$(el).data(`lang`)]);
          $(el).text(window.dict[$(el).data(`lang`)]);
        });
      }
    }
  }
});