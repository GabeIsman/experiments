import $ from 'jquery';

const path = window.location.pathname;

switch (path) {
  case '/':
  case '':
    require.ensure([], () => {
      const page = require('./1/page').default;
      $('body').html(page());
    });
    break;
  default:
}
