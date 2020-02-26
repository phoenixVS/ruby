exports('calendar', (params, done) => {
  insertHtmlModules({}, () => {
    function showCalendar() {
      let url = 'http://bestline.bet/schedule/';
      // Shortening club name
      function shortize(name) {
        let str = name;
        if (screen.width < 350) {
          str = str.slice(0, 15);
          if (name.length > 15) {
            str += '...';
          }
          return str;
        } else if (screen.width > 350 && screen.width < 420) {
          str = str.slice(0, 19);
          if (name.length > 19) {
            str += '...';
          }
          return str;
        } else {
          return str;
        }
      }

      // Fetch API request
      function httpGet(url, name) {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (name == 'schedule') {
              let [tree, events] = growTree(data);
              renderSchedule(tree, events);
            }
            else {
              throw new Error('Uncorrect handler name.');
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
      // buidling tree from parsed json
      // parse input object massive into a tree 
      function growTree(data) {
        let curCL = '';
        let curEV = '';
        let curDD = '';
        let tree = [];
        let events = [];
        tree.CL = [];
        tree.DD = [];
        data.map((item, index) => {
          if (item.type === 'CL' && typeof item.DD == 'undefined') {
            tree.CL.push(item);
            curCL = item;
            curCL.EV = [];
          }
          if (item.type === 'CL' && typeof item.DD !== 'undefined') {
            tree.DD.push(item);
            curDD = item;
            curDD.EV = [];
          }
          if (item.type === 'EV') {
            for (cl of tree.CL) {
              if (cl.ID == item.CI) {
                cl.EV.push(item);
              }
            }
            curDD.EV.push(item);
          }
        });

        data.map((item) => {
          if (item.type === 'EV') {
            events.push(item);
          }
        });
        return [tree, events];
      }

      httpGet(url, 'schedule');

      function renderSchedule(tree, events) {
        console.log(tree);
        console.log(events);
        let renderLayout = new Promise((resolve, reject) => {
          $('[data-id=slider]').show();
          $('[data-id=calendarContainer]').show();
          $(`<div class="game-list">
                <ul class="game-list-ul">
                </ul>
                <div class="filter-blur"></div>
              </div>
              <div class="calendarContent" style="display: inline-table">
                <div class="selectors">
                  <dl class="dropdown-days">
                    <dt>
                      <a><span>Today</span></a>
                    </dt>
                    <dd>
                      <ul id="days-list">
                      
                      </ul>
                    </dd>
                  </dl>

                  <dl class="dropdown">
                    <dt><a><span>All sports</span></a></dt>
                    <dd>
                      <ul id="sports-list">
                      
                      </ul>
                    </dd>
                  </dl>
                  
              </div>
          `).prependTo('[data-id="calendarContainer"]').fadeIn('middle');
          resolve();
        });
        renderLayout.then(() => {
          const renderData = new Promise((resolve, reject) => {
            const slider = $(`[data-id=slider]`);
            slider.css('display', 'none');
            // Days
            let skip = 2;
            for (day of tree.DD) {
              if (skip > 0) {
                if (skip == 2) {
                  $(`#days-list`).append(`
                  <li><a data-day="${day.DD}" class="default selected">Today</a></li>
                  `);
                }
                else {
                  $(`#days-list`).append(`
                  <li><a data-day="${day.DD}">Tomorrow</a></li>
                  `);
                }
                skip--;
                continue;
              }
              $(`#days-list`).append(`
                <li><a data-day="${day.DD}">${day.NA}</a></li>
              `);
            }
            // Sports
            let def = 1;
            for (sport of tree.CL) {
              if (def > 0) {
                def--;
                $('#sports-list').append(`
                <li><a data-sport-id="${sport.ID}" class="default selected">${sport.NA}</a></li>
                `);
                continue;
              }
              $('#sports-list').append(`
                <li><a data-sport-id="${sport.ID}">${sport.NA}</a></li>
                `);
            }
            // Default events
            for (ev of tree.DD[0].EV) {
              $('.game-list-ul').append(`
              <li>
                <a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">
                  ${typeof ev.NA.split(' v ')[1] !== 'undefined' ? shortize(ev.NA.split(' v ')[0]) + ' vs ' + shortize(ev.NA.split(' v ')[1] || '') : shortize(ev.NA.split(' vs ')[0]) + ' vs ' + shortize(ev.NA.split(' vs ')[1] || '')}
                </a>
              </li>
              `);
            }
          });
          renderLayout.then(() => {
            $('select[data-menu]').each(function () {

              let select = $(this),
                type = select.data('menu'),
                menu = $('<div />').addClass('select-menu ' + type),
                button = $('<button />'),
                buttonDiv = $('<div />'),
                current = $('<span />').text(select.find('option:selected').text()).appendTo(buttonDiv),
                arrow = $('<em />').prependTo(button);

              button.css({
                '--h': select.outerHeight(),
                '--w': select.outerWidth()
              });

              select.wrap(menu);

              button.append(buttonDiv).insertAfter(select);

            });

            // Date swapping using hammer.js and animate.css
            /* let hammer = new Hammer(document.querySelector('.select-menu'));

            hammer.on('swiperight', function (ev) {
              const menu = $('.select-menu'),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');
              current.addClass('animated');
              current.addClass('slideOutRight');
              current.addClass('faster');
              // buttonDiv.addClass('delay-1s');

              console.log('active index', active.index());
              let nextOption = options.eq(active.index() == 0 ? options.length - 1 : active.index() - 1);
              let next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);

              options.attr('selected', false);
              nextOption.attr('selected', true);

              current[0].addEventListener('animationend', () => {
                current.remove();
                next.addClass('animated');
                next.addClass('faster');
                next.addClass('slideInLeft');

                next[0].addEventListener('animationend', () => {
                  next.removeClass('next');
                  next.removeClass('animated');
                  next.removeClass('faster');
                  next.removeClass('slideInLeft');
                });
              });

              $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            });
            hammer.on('swipeleft', function (ev) {
              const menu = $('.select-menu'),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');

              current.addClass('animated');
              current.addClass('faster');
              current.addClass('slideOutLeft');
              console.log('active index', active.index());
              // buttonDiv.addClass('delay-1s');
              let nextOption = options.eq(active.index() == options.length - 1 ? 1 : active.index() + 1);
              let next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);


              options.attr('selected', false);
              nextOption.attr('selected', true);

              current[0].addEventListener('animationend', () => {
                current.remove();
                next.addClass('animated');
                next.addClass('faster');
                next.addClass('slideInRight');

                next[0].addEventListener('animationend', () => {
                  next.removeClass('next');
                  next.removeClass('animated');
                  next.removeClass('faster');
                  next.removeClass('slideInRight');
                });
              });


              $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            }); */


            /* $('.select-menu').on('click', function (e) {
              let menu = $(this),
                select = menu.children('select'),
                options = select.find('option'),
                active = select.find('option:selected'),
                button = menu.children('button'),
                buttonDiv = button.children('div'),
                current = buttonDiv.children('span');
  
              if (!menu.hasClass('change')) {
  
                let nextOption = options.eq(active.index() == options.length - 1 ? 0 : active.index() + 1),
                  next = $('<span />').addClass('next').text(nextOption.text()).appendTo(buttonDiv);
  
                options.attr('selected', false);
                nextOption.attr('selected', true);
  
                menu.addClass('change');
  
                setTimeout(() => {
  
                  next.removeClass('next');
                  menu.removeClass('change');
                  current.remove();
  
                }, 650);
  
              }
  
              $('.game-list-ul').empty();
              let sportName = $('.dropdown span').text();
              console.log(sportName);
              tree.DD.map((day) => {
                if (day.DD == $(`[data-menu="horizontal"]`).children(`[selected]`).data(`day`)) {
                  for (ev of day.EV) {
                    if (sportName == 'All sports') {
                      $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                    }
                    else {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                            <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                          `);
                      }
                    }
                  }
                }
              });
            }); */

            $("body").click(function (e) {
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on first click to log in
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on login popup
              $('.calendarContainer').fadeOut().remove("active");
              $('.blur').removeClass('block').addClass('none');
            });

            const dropdowns = $(".dropdown");
            const days = $('.dropdown-days');
            $('<em />').prependTo(dropdowns.children('dt').children('a').children('span'));
            $('<em />').prependTo(days.children('dt').children('a').children('span'));

            dropdowns.find("dt").click(function () {
              dropdowns.find("dd ul").hide();
              $(this).next().children().toggle();
            });

            days.find("dt").click(function () {
              days.find("dd ul").hide();
              $(this).next().children().toggle();
            });

            // Click handler for dropdown-days
            days.find("dd ul li a").click(function () {
              var leSpan = $(this).parents(".dropdown-days").find("dt a span");
              let sportId = $(this).data(`sportId`);
              let setDate = $('.dropdown-days dd ul li a.selected').data(`day`);
              console.log(setDate);
              // Remove selected class
              $(this).parents(".dropdown-days").find('dd a').each(function () {
                $(this).removeClass('selected');
              });

              $('.game-list-ul').empty();

              // Update selected value
              leSpan.html($(this).html());
              leSpan.data(`day`, setDate).attr('data-day', setDate);

              setTimeout(() => {
                let sportName = '';
                tree.CL.map((sport) => {
                  if (sport.ID == $('.dropdown span').data(`sportId`)) {
                    sportName = sport.NA;
                  }
                });
                if (sportName.length == 0) {
                  sportName = 'All sports';
                }
                console.log(sportName.length);
                if (sportName !== 'All sports') {
                  tree.DD.map((day) => {
                    if (day.DD == setDate) {
                      for (ev of day.EV) {
                        if (ev.CL == sportName) {
                          $('.game-list-ul').append(`
                          <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                        `);
                        }
                      }
                    }
                  });
                }
                else {
                  tree.DD.map((day) => {
                    if (day.DD == setDate) {
                      for (ev of day.EV) {
                        $('.game-list-ul').append(`
                          <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                        `);
                      }
                    }
                  });
                }

              }, 300);

              // If back to default, remove selected class else addclass on right element
              if ($(this).hasClass('default')) {
                leSpan.removeClass('selected')
              }
              else {
                leSpan.addClass('selected');
                $(this).addClass('selected');
              }

              // Close dropdown
              $(this).parents("ul").hide();
            });
            // Click handler for dropdown
            dropdowns.find("dd ul li a").click(function () {
              var leSpan = $(this).parents(".dropdown").find("dt a span");
              let sportId = $(this).data(`sportId`);
              let setDate = $('.dropdown-days dd ul li a.selected').data(`day`);
              // Remove selected class
              $(this).parents(".dropdown").find('dd a').each(function () {
                $(this).removeClass('selected');
              });

              $('.game-list-ul').empty();

              // Update selected value
              leSpan.html($(this).html());
              leSpan.data(`sportId`, sportId).attr('data-sport-id', sportId);

              setTimeout(() => {
                let sportName = '';
                tree.CL.map((sport) => {
                  if (sport.ID == $('.dropdown span').data(`sportId`)) {
                    sportName = sport.NA;
                  }
                });

                tree.DD.map((day) => {
                  if (day.DD == setDate) {
                    for (ev of day.EV) {
                      if (ev.CL == sportName) {
                        $('.game-list-ul').append(`
                        <li><a class="calendar-list-time">${ev.SM}</a><a class="calendar-list-font">${ev.NA}</a></li>
                      `);
                      }
                    }
                  }
                });
              }, 300);

              // If back to default, remove selected class else addclass on right element
              if ($(this).hasClass('default')) {
                leSpan.removeClass('selected')
              }
              else {
                leSpan.addClass('selected');
                $(this).addClass('selected');
              }

              // Close dropdown
              $(this).parents("ul").hide();
            });

            // Close all dropdown onclick on another element
            $(document).bind('click', function (e) {
              if (!$(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
            });
            // Preloader finishes
            const preloader = $('#page-preloader');
            if (preloader.data(`status`) != 'done') {
              preloader.addClass('done');
              preloader.removeClass('opaci');
              preloader.data(`status`, 'done').attr('data-status', 'done');
            }

            window.translate();
          });
        });
      }
    }
    showCalendar();
  });
  done();
});