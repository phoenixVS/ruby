exports('game', (params, done) => {
  insertHtmlModules({
    // ".game": [
    //   "game/game.html"
    // ]
  }, () => {
    // Shortening club name
    function shortize(name) {
      let str = name;
      if (screen.width < 400) {
        str = str.slice(0, 10);
        if (name.length > 10) {
          str += '...';
        }
        return str;
      }
      else {
        str = str.slice(0, 16);
        if (name.length > 16) {
          str += '...';
        }
        return str;
      }
    }
    $(`[data-id="game"]`).empty();
    renderEvent(window.event);
    // rendering game data
    function renderEvent(data) {
      const ev = data[0];
      const eventRenderer = new Promise((resolve, reject) => {
        if (data) {
          const gameWrapper = $(`[data-id=game]`);
          if (typeof data[0] !== undefined && typeof data[0].TE[0] !== undefined) {
            gameWrapper.empty().append(`
            <div class="[ video-title not-active ] flex-container align-center-middle" >
              <button class="button square [ video-title-button ] fa fa-angle-left"></button>
              <p class="font [ video-title-text ] bet-title"><span class="team-name-1">${shortize(data[0].TE[0].NA)
              + ' </span><span class="vs">&nbsp;&nbsp; VS &nbsp;&nbsp;</span><span class="team-name-2">' + shortize(data[0].TE[1].NA)}</span></p>
            </div>
            <div class="[ video-play ] flex-container align-middle align-justify">
              <p class="flex-container align-middle">
                <span class="[ video-play-square white ]"></span>
                <span class="font">${shortize(data[0].TE[0].NA)}</span>
              </p>
              <p class="font title [ video-play-count ]">${data[0].SS}</p>
              <p class="flex-container align-middle">
                <span class="font">${shortize(data[0].TE[1].NA)}</span>
                <span class="[ video-play-square red ]"></span>
              </p>
            </div>
            <div class="[ video-body ]"></div>
            `);
          }
          else {
            gameWrapper.empty().append(`<p class="font title [ video-play-count ]">Sorry, game not found</p>`);
          }

          resolve();
        }
        else {
          throw new Error(`Error: Data not found`);
        }
      });
      eventRenderer
        .then(() => {
          // Preloader finishes
          const preloader = $('#page-preloader');
          preloader.addClass('done');

          $('.video-play-square.white').css('background-color', data[0].TE[0].TC);
          $('.video-play-square.red').css('background-color', data[0].TE[1].TC);
          // Move back button
          $('.video-title-button').on('click', (event) => { event.stopPropagation(); event.preventDefault(); window.history.back(); });

          // Event switcher
          $('.video-title').on('click', eventSwitcherRenderer);

          function eventSwitcherRenderer(event) {

            if ($('.video-title').is('.not-active')) {
              const eventSwitcherRenderer = new Promise((resolve, reject) => {
                $('.video-title').removeClass('not-active');
                $('.video-title').addClass('active');
                let eventSwitcherWrapper = $(`
                <div class="ipe-EventSwitcher ">
                  <div style="max-height: 647px;" class="ipe-EventSwitcher_Container ">
                    <div class="ipe-EventSwitcherFixtureList">
                    
                    </div>
                  </div>
                </div>
                <div class="ipe-EventViewTitle_Overlay "></div>
                `);

                console.log('inplay', window.inplay);
                console.log('event', window.event);

                for (cl of window.inplay) {
                  if (cl.ID == window.event[0].CL) {
                    for (ct of cl.CT) {
                      if (ct.EV.length > 0) {
                        let curCT = $(`
                        <div class="ipe-EventSwitcherCompetitionBase">
                          <div class="ipe-EventSwitcher_CompetitionName">${ct.NA}</div>
                          
                        </div>
                        `);
                        for (let game of ct.EV) {
                          let cur = '';
                          if (game.ID == data[0].ID) {
                            cur = 'ipe-EventSwitcherFixture_CurrentFixture';
                          }
                          curCT.append(`
                          <div class="ipe-EventSwitcherFixture ${cur}">
                            <div class="ipe-EventSwitcherFixture_GameDetail" data-game-id="${game.ID}">
                              <div class="ipe-EventSwitcherFixture_MetaContainer Hidden">
                              </div>
                              <div class="ipe-EventSwitcherFixture_GameItems">
                                <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable">
                                  <div class="ipe-EventSwitcherFixture_CompetitorName">
                                    <span class="ipe-EventSwitcherFixture_Truncator">
                                      ${game.NA.split(' v ')[0] || ev.NA.split(' vs ')[0] || game.NA.split(' @ ')[0]}
                                    </span>
                                  </div>
                                  <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets">
                                    <span class="ipe-EventSwitcher_PointNode">${game.SS.split('-')[0] || ' '}</span>
                                  </div>
                                </div>
                                <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active ">
                                  <div class="ipe-EventSwitcherFixture_CompetitorName ">
                                    <span class="ipe-EventSwitcherFixture_Truncator ">
                                      ${game.NA.split(' v ')[1] || game.NA.split(' vs ')[1] || game.NA.split(' @ ')[1]}
                                    </span>
                                  </div>
                                  <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets ">
                                    <span class="ipe-EventSwitcher_PointNode ">${game.SS.split('-')[1] || ' '}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            `);

                        }
                        eventSwitcherWrapper.find(`.ipe-EventSwitcherFixtureList`).append(curCT);
                      }
                    }
                  }
                }
                // $('.ipe-EventSwitcherFixtureList ').empty();


                // if (typeof XP !== 'undefined') {
                //   if (typeof XP.split(',')[1] !== 'undefined') {
                //     let counter = 0;
                //     ev.XP.split(',').map((item) => {
                //       counter++;
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //         <span class="point">${item.split('-')[0]}
                //       `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //         <span class="point">${item.split('-')[1]}
                //       `);
                //     });
                //   }
                //   else {
                //     let counter = 0;
                //     ev.SS.split(',').map((item) => {
                //       counter++;
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //         <span class="point">${item.split('-')[0]}
                //       `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //         <span class="point">${item.split('-')[1]}
                //       `);
                //     });
                //   }
                // }
                // else {
                //   let counter = 0;
                //   ev.SS.split(',').map((item) => {
                //     counter++;
                //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${item.split('-')[0]}
                //     `);
                //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //     <span class="point">${item.split('-')[1]}
                //   `);
                //   });
                // }
                // if (typeof XP !== 'undefined') {
                //   if (ev.PI.split(',')[0] == '1')
                //     $(`div[data-game-id="${ev.ID}"] .team.home p`).addClass('bowler');
                //   if (ev.PI.split(',')[1] == '1')
                //     $(`div[data-game-id="${ev.ID}"] .team.away p`).addClass('bowler');
                //   $(`div[data-game-id="${ev.ID}"] .timer-el`).remove();
                //   if (typeof XP.split(',')[1] !== 'undefined') {
                //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${ev.SS.split('-')[0]}
                //     `);
                //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //       <span class="point">${ev.SS.split('-')[1]}
                //     `);
                //   }
                //   else {
                //     if (XP !== '') {
                //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
                //       <span class="point">${XP.split('-')[0]}
                //     `);
                //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
                //       <span class="point">${XP.split('-')[1]}
                //     `);
                //     }
                //   }
                // }

                $(`[data-id=game]`).after(eventSwitcherWrapper);
                // document.querySelector(`body`).removeEventListener('click', removeEventSwitcher);
                // function removeEventSwitcher(event) {
                //   if (!($(event.target).parents('.ipe-EventSwitcherFixture_GameDetail').length > 0)) {
                //     console.log(`clickked on body:(`);
                //     $('.ipe-EventSwitcher').remove();
                //     $('.video-title').removeClass('active').addClass('not-active');
                //     document.querySelector(`body`).removeEventListener('click', removeEventSwitcher);
                //   }
                // }
                // setTimeout(() => {
                //   document.querySelector(`body`).addEventListener('click', removeEventSwitcher);
                // }, 50);
                resolve(data[0].ID);
              }).then(
                response => {
                  $('.ipe-EventViewTitle_Overlay').on('click', (event) => {
                    $('.video-title').removeClass('active').addClass('not-active');
                    $('.ipe-EventSwitcher').remove();
                    $('.ipe-EventViewTitle_Overlay').remove();
                  });
                  $('.ipe-EventSwitcherFixture_GameDetail').on('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();

                    console.log($(event.target).parents(`.ipe-EventSwitcherFixture_GameDetail`).data(`gameId`));
                    let curID = $(event.target).parents(`.ipe-EventSwitcherFixture_GameDetail`).data(`gameId`);
                    console.log(`event id : `, curID);
                    if (curID == response) {

                    }
                    else {
                      window.location.hash = `/event/${curID}`;
                    }
                    $('.video-title').removeClass('active').addClass('not-active');
                    $('.ipe-EventSwitcher').remove();
                  });
                }
              );
            }
            else {
              $('.video-title').removeClass('active');
              $('.video-title').addClass('not-active');
              $('.ipe-EventSwitcher').remove();
            }



          }
        })
        .catch((err) => { console.log(err); });
    }

    done();
  });
});