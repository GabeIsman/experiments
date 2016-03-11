import $ from 'jquery';

const path = window.location.pathname;

console.log(path);
switch(path) {
case '/':
case '':
	console.log('inside case');
	require.ensure([], function() {
		const page = require('./page').default;
		console.log('here');
		$('body').html(page());
	}, 'index');
	break;
case '/somewhere':
	require.ensure([], function() {
		const page2 = require('./page2').default;
		$('body').html(page2());
	}, 'somewhere');
	break;
}
