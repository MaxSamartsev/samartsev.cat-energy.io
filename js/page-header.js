
var pageHeader = document.querySelector('.page-header');
var navButton = document.querySelector('.page-header__nav-button');

pageHeader.classList.remove('page-header-nojs');

navButton.addEventListener('click', function() {
  if (pageHeader.classList.contains('page-header--nav-closed')) {
    pageHeader.classList.remove('page-header--nav-closed');
    pageHeader.classList.add('page-header--nav-open');
  } else {
    pageHeader.classList.add('page-header--nav-closed');
    pageHeader.classList.remove('page-header--nav-open');
  }
});
