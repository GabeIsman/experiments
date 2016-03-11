import $ from 'jquery';

const path = window.location.pathname;

switch (path) {
  case '/':
  case '':
    require.ensure([], () => {
      const page = require('./page').default;
      $('body').html(page());
    }, 'index');
    break;
  case '/somewhere':
    require.ensure([], () => {
      const page2 = require('./page2').default;
      $('body').html(page2());
    }, 'somewhere');
    break;
  default:
}
