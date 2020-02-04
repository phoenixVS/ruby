exports('calendar', (params, done) => {
    insertHtmlModules({}, () => {
      function showCalendar() {

        let renderPromise = new Promise((resolve, reject) => {
            $('.blur').removeClass('none').addClass('block');
            $(`<div style="display: none;" data-id="calendarContainer" class="calendarContainer">
              <div class="calendarContent" style="display: inline-table">
              </div>
            </div>
          `).prependTo('#content').fadeIn('middle');
            resolve();
          });
          renderPromise.then(() => {
              console.log("Rendered");
          });
      }
      showCalendar();
    });
    done();
  });