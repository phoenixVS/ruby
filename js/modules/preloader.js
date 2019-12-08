document.body.onload = () => {
  setTimeout(() => {
    const preloader = $('#page-preloader');
    if (preloader.data(`status`) != 'done') {
      preloader.addClass('done');
      preloader.data(`status`, 'done').attr('data-status', 'done');
    }
  }, 3000);
};