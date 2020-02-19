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

    renderEvent(window.event);
    // rendering game data
    function renderEvent(data) {
      const ev = data[0];
      const eventRenderer = new Promise((resolve, reject) => {
        if (data) {
          const gameWrapper = $(`[data-id=game]`);
          gameWrapper.empty().append(`
            <div class="[ video-title not-active ] flex-container align-center-middle" >
              <button class="button square [ video-title-button ] fa fa-angle-left"></button>
              <p class="font [ video-title-text ] bet-title"><span class="team-name-1">${shortize(ev.TE[0].NA)
            + ' </span><span class="vs">&nbsp;&nbsp; VS &nbsp;&nbsp;</span><span class="team-name-2">' + shortize(ev.TE[1].NA)}</span></p>
            </div>
            <div class="[ video-play ] flex-container align-middle align-justify">
              <p class="flex-container align-middle">
                <span class="[ video-play-square white ]"></span>
                <span class="font">${shortize(ev.TE[0].NA)}</span>
              </p>
              <p class="font title [ video-play-count ]">${ev.SS}</p>
              <p class="flex-container align-middle">
                <span class="font">${shortize(ev.TE[1].NA)}</span>
                <span class="[ video-play-square red ]"></span>
              </p>
            </div>
            <div class="[ video-body ]"></div>
            `);
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

          $('.video-play-square.white').css('background-color', ev.TE[0].TC);
          $('.video-play-square.red').css('background-color', ev.TE[1].TC);
          // Move back button
          $('.video-title-button').on('click', (event) => { event.stopPropagation(); event.preventDefault(); window.location.hash = ''; });

          // Event switcher
          $('.video-title').on('click', eventSwitcherRenderer);

          function eventSwitcherRenderer(event) {

            if ($('.ipe-EventSwitcher').length == 0) {
              $('.video-title').removeClass('not-active');
              $('.video-title').addClass('active');
              const EventSwitcher = $(`
            <div class="ipe-EventSwitcher ">
            <div style="max-height: 647px;" class="ipe-EventSwitcher_Container ">
              <div class="ipe-EventSwitcherFixtureList">
                <div class="ipe-EventSwitcherCompetitionBase">
                  <div class="ipe-EventSwitcher_CompetitionName">ITF M25 Актобе</div>
                  <div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings">
                    <div class="ipe-EventSwitcherFixture_GameDetail">
                      <div class="ipe-EventSwitcherFixture_MetaContainer Hidden">
                      </div><div class="ipe-EventSwitcherFixture_GameItems">
                        <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable">
                          <div class="ipe-EventSwitcherFixture_CompetitorName">
                            <span class="ipe-EventSwitcherFixture_Truncator"> Отто  Виртанен</span>
                          </div>
                          <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets">
                            <span class="ipe-EventSwitcher_PointNode">0</span>
                          </div>
                        </div>
                        <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active ">
                          <div class="ipe-EventSwitcherFixture_CompetitorName ">
                            <span class="ipe-EventSwitcherFixture_Truncator "> Достанбек Ташбулатов</span>
                          </div>
                          <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets ">
                            <span class="ipe-EventSwitcher_PointNode ">0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!--End of competition base-->
                <div class="ipe-EventSwitcherCompetitionBase Hidden "><div class="ipe-EventSwitcher_CompetitionName">ITF M15 Анталья</div></div><div class="ipe-EventSwitcherCompetitionBase "><div class="ipe-EventSwitcher_CompetitionName">ITF W60 Киото</div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_CurrentFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">  Риса  Усидзима</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">1</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Арина  Родионова</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">4</span><span class="ipe-EventSwitcher_PointNode ">4</span></div></div></div></div></div></div><div class="ipe-EventSwitcherCompetitionBase "><div class="ipe-EventSwitcher_CompetitionName">ITF W25 Джодхпур</div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Берфу Ченгиз</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">3</span><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Карман Каур  Танди</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">3</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Валерия Страхова</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">3</span><span class="ipe-EventSwitcher_PointNode ">4</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Соуйаня Бависетти</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">5</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Зеел Десай</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">2</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Мияби Иноуэ</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">3</span><span class="ipe-EventSwitcher_PointNode ">1</span></div></div></div></div></div></div><div class="ipe-EventSwitcherCompetitionBase "><div class="ipe-EventSwitcher_CompetitionName">ITF W25 Перт</div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Эбби Майерс</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">4</span><span class="ipe-EventSwitcher_PointNode ">7</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Азия Муххамад</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">1</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Мана  Кавамура</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">2</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Александра Божович</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">Mia Repac</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">0</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Зузана Злочова</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">0</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Мисаки  Матсуда</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">3</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator "> Найктха Бэйнс</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">0</span></div></div></div></div></div></div><div class="ipe-EventSwitcherCompetitionBase "><div class="ipe-EventSwitcher_CompetitionName">ITF W60 Киото - ЖП</div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">Инди Де Врум/Чинью  Ванг</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">2</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">Михару Иманиши/Робу Каджитани</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">1</span></div></div></div></div></div><div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings "><div class="ipe-EventSwitcherFixture_GameDetail "><div class="ipe-EventSwitcherFixture_MetaContainer Hidden "></div><div class="ipe-EventSwitcherFixture_GameItems "><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">Харука Кадзи/Дзюнри Намигата</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets "><span class="ipe-EventSwitcher_PointNode ">6</span><span class="ipe-EventSwitcher_PointNode ">2</span></div></div><div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable "><div class="ipe-EventSwitcherFixture_CompetitorName "><span class="ipe-EventSwitcherFixture_Truncator ">Нагиса Моримото/Канако Осафун</span></div><div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets ">
                              <span class="ipe-EventSwitcher_PointNode ">2</span>
                              <span class="ipe-EventSwitcher_PointNode ">1</span>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                </div>
              </div>
            </div>
          </div>
            `);
              $('.ipe-EventSwitcherFixtureList ').empty();
              console.log(window.inplay);
              console.log(window.event);
              let FixtureList = $();
              for (sport of window.inplay) {
                if (sport.ID == ev.TG.DS) {
                  for (ct of sport.CT) {
                    const curCT = $(`<div class="ipe-EventSwitcherCompetitionBase">
                    <div class="ipe-EventSwitcher_CompetitionName">${ct.NA}</div>
                    <div class="ipe-EventSwitcherFixture ipe-EventSwitcherFixture_NoTimings">
                    </div>`);
                    for (ev of ct.EV) {
                      curEV = (`
                      <div class="ipe-EventSwitcherFixture_GameDetail">
                      <div class="ipe-EventSwitcherFixture_MetaContainer Hidden">
                      </div>
                      <div class="ipe-EventSwitcherFixture_GameItems">
                        <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable">
                          <div class="ipe-EventSwitcherFixture_CompetitorName">
                            <span class="ipe-EventSwitcherFixture_Truncator">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[0] : ev.NA.split(' vs ')[0]}</span>
                          </div>
                          <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets">
                            <span class="ipe-EventSwitcher_PointNode">0</span>
                          </div>
                        </div>
                        <div class="ipe-EventSwitcherFixture_GameItem ipe-EventSwitcherFixture_Servable ipe-EventSwitcherFixture_Active ">
                          <div class="ipe-EventSwitcherFixture_CompetitorName ">
                            <span class="ipe-EventSwitcherFixture_Truncator ">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[1] : ev.NA.split(' vs ')[1]}</span>
                          </div>
                          <div class="ipe-EventSwitcherFixture_CompetitorScores ipe-EventSwitcherFixture_CompetitorSets ">
                            <span class="ipe-EventSwitcher_PointNode ">0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                      `);
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
                      curCT.append(curEV);
                    }

                    $('.ipe-EventSwitcherFixtureList').append(curCT);

                  }
                }
              }

              $(`[data-id=game]`).after(EventSwitcher);

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