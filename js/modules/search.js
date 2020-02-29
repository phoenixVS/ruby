exports('search', (params, done) => {
  insertHtmlModules({
  }, () => {

    function GET(squery) {
      let URL = "http://bestline.bet/search/?query=" + squery;

      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          window.searchDATA = Tree(data);
          console.log(window.searchDATA);
          console.log(getPAforCompets(window.searchDATA, "Antigua & Barbuda Premier Division"));
          RenderSearchResult(data);
        });
    }

    function getPAforMG(teamName, data) {
      let PAarr = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].type == 'PA') {
          let paNA = data[i].NA;
          if (typeof paNA !== 'undefined') {
            if (paNA.includes(teamName)) {
              PAarr.push(paNA);
            }
          }
        }
      }
      return PAarr;
    }

    function getPAforCompets(data, compet_name) {
      let PACompArr = [];

      for (let i = 0; i < data.CL[0].EV[1].MG.length; i++) {
        if (data.CL[0].EV[1].MG[i].NA == compet_name) {
          for (let j = 0; j < data.CL[0].EV[1].MG[i].MA[0].PA.length; j++) {
            PACompArr.push(data.CL[0].EV[1].MG[i].MA[0].PA[j].NA);
          }
          break;
        }
      }

      return PACompArr;
    }

    function getCoefsSoccer(data, teamName, machName) {
      
      let coefsArr = [];

      for (let i = 0; i < data.CL[0].EV[0].MG.length; i++) {
        if (data.CL[0].EV[0].MG[i].NA == teamName) {
          let order;
          let time_millis
          for (let j = 0; j < data.CL[0].EV[0].MG[i].MA[0].PA.length; j++) {
            if (data.CL[0].EV[0].MG[i].MA[0].PA[j].NA == machName) {
              order = j;
              time_millis = data.CL[0].EV[0].MG[i].MA[0].PA[j].BC;
              break;
            }
          }

          let one, X, two;
          
          if (typeof data.CL[0].EV[0].MG[i].MA[1].PA[order] === 'undefined') {
            one = 'null';
          } else {
            one = data.CL[0].EV[0].MG[i].MA[1].PA[order].OD;
          }

          if (typeof data.CL[0].EV[0].MG[i].MA[2].PA[order] === 'undefined') {
            X = 'null';
          } else {
            X = data.CL[0].EV[0].MG[i].MA[2].PA[order].OD;
          }

          if (typeof data.CL[0].EV[0].MG[i].MA[3] === 'undefined') {
            two = 'null';
          } else {
            if (typeof data.CL[0].EV[0].MG[i].MA[3].PA[order] === 'undefined') {
              two = 'null';
            } else {
              two = data.CL[0].EV[0].MG[i].MA[3].PA[order].OD;
            }
          }



          coefsArr.push(one);
          coefsArr.push(X);
          coefsArr.push(two);
          coefsArr.push(time_millis)
        }
      }

      return coefsArr;
    }

    function convertToDate(millis) {
      let x = millis;
			if(x.charAt(x.length-1)=="L"){x=x.slice(0,-1)}
			var checkedOffset = new Number(x);
			//var convertUrl='https://currentmillis.com/?'+checkedOffset;
			//convertLink.setAttribute('href',convertUrl);
			var date = new Date(checkedOffset);
			var local = date.toDateString()+' '+date.toTimeString();
			var lastColonIndex = local.lastIndexOf(':');
			local = local.substring(0, lastColonIndex + 3)
			//document.getElementById('leftDate').value = local;
			var utc = date.toUTCString();
			var timezoneIndex = utc.lastIndexOf('GMT');
			if (timezoneIndex < 0){
				timezoneIndex = utc.lastIndexOf('UTC');
			}
			utc = utc.substring(0, timezoneIndex - 1);
			var firstCommaIndex = utc.indexOf(',');
			utc = utc.substring(0, firstCommaIndex) + utc.substring(firstCommaIndex + 1);
      utc = utc.split(' ');
			return utc[0] + ' ' + utc[2] + ' ' + utc[1] + ' ' + utc[4];
    }

    function Tree(data) {
      this.data = {};
      this.data.CL = [];

      let CL;
      let EV;
      let MG;
      let MA;

      data.forEach(item => {
          if (item.type === 'CL'){
              CL = item;
              CL.EV = [];
              this.data.CL.push(item)
          }
          if (item.type === 'EV'){
              EV = item;
              EV.MG = [];
              CL.EV.push(item);
          }
          if (item.type === 'MG'){
              MG = item;
              MG.MA = [];
              EV.MG.push(MG)
          }
          if (item.type === 'MA'){
              MA = item;
              MA.PA = [];
              MG.MA.push(MA)
          }
          if (item.type === 'PA'){
              MA.PA.push(item)
          }
      });

      return this.data;
    }

    function RenderSearchResult(data) {
      new Promise((resolve, reject) => {
        let lastEV = '';
        let res_content = $('.search-result');
        res_content.empty();
        res_content.append(`
        <div class="search-scroll">
        </div>
        `);
        let scroll = $('.search-scroll');
        let cl_counter = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 'CL') {
            cl_counter++
            if (cl_counter > 1) {
              for (let g = 0; g < data.length; g++) {
                if (data[g].type == 'CL' && data[g].NA != choosen_NA) {
                  scroll.append(`
                    <div class="search-scroll-item">
                      <p class="font">${data[g].NA}</p>
                    </div>
                    `);
                } else {
                  continue;
                }
              }
              break;
            } else {
              choosen = true;
              choosen_NA = data[i].NA;
              scroll.append(`
              <div class="search-scroll-item choosen">
                <p class="font">${data[i].NA}</p>
              </div>
              `);
            }
          } else if (data[i].type == 'EV') {
            lastEV = data[i].NA;
            res_content.append(`
                <div class="search-ev">
                  <p class="font m-white">${data[i].NA}</p>
                </div>
                `);
          } else if (data[i].type == 'MG') {
            if ($(res_content.children(`.search-ev-links-${i}`)).length) {
              if (lastEV == 'Teams') {
                let PAarray = getPAforMG(data[i].NA, data);
                let trimmedNA = data[i].NA.replace(/\s/g, '');
                $(`.search-ev-links-${i}`).append(`
                    <div class="s-ev-link">
                      <p class="font white t-clicked">${data[i].NA}</p>
                      <div class="t-market-group active">
                        <div data-id="${trimmedNA}" class="market-pa">
                        <div class="market-pa-item">
                          <div>
                            <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                            <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>                        
                        </div>

                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  `);
                  $(`[data-id=${trimmedNA}]`).empty();
                  for (let m = 0; m < PAarray.length; m++) {
                    let coefs = getCoefsSoccer(window.searchDATA, data[i].NA, PAarray[m]);
                    if (coefs[0] == 'null' || coefs[0] == 'undefined' || coefs[1] == 'null' || coefs[1] == 'undefined' || coefs[2] == 'null' || coefs[2] == 'undefined') {
                      continue;
                    } else {
                      $(`[data-id=${trimmedNA}]`).append(`
                    <div class="market-pa-item">
                    <div class="pa-item-names">
                      <span class="font m-white ellipsis" style="font-size: 15px;">${PAarray[m]}</span>
                      <span class="font m-white ellipsis" style="font-size: 12px;">${convertToDate(coefs[3])}</span>
                    </div>
                    <div class="pa-item-bets">
                    <div class="bet-cell">
                    <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                    align-items: flex-start; padding-bottom: 22px">
                    1<br>${coefs[0]}
                    </button>
                  </div>  
                  <div class="bet-cell">
                  <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                  align-items: flex-start; padding-bottom: 22px">
                  x<br>${coefs[1]}
                  </button>
                  </div>  
                  <div class="bet-cell">
                  <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                  align-items: flex-start; padding-bottom: 22px">
                  2<br>${coefs[2]}
                  </button>
                  </div>   
                    </div>
                    </div>
                    `);
                    }
                  }
              } else if (lastEV == 'Competitions') {
                
                $(`.search-ev-links-${i}`).append(`
                  <div class="s-ev-link">
                    <p class="font white">${data[i].NA}</p>
                  </div>
                  `);
                
              }
            } else {
              if (lastEV == 'Teams') {
                let PAarray = getPAforMG(data[i].NA, data);
                let trimmedNA = data[i].NA.replace(/\s/g, '');
                res_content.append(`
                    <div class="search-ev-links-${0}" style="
                    width: 100%;
                    height: auto;
                    min-height: 44px;">
                      <div class="s-ev-link">
                        <p class="font white t-clicked">${data[i].NA}</p>
                        <div class="t-market-group active">
                        <div data-id="${trimmedNA}"class="market-pa">
                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>

                          <div class="market-pa-item">
                          <span class="font m-white ellipsis" style="font-size: 15px;">Team vs Team</span>
                          <span class="font m-white ellipsis" style="font-size: 12px;">Dd Mm Tt</span>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  `);
                    $(`[data-id=${trimmedNA}]`).empty();
                  for (let m = 0; m < PAarray.length; m++) {
                    let coefs = getCoefsSoccer(window.searchDATA, data[i].NA, PAarray[m]);
                    if (coefs[0] == 'null' || coefs[0] == 'undefined' || coefs[1] == 'null' || coefs[1] == 'undefined' || coefs[2] == 'null' || coefs[2] == 'undefined') {
                      continue;
                    } else {
                      $(`[data-id=${trimmedNA}]`).append(`
                    <div class="market-pa-item">
                      <div class="pa-item-names">
                        <span class="font m-white ellipsis" style="font-size: 15px;">${PAarray[m]}</span>
                        <span class="font m-white ellipsis" style="font-size: 12px;">${convertToDate(coefs[3])}</span>
                      </div>
                      <div class="pa-item-bets">
                      <div class="bet-cell">
                        <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                        align-items: flex-start; padding-bottom: 22px">
                        1<br>${coefs[0]}
                        </button>
                      </div>  
                      <div class="bet-cell">
                      <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                      align-items: flex-start; padding-bottom: 22px">
                      x<br>${coefs[1]}
                      </button>
                      </div>  
                      <div class="bet-cell">
                      <button class="button coefficient" style="padding: 0; background-color: transparent; display: inline-flex; /* keep the inline nature of buttons */
                      align-items: flex-start; padding-bottom: 22px">
                      2<br>${coefs[2]}
                      </button>
                      </div>  
                      </div>
                    </div>
                    `);
                    }
                  }
              } else {
                res_content.append(`
                    <div class="search-ev-links-${0}" style="display: block;
                    width: 100%;
                    height: auto;
                    min-height: 44px;">
                      <div class="s-ev-link">
                        <p class="font white">${data[i].NA}</p>
                      </div>
                    </div>
                  `);
              }
            }
          }
        }
        resolve();
      }).then(() => {

        function eSetClicked(el) {
          $(el.target).removeClass('t-not-clicked');
          $(el.target).addClass('t-clicked');
          $(el.target).prop("onclick", null).off("click");

          let marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('not-active');
          marketDIV.addClass('active');

          $(el.target).on('click', (item) => {
            eSetNotClicked(item);
          });
        }

        function eSetNotClicked(el) {
          $(el.target).removeClass('t-clicked');
          $(el.target).addClass('t-not-clicked');
          $(el.target).prop("onclick", null).off("click");

          let marketDIV = $(el.target).parent().children('.t-market-group');
          marketDIV.removeClass('active');
          marketDIV.addClass('not-active');

          $(el.target).on('click', (item) => {
            eSetClicked(item);
          });
        }

        $('.s-ev-link p.t-clicked').on('click', (el) => {
          eSetNotClicked(el);
        });
      });
    }

    function renderSearch() {
      let renderPromise = new Promise((resolve, reject) => {
        if ($('.main-search-container').hasClass('not-active')) {
          $('.main-search-container').addClass('active');
          $('.main-search-container').removeClass('not-active');
          resolve();
        } else {
          $(`<div style="display: none;" data-id="main-search-container" class="main-search-container">

            <div data-id="main-search-container"class="searchContent" style="display: inline-table">
              <div data-id="main-search-container"class="search-container" data-id="search">
                <div data-id="main-search-container"id="search" data-id="search">

                  <i data-id="main-search-container"class="fa fa-search" aria-hidden="true" id="search-icon" style="font-size: 20px; color: #fff" data-id="search"></i>
                  <form data-id="search-field"class="search-form" data-id="search">
                    <input type="text"id="search-input" placeholder="Search..." data-id="search">
                  </form>
                  <div data-id="search-mic" class="search-mic">
                  <i class="fas fa fa-microphone"></i>
                  </div>
                  <div data-id="main-search-container"class="search-close">
                    <p class="font white">Close</p>
                  </div>

                </div>
              </div>
            </div>

            <div class="search-body active">
              <div class="search-example">
                <p class="font m-white">Search examples:</p>
              </div>
              <div class="search-links">
                <div class="s-link">
                  <p class="font white">AFC Champions League</p>
                </div>
                <div class="s-link">
                  <p class="font white">Algeria Youth League</p>
                </div>
                <div class="s-link">
                  <p class="font white">Argentina Reserve League</p>
                </div>
              </div>
            </div>

            <div class="search-result not-active">
              <div class="search-scroll">
                <div class="search-scroll-item choosen">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Tennis</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Basketball</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Cricket</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Handball</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Ice Hokey</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
                <div class="search-scroll-item">
                  <p class="font">Soccer</p>
                </div>
              </div>
            </div>
          </div>
        `).prependTo('#content').fadeIn('middle');
          resolve();
        }
      });
      renderPromise.then(() => {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        console.log(vh);
        // Then we set the value in the --vh custom property to the root of the document
        document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
        // We listen to the resize event
        window.addEventListener('resize', () => {
          // We execute the same script as before
          let vh = window.innerHeight * 0.01;
          document.querySelector('.main-search-container').style.setProperty('--vh', `${vh}px`);
        });
        console.log('search then done');
        $('.search-close').on('click', (el) => {
          console.log('Exit');
          $('.main-search-container').removeClass('active');
          $('.main-search-container').addClass('not-active');
        });
        $(`[data-id=search-field]`).on('input', (el) => {
          let input_val = $(el.target).val();
          if (input_val.length >= 1) {
            $('.search-mic').empty().append('<i class="fas fa fa-times"></i>');
            $('.search-mic').on('click', () => {
              $(el.target).val('');
              $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');

              $('.search-result').removeClass('active');
              $('.search-result').addClass('not-active');

              $('.search-body').removeClass('not-active');
              $('.search-body').addClass('active');
            });
          } else {
            $('.search-mic').empty().append('<i class="fas fa fa-microphone"></i>');
            $('.search-mic').prop("onclick", null).off("click");
          }
          if (input_val.length >= 2) {
            GET('ef');
            $('.search-body').removeClass('active');
            $('.search-body').addClass('not-active');

            $('.search-result').removeClass('not-active');
            $('.search-result').addClass('active');
          } else {

            $('.search-result').removeClass('active');
            $('.search-result').addClass('not-active');

            $('.search-body').removeClass('not-active');
            $('.search-body').addClass('active');
          }
        });
      });
    }
    renderSearch();
    done();
  });
});