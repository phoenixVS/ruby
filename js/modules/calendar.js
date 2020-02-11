exports('calendar', (params, done) => {
    insertHtmlModules({}, () => {
      function showCalendar() {

        let renderPromise = new Promise((resolve, reject) => {
            $('.blur').removeClass('none').addClass('block');
            $(`<div style="display: none;" data-id="calendarContainer" class="calendarContainer">
              <div class="calendarContent" style="display: inline-table">
                <div class="selectors">

                <select data-menu="horizontal">
                <option selected>Today</option>
                <option>Tomorrow</option>
                <option>02.07.2020</option>
                <option>02.08.2020</option>
                </select>

                <dl class="dropdown">
	              <dt><a><span>All sports</span></a></dt>
		            <dd>
			          <ul>
				        <li><a class="default">Soccer</a></li>
				        <li><a>Basketball</a></li>
				        <li><a>Tennis</a></li>
                <li><a>Ice Hockey</a></li>
                <li><a>All sports</a></li>
			          </ul>
		            </dd>
                </dl>
                </div>
                <div class="game-list">
                </div>
              </div>
            </div>
          `).prependTo('#content').fadeIn('middle');
            resolve();
          });
          renderPromise.then(() => {
              console.log("Rendered");
              $('select[data-menu]').each(function() {

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
            
            $('.select-menu').on('click', function(e) {
                let menu = $(this),
                    select = menu.children('select'),
                    options = select.find('option'),
                    active = select.find('option:selected'),
                    button = menu.children('button'),
                    buttonDiv = button.children('div'),
                    current = buttonDiv.children('span');
            
                if(!menu.hasClass('change')) {
            
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
            
            });

            $("body").click(function (e) {
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on first click to log in
              if ($(e.target).closest(`[data-id=calendarContainer]`).length != 0) return false; // disable trigger on login popup
              $('.calendarContainer').fadeOut().remove("active");
              $('.blur').removeClass('block').addClass('none');
            });

            let dropdowns = $(".dropdown");

            dropdowns.find("dt").click(function(){
	            dropdowns.find("dd ul").hide();
	            $(this).next().children().toggle();
            });

// Clic handler for dropdown
dropdowns.find("dd ul li a").click(function(){
	var leSpan = $(this).parents(".dropdown").find("dt a span");
  
	// Remove selected class
	$(this).parents(".dropdown").find('dd a').each(function(){
    $(this).removeClass('selected');
  });
  
	// Update selected value
	leSpan.html($(this).html());
  
	// If back to default, remove selected class else addclass on right element
	if($(this).hasClass('default')){
    leSpan.removeClass('selected')
  }
	else{
		leSpan.addClass('selected');
		$(this).addClass('selected');
	}
  
	// Close dropdown
	$(this).parents("ul").hide();
});

// Close all dropdown onclick on another element
$(document).bind('click', function(e){
	if (! $(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
});
          });
      }
      showCalendar();
    });
    done();
  });