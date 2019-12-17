exports('p404', (params, done) => {
  insertHtmlModules({
    // ".play-big": [
    //   "main/play-big.html"
    // ]
  },
    () => {
      // Preloader finishes
      const preloader = $('#page-preloader');
      if (preloader.data(`status`) != 'done') {
        preloader.addClass('done');
        preloader.data(`status`, 'done').attr('data-status', 'done');
      }
      $('.main').empty().append(`
      <div id="404"><p>oops...</p>
      <h2>Page not found </h2>
      </div>
    `)
        .css({
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          color: 'white',
        });
    }
  )
}
);